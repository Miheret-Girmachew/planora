"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { authService } from "@/features/auth/services/authService";
import { getProErrorMessage } from "@/features/auth/utils/authErrors";

import AuthLayout from "@/features/auth/components/AuthLayout";
import AuthInput from "@/features/auth/components/AuthInput";
import { AuthError } from "@/features/auth/components/AuthError";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();

  const handleDiveIn = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);
    if (!email || !password) {
      setError("Please provide both email and password to proceed.");
      return;
    }

    setIsLoading(true);

    try {
      await authService.signIn(email, password);
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Auth Failure:", err.code);
      const professionalMessage = getProErrorMessage(err.code);
      setError(professionalMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Welcome Back" 
      subtitle="The journey continues. Pick up where you left off."
    >
      <form onSubmit={handleDiveIn} className="relative space-y-8">

        <AuthError message={error} clear={() => setError(null)} />

        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <AuthInput
            label="Email Address"
            type="email"
            placeholder="architect@planora.com"
            icon={Mail}
            value={email}
            onChange={setEmail}
            className="
              bg-background dark:bg-[#12142B] 
              text-foreground dark:text-[#F8FAFC] 
              placeholder:text-foreground/50 dark:placeholder:text-[#C4C4C4] 
              border border-foreground/20 dark:border-[#3B3E57] 
              focus:ring-2 focus:ring-accent rounded-2xl transition-all
              shadow-sm dark:shadow-md
            "
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <AuthInput
            label="Password"
            type="password"
            placeholder="••••••••"
            icon={Lock}
            value={password}
            onChange={setPassword}
            className="
              bg-background dark:bg-[#12142B] 
              text-foreground dark:text-[#F8FAFC] 
              placeholder:text-foreground/50 dark:placeholder:text-[#C4C4C4] 
              border border-foreground/20 dark:border-[#3B3E57] 
              focus:ring-2 focus:ring-accent rounded-2xl transition-all
              shadow-sm dark:shadow-md
            "
          />

          <button
            type="button"
            className="
              absolute right-3 top-1/2 -translate-y-1/2 
              text-xs font-bold uppercase text-accent 
              hover:underline transition-opacity hover:opacity-100 opacity-80
            "
          >
            Forgot?
          </button>
        </motion.div>

        <motion.button
          type="submit"
          disabled={isLoading}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="
            w-full bg-foreground text-background py-5 rounded-2xl 
            font-extrabold text-lg shadow-2xl flex items-center justify-center gap-3
            transition-all hover:shadow-accent/30 disabled:opacity-50 disabled:cursor-not-allowed group
          "
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Authenticating...
            </>
          ) : (
            <>
              Dive In
              <LogIn 
                size={20} 
                className="group-hover:translate-x-1 transition-transform duration-300" 
              />
            </>
          )}
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-xs font-bold opacity-60 dark:opacity-70 tracking-wide uppercase pt-4"
        >
          New to Planora?{" "}
          <Link 
            href="/signup" 
            className="text-accent hover:underline font-black transition-colors"
          >
            Join Journey
          </Link>
        </motion.p>
      </form>
    </AuthLayout>
  );
}
