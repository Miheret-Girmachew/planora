"use client"
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bold, Underline, Heading1, Heading2, Save, Loader2, Sparkles, Italic } from 'lucide-react';
import { updateFolderContentAction } from '@/features/dashboard/actions';

export function FolderDetailModal({ folder, isOpen, onClose }: any) {
  const [isSaving, setIsSaving] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  
  const contentRef = useRef(folder?.content || "");

  useEffect(() => {
    if (isOpen && editorRef.current) {
      editorRef.current.innerHTML = folder?.content || "";
      contentRef.current = folder?.content || "";
      
      setTimeout(() => editorRef.current?.focus(), 100);
    }
  }, [isOpen, folder]);

  const applyStyle = (command: string, value: string = "") => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const handleSave = async () => {
    if (!folder?.id || !editorRef.current) return;
    
    setIsSaving(true);
    const currentHtml = editorRef.current.innerHTML;
    
    const result = await updateFolderContentAction(folder.id, currentHtml);
    
    if (result.success) {
      setIsSaving(false);
      onClose();
    } else {
      alert("Failed to save. Check your connection.");
      setIsSaving(false);
    }
  };

  if (!folder) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
            onClick={onClose} 
            className="absolute inset-0 bg-background/80 backdrop-blur-xl" 
          />
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }} 
            animate={{ scale: 1, opacity: 1, y: 0 }} 
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white dark:bg-slate-900 w-full max-w-4xl h-full rounded-[3rem] shadow-2xl border border-foreground/5 relative z-10 overflow-hidden flex flex-col"
          >
            <div className="p-6 border-b border-foreground/5 bg-foreground/[0.01] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-1">
                <button onClick={() => applyStyle('formatBlock', 'h1')} className="p-2.5 hover:bg-foreground/5 rounded-xl transition-colors"><Heading1 size={18}/></button>
                <button onClick={() => applyStyle('formatBlock', 'h2')} className="p-2.5 hover:bg-foreground/5 rounded-xl transition-colors"><Heading2 size={18}/></button>
                <div className="w-[1px] h-6 bg-foreground/10 mx-2" />
                <button onClick={() => applyStyle('bold')} className="p-2.5 hover:bg-foreground/5 rounded-xl transition-colors"><Bold size={18}/></button>
                <button onClick={() => applyStyle('italic')} className="p-2.5 hover:bg-foreground/5 rounded-xl transition-colors"><Italic size={18}/></button>
                <button onClick={() => applyStyle('underline')} className="p-2.5 hover:bg-foreground/5 rounded-xl transition-colors"><Underline size={18}/></button>
              </div>
              
              <div className="flex items-center gap-3">
                 <button 
                   onClick={handleSave}
                   disabled={isSaving}
                   className="flex items-center gap-2 bg-emerald-500 text-white px-6 py-2.5 rounded-2xl text-sm font-bold shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                 >
                   {isSaving ? <Loader2 className="animate-spin" size={18}/> : <Save size={18} />}
                   {isSaving ? "Saving..." : "Save Changes"}
                 </button>
                 <button onClick={onClose} className="p-2 hover:bg-foreground/5 rounded-full opacity-40 hover:opacity-100 transition-opacity"><X size={24}/></button>
              </div>
            </div>

            <div className="flex-1 p-12 overflow-y-auto bg-slate-50/30 dark:bg-slate-950/20">
              <div className="max-w-2xl mx-auto space-y-8">
                <div className="flex items-center gap-3 opacity-30">
                   <Sparkles size={16} />
                   <span className="text-[10px] font-black uppercase tracking-[0.3em]">Architectural Draft</span>
                </div>

                <h1 className="text-5xl font-black tracking-tighter text-foreground">
                  {folder.name}
                </h1>

                <div 
                  ref={editorRef}
                  contentEditable
                  suppressContentEditableWarning={true} 
                  className="w-full h-full min-h-[500px] outline-none text-xl leading-relaxed text-foreground/80 font-medium selection:bg-accent/20 cursor-text"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      document.execCommand('formatBlock', false, 'p');
                    }
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}