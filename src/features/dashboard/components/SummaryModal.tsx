"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Map, Download, Share2, Sparkles, Check } from 'lucide-react';
import { exportUtils } from '@/lib/exportUtils';

export function SummaryModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [isShared, setIsShared] = useState(false);

  const roadmapContent = `
  📍 PLANORA ROADMAP SYNTHESIS
  Generated: ${new Date().toLocaleDateString()}
  
  ROOT: 2025 Strategic Vision
  ├── Q1 Focus: Launch Phase (In Progress)
  └── Skill Acquisition: Next.js Mastery (Pending)
  
  ROOT: Startup Launch
  └── Waiting for initialization...
  `;

  const handleDownload = () => {
    exportUtils.downloadAsFile(roadmapContent, "Planora_Roadmap.txt");
  };

  const handleShare = async () => {
    await exportUtils.shareContent("My Planora Roadmap", roadmapContent);
    setIsShared(true);
    setTimeout(() => setIsShared(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-background/60 backdrop-blur-xl" />

          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[3rem] shadow-2xl border border-foreground/5 relative z-10 overflow-hidden flex flex-col"
          >
            <div className="p-8 border-b border-foreground/5 flex justify-between items-center bg-foreground/[0.01]">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-accent/10 text-accent rounded-xl"><Map size={22} /></div>
                <h2 className="text-2xl font-black tracking-tighter">Roadmap Synthesis</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-foreground/5 rounded-full opacity-40 hover:opacity-100"><X size={24} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 bg-slate-50 dark:bg-slate-950/50 min-h-[300px]">
              <pre className="font-mono text-xs leading-relaxed opacity-70 whitespace-pre-wrap">
                {roadmapContent}
              </pre>
            </div>

            <div className="p-8 border-t border-foreground/5 bg-foreground/[0.01] flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleDownload}
                className="flex-1 bg-foreground text-background px-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-95"
              >
                <Download size={18} />
                Download Blueprint
              </button>
              
              <button 
                onClick={handleShare}
                className="flex-1 bg-background border border-foreground/10 px-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-foreground/5 transition-all active:scale-95 text-foreground"
              >
                {isShared ? <Check className="text-emerald-500" size={18} /> : <Share2 size={18} />}
                {isShared ? "Copied!" : "Share Roadmap"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}