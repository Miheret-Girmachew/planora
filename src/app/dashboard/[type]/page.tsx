"use client"
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Calendar, Hash, Compass, Plus, Sparkles } from 'lucide-react';
import { NewPlanModal } from '@/features/dashboard/components/NewPlanModal'; 

const typeConfig: any = {
  daily: { title: 'Daily Focus', icon: Calendar, color: 'text-blue-500', bg: 'bg-blue-500/10', desc: 'Tasks for today.' },
  weekly: { title: 'Weekly Sprint', icon: Hash, color: 'text-indigo-500', bg: 'bg-indigo-500/10', desc: 'Goals for this week.' },
  monthly: { title: 'Monthly Horizon', icon: Hash, color: 'text-purple-500', bg: 'bg-purple-500/10', desc: 'Objectives for the month.' },
  yearly: { title: 'Yearly Vision', icon: Compass, color: 'text-emerald-500', bg: 'bg-emerald-500/10', desc: 'The big picture for 2025.' },
};

export default function TimeBasedPage() {
  const { type } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false); 
  
  const config = typeConfig[type as string] || typeConfig.daily;
  const Icon = config.icon;

  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-3 rounded-2xl ${config.bg} ${config.color}`}>
              <Icon size={24} />
            </div>
            <h1 className="text-4xl font-black tracking-tight capitalize">{config.title}</h1>
          </div>
          <p className="text-foreground/40 font-medium ml-1">{config.desc}</p>
        </motion.div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-foreground text-background px-8 py-4 rounded-[2rem] font-bold flex items-center gap-3 hover:scale-105 transition-all shadow-xl active:scale-95"
        >
          <Plus size={20} /> 
          Add {type} item
        </button>
      </header>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="group border-2 border-dashed border-foreground/5 rounded-[3rem] h-80 flex flex-col items-center justify-center text-foreground/20 hover:border-accent/20 hover:bg-accent/[0.01] transition-all cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="p-6 rounded-full bg-foreground/[0.02] mb-4 group-hover:scale-110 transition-transform">
            <Icon size={48} strokeWidth={1} />
        </div>
        <p className="font-bold tracking-tight text-lg">No {type} plans yet.</p>
        <p className="text-sm opacity-50">Click to architect your first one.</p>
      </motion.div>

      <NewPlanModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}