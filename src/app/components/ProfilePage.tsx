import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, LogOut, User, Camera, Save } from 'lucide-react';

interface ProfilePageProps {
  onBack: () => void;
  onLogout: () => void;
  username: string;
}

export function ProfilePage({ onBack, onLogout, username }: ProfilePageProps) {
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [bio, setBio] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Load saved profile data
    const savedProfile = localStorage.getItem(`profile:${username}`);
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      setProfilePicture(profile.profilePicture || null);
      setBio(profile.bio || '');
      setDisplayName(profile.displayName || '');
    }
  }, [username]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const profile = {
      profilePicture,
      bio,
      displayName,
    };
    localStorage.setItem(`profile:${username}`, JSON.stringify(profile));

    // Dispatch event to update profile in other components
    window.dispatchEvent(new Event('profileUpdated'));

    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen w-full p-4 md:p-8 bg-gradient-to-br from-primary/30 via-background to-accent/30 relative overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="max-w-3xl mx-auto mb-6 md:mb-8 relative z-10">
        <div className="flex items-center justify-between bg-card/80 backdrop-blur-sm rounded-3xl p-4 md:p-6 shadow-lg border-2 border-primary/30">
          <div className="flex items-center gap-3 md:gap-4">
            <motion.button
              onClick={onBack}
              className="p-2 md:p-3 rounded-2xl bg-muted text-muted-foreground hover:bg-primary/20 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
            </motion.button>
            <h1
              style={{ fontFamily: 'var(--font-display)' }}
              className="text-xl md:text-3xl text-foreground lowercase"
            >
              editar perfil
            </h1>
          </div>

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

      {/* Profile Content */}
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="bg-card/80 backdrop-blur-sm rounded-3xl shadow-lg border-2 border-primary/30 p-6 md:p-8">
          {/* Profile Picture */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-primary/20 border-4 border-primary/30 flex items-center justify-center overflow-hidden">
                {profilePicture ? (
                  <img
                    src={profilePicture}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-16 h-16 md:w-20 md:h-20 text-primary/50" />
                )}
              </div>
              <label className="absolute bottom-0 right-0 p-3 rounded-full bg-primary text-primary-foreground shadow-lg cursor-pointer hover:scale-110 transition-transform">
                <Camera className="w-5 h-5" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground lowercase">@{username}</p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Display Name */}
            <div>
              <label className="block text-sm text-muted-foreground mb-2 lowercase">
                nome de exibição
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-input border-2 border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all lowercase"
                placeholder="como você quer ser chamado"
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm text-muted-foreground mb-2 lowercase">
                bio
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-input border-2 border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all resize-none lowercase"
                placeholder="conte um pouco sobre você..."
                rows={4}
                maxLength={200}
              />
              <div className="text-xs text-muted-foreground mt-1 text-right">
                {bio.length}/200
              </div>
            </div>

            {/* Save Button */}
            <motion.button
              onClick={handleSave}
              className="w-full py-4 rounded-2xl bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 lowercase"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Save className="w-5 h-5" />
              {saved ? 'salvo!' : 'salvar alterações'}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
