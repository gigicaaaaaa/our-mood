import { useState } from 'react';
import { motion } from 'motion/react';
import { LogOut, Moon, Sun, ArrowLeft, Plus, Trash2, Edit3, Check, X, Heart, Calendar as CalendarIcon, Music } from 'lucide-react';

interface SimpleHomePageProps {
  onLogout: () => void;
  onBack?: () => void;
}

interface Message {
  id: string;
  author: 'eu' | 'namorado';
  content: string;
  createdAt: Date;
  scheduledFor?: Date;
}

interface ImportantDate {
  id: string;
  title: string;
  date: string;
  description: string;
}

export function SimpleHomePage({ onLogout, onBack }: SimpleHomePageProps) {
  const [isDark, setIsDark] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      author: 'eu',
      content: 'Exemplo de recado para você 💕',
      createdAt: new Date()
    }
  ]);
  const [importantDates, setImportantDates] = useState<ImportantDate[]>([
    {
      id: '1',
      title: 'Nosso Aniversário',
      date: new Date().toISOString().split('T')[0],
      description: 'Dia especial!'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [messageAuthor, setMessageAuthor] = useState<'eu' | 'namorado'>('eu');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');

  const [showNewDate, setShowNewDate] = useState(false);
  const [newDateTitle, setNewDateTitle] = useState('');
  const [newDateDate, setNewDateDate] = useState('');
  const [newDateDescription, setNewDateDescription] = useState('');

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const handleAddMessage = () => {
    if (newMessage.trim()) {
      const scheduledDateTime = scheduleDate && scheduleTime
        ? new Date(`${scheduleDate}T${scheduleTime}`)
        : undefined;

      const message: Message = {
        id: Date.now().toString(),
        author: messageAuthor,
        content: newMessage.trim(),
        createdAt: new Date(),
        scheduledFor: scheduledDateTime
      };
      setMessages([message, ...messages]);
      setNewMessage('');
      setScheduleDate('');
      setScheduleTime('');
    }
  };

  const handleDeleteMessage = (id: string) => {
    if (confirm('Deletar este recado?')) {
      setMessages(messages.filter(m => m.id !== id));
    }
  };

  const handleAddDate = () => {
    if (newDateTitle.trim() && newDateDate) {
      const date: ImportantDate = {
        id: Date.now().toString(),
        title: newDateTitle.trim(),
        date: newDateDate,
        description: newDateDescription.trim()
      };
      setImportantDates([...importantDates, date].sort((a, b) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
      ));
      setNewDateTitle('');
      setNewDateDate('');
      setNewDateDescription('');
      setShowNewDate(false);
    }
  };

  const handleDeleteDate = (id: string) => {
    if (confirm('Deletar esta data?')) {
      setImportantDates(importantDates.filter(d => d.id !== id));
    }
  };

  return (
    <div className="min-h-screen w-full p-8 bg-gradient-to-br from-primary/30 via-background to-accent/30 relative overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-secondary/15 rounded-full blur-3xl pointer-events-none" />
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8 relative z-10">
        <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-4 md:p-6 shadow-lg border-2 border-primary/30">
          <div className="flex items-center gap-2 md:gap-4 mb-3 md:mb-4">
            {onBack && (
              <motion.button
                onClick={onBack}
                className="p-2 md:p-3 rounded-2xl bg-muted text-muted-foreground hover:bg-primary/20 transition-all flex-shrink-0"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-5 h-5" />
              </motion.button>
            )}
            <div className="min-w-0 flex-1">
              <h1
                style={{ fontFamily: 'var(--font-display)' }}
                className="text-2xl md:text-4xl mb-0 md:mb-1 text-foreground lowercase"
              >
                us
              </h1>
              <p className="text-muted-foreground text-xs md:text-sm hidden md:block">nossos recados e momentos especiais</p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
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

      {/* Main Content */}
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Messages Section */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card/80 backdrop-blur-sm rounded-3xl p-4 md:p-6 shadow-lg border-2 border-primary/30"
            >
              <h2
                style={{ fontFamily: 'var(--font-display)' }}
                className="text-xl md:text-2xl mb-4 text-foreground flex items-center gap-2 lowercase"
              >
                <Heart className="w-6 h-6 text-primary" fill="currentColor" />
                nossos recados
              </h2>

              {/* New Message Form */}
              <div className="space-y-3 mb-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => setMessageAuthor('eu')}
                    className={`flex-1 px-3 py-2 rounded-xl transition-all text-sm ${
                      messageAuthor === 'eu'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    gigi
                  </button>
                  <button
                    onClick={() => setMessageAuthor('namorado')}
                    className={`flex-1 px-3 py-2 rounded-xl transition-all text-sm ${
                      messageAuthor === 'namorado'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    jv
                  </button>
                </div>

                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="escreva um recado..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-2xl bg-input border-2 border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all resize-none text-sm"
                />

                <details className="text-sm">
                  <summary className="cursor-pointer text-muted-foreground hover:text-foreground mb-2">
                    agendar recado (opcional)
                  </summary>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <input
                      type="date"
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                      className="px-3 py-2 rounded-xl bg-input border border-border text-foreground focus:outline-none focus:border-primary transition-all text-xs"
                    />
                    <input
                      type="time"
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                      className="px-3 py-2 rounded-xl bg-input border border-border text-foreground focus:outline-none focus:border-primary transition-all text-xs"
                    />
                  </div>
                </details>

                <motion.button
                  onClick={handleAddMessage}
                  className="w-full px-4 py-2 rounded-2xl bg-primary text-primary-foreground hover:shadow-lg transition-all text-sm lowercase"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Plus className="w-4 h-4 inline mr-2" />
                  adicionar recado
                </motion.button>
              </div>

              {/* Messages List */}
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {messages.length === 0 ? (
                  <p className="text-center text-muted-foreground text-sm py-8">
                    nenhum recado ainda
                  </p>
                ) : (
                  messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`p-3 rounded-2xl border-2 ${
                        message.author === 'eu'
                          ? 'bg-primary/10 border-primary/30 ml-8'
                          : 'bg-accent/10 border-accent/30 mr-8'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-xs font-medium text-foreground">
                          {message.author === 'eu' ? 'gigi' : 'jv'}
                        </span>
                        <motion.button
                          onClick={() => handleDeleteMessage(message.id)}
                          className="p-1 rounded hover:bg-destructive/20"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Trash2 className="w-3 h-3" />
                        </motion.button>
                      </div>
                      <p className="text-sm text-foreground mb-2">{message.content}</p>
                      <div className="text-xs text-muted-foreground">
                        {message.scheduledFor ? (
                          <span>
                            agendado para: {new Date(message.scheduledFor).toLocaleString('pt-BR')}
                          </span>
                        ) : (
                          <span>
                            {new Date(message.createdAt).toLocaleString('pt-BR')}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          </div>

          {/* Important Dates Section */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card/80 backdrop-blur-sm rounded-3xl p-4 md:p-6 shadow-lg border-2 border-primary/30"
            >
              <div className="flex items-center justify-between mb-4">
                <h2
                  style={{ fontFamily: 'var(--font-display)' }}
                  className="text-xl md:text-2xl text-foreground flex items-center gap-2 lowercase"
                >
                  <CalendarIcon className="w-6 h-6 text-primary" />
                  datas importantes
                </h2>
                <motion.button
                  onClick={() => setShowNewDate(!showNewDate)}
                  className="p-2 rounded-xl bg-primary text-primary-foreground hover:shadow-lg transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Plus className="w-4 h-4" />
                </motion.button>
              </div>

              {/* New Date Form */}
              {showNewDate && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-3 mb-4 pb-4 border-b-2 border-border"
                >
                  <input
                    type="text"
                    value={newDateTitle}
                    onChange={(e) => setNewDateTitle(e.target.value)}
                    placeholder="título"
                    className="w-full px-4 py-2 rounded-2xl bg-input border-2 border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all text-sm"
                  />
                  <input
                    type="date"
                    value={newDateDate}
                    onChange={(e) => setNewDateDate(e.target.value)}
                    className="w-full px-4 py-2 rounded-2xl bg-input border-2 border-border text-foreground focus:outline-none focus:border-primary transition-all text-sm"
                  />
                  <textarea
                    value={newDateDescription}
                    onChange={(e) => setNewDateDescription(e.target.value)}
                    placeholder="descrição (opcional)"
                    rows={2}
                    className="w-full px-4 py-2 rounded-2xl bg-input border-2 border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all resize-none text-sm"
                  />
                  <div className="flex gap-2">
                    <motion.button
                      onClick={handleAddDate}
                      className="flex-1 px-4 py-2 rounded-2xl bg-primary text-primary-foreground hover:shadow-lg transition-all text-sm lowercase"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Check className="w-4 h-4 inline mr-2" />
                      salvar
                    </motion.button>
                    <motion.button
                      onClick={() => {
                        setShowNewDate(false);
                        setNewDateTitle('');
                        setNewDateDate('');
                        setNewDateDescription('');
                      }}
                      className="px-4 py-2 rounded-2xl bg-muted text-muted-foreground hover:bg-destructive/20 transition-all text-sm"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <X className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Dates List */}
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {importantDates.length === 0 ? (
                  <p className="text-center text-muted-foreground text-sm py-8">
                    nenhuma data cadastrada
                  </p>
                ) : (
                  importantDates.map((date, index) => (
                    <motion.div
                      key={date.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/20"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-base font-medium text-foreground flex-1">
                          {date.title}
                        </h3>
                        <motion.button
                          onClick={() => handleDeleteDate(date.id)}
                          className="p-1 rounded hover:bg-destructive/20"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Trash2 className="w-3 h-3" />
                        </motion.button>
                      </div>
                      <p className="text-sm text-primary mb-1">
                        {new Date(date.date).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                      {date.description && (
                        <p className="text-xs text-muted-foreground">
                          {date.description}
                        </p>
                      )}
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>

            {/* Spotify Widget */}
            <motion.div
              className="mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="relative p-4 md:p-5 rounded-3xl bg-card/80 backdrop-blur-sm border-2 border-primary/30 shadow-lg overflow-hidden">
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10" />

                <div className="relative z-10 flex items-center gap-4">
                  {/* Album Art Placeholder */}
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Music className="w-7 h-7 md:w-8 md:h-8 text-primary" />
                  </div>

                  {/* Song Info */}
                  <div className="flex-1 min-w-0">
                    <motion.div
                      className="text-sm md:text-base text-foreground font-medium truncate lowercase"
                      animate={{ opacity: [1, 0.7, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      nothing without you
                    </motion.div>
                    <div className="text-xs md:text-sm text-muted-foreground truncate lowercase">
                      mars argo
                    </div>
                  </div>
                </div>

                {/* Music bars animation */}
                <div className="absolute bottom-2 left-4 flex gap-1">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 bg-primary/40 rounded-full"
                      animate={{
                        height: ['8px', '16px', '8px'],
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
