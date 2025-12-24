"use client"
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Edit3, Share, MoreVertical } from 'lucide-react';

export function FolderMenu({ isOpen, onClose, onDelete }: any) {
  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -10 }}
      className="absolute right-0 top-12 w-48 bg-white dark:bg-slate-800 border border-foreground/5 shadow-2xl rounded-2xl z-50 overflow-hidden"
    >
      <div className="p-2 space-y-1">
        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-bold hover:bg-foreground/5 rounded-xl transition-colors text-foreground/60">
          <Edit3 size={16} /> Rename
        </button>
    
        <div className="h-[1px] bg-foreground/5 mx-2" />
        <button 
          onClick={onDelete}
          className="w-full flex items-center gap-3 px-3 py-2 text-sm font-bold hover:bg-red-500/10 text-red-500 rounded-xl transition-colors"
        >
          <Trash2 size={16} /> Delete Plan
        </button>
      </div>
    </motion.div>
  );
}