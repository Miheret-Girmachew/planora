"use client"
import React, { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation'; 
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, Hash, Compass, Plus, Loader2, 
  Folder as FolderIcon, MoreVertical, CheckCircle2,
  CalendarRange, SearchX
} from 'lucide-react';

import { auth } from '@/lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useFolders } from '@/hooks/useFolders';
import { createFolderAction, deleteFolderAction } from '@/features/dashboard/actions';

import { NewPlanModal } from '@/features/dashboard/components/NewPlanModal';
import { FolderMenu } from '@/features/dashboard/components/FolderMenu';
import { FolderDetailModal } from '@/features/dashboard/components/FolderDetailModal';

const typeConfig: any = {
  daily: { title: 'Daily Focus', icon: Calendar, color: 'text-blue-500', bg: 'bg-blue-500/10', desc: 'Tasks for today.' },
  weekly: { title: 'Weekly Sprint', icon: Hash, color: 'text-indigo-500', bg: 'bg-indigo-500/10', desc: 'Goals for this week.' },
  monthly: { title: 'Monthly Horizon', icon: CalendarRange, color: 'text-purple-500', bg: 'bg-purple-500/10', desc: 'Objectives for the month.' },
  yearly: { title: 'Yearly Vision', icon: Compass, color: 'text-emerald-500', bg: 'bg-emerald-500/10', desc: 'The big picture for 2025.' },
};

export default function TimeBasedPage() {
  const { type } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q')?.toLowerCase() || "";
  
  const [user, authLoading] = useAuthState(auth);
  const { folders, loading: foldersLoading } = useFolders(user?.uid, authLoading);
  
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [activeFolder, setActiveFolder] = useState<any>(null); 
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);


  const baseFolders = folders.filter(f => f.name.includes(`(${type})`));
  
  const filteredFolders = baseFolders.filter(f => 
    f.name.toLowerCase().includes(searchQuery)
  );

  const config = typeConfig[type as string] || typeConfig.daily;
  const Icon = config.icon;

  const handleAddPlan = async (name: string) => {
    if (user) {
      await createFolderAction(`${name} (${type})`, user.uid);
    }
  };

  const handleDeleteFolder = async (id: string) => {
    const confirmDelete = confirm("Permanently remove this item from the current horizon?");
    if (confirmDelete) {
      await deleteFolderAction(id);
      setMenuOpenId(null);
    }
  };

  useEffect(() => {
    if (!authLoading && !user) router.push('/');
  }, [user, authLoading, router]);

  if (authLoading || (foldersLoading && user)) {
    return (
      <div className="h-[70vh] w-full flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-accent" size={40} />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-20">Synchronizing {type} architecture...</p>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-20">
      
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-3 rounded-2xl ${config.bg} ${config.color}`}>
              <Icon size={24} />
            </div>
            <h1 className="text-4xl font-black tracking-tighter capitalize">{config.title}</h1>
          </div>
          <p className="text-foreground/40 font-medium ml-1">{config.desc}</p>
        </motion.div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-foreground text-background px-8 py-4 rounded-[2rem] font-bold flex items-center gap-3 hover:scale-105 transition-all shadow-2xl active:scale-95"
        >
          <Plus size={20} /> Add {type} item
        </button>
      </header>

      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] opacity-30">
            {searchQuery ? `Searching ${type}: "${searchQuery}"` : `Current ${type} Journeys`}
          </h2>
        </div>

        {baseFolders.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="group border-2 border-dashed border-foreground/5 rounded-[3rem] h-80 flex flex-col items-center justify-center text-center p-10 hover:border-accent/20 transition-all cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <div className="p-6 bg-foreground/[0.02] rounded-full mb-4 group-hover:scale-110 transition-transform">
                <Icon size={48} strokeWidth={1} className="opacity-10" />
            </div>
            <p className="font-bold tracking-tight text-lg opacity-40">No {type} plans found.</p>
            <p className="text-xs font-bold uppercase tracking-widest opacity-20 mt-2 hover:opacity-100 transition-opacity">Click to Architect</p>
          </motion.div>
        ) : filteredFolders.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-64 flex flex-col items-center justify-center text-center opacity-20">
             <SearchX size={48} strokeWidth={1.5} className="mb-4" />
             <p className="font-bold text-lg tracking-tight">No matching {type} items.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredFolders.map((folder) => (
                <motion.div
                  key={folder.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -10 }}
                  onClick={() => setActiveFolder(folder)}
                  className="group bg-foreground/[0.02] dark:bg-white/[0.03] border border-foreground/5 p-8 rounded-[3rem] hover:bg-white dark:hover:bg-slate-900 transition-all hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] cursor-pointer relative overflow-hidden"
                >
                  <div className={`absolute top-0 left-0 w-2 h-full bg-accent opacity-30`} />
                  <div className="flex justify-between items-start mb-14">
                    <div className={`w-14 h-14 rounded-2xl bg-accent text-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110`}>
                      <FolderIcon size={28} />
                    </div>
                    <div className="relative">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setMenuOpenId(menuOpenId === folder.id ? null : folder.id); }} 
                        className="p-2 text-foreground/20 hover:text-foreground transition-all"
                      >
                        <MoreVertical size={22} />
                      </button>
                      <FolderMenu isOpen={menuOpenId === folder.id} onDelete={() => handleDeleteFolder(folder.id)} />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-black tracking-tighter mb-2 group-hover:text-accent transition-colors">
                    {folder.name.replace(`(${type})`, '')}
                  </h3>
                  
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={12} className="text-emerald-500" />
                    <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-tighter">Horizon Verified</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <NewPlanModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={handleAddPlan} />
      <FolderDetailModal folder={activeFolder} isOpen={!!activeFolder} onClose={() => setActiveFolder(null)} />
    </div>
  );
}