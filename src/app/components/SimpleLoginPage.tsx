import { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, User, Lock } from 'lucide-react';
import { projectId, publicAnonKey } from '/utils/supabase/info';

interface SimpleLoginPageProps {
  onLogin: () => void;
}

export function SimpleLoginPage({ onLogin }: SimpleLoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = isSignup ? 'signup' : 'login';
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-7e89cccd/${endpoint}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'erro ao processar requisição');
        setLoading(false);
        return;
      }

      // Store session token
      localStorage.setItem('sessionToken', data.token);
      localStorage.setItem('username', data.username);
      onLogin();
    } catch (err) {
      console.error('Auth error:', err);
      setError('erro de conexão');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-primary/30 via-background to-accent/30 relative overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary/15 rounded-full blur-3xl" />

      {/* Login Card */}
      <motion.div
        className="relative z-10 w-full max-w-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-card/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-2 border-primary/30">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary mb-6 shadow-lg"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <Heart className="w-10 h-10 text-primary-foreground" fill="currentColor" />
            </motion.div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-sm lowercase">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm mb-2 text-foreground/80 lowercase">usuário</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-2xl bg-input border-2 border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all lowercase"
                  placeholder="seu usuário"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2 text-foreground/80 lowercase">senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-2xl bg-input border-2 border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all lowercase disabled:opacity-50"
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              {loading ? 'carregando...' : (isSignup ? 'criar conta' : 'entrar')}
            </motion.button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground lowercase">
            {isSignup ? 'já tem uma conta?' : 'não tem uma conta?'}{' '}
            <button
              onClick={() => {
                setIsSignup(!isSignup);
                setError('');
              }}
              className="text-primary hover:underline lowercase"
            >
              {isSignup ? 'entrar' : 'criar conta'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
