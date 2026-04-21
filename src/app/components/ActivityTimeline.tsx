import { motion } from 'motion/react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Clock, Gamepad2, Music, Code, Youtube } from 'lucide-react';

interface Activity {
  date: string;
  type: string;
  name: string;
  duration: number;
}

interface ActivityTimelineProps {
  activities: Activity[];
}

const getActivityIcon = (name: string) => {
  if (name.toLowerCase().includes('spotify') || name.toLowerCase().includes('música')) {
    return Music;
  }
  if (name.toLowerCase().includes('code') || name.toLowerCase().includes('visual studio')) {
    return Code;
  }
  if (name.toLowerCase().includes('youtube')) {
    return Youtube;
  }
  return Gamepad2;
};

const getActivityColor = (index: number) => {
  const colors = ['#ff006e', '#fb5607', '#8338ec', '#3a86ff', '#06ffa5'];
  return colors[index % colors.length];
};

export function ActivityTimeline({ activities }: ActivityTimelineProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl mb-4 flex items-center gap-2" style={{ fontFamily: 'var(--font-display)' }}>
        <Clock className="w-5 h-5 text-[#ff006e]" />
        Timeline de Atividades
      </h3>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#ff006e] via-[#8338ec] to-[#3a86ff] opacity-30" />

        {/* Activities */}
        <div className="space-y-4">
          {activities.map((activity, index) => {
            const Icon = getActivityIcon(activity.name);
            const color = getActivityColor(index);
            const date = new Date(activity.date);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="relative flex items-start gap-4 pl-0"
              >
                {/* Timeline Dot */}
                <div className="relative z-10 flex-shrink-0">
                  <motion.div
                    className="w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-xl border border-white/20"
                    style={{
                      background: `linear-gradient(135deg, ${color}40, ${color}20)`,
                      boxShadow: `0 0 20px ${color}30`
                    }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <Icon className="w-5 h-5" style={{ color }} />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h4 className="text-white">{activity.name}</h4>
                    <span className="text-white/50 text-sm whitespace-nowrap">
                      {format(date, "HH:mm", { locale: ptBR })}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-white/60">
                    <span>{format(date, "dd 'de' MMMM", { locale: ptBR })}</span>
                    <span>•</span>
                    <span>{activity.duration} minutos</span>
                  </div>

                  {/* Duration Bar */}
                  <div className="mt-3 h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${color}, ${color}80)`
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((activity.duration / 180) * 100, 100)}%` }}
                      transition={{ delay: index * 0.05 + 0.2, duration: 0.8 }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
