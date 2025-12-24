"use client";
import React from "react";
import { motion } from "framer-motion";
import { Layout, Sparkles, Compass } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useRouter } from "next/navigation"; 

export default function LandingPage() {
  const router = useRouter(); 

  const handleDiveIn = () => {
    router.push("/login"); 
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden relative">
      <div className="absolute top-[-15%] right-[-15%] w-[60%] h-[60%] bg-accent/20 blur-[160px] rounded-full -z-10" />
      <div className="absolute bottom-[-15%] left-[-15%] w-[60%] h-[60%] bg-purple-500/15 blur-[160px] rounded-full -z-10" />

      <nav className="flex justify-between items-center p-8 max-w-7xl mx-auto relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-foreground rounded-xl flex items-center justify-center shadow-lg">
            <Layout className="text-background" size={24} />
          </div>
          <span className="text-2xl md:text-3xl font-extrabold tracking-tight">Planora</span>
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-bold opacity-70 hover:opacity-100 transition"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="bg-foreground text-background px-6 py-3 rounded-2xl text-sm font-bold shadow-lg hover:opacity-90 transition active:scale-95"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center min-h-[75vh] text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-2 bg-foreground/5 border border-foreground/10 px-5 py-2 rounded-full mb-8 shadow-sm"
        >
          <Sparkles className="text-accent" size={16} />
          <span className="text-xs md:text-sm font-black uppercase tracking-widest opacity-70">
            Welcome to the journey
          </span>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-6xl md:text-8xl font-extrabold mb-6 tracking-tight leading-tight">
            Hello, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-indigo-500 to-purple-600">
              Planora.
            </span>
          </h1>
          <p className="text-lg md:text-xl opacity-60 max-w-xl mx-auto mb-12 font-medium leading-relaxed">
            A beautiful space for your ideas to grow. <br />
            Shall we begin your next exciting chapter?
          </p>
        </motion.div>

        <button
          onClick={handleDiveIn} 
          className="group bg-foreground text-background px-12 py-5 rounded-[2.5rem] font-bold text-lg shadow-2xl flex items-center gap-4 transition-all hover:scale-105 active:scale-95 hover:shadow-accent/25"
        >
          Let's Dive In
          <Compass className="group-hover:rotate-45 transition-transform duration-500" size={24} />
        </button>
      </main>
    </div>
  );
}
