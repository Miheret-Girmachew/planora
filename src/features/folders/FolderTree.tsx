"use client"
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, ChevronRight, Plus } from 'lucide-react';

export default function FolderTree({ folders, parentId = null, onAdd }: any) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const currentFolders = folders.filter((f: any) => f.parentId === parentId);

  return (
    <div className="flex flex-col gap-1 ml-4 border-l border-slate-200">
      {currentFolders.map((folder: any) => (
        <div key={folder.id} className="py-1">
          <div 
            className="flex items-center justify-between group hover:bg-white p-2 rounded-xl transition-all shadow-sm border border-transparent hover:border-purple-100 cursor-pointer"
            onClick={() => toggle(folder.id)}
          >
            <div className="flex items-center gap-3">
              <ChevronRight size={16} className={`transition-transform ${expanded[folder.id] ? 'rotate-90' : ''}`} />
              <Folder size={18} className="text-purple-500" fill={expanded[folder.id] ? "#a855f7" : "none"} />
              <span className="font-semibold text-slate-700">{folder.name}</span>
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); onAdd(folder.id); }}
              className="opacity-0 group-hover:opacity-100 bg-purple-100 text-purple-600 p-1 rounded-md"
            >
              <Plus size={14} />
            </button>
          </div>

          <AnimatePresence>
            {expanded[folder.id] && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                <FolderTree folders={folders} parentId={folder.id} onAdd={onAdd} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}