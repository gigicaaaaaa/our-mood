import { useState } from 'react';
import { motion } from 'motion/react';
import { GlassButton } from './GlassButton';
import { Lock, Mail, Sparkles } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#ff006e] rounded-full blur-[150px] opacity-30 animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#8338ec] rounded-full blur-[150px] opacity-30 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#fb5607] rounded-full blur-[150px] opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Login Card */}
      <motion.div
        className="relative z-10 w-full max-w-md mx-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="relative rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/20 overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.3)]">
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#ff006e]/10 via-transparent to-[#8338ec]/10" />

          <div className="relative z-10 p-8">
            {/* Logo/Title */}
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ff006e] to-[#fb5607] mb-4 shadow-[0_0_30px_rgba(255,0,110,0.4)]">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h1 style={{ fontFamily: 'var(--font-display)' }} className="text-3xl mb-2">Discord Stats Tracker 💕</h1>
              <p className="text-white/60">Entre para visualizar suas estatísticas</p>
            </motion.div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-sm mb-2 text-white/80">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#ff006e] focus:bg-white/10 transition-all"
                    placeholder="seu@email.com"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-sm mb-2 text-white/80">Senha</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#ff006e] focus:bg-white/10 transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </motion.div>

              <motion.div
                className="flex items-center justify-between text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="mr-2 rounded" />
                  <span className="text-white/60">Lembrar-me</span>
                </label>
                <a href="#" className="text-[#ff006e] hover:text-[#fb5607] transition-colors">
                  Esqueceu a senha?
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <GlassButton type="submit" variant="primary" className="w-full">
                  Entrar
                </GlassButton>
              </motion.div>
            </form>

            <motion.div
              className="mt-6 text-center text-sm text-white/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Não tem uma conta?{' '}
              <a href="#" className="text-[#ff006e] hover:text-[#fb5607] transition-colors">
                Criar conta
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
