"use client"
import { motion } from 'framer-motion';
import { Layout, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function AuthLayout({ children, title, subtitle }: any) {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6 relative overflow-hidden transition-colors duration-500">
      <div className="absolute top-8 left-8 right-8 flex justify-between items-center z-20">
        <Link href="/" className="flex items-center gap-2 text-sm font-bold opacity-50 hover:opacity-100 hover:-translate-x-1 transition-all">
          <ArrowLeft size={18} /> Back
        </Link>
        <ThemeToggle />
      </div>

      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/10 blur-[100px] rounded-full -z-10" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[420px]"
      >
        <div className="text-center mb-10">
          <div className="inline-flex w-14 h-14 bg-foreground rounded-2xl items-center justify-center shadow-2xl mb-6">
            <Layout className="text-background" size={28} />
          </div>
          <h1 className="text-4xl font-black tracking-tighter mb-2">{title}</h1>
          <p className="text-foreground/40 font-medium">{subtitle}</p>
        </div>

        <div className="bg-white/50 dark:bg-slate-900/40 backdrop-blur-2xl border border-foreground/5 p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200/20 dark:shadow-none relative">
          {children}
        </div>
      </motion.div>
    </div>
  );
}