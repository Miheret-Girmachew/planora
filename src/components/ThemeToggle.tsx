"use client"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2.5 rounded-2xl bg-slate-200/50 dark:bg-slate-800/50 hover:scale-110 transition-all active:scale-95 border border-transparent hover:border-accent/20"
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? 
        <Sun className="text-amber-400" size={20} /> : 
        <Moon className="text-slate-700" size={20} />
      }
    </button>
  )
}