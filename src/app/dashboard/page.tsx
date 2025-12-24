"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Sparkles, 
  Folder as FolderIcon, 
  MoreVertical, 
  Loader2, 
  CheckCircle2,
  ArrowUpRight,
  Compass 
} from 'lucide-react';

import { auth } from '@/lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useFolders } from '@/hooks/useFolders';
import { 
  createFolderAction, 
  deleteFolderAction, 
  seedSamplesAction 
} from '@/features/dashboard/actions';

import { NewPlanModal } from '@/features/dashboard/components/NewPlanModal';
import { SummaryModal } from '@/features/dashboard/components/SummaryModal';
import { FolderMenu } from '@/features/dashboard/components/FolderMenu';
import { FolderDetailModal } from '@/features/dashboard/components/FolderDetailModal';

export default function DashboardPage() {
  const [user, authLoading] = useAuthState(auth); 
  const { folders, loading: foldersLoading } = useFolders(user?.uid, authLoading); 
  
  const [isGenerating, setIsGenerating] = useState(false); 
  const [isModalOpen, setIsModalOpen] = useState(false);     
  const [isSummaryOpen, setIsSummaryOpen] = useState(false); 
  const [activeFolder, setActiveFolder] = useState<any>(null); 
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);


const handleAddPlan = async (name: string) => {
if (user) {
    console.log("Creating folder for user:", user.uid); 
    const result = await createFolderAction(name, user.uid);
    if (!result.success) {
    alert("Backend failed to save. Check Firebase rules.");
    }
} else {
    console.error("No user found! Cannot create plan.");
}
};

  const handleDeleteFolder = async (id: string) => {
    await deleteFolderAction(id);
    setMenuOpenId(null);
  };

  const handleGenerateRoadmap = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setIsSummaryOpen(true); 
    }, 1500);
  };

  const handleRestoreSamples = async () => {
    if (user) {
      setIsGenerating(true); 
      await seedSamplesAction(user.uid);
      setIsGenerating(false);
    }
  };

  if (authLoading || (foldersLoading && user)) {
    return (
      <div className="h-[70vh] w-full flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-accent" size={40} />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-20">Synchronizing Workspace...</p>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-20">
      
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">System Active</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-none">
            Welcome, <br /> 
            <span className="text-foreground/30">{user?.displayName?.split(' ')[0] || 'Architect'}.</span>
          </h1>
        </motion.div>

        <button 
          onClick={() => setIsModalOpen(true)} 
          className="group bg-foreground text-background px-8 py-4 rounded-[2rem] font-bold flex items-center gap-3 hover:scale-105 transition-all shadow-2xl active:scale-95"
        >
          <Plus size={20} /> New Root Plan
        </button>
      </section>

      {folders.length > 0 && (
        <motion.div 
          whileHover={{ y: -5 }}
          className="relative bg-slate-900 dark:bg-indigo-600 p-10 rounded-[3rem] text-white flex flex-col lg:flex-row justify-between items-center gap-8 shadow-2xl shadow-indigo-500/20 overflow-hidden group"
        >
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
          <div className="relative z-10 space-y-4 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 text-indigo-200">
               <Sparkles size={18} className="animate-pulse" />
               <span className="text-[10px] font-black uppercase tracking-[0.3em]">Planora Synthesis</span>
            </div>
            <h3 className="text-3xl font-black tracking-tight leading-tight">Visualize your planning ecosystem.</h3>
          </div>
          <button 
            onClick={handleGenerateRoadmap} 
            disabled={isGenerating}
            className="relative z-10 bg-white text-slate-900 px-10 py-5 rounded-[2rem] font-black text-sm hover:shadow-xl transition-all active:scale-95 disabled:opacity-50 flex items-center gap-3 min-w-[220px] justify-center"
          >
            {isGenerating ? <Loader2 className="animate-spin" size={18} /> : <>Generate Roadmap <ArrowUpRight size={18} /></>}
          </button>
        </motion.div>
      )}

      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] opacity-30">Active Journeys</h2>
        </div>

        {folders.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="h-80 border-2 border-dashed border-foreground/5 rounded-[3rem] flex flex-col items-center justify-center text-center p-10 group transition-colors"
          >
            <div className="p-6 bg-foreground/[0.02] rounded-full mb-4">
              <Compass size={40} className="opacity-10" />
            </div>
            <h3 className="text-xl font-black opacity-40 tracking-tight">Your workspace is quiet</h3>
            
            <div className="flex flex-col gap-3 mt-8">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-foreground text-background px-10 py-4 rounded-2xl font-bold text-sm shadow-xl hover:scale-105 transition-transform"
              >
                + Create Custom Plan
              </button>
              
              <button 
                onClick={handleRestoreSamples}
                disabled={isGenerating}
                className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 hover:opacity-100 transition-all disabled:opacity-10"
              >
                {isGenerating ? "Seeding..." : "Or Initialize with Samples"}
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {folders.map((folder) => (
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
                  <div className={`absolute top-0 left-0 w-2 h-full ${folder.color || 'bg-indigo-500'} opacity-30`} />
                  
                  <div className="flex justify-between items-start mb-14">
                    <div className={`w-14 h-14 rounded-2xl ${folder.color || 'bg-indigo-500'} text-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110`}>
                      <FolderIcon size={28} />
                    </div>
                    <div className="relative">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setMenuOpenId(menuOpenId === folder.id ? null : folder.id); }} 
                        className="p-2 text-foreground/20 hover:text-foreground hover:bg-foreground/5 rounded-xl transition-all"
                      >
                        <MoreVertical size={22} />
                      </button>
                      <FolderMenu isOpen={menuOpenId === folder.id} onDelete={() => handleDeleteFolder(folder.id)} />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-black tracking-tighter mb-2 group-hover:text-accent transition-colors">{folder.name}</h3>
                  <div className="flex items-center gap-3">
                    <p className="text-[10px] font-black opacity-30 uppercase tracking-widest">{folder.items || 0} Units</p>
                    <span className="w-1 h-1 bg-foreground/10 rounded-full" />
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 size={12} className="text-emerald-500" />
                      <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-tighter">{folder.trend || 'System Active'}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <NewPlanModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={handleAddPlan} />
      <SummaryModal isOpen={isSummaryOpen} onClose={() => setIsSummaryOpen(false)} />
      <FolderDetailModal 
        folder={activeFolder} 
        isOpen={!!activeFolder} 
        onClose={() => setActiveFolder(null)} 
      />
    </div>
  );
}