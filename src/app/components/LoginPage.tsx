import { useState } from 'react';
import { motion } from 'motion/react';
import { GlassButton } from './GlassButton';
import { Lock, Mail, Sparkles } from 'lucide-react';
import { supabase } from '../utils/supabase/client';

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 🔥 LOGIN REAL
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      onLogin();
    }
  };

  // 🔥 CRIAR CONTA
  const handleRegister = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert('Conta criada! Agora faz login 💕');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#ff006e] rounded-full blur-[150px] opacity-30 animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#8338ec] rounded-full blur-[150px] opacity-30 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#fb5607] rounded-full blur-[150px] opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Card */}
      <motion.div className="relative z-10 w-full max-w-md mx-4">
        <div className="rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/20 p-8">
          
          {/* Título */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ff006e] to-[#fb5607] mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl mb-2">Discord Stats Tracker 💕</h1>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            <div>
              <label>Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div>
              <label>Senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <GlassButton type="submit" variant="primary" className="w-full">
              Entrar
            </GlassButton>
          </form>

          {/* REGISTRO */}
          <div className="mt-6 text-center text-sm">
            Não tem uma conta?{' '}
            <button
              onClick={handleRegister}
              className="text-[#ff006e]"
            >
              Criar conta
            </button>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
