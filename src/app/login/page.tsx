"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { Mail, Lock, LogIn, Loader2 } from 'lucide-react';
import AuthLayout from '@/features/auth/components/AuthLayout';
import AuthInput from '@/features/auth/components/AuthInput';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); 
  const router = useRouter(); 

  const handleDiveIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    
    setTimeout(() => {
      router.push('/dashboard');
    }, 800);
  };

  return (
    <AuthLayout title="Welcome Back">
      <form onSubmit={handleDiveIn} className="space-y-6">
        <AuthInput 
          label="Email" 
          type="email" 
          placeholder="your@email.com" 
          icon={Mail} 
          value={email} 
          onChange={setEmail} 
        />
        
        <div className="relative">
          <AuthInput 
            label="Password" 
            type="password" 
            placeholder="••••••••" 
            icon={Lock} 
            value={password} 
            onChange={setPassword} 
          />
          <button 
            type="button"
            className="absolute right-0 top-0 text-[10px] font-black uppercase text-accent hover:underline tracking-tighter"
          >
            Forgot?
          </button>
        </div>

        <button 
          type="submit"
          disabled={isLoading}
          className="w-full bg-foreground text-background py-5 rounded-2xl font-black text-lg shadow-xl hover:opacity-90 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Opening Journey...
            </>
          ) : (
            <>
              Dive In
              <LogIn size={20} />
            </>
          )}
        </button>

        <p className="text-center text-xs font-bold opacity-30 tracking-wide uppercase">
          New to Planora? <Link href="/signup" className="text-accent hover:underline">Join Journey</Link>
        </p>
      </form>
    </AuthLayout>
  );
}