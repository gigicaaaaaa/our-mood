import { motion } from 'motion/react';
import { LogOut, Moon, Sun, MessageSquare, BookOpen, GraduationCap, Calendar, Image, Sparkles, Heart, Star, User } from 'lucide-react';
import { useState, useEffect } from 'react';

interface MenuPageProps {
  onSelectOption: (option: string) => void;
  onLogout: () => void;
  onProfile: () => void;
  username?: string;
}

const gradients = [
  { id: 'pink', value: 'from-pink-500/20 to-purple-500/20' },
  { id: 'blackwhite', value: 'from-black/20 to-white/20' },
  { id: 'red', value: 'from-red-600/20 to-red-400/20' },
  { id: 'ocean', value: 'from-blue-500/20 to-cyan-500/20' },
  { id: 'sunset', value: 'from-orange-500/20 to-pink-500/20' },
  { id: 'forest', value: 'from-green-500/20 to-emerald-500/20' },
];

const symbols = [
  { id: 'hearts', icon: Heart },
  { id: 'stars', icon: Star },
  { id: 'sparkles', icon: Sparkles },
];

export function MenuPage({ onSelectOption, onLogout, onProfile, username }: MenuPageProps) {
  const [isDark, setIsDark] = useState(false);
  const [bannerImage, setBannerImage] = useState<string | null>(null);
  const [selectedGradient, setSelectedGradient] = useState(gradients[0]);
  const [selectedSymbol, setSelectedSymbol] = useState(symbols[0]);
  const [showBannerConfig, setShowBannerConfig] = useState(false);
  const [symbolColor, setSymbolColor] = useState('#ffb3d9');
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  useEffect(() => {
    // Load profile picture
    const loadProfile = () => {
      if (username) {
        const savedProfile = localStorage.getItem(`profile:${username}`);
        if (savedProfile) {
          const profile = JSON.parse(savedProfile);
          setProfilePicture(profile.profilePicture || null);
        }
      }
    };

    loadProfile();

    // Add event listener for profile updates
    window.addEventListener('storage', loadProfile);
    window.addEventListener('profileUpdated', loadProfile);

    return () => {
      window.removeEventListener('storage', loadProfile);
      window.removeEventListener('profileUpdated', loadProfile);
    };
  }, [username]);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const menuOptions = [
    {
      id: 'discord',
      title: 'us',
      icon: MessageSquare,
      description: 'recados e momentos especiais'
    },
    {
      id: 'notes',
      title: 'minhas anotações',
      icon: BookOpen,
      description: 'anotações e lembretes'
    },
    {
      id: 'study',
      title: 'resumos de estudo',
      icon: GraduationCap,
      description: 'seus resumos e materiais'
    },
    {
      id: 'calendar',
      title: 'calendário',
      icon: Calendar,
      description: 'eventos e compromissos'
    }
  ];

  return (
    <div className="min-h-screen w-full p-8 pb-32 bg-gradient-to-br from-primary/30 via-background to-accent/30 relative overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-secondary/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="max-w-5xl mx-auto mb-8 md:mb-12 relative z-10">
        <div className="flex items-center justify-between bg-card/80 backdrop-blur-sm rounded-3xl p-4 md:p-6 shadow-lg border-2 border-primary/30">
          <div>
            <h1
              style={{ fontFamily: 'var(--font-display)' }}
              className="text-2xl md:text-4xl text-foreground lowercase"
            >
              {username || 'HOME'}
            </h1>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            {/* Profile */}
            <motion.button
              onClick={onProfile}
              className="p-1 rounded-full bg-primary/20 border-2 border-primary/30 hover:border-primary transition-all overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {profilePicture ? (
                <img
                  src={profilePicture}
                  alt="Profile"
                  className="w-8 h-8 md:w-10 md:h-10 object-cover rounded-full"
                />
              ) : (
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                </div>
              )}
            </motion.button>

            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="p-2 md:p-3 rounded-2xl bg-muted text-muted-foreground hover:bg-primary/20 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Alternar tema"
            >
              {isDark ? (
                <Sun className="w-4 h-4 md:w-5 md:h-5" />
              ) : (
                <Moon className="w-4 h-4 md:w-5 md:h-5" />
              )}
            </motion.button>

            {/* Logout */}
            <motion.button
              onClick={onLogout}
              className="px-3 md:px-5 py-2 md:py-3 rounded-2xl bg-destructive text-destructive-foreground hover:shadow-lg transition-all lowercase"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LogOut className="w-4 h-4 md:w-5 md:h-5 md:inline md:mr-2" />
              <span className="hidden md:inline">sair</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Menu Options */}
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {menuOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <motion.button
                key={option.id}
                onClick={() => onSelectOption(option.id)}
                className="relative group p-6 md:p-8 rounded-3xl bg-card/80 backdrop-blur-sm border-2 border-primary/30 hover:border-primary shadow-lg hover:shadow-2xl transition-all text-center overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Gradient Background on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative z-10">
                  <motion.div
                    className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary mb-3 md:mb-4 shadow-lg"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground" />
                  </motion.div>

                  <h3
                    style={{ fontFamily: 'var(--font-display)' }}
                    className="text-lg md:text-xl text-foreground mb-1 md:mb-2 lowercase"
                  >
                    {option.title}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground lowercase">
                    {option.description}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Decorative Banner - Desktop Only */}
        <motion.div
          className="hidden md:block mt-12 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="relative rounded-3xl bg-card/80 backdrop-blur-sm border-2 border-primary/30 shadow-lg h-64">
            <div className="absolute inset-0 rounded-3xl overflow-hidden">
              {/* Background */}
              {bannerImage ? (
                <img
                  src={bannerImage}
                  alt="Banner"
                  className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
              ) : (
                <div className={`absolute inset-0 bg-gradient-to-r ${selectedGradient.value}`} />
              )}

              {/* Floating Symbols */}
              {[...Array(12)].map((_, i) => {
                const SymbolIcon = selectedSymbol.icon;
                return (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      color: `${symbolColor}4D`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.3, 0.6, 0.3],
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                      ease: "easeInOut"
                    }}
                  >
                    <SymbolIcon className="w-6 h-6" />
                  </motion.div>
                );
              })}
            </div>

            {/* Customize Button */}
            <motion.button
              onClick={() => setShowBannerConfig(!showBannerConfig)}
              className="absolute top-4 right-4 z-40 px-4 py-2 rounded-2xl bg-card border border-primary/30 text-foreground text-sm hover:bg-primary/20 transition-all lowercase"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="w-4 h-4 inline mr-2" />
              customizar
            </motion.button>

            {/* Configuration Panel */}
            {showBannerConfig && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-16 right-4 z-50 p-4 rounded-2xl bg-card border-2 border-primary/30 shadow-2xl w-72"
                style={{ maxHeight: '400px', overflowY: 'auto' }}
              >
                <div className="space-y-4">
                  {/* Upload Image */}
                  <div>
                    <label className="text-xs text-muted-foreground mb-2 block lowercase">
                      imagem de fundo
                    </label>
                    <label className="flex items-center justify-center px-3 py-2 rounded-xl bg-muted hover:bg-primary/20 cursor-pointer transition-all border border-border">
                      <Image className="w-4 h-4 mr-2" />
                      <span className="text-sm lowercase">
                        {bannerImage ? 'trocar imagem' : 'escolher imagem'}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                    {bannerImage && (
                      <button
                        onClick={() => setBannerImage(null)}
                        className="text-xs text-destructive mt-1 lowercase hover:underline"
                      >
                        remover imagem
                      </button>
                    )}
                  </div>

                  {/* Gradient Selection */}
                  {!bannerImage && (
                    <div>
                      <label className="text-xs text-muted-foreground mb-2 block lowercase">
                        gradiente
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {gradients.map((gradient) => (
                          <button
                            key={gradient.id}
                            onClick={() => setSelectedGradient(gradient)}
                            className={`h-10 rounded-xl bg-gradient-to-r ${gradient.value} border-2 transition-all ${
                              selectedGradient.id === gradient.id
                                ? 'border-primary scale-105'
                                : 'border-border'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Symbol Selection */}
                  <div>
                    <label className="text-xs text-muted-foreground mb-2 block lowercase">
                      símbolos
                    </label>
                    <div className="flex gap-2 mb-3">
                      {symbols.map((symbol) => {
                        const Icon = symbol.icon;
                        return (
                          <button
                            key={symbol.id}
                            onClick={() => setSelectedSymbol(symbol)}
                            className={`flex-1 p-3 rounded-xl bg-muted hover:bg-primary/20 transition-all border-2 ${
                              selectedSymbol.id === symbol.id
                                ? 'border-primary'
                                : 'border-transparent'
                            }`}
                          >
                            <Icon className="w-5 h-5 mx-auto" />
                          </button>
                        );
                      })}
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-xs text-muted-foreground lowercase">cor dos símbolos</label>
                      <input
                        type="color"
                        value={symbolColor}
                        onChange={(e) => setSymbolColor(e.target.value)}
                        className="w-16 h-8 rounded-lg cursor-pointer border border-border"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
