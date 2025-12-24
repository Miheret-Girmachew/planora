"use client"
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, X } from 'lucide-react';

export function AuthError({ message, clear }: { message: string | null, clear: () => void }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div 
          initial={{ opacity: 0, height: 0, y: -10 }}
          animate={{ opacity: 1, height: "auto", y: 0 }}
          exit={{ opacity: 0, height: 0, y: -10 }}
          className="w-full bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-start gap-3 mb-6 group relative"
        >
          <AlertCircle className="text-red-500 shrink-0" size={18} />
          <p className="text-[13px] font-bold text-red-600 dark:text-red-400 leading-tight pr-6">
            {message}
          </p>
          <button 
            onClick={clear}
            className="absolute right-3 top-3 text-red-500/40 hover:text-red-500 transition-colors"
          >
            <X size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}