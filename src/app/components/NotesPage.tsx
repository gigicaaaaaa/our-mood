import { useState, useEffect } from 'react';
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

  const getUser = async () => {
    const { data } = await supabase.auth.getUser();
    return data.user;
  };

  const loadNotes = async () => {
    const user = await getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setNotes(data || []);
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const handleAddNote = async () => {
    const user = await getUser();
    if (!user) return;

    if (!newTitle.trim() && !newContent.trim()) return;

    const { error } = await supabase.from('notes').insert([
      {
        title: newTitle || 'Sem título',
        content: newContent,
        user_id: user.id,
      },
    ]);

    if (error) console.error(error);

    setNewTitle('');
    setNewContent('');
    setShowNewNote(false);
    loadNotes();
  };

  const handleDeleteNote = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar esta anotação?')) return;

    const { error } = await supabase
      .from('notes')
      .delete()
      .eq('id', id);

    if (error) console.error(error);

    loadNotes();
  };

  const handleStartEdit = (note: Note) => {
    setEditingId(note.id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const handleSaveEdit = async () => {
    if (!editingId) return;

    const { error } = await supabase
      .from('notes')
      .update({
        title: editTitle || 'Sem título',
        content: editContent,
      })
      .eq('id', editingId);

    if (error) console.error(error);

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
    <div className="min-h-screen w-full p-8">
      <h1>Minhas Anotações</h1>

      <button onClick={onBack}>voltar</button>
      {onLogout && <button onClick={onLogout}>sair</button>}

      <button onClick={() => setShowNewNote(true)}>
        nova anotação
      </button>

      {showNewNote && (
        <div>
          <input
            placeholder="Título"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <textarea
            placeholder="Conteúdo"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
          <button onClick={handleAddNote}>salvar</button>
        </div>
      )}

      <div>
        {notes.map((note) => (
          <div key={note.id}>
            {editingId === note.id ? (
              <>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
                <button onClick={handleSaveEdit}>salvar</button>
                <button onClick={handleCancelEdit}>cancelar</button>
              </>
            ) : (
              <>
                <h3>{note.title}</h3>
                <p>{note.content}</p>
                <small>
                  {new Date(note.created_at).toLocaleString('pt-BR')}
                </small>
                <br />
                <button onClick={() => handleStartEdit(note)}>
                  editar
                </button>
                <button onClick={() => handleDeleteNote(note.id)}>
                  deletar
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
