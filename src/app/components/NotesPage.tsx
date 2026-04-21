import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Plus, Trash2, Edit3, Check, X, LogOut } from 'lucide-react';

interface NotesPageProps {
  onBack: () => void;
  onLogout?: () => void;
}

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

export function NotesPage({ onBack, onLogout }: NotesPageProps) {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Exemplo de Anotação',
      content: 'Esta é uma anotação de exemplo. Clique no lápis para editar ou na lixeira para deletar.',
      createdAt: new Date()
    }
  ]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [showNewNote, setShowNewNote] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const handleAddNote = () => {
    if (newTitle.trim() || newContent.trim()) {
      const note: Note = {
        id: Date.now().toString(),
        title: newTitle.trim() || 'Sem título',
        content: newContent.trim(),
        createdAt: new Date()
      };
      setNotes([note, ...notes]);
      setNewTitle('');
      setNewContent('');
      setShowNewNote(false);
    }
  };

  const handleDeleteNote = (id: string) => {
    if (confirm('Tem certeza que deseja deletar esta anotação?')) {
      setNotes(notes.filter(note => note.id !== id));
    }
  };

  const handleStartEdit = (note: Note) => {
    setEditingId(note.id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const handleSaveEdit = () => {
    if (editingId) {
      setNotes(notes.map(note =>
        note.id === editingId
          ? { ...note, title: editTitle.trim() || 'Sem título', content: editContent.trim() }
          : note
      ));
      setEditingId(null);
      setEditTitle('');
      setEditContent('');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditTitle('');
    setEditContent('');
  };

  return (
    <div className="min-h-screen w-full p-8 bg-gradient-to-br from-primary/30 via-background to-accent/30 relative overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-secondary/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="max-w-5xl mx-auto mb-8 relative z-10">
        <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-4 md:p-6 shadow-lg border-2 border-primary/30">
          <div className="flex items-center gap-2 md:gap-4 mb-3 md:mb-4">
            <motion.button
              onClick={onBack}
              className="p-2 md:p-3 rounded-2xl bg-muted text-muted-foreground hover:bg-primary/20 transition-all flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>
            <div className="min-w-0 flex-1">
              <h1
                style={{ fontFamily: 'var(--font-display)' }}
                className="text-2xl md:text-4xl mb-0 md:mb-1 text-foreground lowercase"
              >
                minhas anotações
              </h1>
              <p className="text-muted-foreground text-xs md:text-sm hidden md:block">salve suas ideias e lembretes</p>
            </div>
          </div>

          <div className="flex gap-2 md:gap-3">
            <motion.button
              onClick={() => setShowNewNote(true)}
              className="flex-1 md:flex-none px-3 md:px-5 py-2 md:py-3 rounded-2xl bg-primary text-primary-foreground hover:shadow-lg transition-all text-sm md:text-base lowercase"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="w-4 h-4 md:w-5 md:h-5 inline mr-1 md:mr-2" />
              nova anotação
            </motion.button>
            {onLogout && (
              <motion.button
                onClick={onLogout}
                className="px-3 md:px-5 py-2 md:py-3 rounded-2xl bg-destructive text-destructive-foreground hover:shadow-lg transition-all flex-shrink-0 lowercase"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogOut className="w-4 h-4 md:w-5 md:h-5 md:inline md:mr-2" />
                <span className="hidden md:inline">sair</span>
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {/* New Note Form */}
      {showNewNote && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto mb-6 bg-card/80 backdrop-blur-sm rounded-3xl p-4 md:p-6 shadow-lg border-2 border-primary/30 relative z-10"
        >
          <h3 className="text-lg md:text-xl mb-4 lowercase" style={{ fontFamily: 'var(--font-display)' }}>
            nova anotação
          </h3>
          <div className="space-y-4">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="título"
              className="w-full px-4 py-3 rounded-2xl bg-input border-2 border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all"
            />
            <textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="conteúdo da anotação..."
              rows={5}
              className="w-full px-4 py-3 rounded-2xl bg-input border-2 border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all resize-none"
            />
            <div className="flex gap-3">
              <motion.button
                onClick={handleAddNote}
                className="px-5 py-2 rounded-2xl bg-primary text-primary-foreground hover:shadow-lg transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Check className="w-4 h-4 inline mr-2" />
                salvar
              </motion.button>
              <motion.button
                onClick={() => {
                  setShowNewNote(false);
                  setNewTitle('');
                  setNewContent('');
                }}
                className="px-5 py-2 rounded-2xl bg-muted text-muted-foreground hover:bg-destructive/20 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-4 h-4 inline mr-2" />
                cancelar
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Notes List */}
      <div className="max-w-5xl mx-auto relative z-10">
        {notes.length === 0 ? (
          <div className="text-center py-12 md:py-16 bg-card/80 backdrop-blur-sm rounded-3xl border-2 border-primary/30">
            <p className="text-muted-foreground text-base md:text-lg px-4">
              nenhuma anotação ainda. clique em "nova anotação" para começar!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {notes.map((note, index) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-card/80 backdrop-blur-sm rounded-3xl p-4 md:p-6 shadow-lg border-2 border-primary/30"
              >
                {editingId === note.id ? (
                  // Edit Mode
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-input border-2 border-border text-foreground focus:outline-none focus:border-primary transition-all"
                    />
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      rows={5}
                      className="w-full px-4 py-3 rounded-2xl bg-input border-2 border-border text-foreground focus:outline-none focus:border-primary transition-all resize-none"
                    />
                    <div className="flex gap-3">
                      <motion.button
                        onClick={handleSaveEdit}
                        className="px-5 py-2 rounded-2xl bg-primary text-primary-foreground hover:shadow-lg transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Check className="w-4 h-4 inline mr-2" />
                        salvar
                      </motion.button>
                      <motion.button
                        onClick={handleCancelEdit}
                        className="px-5 py-2 rounded-2xl bg-muted text-muted-foreground hover:bg-destructive/20 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <X className="w-4 h-4 inline mr-2" />
                        cancelar
                      </motion.button>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <h3
                        style={{ fontFamily: 'var(--font-display)' }}
                        className="text-xl md:text-2xl text-foreground flex-1 mr-2"
                      >
                        {note.title}
                      </h3>
                      <div className="flex gap-1 md:gap-2 flex-shrink-0">
                        <motion.button
                          onClick={() => handleStartEdit(note)}
                          className="p-2 rounded-xl bg-muted text-muted-foreground hover:bg-primary/20 transition-all"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          title="Editar"
                        >
                          <Edit3 className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          onClick={() => handleDeleteNote(note.id)}
                          className="p-2 rounded-xl bg-muted text-muted-foreground hover:bg-destructive/20 transition-all"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          title="Deletar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                    <p className="text-muted-foreground whitespace-pre-wrap mb-3">
                      {note.content}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Criado em: {note.createdAt.toLocaleDateString('pt-BR')} às{' '}
                      {note.createdAt.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
