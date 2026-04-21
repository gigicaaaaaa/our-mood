import { useState } from 'react';
import { motion } from 'motion/react';
import { Sidebar } from './Sidebar';
import { DashboardTab } from './DashboardTab';
import { PlaceholderTab } from './PlaceholderTab';
import { BarChart3, Users, Palette, Settings } from 'lucide-react';

interface DashboardProps {
  onLogout: () => void;
}

export function Dashboard({ onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab />;
      case 'analytics':
        return (
          <PlaceholderTab
            title="Analytics"
            description="Visualize e analise suas métricas detalhadas"
            icon={BarChart3}
          />
        );
      case 'users':
        return (
          <PlaceholderTab
            title="Usuários"
            description="Gerencie seus usuários e permissões"
            icon={Users}
          />
        );
      case 'customize':
        return (
          <PlaceholderTab
            title="Customizar"
            description="Personalize seu dashboard como você preferir"
            icon={Palette}
          />
        );
      case 'settings':
        return (
          <PlaceholderTab
            title="Configurações"
            description="Ajuste as configurações do seu painel"
            icon={Settings}
          />
        );
      default:
        return <DashboardTab />;
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ff006e] rounded-full blur-[150px] opacity-20 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#8338ec] rounded-full blur-[150px] opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-[#fb5607] rounded-full blur-[150px] opacity-15 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Grid Pattern */}
      <div
        className="fixed inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} onLogout={onLogout} />

      <motion.main
        className="ml-72 min-h-screen p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {renderContent()}
      </motion.main>
    </div>
  );
}
