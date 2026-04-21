import { motion } from 'motion/react';
import { GlassCard } from './GlassCard';
import { GlassButton } from './GlassButton';
import { ActivityTimeline } from './ActivityTimeline';
import { ShareCard } from './ShareCard';
import {
  Users,
  Server,
  MessageCircle,
  Calendar,
  Activity,
  UserCircle,
  Hash,
  Clock,
  Upload
} from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface DiscordStatsProps {
  data: any;
  onReset: () => void;
}

export function DiscordStats({ data, onReset }: DiscordStatsProps) {
  const accountAge = formatDistanceToNow(new Date(data.user.createdAt), {
    addSuffix: true,
    locale: ptBR
  });

  const recentServers = data.servers.slice(0, 5);
  const recentMessages = data.messages.slice(0, 10);
  const recentActivity = data.activity.slice(0, 8);
  const profileChanges = data.profile.slice(0, 10);

  const stats = [
    {
      icon: Server,
      label: 'Servidores',
      value: data.servers.length,
      color: '#ff006e'
    },
    {
      icon: Users,
      label: 'Amigos',
      value: data.friends.length,
      color: '#fb5607'
    },
    {
      icon: MessageCircle,
      label: 'Mensagens',
      value: data.messages.length,
      color: '#8338ec'
    },
    {
      icon: Activity,
      label: 'Atividades',
      value: data.activity.length,
      color: '#3a86ff'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)' }} className="text-4xl mb-2">
            Suas Estatísticas do Discord 💕
          </h1>
          <p className="text-white/60">
            Conta criada {accountAge}
          </p>
        </div>
        <GlassButton variant="secondary" onClick={onReset}>
          <Upload className="w-5 h-5 inline mr-2" />
          Trocar Dados
        </GlassButton>
      </div>

      {/* User Info Card */}
      <GlassCard>
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#ff006e] to-[#fb5607] flex items-center justify-center shadow-[0_0_30px_rgba(255,0,110,0.4)]">
            <UserCircle className="w-12 h-12 text-white" />
          </div>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-2xl mb-1">
              {data.user.username}#{data.user.discriminator}
            </h2>
            <p className="text-white/60 flex items-center gap-2">
              <Hash className="w-4 h-4" />
              ID: {data.user.id}
            </p>
          </div>
        </div>
      </GlassCard>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard>
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${stat.color}40, ${stat.color}20)`,
                      boxShadow: `0 0 20px ${stat.color}30`
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color: stat.color }} />
                  </div>
                  <span className="text-white/60 text-sm">{stat.label}</span>
                </div>
                <div className="text-3xl" style={{ fontFamily: 'var(--font-display)' }}>
                  {stat.value}
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      {/* Activity Timeline - Full Width */}
      <GlassCard>
        <ActivityTimeline activities={data.activity.slice(0, 12)} />
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Servers */}
        <GlassCard>
          <div className="flex items-center gap-2 mb-4">
            <Server className="w-5 h-5 text-[#ff006e]" />
            <h3 className="text-xl" style={{ fontFamily: 'var(--font-display)' }}>
              Últimos Servidores
            </h3>
          </div>
          <div className="space-y-3">
            {recentServers.map((server: any, i: number) => (
              <motion.div
                key={server.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
              >
                <div className="flex-1">
                  <p className="text-white mb-1">{server.name}</p>
                  <p className="text-white/50 text-sm flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {format(new Date(server.joinedAt), "dd/MM/yyyy", { locale: ptBR })}
                  </p>
                </div>
                <div className="text-white/60 text-sm">
                  {server.memberCount} membros
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>

        {/* Profile Changes */}
        <GlassCard>
          <div className="flex items-center gap-2 mb-4">
            <UserCircle className="w-5 h-5 text-[#fb5607]" />
            <h3 className="text-xl" style={{ fontFamily: 'var(--font-display)' }}>
              Mudanças de Perfil
            </h3>
          </div>
          <div className="space-y-3">
            {profileChanges.map((change: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-3 rounded-xl bg-white/5 border border-white/10"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/80 text-sm">
                    {change.type === 'username' ? 'Nome de Usuário' : 'Avatar'}
                  </span>
                  <span className="text-white/50 text-xs">
                    {format(new Date(change.date), "dd/MM/yyyy", { locale: ptBR })}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-white/60 line-through">{change.oldValue}</span>
                  <span className="text-white/40">→</span>
                  <span className="text-[#ff006e]">{change.newValue}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>

        {/* Recent Messages */}
        <GlassCard>
          <div className="flex items-center gap-2 mb-4">
            <MessageCircle className="w-5 h-5 text-[#3a86ff]" />
            <h3 className="text-xl" style={{ fontFamily: 'var(--font-display)' }}>
              Mensagens Recentes
            </h3>
          </div>
          <div className="space-y-3">
            {recentMessages.map((message: any, i: number) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-3 rounded-xl bg-white/5 border border-white/10"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white/80 text-sm">#{message.channel}</span>
                  <span className="text-white/50 text-xs">
                    {formatDistanceToNow(new Date(message.timestamp), {
                      addSuffix: true,
                      locale: ptBR
                    })}
                  </span>
                </div>
                <p className="text-white/60 text-sm truncate">{message.content}</p>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Friends List */}
      <GlassCard>
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-[#06ffa5]" />
          <h3 className="text-xl" style={{ fontFamily: 'var(--font-display)' }}>
            Lista de Amigos
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {data.friends.map((friend: any, i: number) => (
            <motion.div
              key={friend.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#06ffa5] to-[#3a86ff] flex items-center justify-center">
                <span className="text-sm">{friend.username[0]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm truncate">
                  {friend.username}#{friend.discriminator}
                </p>
                <p className="text-white/50 text-xs">
                  Amigos {formatDistanceToNow(new Date(friend.friendSince), { locale: ptBR })}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>

      {/* Share Card */}
      <ShareCard />
    </div>
  );
}
