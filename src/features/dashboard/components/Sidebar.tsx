"use client"
import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Layout, 
  Calendar, 
  Hash, 
  Layers, 
  Settings, 
  LogOut, 
  Compass,
  ChevronRight
} from 'lucide-react';
import { authService } from '@/features/auth/services/authService';

const menuItems = [
  { icon: Layers, label: 'All Plans', href: '/dashboard' },
  { icon: Calendar, label: 'Daily', href: '/dashboard/daily' },
  { icon: Hash, label: 'Weekly', href: '/dashboard/weekly' },
  { icon: Compass, label: 'Yearly', href: '/dashboard/yearly' },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authService.logout();
      router.push('/');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <aside className="w-72 border-r border-foreground/5 bg-foreground/[0.01] flex flex-col p-6 gap-8 h-screen sticky top-0 transition-colors duration-500">
      
      <Link href="/dashboard" className="flex items-center gap-3 px-2 group cursor-pointer">
        <div className="w-9 h-9 bg-foreground rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
          <Layout className="text-background" size={20} />
        </div>
        <span className="text-xl font-black tracking-tighter">Planora</span>
      </Link>

      <nav className="flex-1 space-y-1.5">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 mb-4 ml-2">Navigation</p>
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.label} 
              href={item.href}
              className={`flex items-center justify-between px-4 py-3.5 rounded-2xl font-bold text-sm transition-all relative group ${
                isActive 
                ? 'bg-foreground text-background shadow-xl shadow-foreground/10' 
                : 'opacity-50 hover:opacity-100 hover:bg-foreground/5'
              }`}
            >
              <div className="flex items-center gap-3 relative z-10">
                <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                {item.label}
              </div>
              
              {isActive && (
                <motion.div 
                  layoutId="activeSide"
                  className="absolute inset-0 bg-foreground rounded-2xl -z-0"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              
              {!isActive && (
                <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-6">
        <div className="p-5 bg-accent/5 dark:bg-accent/10 rounded-[2rem] border border-accent/10 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-accent/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
          
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent mb-3">Overall Progress</p>
          <div className="flex items-end justify-between mb-2">
             <span className="text-2xl font-black tracking-tighter">68%</span>
             <span className="text-[10px] font-bold opacity-40 mb-1">12/18 Folders</span>
          </div>
          <div className="h-1.5 w-full bg-foreground/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "68%" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full bg-accent rounded-full" 
            />
          </div>
        </div>

        <div className="space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 opacity-40 hover:opacity-100 transition-opacity font-bold text-sm">
            <Settings size={18} /> Settings
          </button>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-500/60 hover:text-red-500 transition-all font-bold text-sm group"
          >
            <div className="p-1.5 rounded-lg bg-red-500/5 group-hover:bg-red-500/10 transition-colors">
              <LogOut size={16} />
            </div>
            Sign Out
          </button>
        </div>
      </div>
    </aside>
  );
}