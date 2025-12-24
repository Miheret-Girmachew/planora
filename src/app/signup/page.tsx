"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, ArrowRight, Loader2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import AuthLayout from "@/features/auth/components/AuthLayout";
import AuthInput from "@/features/auth/components/AuthInput";
import { authService } from "@/features/auth/services/authService";
import { seedSamplesAction } from "@/features/dashboard/actions";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !name) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await authService.signUp(email, password, name);
      const user = userCredential.user;
      await seedSamplesAction(user.uid);
      router.push("/dashboard");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred during signup.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Join Planora"
      subtitle="The journey begins with a single step."
    >
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="relative bg-red-600 dark:bg-red-700 text-white px-4 py-3 rounded-xl shadow-lg mb-6 flex items-center justify-between"
          >
            <span className="text-sm font-medium">{error}</span>
            <button
              onClick={() => setError(null)}
              className="p-1 rounded-full hover:bg-white/20 transition"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSignup} className="space-y-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
          <AuthInput
            label="Full Name"
            type="text"
            placeholder="John Doe"
            icon={User}
            value={name}
            onChange={setName}
            className="bg-background/80 dark:bg-[#12142B] text-foreground dark:text-[#F8FAFC] placeholder:text-foreground/50 dark:placeholder:text-[#C4C4C4] border border-foreground/20 dark:border-[#3B3E57] focus:ring-2 focus:ring-accent rounded-2xl transition-all shadow-sm dark:shadow-md"
          />
        </motion.div>

        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <AuthInput
            label="Email Address"
            type="email"
            placeholder="hello@planora.com"
            icon={Mail}
            value={email}
            onChange={setEmail}
            className="bg-background/80 dark:bg-[#12142B] text-foreground dark:text-[#F8FAFC] placeholder:text-foreground/50 dark:placeholder:text-[#C4C4C4] border border-foreground/20 dark:border-[#3B3E57] focus:ring-2 focus:ring-accent rounded-2xl transition-all shadow-sm dark:shadow-md"
          />
        </motion.div>

        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="relative">
          <AuthInput
            label="Password"
            type="password"
            placeholder="Create a strong password"
            icon={Lock}
            value={password}
            onChange={setPassword}
            className="bg-background/80 dark:bg-[#12142B] text-foreground dark:text-[#F8FAFC] placeholder:text-foreground/50 dark:placeholder:text-[#C4C4C4] border border-foreground/20 dark:border-[#3B3E57] focus:ring-2 focus:ring-accent rounded-2xl transition-all shadow-sm dark:shadow-md"
          />
          <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold uppercase text-accent hover:underline tracking-tight">
            Forgot?
          </button>
        </motion.div>

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full bg-foreground text-background py-5 rounded-2xl font-extrabold text-lg shadow-2xl flex items-center justify-center gap-3 transition-all group hover:shadow-accent/25 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Architecting Account...
            </>
          ) : (
            <>
              Explore Now
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
            </>
          )}
        </motion.button>

        <p className="text-center text-xs font-bold opacity-40 tracking-wide uppercase">
          Already a traveler?{" "}
          <Link href="/login" className="text-accent hover:underline font-black">
            Sign In
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
