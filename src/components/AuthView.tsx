import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { motion } from 'motion/react';
import { ArrowRight, Mail, Lock, User, Loader2 } from 'lucide-react';

export default function AuthView() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        });
        if (error) throw error;
        alert('Check your email for the confirmation link!');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6 bg-[radial-gradient(circle_at_top_right,_var(--tw-colors-primary)_0%,_transparent_20%),radial-gradient(circle_at_bottom_left,_var(--tw-colors-tertiary)_0%,_transparent_20%)]">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-primary mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L4 7V17L12 22L20 17V7L12 2Z" fill="currentColor" fillOpacity="0.2" />
              <circle cx="12" cy="12" r="3" fill="currentColor" />
              <path d="M12 2V9M12 22V15M4 7L10 10.5M20 17L14 13.5M20 7L14 10.5M4 17L10 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <h1 className="text-4xl font-serif italic tracking-tighter leading-none">HobbyHub</h1>
          </div>
          <p className="text-[10px] uppercase font-bold text-tertiary tracking-[0.4em] mb-8">Registry & Access Control</p>
          <h2 className="text-3xl font-serif italic tracking-tight text-on-surface">
            {isLogin ? 'Welcome back, Operator' : 'Establish New Identity'}
          </h2>
        </div>

        <motion.div 
          layout
          className="bg-white border border-primary p-12 shadow-[20px_20px_0px_rgba(0,0,0,0.05)]"
        >
          <form onSubmit={handleAuth} className="space-y-8">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40 block">Full Identity</label>
                <div className="flex items-center border-b border-primary/20 focus-within:border-primary transition-colors pb-1">
                  <User size={16} className="text-primary/40 mr-3" />
                  <input 
                    type="text" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your name"
                    className="bg-transparent border-none focus:ring-0 text-sm w-full font-serif italic"
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40 block">Email Address</label>
              <div className="flex items-center border-b border-primary/20 focus-within:border-primary transition-colors pb-1">
                <Mail size={16} className="text-primary/40 mr-3" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="operator@hobbyhub.com"
                  className="bg-transparent border-none focus:ring-0 text-sm w-full font-serif italic"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40 block">Passcode</label>
              <div className="flex items-center border-b border-primary/20 focus-within:border-primary transition-colors pb-1">
                <Lock size={16} className="text-primary/40 mr-3" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-transparent border-none focus:ring-0 text-sm w-full font-serif italic"
                  required
                />
              </div>
            </div>

            {error && (
              <p className="text-[10px] font-bold uppercase text-tertiary tracking-widest bg-tertiary/5 p-4 border border-tertiary/20">
                Error: {error}
              </p>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-on-primary py-5 text-[10px] uppercase font-bold tracking-[0.4em] flex items-center justify-center gap-4 hover:opacity-90 transition-all disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={16} /> : (
                <>
                  {isLogin ? 'Authorize Access' : 'Initiate Registry'}
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-primary/10 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60 hover:text-primary transition-colors"
            >
              {isLogin ? "Don't have an account? Create one" : "Already registered? Log in instead"}
            </button>
          </div>
        </motion.div>

        <div className="mt-12 text-center text-[10px] uppercase font-bold tracking-widest text-primary/20">
          Curating Excellence Since 2024 • HobbyHub Systems
        </div>
      </div>
    </div>
  );
}
