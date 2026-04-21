import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Plus, Trash2, Edit3, Check, X, LogOut } from 'lucide-react';
import { supabase } from '../../utils/supabase/client';

interface NotesPageProps {
  onBack: () => void;
  onLogout?: () => void;
}

interface Note {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

export function NotesPage({ onBack, onLogout }: NotesPageProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [showNewNote, setShowNewNote] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  // 🔥 pegar usuário logado
  const getUser = async () => {
    const { data } = await supabase.auth.getUser();
    return data.user;
  };

  // 🔥 carregar notas
  const loadNotes = async () => {
    const user = await getUser();
    if (!user) return;

    const { data } = await supabase
      .from('notes')
      .select('*')
      .order('created_at', { ascending: false });

    setNotes(data || []);
  };

  useEffect(() => {
    loadNotes();
  }, []);

  // 🔥 adicionar nota
  const handleAddNote = async () => {
    const user = await getUser();
    if (!user) return;

    if (!newTitle.trim() && !newContent.trim()) return;

    await supabase.from('notes').insert([
      {
        title: newTitle || 'Sem título',
        content: newContent,
        user_id: user.id
      }
    ]);

    setNewTitle('');
    setNewContent('');
    setShowNewNote(false);
    loadNotes();
  };

  // 🔥 deletar
  const handleDeleteNote = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar esta anotação?')) return;

    await supabase.from('notes').delete().eq('id', id);
    loadNotes();
  };

  // 🔥 iniciar edição
  const handleStartEdit = (note: Note) => {
    setEditingId(note.id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  // 🔥 salvar edição
  const handleSaveEdit = async () => {
    if (!editingId) return;

    await supabase
      .from('notes')
      .update({
        title: editTitle || 'Sem título',
        content: editContent
      })
      .eq('id', editingId);

    setEditingId(null);
    setEditTitle('');
    setEditContent('');
    loadNotes();
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditTitle('');
    setEditContent('');
  };

  return (
    <div className="min-h-screen w-full p-8 bg-gradient-to-br from-primary/30 via-background to-accent/30 relative overflow-hidden">
      
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-8 relative z-10">
        <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-4 md:p-6 shadow-lg border-2 border-primary/30">
          <div className="flex items-center gap-2 md:gap-4 mb-3 md:mb-4">
            <motion.button onClick={onBack} className="p-2 md:p-3 rounded-2xl bg-muted">
              <ArrowLeft className="w-5 h-5" />
            </motion.button>

            <div className="flex-1">
              <h1 className="text-2xl md:text-4xl lowercase">
                minhas anotações
              </h1>
            </div>
          </div>

          <div className="flex gap-2">
            <button onClick={() => setShowNewNote(true)}>
              nova anotação
            </button>
            {onLogout && <button onClick={onLogout}>sair</button>}
          </div>
        </div>
      </div>

      {/* New Note */}
      {showNewNote && (
        <div className="max-w-5xl mx-auto mb-6">
          <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
          <textarea value={newContent} onChange={(e) => setNewContent(e.target.value)} />
          <button onClick={handleAddNote}>salvar</button>
        </div>
      )}

      {/* Notes */}
      <div className="max-w-5xl mx-auto">
        {notes.map((note) => (
          <div key={note.id}>
            {editingId === note.id ? (
              <>
                <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                <textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} />
                <button onClick={handleSaveEdit}>salvar</button>
                <button onClick={handleCancelEdit}>cancelar</button>
              </>
            ) : (
              <>
                <h3>{note.title}</h3>
                <p>{note.content}</p>
                <p>
                  {new Date(note.created_at).toLocaleString('pt-BR')}
                </p>
                <button onClick={() => handleStartEdit(note)}>editar</button>
                <button onClick={() => handleDeleteNote(note.id)}>deletar</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
