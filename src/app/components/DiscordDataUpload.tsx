import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Upload, FileJson, CheckCircle2, AlertCircle } from 'lucide-react';
import { GlassButton } from './GlassButton';
import { GlassCard } from './GlassCard';

interface DiscordDataUploadProps {
  onDataLoaded: (data: any) => void;
}

export function DiscordDataUpload({ onDataLoaded }: DiscordDataUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file: File) => {
    setError(null);
    setUploading(true);

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      const text = await file.text();
      const data = JSON.parse(text);

      // Generate mock Discord data for demonstration
      const mockData = generateMockDiscordData();
      onDataLoaded(mockData);
      setUploading(false);
    } catch (err) {
      setError('Erro ao processar arquivo. Certifique-se de que é um arquivo JSON válido do Discord.');
      setUploading(false);
    }
  };

  const loadDemoData = () => {
    const mockData = generateMockDiscordData();
    onDataLoaded(mockData);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 style={{ fontFamily: 'var(--font-display)' }} className="text-4xl mb-3">
          Discord Stats Tracker 💕
        </h1>
        <p className="text-white/60 max-w-2xl mx-auto">
          Faça upload dos seus dados exportados do Discord para visualizar estatísticas detalhadas
        </p>
      </div>

      <GlassCard hoverable={false} className="max-w-2xl mx-auto">
        <div className="space-y-6">
          {/* Instructions */}
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <h3 className="text-lg mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              Como exportar seus dados do Discord:
            </h3>
            <ol className="space-y-2 text-sm text-white/70">
              <li>1. Abra o Discord e vá em Configurações de Usuário ⚙️</li>
              <li>2. Vá em "Privacidade & Segurança"</li>
              <li>3. Role até "Solicitar todos os meus dados"</li>
              <li>4. Clique em "Solicitar Dados" e confirme</li>
              <li>5. Aguarde o email do Discord (pode levar até 30 dias)</li>
              <li>6. Faça download do arquivo ZIP e extraia</li>
              <li>7. Faça upload de qualquer arquivo JSON aqui</li>
            </ol>
          </div>

          {/* Upload Area */}
          <form
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleChange}
              className="hidden"
            />

            <motion.div
              className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer ${
                dragActive
                  ? 'border-[#ff006e] bg-[#ff006e]/10'
                  : 'border-white/20 hover:border-white/40 hover:bg-white/5'
              }`}
              onClick={() => fileInputRef.current?.click()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {uploading ? (
                <div className="space-y-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <FileJson className="w-16 h-16 mx-auto text-[#ff006e]" />
                  </motion.div>
                  <p className="text-white/60">Processando arquivo...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="w-16 h-16 mx-auto text-white/40" />
                  <div>
                    <p className="text-lg mb-1">
                      Arraste seu arquivo JSON aqui ou clique para selecionar
                    </p>
                    <p className="text-sm text-white/50">
                      Suporta arquivos .json do pacote de dados do Discord
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </form>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 p-4 rounded-xl bg-[#ff006e]/10 border border-[#ff006e]/30"
            >
              <AlertCircle className="w-5 h-5 text-[#ff006e]" />
              <p className="text-sm text-white/90">{error}</p>
            </motion.div>
          )}

          {/* Demo Button */}
          <div className="text-center">
            <p className="text-white/50 text-sm mb-3">Ou experimente com dados de demonstração</p>
            <GlassButton variant="secondary" onClick={loadDemoData}>
              Carregar Dados de Demo
            </GlassButton>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

// Generate mock Discord data for demonstration
function generateMockDiscordData() {
  const now = new Date();
  const accountAge = new Date(now.getTime() - (365 * 3 * 24 * 60 * 60 * 1000)); // 3 years ago

  return {
    user: {
      id: "123456789012345678",
      username: "SeuUsuario",
      discriminator: "1234",
      avatar: null,
      createdAt: accountAge.toISOString()
    },
    servers: generateMockServers(),
    messages: generateMockMessages(),
    friends: generateMockFriends(),
    profile: generateMockProfileChanges(),
    activity: generateMockActivity()
  };
}

function generateMockServers() {
  const servers = [];
  const serverNames = [
    "Server de Amigos", "Gaming Squad", "Comunidade Tech",
    "Arte & Design", "Música", "Estudos", "Memes"
  ];

  for (let i = 0; i < serverNames.length; i++) {
    const joinDate = new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000);
    servers.push({
      id: `server_${i}`,
      name: serverNames[i],
      joinedAt: joinDate.toISOString(),
      memberCount: Math.floor(Math.random() * 1000) + 10
    });
  }

  return servers.sort((a, b) => new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime());
}

function generateMockMessages() {
  const messages = [];
  const channels = ["geral", "random", "memes", "games", "música"];

  for (let i = 0; i < 50; i++) {
    const date = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000);
    messages.push({
      id: `msg_${i}`,
      content: `Mensagem de exemplo ${i}`,
      channel: channels[Math.floor(Math.random() * channels.length)],
      timestamp: date.toISOString()
    });
  }

  return messages.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

function generateMockFriends() {
  const friends = [];
  const names = ["Maria", "João", "Pedro", "Ana", "Lucas", "Julia", "Carlos", "Beatriz"];

  for (let i = 0; i < names.length; i++) {
    const friendSince = new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000);
    friends.push({
      id: `friend_${i}`,
      username: names[i],
      discriminator: String(1000 + i).padStart(4, '0'),
      friendSince: friendSince.toISOString()
    });
  }

  return friends;
}

function generateMockProfileChanges() {
  const changes = [];
  const usernames = ["OldUsername", "SeuUsuario", "NewUsername"];
  const avatars = ["avatar1.png", "avatar2.png", "avatar3.png"];

  for (let i = 0; i < 5; i++) {
    const date = new Date(Date.now() - (i * 60 * 24 * 60 * 60 * 1000));
    changes.push({
      date: date.toISOString(),
      type: i % 2 === 0 ? 'username' : 'avatar',
      oldValue: i % 2 === 0 ? usernames[Math.floor(Math.random() * usernames.length)] : avatars[Math.floor(Math.random() * avatars.length)],
      newValue: i % 2 === 0 ? usernames[Math.floor(Math.random() * usernames.length)] : avatars[Math.floor(Math.random() * avatars.length)]
    });
  }

  return changes;
}

function generateMockActivity() {
  const activities = [];
  const games = ["Valorant", "League of Legends", "Minecraft", "Spotify", "Visual Studio Code"];

  for (let i = 0; i < 20; i++) {
    const date = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000);
    activities.push({
      date: date.toISOString(),
      type: 'playing',
      name: games[Math.floor(Math.random() * games.length)],
      duration: Math.floor(Math.random() * 300) + 30 // 30-330 minutes
    });
  }

  return activities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
