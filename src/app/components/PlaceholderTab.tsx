import { motion } from 'motion/react';
import { GlassCard } from './GlassCard';
import { LucideIcon } from 'lucide-react';

interface PlaceholderTabProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export function PlaceholderTab({ title, description, icon: Icon }: PlaceholderTabProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 style={{ fontFamily: 'var(--font-display)' }} className="text-4xl mb-2">
          {title}
        </h1>
        <p className="text-white/60">{description}</p>
      </div>

      <GlassCard>
        <div className="flex flex-col items-center justify-center py-16">
          <motion.div
            className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#ff006e] to-[#fb5607] flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(255,0,110,0.4)]"
            animate={{
              boxShadow: [
                '0 0 40px rgba(255,0,110,0.4)',
                '0 0 60px rgba(255,0,110,0.6)',
                '0 0 40px rgba(255,0,110,0.4)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Icon className="w-12 h-12 text-white" />
          </motion.div>
          <h3 className="text-2xl mb-3" style={{ fontFamily: 'var(--font-display)' }}>
            Seção Customizável
          </h3>
          <p className="text-white/60 text-center max-w-md">
            Esta seção pode ser totalmente customizada com os componentes e funcionalidades que você precisar.
          </p>
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <GlassCard key={i}>
            <div className="h-32 flex items-center justify-center">
              <span className="text-white/40">Card Customizável {i}</span>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
