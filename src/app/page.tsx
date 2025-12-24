"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Sparkles, Compass } from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      
      {/* Dynamic Background Blurs - Using opacity so they work in both modes */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/10 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-500/10 blur-[120px] rounded-full -z-10" />

      <nav className="flex justify-between items-center p-8 max-w-7xl mx-auto relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-foreground rounded-xl flex items-center justify-center shadow-lg">
            <Layout className="text-background" size={22} />
          </div>
          <span className="text-xl font-bold tracking-tight">Planora</span>
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link href="/login" className="px-4 py-2 text-sm font-bold opacity-60 hover:opacity-100 transition">
            Sign In
          </Link>
          <Link href="/signup" className="bg-foreground text-background px-6 py-2.5 rounded-2xl text-sm font-bold shadow-sm hover:opacity-90 transition active:scale-95">
            Sign Up
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center min-h-[75vh] text-center relative z-10">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-2 bg-foreground/5 border border-foreground/10 px-4 py-1.5 rounded-full mb-8">
          <Sparkles className="text-accent" size={14} />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Welcome to the journey</span>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-7xl md:text-9xl font-black mb-6 tracking-tighter">
            Hello, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-indigo-500 to-purple-600">
              Planora.
            </span>
          </h1>
          <p className="text-xl md:text-2xl opacity-40 max-w-xl mx-auto mb-12 font-medium">
            A beautiful space for your ideas to grow. <br />
            Shall we begin your next exciting chapter?
          </p>
        </motion.div>

        <button className="group bg-foreground text-background px-10 py-5 rounded-[2rem] font-bold text-lg shadow-2xl transition-all flex items-center gap-4 hover:scale-105 active:scale-95 hover:shadow-accent/20">
          Let's Dive In
          <Compass className="group-hover:rotate-45 transition-transform duration-500" size={22} />
        </button>
      </main>
    </div>
  );
}