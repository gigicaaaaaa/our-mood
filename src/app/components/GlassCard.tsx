import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
}

export function GlassCard({ children, className = '', hoverable = true }: GlassCardProps) {
  return (
    <motion.div
      className={`relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={hoverable ? {
        y: -5,
        boxShadow: "0 20px 60px rgba(255, 0, 110, 0.2)"
      } : undefined}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#ff006e] rounded-full blur-[100px] opacity-20 pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#8338ec] rounded-full blur-[100px] opacity-20 pointer-events-none" />
      <div className="relative z-10 p-6">
        {children}
      </div>
    </motion.div>
  );
}
