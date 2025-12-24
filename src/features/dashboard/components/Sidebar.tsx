"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Layout, Calendar, Hash, Layers, Settings, LogOut, Compass, ChevronRight, CalendarRange, Loader2 
} from 'lucide-react';

import { authService } from '@/features/auth/services/authService';

const menuItems = [
  { icon: Layers, label: 'All Plans', href: '/dashboard' },
  { icon: Calendar, label: 'Daily', href: '/dashboard/daily' },
  { icon: Hash, label: 'Weekly', href: '/dashboard/weekly' },
  { icon: CalendarRange, label: 'Monthly', href: '/dashboard/monthly' },
  { icon: Compass, label: 'Yearly', href: '/dashboard/yearly' },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    const confirmed = confirm("Are you sure you want to exit your workspace?");
    if (!confirmed) return;

    setIsLoggingOut(true);
    const result = await authService.logout();
    
    if (result.success) {
      router.push('/');
    } else {
      alert("Failed to sign out. Please try again.");
      setIsLoggingOut(false);
    }
  };

  return (
    <aside className="w-72 border-r border-foreground/5 bg-foreground/[0.01] flex flex-col p-6 gap-8 h-screen sticky top-0 transition-colors duration-500">
      
      <Link href="/dashboard" className="flex items-center gap-3 px-2 group cursor-pointer text-foreground">
        <div className="w-9 h-9 bg-foreground rounded-xl flex items-center justify-center shadow-lg">
          <Layout className="text-background" size={20} />
        </div>
        <span className="text-xl font-black tracking-tighter">Planora</span>
      </Link>

      <nav className="flex-1 space-y-1.5">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 mb-4 ml-2">Time Horizons</p>
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.label} 
              href={item.href}
              className={`flex items-center justify-between px-4 py-3.5 rounded-2xl font-bold text-sm transition-all group ${
                isActive 
                ? 'bg-foreground text-background shadow-xl shadow-foreground/10' 
                : 'opacity-50 hover:opacity-100 hover:bg-foreground/5 text-foreground'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={18} />
                {item.label}
              </div>
              {!isActive && <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" />}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-foreground/5 pt-6 space-y-1">
        <Link 
          href="/dashboard/settings"
          className="w-full flex items-center gap-3 px-4 py-3 opacity-40 hover:opacity-100 transition-opacity font-bold text-sm text-foreground"
        >
          <Settings size={18} /> Settings
        </Link>
        
        <button 
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-500/60 hover:text-red-500 transition-all font-bold text-sm group disabled:opacity-30"
        >
          {isLoggingOut ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
          )}
          {isLoggingOut ? "Closing Workspace..." : "Sign Out"}
        </button>
      </div>
    </aside>
  );
}