import { motion } from 'motion/react';
import { GlassCard } from './GlassCard';
import { Plus, TrendingUp, Users, Activity, Zap } from 'lucide-react';
import { GlassButton } from './GlassButton';

const statsCards = [
  {
    icon: Users,
    label: 'Usuários Ativos',
    value: '2,547',
    change: '+12.5%',
    color: '#ff006e'
  },
  {
    icon: Activity,
    label: 'Taxa de Conversão',
    value: '64.3%',
    change: '+8.2%',
    color: '#fb5607'
  },
  {
    icon: TrendingUp,
    label: 'Receita Total',
    value: 'R$ 45.2k',
    change: '+23.1%',
    color: '#8338ec'
  },
  {
    icon: Zap,
    label: 'Performance',
    value: '98.5%',
    change: '+2.4%',
    color: '#3a86ff'
  }
];

export function DashboardTab() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)' }} className="text-4xl mb-2">
            Bem-vindo de volta! 👋
          </h1>
          <p className="text-white/60">Aqui está um resumo das suas métricas hoje</p>
        </div>
        <GlassButton variant="primary">
          <Plus className="w-5 h-5 inline mr-2" />
          Novo Card
        </GlassButton>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard>
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${stat.color}40, ${stat.color}20)`,
                      boxShadow: `0 0 20px ${stat.color}30`
                    }}
                  >
                    <Icon className="w-6 h-6" style={{ color: stat.color }} />
                  </div>
                  <span className="text-[#06ffa5] text-sm">{stat.change}</span>
                </div>
                <div className="text-3xl mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                  {stat.value}
                </div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      {/* Customizable Cards Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard>
          <h3 className="text-xl mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Card Customizável 1
          </h3>
          <p className="text-white/60 mb-4">
            Este é um card totalmente customizável. Você pode adicionar qualquer conteúdo aqui.
          </p>
          <div className="h-40 rounded-xl bg-gradient-to-br from-[#ff006e]/20 to-[#8338ec]/20 border border-white/10 flex items-center justify-center">
            <span className="text-white/40">Conteúdo Personalizado</span>
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="text-xl mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Card Customizável 2
          </h3>
          <p className="text-white/60 mb-4">
            Adicione gráficos, tabelas, ou qualquer componente que você precisar.
          </p>
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10"
              >
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#ff006e] to-[#fb5607]" />
                <span className="text-white/80">Item Customizado {item}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="lg:col-span-2">
          <h3 className="text-xl mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Card Grande Customizável
          </h3>
          <p className="text-white/60 mb-6">
            Use este espaço para dashboards mais complexos ou visualizações de dados.
          </p>
          <div className="grid grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="aspect-square rounded-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-white/40 text-2xl">{i + 1}</span>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
