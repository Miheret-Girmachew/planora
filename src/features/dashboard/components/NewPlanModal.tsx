"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Loader2 } from 'lucide-react';

export function NewPlanModal({ isOpen, onClose, onAdd }: any) {
  const [name, setName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsCreating(true);
    
    setTimeout(() => {
      onAdd(name); 
      setName(''); 
      setIsCreating(false);
      onClose();
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-background/60 backdrop-blur-xl" />
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-[2.5rem] shadow-2xl border border-foreground/5 relative z-10 overflow-hidden"
          >
            <form onSubmit={handleSubmit}>
              <div className="p-8 border-b border-foreground/5 flex justify-between items-center">
                <h2 className="text-xl font-black tracking-tighter">New Journey Root</h2>
                <button type="button" onClick={onClose} className="p-2 hover:bg-foreground/5 rounded-xl"><X size={20}/></button>
              </div>
              
              <div className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Plan Name (Mandatory)</label>
                  <input 
                    autoFocus 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Learning Next.js" 
                    className="w-full bg-foreground/[0.03] border border-foreground/10 p-5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all font-bold" 
                  />
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Visual Theme</label>
                   <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-500 border-4 border-white dark:border-slate-800 shadow-lg cursor-pointer" />
                      <div className="w-8 h-8 rounded-full bg-purple-500 opacity-40 cursor-pointer" />
                      <div className="w-8 h-8 rounded-full bg-emerald-500 opacity-40 cursor-pointer" />
                   </div>
                </div>

                <button 
                  disabled={isCreating}
                  className="w-full bg-foreground text-background py-5 rounded-2xl font-bold flex items-center justify-center gap-2 group disabled:opacity-50 transition-all active:scale-[0.98]"
                >
                  {isCreating ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <>
                      <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
                      Initialize Journey
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}