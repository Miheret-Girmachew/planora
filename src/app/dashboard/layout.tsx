"use client"
import React, { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation'; 
import { Sidebar } from '@/features/dashboard/components/Sidebar';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Bell, Search, ChevronDown, Sparkles, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || "");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (searchTerm) {
        params.set('q', searchTerm);
      } else {
        params.delete('q');
      }
      router.push(`${pathname}?${params.toString()}`);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, pathname, router, searchParams]);

  return (
    <div className="min-h-screen bg-background text-foreground flex transition-colors duration-500 overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 h-screen relative">
        <header className="h-20 border-b border-foreground/5 flex items-center justify-between px-8 bg-background/60 backdrop-blur-xl sticky top-0 z-40 transition-colors">
          
          <div className="flex items-center gap-8">
            <div className="hidden lg:flex items-center gap-2">
               <h2 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30">Workspace</h2>
               <span className="opacity-20">/</span>
               <h2 className="text-sm font-bold tracking-tight">My Plans</h2>
            </div>

            <div className="flex items-center gap-3 bg-foreground/[0.03] dark:bg-foreground/[0.05] border border-foreground/5 px-4 py-2 rounded-2xl group focus-within:ring-2 focus-within:ring-accent/20 transition-all">
              <Search size={18} className={`transition-opacity ${searchTerm ? 'text-accent opacity-100' : 'opacity-20'}`} />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search journey..." 
                className="bg-transparent border-none outline-none text-sm font-medium w-40 md:w-64 placeholder:opacity-20"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm("")} className="opacity-20 hover:opacity-100">
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2.5 hover:bg-foreground/5 rounded-xl transition-all relative group">
              <Bell size={20} className="opacity-50 group-hover:opacity-100" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-accent rounded-full border-2 border-background" />
            </button>
            <ThemeToggle />
            <div className="w-[1px] h-6 bg-foreground/10 mx-2" />
            <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-3 pl-2 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-black tracking-tight mb-1">Traveler</p>
                <div className="flex items-center gap-1 justify-end italic opacity-30 text-[10px] font-bold uppercase">Pro Member</div>
              </div>
              <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-white font-black shadow-lg">JD</div>
              <ChevronDown size={14} className="opacity-30" />
            </motion.div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto relative scroll-smooth p-8 max-w-[1600px] mx-auto min-h-full w-full">
            {children}
        </div>
      </div>
    </div>
  );
}