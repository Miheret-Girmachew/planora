"use client"
import { User, Bell, Shield, Palette } from 'lucide-react';

const sections = [
  { icon: User, label: 'Profile', desc: 'Manage your personal information' },
  { icon: Palette, label: 'Appearance', desc: 'Customize your theme and colors' },
  { icon: Bell, label: 'Notifications', desc: 'Configure your alerts' },
  { icon: Shield, label: 'Security', desc: 'Update your password and safety' },
];

export default function SettingsPage() {
  return (
    <div className="max-w-3xl space-y-10">
      <header>
        <h1 className="text-4xl font-black tracking-tight mb-2">Settings</h1>
        <p className="text-foreground/40 font-medium">Fine-tune your Planora experience.</p>
      </header>

      <div className="grid gap-4">
        {sections.map((s) => (
          <div key={s.label} className="group flex items-center justify-between p-6 bg-foreground/[0.02] border border-foreground/5 rounded-[2rem] hover:bg-white dark:hover:bg-slate-900 transition-all cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-foreground/5 rounded-xl group-hover:bg-accent group-hover:text-white transition-colors">
                <s.icon size={20} />
              </div>
              <div>
                <h3 className="font-bold">{s.label}</h3>
                <p className="text-xs opacity-40">{s.desc}</p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full border border-foreground/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              →
            </div>
          </div>
        ))}
      </div>

      <div className="pt-10 border-t border-foreground/5">
        <button className="text-red-500 font-bold text-sm hover:underline">Delete Account</button>
      </div>
    </div>
  );
}