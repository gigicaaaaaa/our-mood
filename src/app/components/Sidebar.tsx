import { motion } from 'motion/react';
import {
  LayoutDashboard,
  Settings,
  BarChart3,
  Users,
  Palette,
  LogOut,
  Sparkles
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
}

const menuItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'analytics', icon: BarChart3, label: 'Analytics' },
  { id: 'users', icon: Users, label: 'Usuários' },
  { id: 'customize', icon: Palette, label: 'Customizar' },
  { id: 'settings', icon: Settings, label: 'Configurações' }
];

export function Sidebar({ activeTab, onTabChange, onLogout }: SidebarProps) {
  return (
    <motion.aside
      className="fixed left-0 top-0 h-screen w-72 bg-white/5 backdrop-blur-2xl border-r border-white/10"
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex flex-col h-full p-6">
        {/* Logo */}
        <div className="mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff006e] to-[#fb5607] flex items-center justify-center shadow-[0_0_20px_rgba(255,0,110,0.4)]">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-xl">Dashboard</h2>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <motion.button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative overflow-hidden group ${
                  isActive
                    ? 'bg-gradient-to-r from-[#ff006e] to-[#fb5607] text-white shadow-[0_0_20px_rgba(255,0,110,0.3)]'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 4 }}
              >
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#8338ec] to-[#3a86ff]"
                    layoutId="activeTab"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <Icon className="w-5 h-5 relative z-10" />
                <span className="relative z-10">{item.label}</span>
              </motion.button>
            );
          })}
        </nav>

        {/* Logout Button */}
        <motion.button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-all"
          whileHover={{ x: 4 }}
        >
          <LogOut className="w-5 h-5" />
          <span>Sair</span>
        </motion.button>
      </div>
    </motion.aside>
  );
}
