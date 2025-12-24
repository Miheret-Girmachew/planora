"use client"
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import AuthLayout from '@/features/auth/components/AuthLayout';
import AuthInput from '@/features/auth/components/AuthInput';
import { authService } from '@/features/auth/services/authService';
import { seedSamplesAction } from '@/features/dashboard/actions';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !name) return;

    setLoading(true);
    try {
      const userCredential = await authService.signUp(email, password);
      const user = userCredential.user;
      
     
      await seedSamplesAction(user.uid); 
      
      router.push('/dashboard');
    } catch (err: any) {
      console.error(err);
      alert(err.message || "An error occurred during signup.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Join Planora" 
      subtitle="The journey begins with a single step."
    >
      <form onSubmit={handleSignup} className="space-y-6">
        
        <motion.div 
          initial={{ opacity: 0, x: -10 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ delay: 0.1 }}
        >
          <AuthInput 
            label="Full Name" 
            type="text" 
            placeholder="John Doe" 
            icon={User} 
            value={name} 
            onChange={setName} 
          />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: -10 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ delay: 0.2 }}
        >
          <AuthInput 
            label="Email Address" 
            type="email" 
            placeholder="hello@planora.com" 
            icon={Mail} 
            value={email} 
            onChange={setEmail} 
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: -10 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ delay: 0.3 }}
        >
          <AuthInput 
            label="Password" 
            type="password" 
            placeholder="Create a strong password" 
            icon={Lock} 
            value={password} 
            onChange={setPassword} 
          />
        </motion.div>

        <motion.button 
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-foreground text-background py-5 rounded-2xl font-black text-lg shadow-xl hover:opacity-90 transition-all flex items-center justify-center gap-3 group disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Initializing Journey...
            </>
          ) : (
            <>
              Explore Now
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </motion.button>

        <p className="text-center text-xs font-bold opacity-30 tracking-wide uppercase">
          Already a traveler? <Link href="/login" className="text-accent hover:underline">Sign In</Link>
        </p>
      </form>
    </AuthLayout>
  );
}