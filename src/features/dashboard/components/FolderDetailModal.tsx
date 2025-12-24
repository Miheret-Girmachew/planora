"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bold, Italic, Underline, Heading1, Heading2, List, ListOrdered, Smile, Save } from 'lucide-react';

export function FolderDetailModal({ folder, isOpen, onClose }: any) {
  const [content, setContent] = useState("");

  if (!folder) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-background/80 backdrop-blur-xl" />
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white dark:bg-slate-900 w-full max-w-4xl h-full rounded-[3rem] shadow-2xl border border-foreground/5 relative z-10 overflow-hidden flex flex-col"
          >
            {/* Toolbar Header */}
            <div className="p-6 border-b border-foreground/5 bg-foreground/[0.01] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-foreground/5 rounded-lg transition-colors"><Heading1 size={18}/></button>
                <button className="p-2 hover:bg-foreground/5 rounded-lg transition-colors"><Heading2 size={18}/></button>
                <div className="w-[1px] h-6 bg-foreground/10 mx-1" />
                <button className="p-2 hover:bg-foreground/5 rounded-lg transition-colors"><Bold size={18}/></button>
                <button className="p-2 hover:bg-foreground/5 rounded-lg transition-colors"><Underline size={18}/></button>
                <div className="w-[1px] h-6 bg-foreground/10 mx-1" />
                <button className="p-2 hover:bg-foreground/5 rounded-lg transition-colors"><List size={18}/></button>
                <button className="p-2 hover:bg-foreground/5 rounded-lg transition-colors"><ListOrdered size={18}/></button>
                <button className="p-2 hover:bg-foreground/5 rounded-lg transition-colors"><Smile size={18}/></button>
              </div>
              
              <div className="flex items-center gap-3">
                 <button className="flex items-center gap-2 bg-emerald-500 text-white px-5 py-2 rounded-xl text-sm font-bold shadow-lg shadow-emerald-500/20 hover:scale-105 transition-transform">
                   <Save size={16} /> Save Changes
                 </button>
                 <button onClick={onClose} className="p-2 hover:bg-foreground/5 rounded-full"><X size={20}/></button>
              </div>
            </div>

            {/* Editing Area */}
            <div className="flex-1 p-10 overflow-y-auto bg-slate-50/50 dark:bg-slate-950/20">
              <div className="max-w-2xl mx-auto space-y-6">
                <h1 className="text-4xl font-black tracking-tighter text-foreground">{folder.name}</h1>
                <textarea 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Start architecting your journey... (Use formatting tools above)"
                  className="w-full h-full min-h-[500px] bg-transparent outline-none text-lg leading-relaxed placeholder:opacity-20 font-medium resize-none"
                />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}