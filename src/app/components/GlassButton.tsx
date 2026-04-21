import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface GlassButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  type?: 'button' | 'submit';
}

export function GlassButton({
  children,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button'
}: GlassButtonProps) {
  const baseStyles = "relative px-8 py-3 rounded-2xl overflow-hidden backdrop-blur-xl transition-all duration-300";

  const variants = {
    primary: "bg-gradient-to-r from-[#ff006e] to-[#fb5607] text-white shadow-[0_0_30px_rgba(255,0,110,0.3)] hover:shadow-[0_0_40px_rgba(255,0,110,0.5)]",
    secondary: "bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:border-white/30",
    ghost: "bg-transparent text-white/80 hover:text-white hover:bg-white/5"
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="relative z-10">{children}</span>
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#8338ec] to-[#3a86ff] opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.button>
  );
}
