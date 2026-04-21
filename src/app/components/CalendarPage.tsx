import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Plus, Trash2, Edit3, Check, X, LogOut, ChevronLeft, ChevronRight, Clock } from 'lucide-react';

interface CalendarPageProps {
  onBack: () => void;
  onLogout?: () => void;
}

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  createdAt: Date;
}

export function CalendarPage({ onBack, onLogout }: CalendarPageProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Exemplo de Evento',
      description: 'Este é um exemplo de compromisso.',
      date: new Date().toISOString().split('T')[0],
      time: '14:00',
      createdAt: new Date()
    }
  ]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editTime, setEditTime] = useState('');
  const [showNewEvent, setShowNewEvent] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const getEventsForDate = (dateString: string) => {
    return events.filter(event => event.date === dateString);
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDayClick = (day: number) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(dateString);
    setNewDate(dateString);
  };

  const handleAddEvent = () => {
    if (newTitle.trim() || newDescription.trim()) {
      const event: Event = {
        id: Date.now().toString(),
        title: newTitle.trim() || 'Sem título',
        description: newDescription.trim(),
        date: newDate || selectedDate || new Date().toISOString().split('T')[0],
        time: newTime || '12:00',
        createdAt: new Date()
      };
      setEvents([event, ...events]);
      setNewTitle('');
      setNewDescription('');
      setNewDate('');
      setNewTime('');
      setShowNewEvent(false);
      setSelectedDate(null);
    }
  };

  const handleDeleteEvent = (id: string) => {
    if (confirm('Tem certeza que deseja deletar este evento?')) {
      setEvents(events.filter(event => event.id !== id));
    }
  };

  const handleStartEdit = (event: Event) => {
    setEditingId(event.id);
    setEditTitle(event.title);
    setEditDescription(event.description);
    setEditDate(event.date);
    setEditTime(event.time);
  };

  const handleSaveEdit = () => {
    if (editingId) {
      setEvents(events.map(event =>
        event.id === editingId
          ? {
              ...event,
              title: editTitle.trim() || 'Sem título',
              description: editDescription.trim(),
              date: editDate,
              time: editTime
            }
          : event
      ));
      setEditingId(null);
      setEditTitle('');
      setEditDescription('');
      setEditDate('');
      setEditTime('');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditTitle('');
    setEditDescription('');
    setEditDate('');
    setEditTime('');
  };

  const handleCloseNewEvent = () => {
    setShowNewEvent(false);
    setNewTitle('');
    setNewDescription('');
    setNewTime('');
    // Don't clear newDate so it stays set to selected date
  };

  const isEventPast = (date: string, time: string) => {
    const eventDateTime = new Date(`${date}T${time}`);
    return eventDateTime < new Date();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);
  const today = new Date().toISOString().split('T')[0];

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  return (
    <div className="min-h-screen w-full p-8 bg-gradient-to-br from-primary/30 via-background to-accent/30 relative overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-secondary/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="max-w-5xl mx-auto mb-8 relative z-10">
        <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-4 md:p-6 shadow-lg border-2 border-primary/30">
          <div className="flex items-center justify-between mb-4 md:mb-0">
            <div className="flex items-center gap-2 md:gap-4 flex-1">
              <motion.button
                onClick={onBack}
                className="p-2 md:p-3 rounded-2xl bg-muted text-muted-foreground hover:bg-primary/20 transition-all flex-shrink-0"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-5 h-5" />
              </motion.button>
              <div className="min-w-0">
                <h1
                  style={{ fontFamily: 'var(--font-display)' }}
                  className="text-2xl md:text-4xl mb-1 text-foreground truncate lowercase"
                >
                  calendário
                </h1>
                <p className="text-muted-foreground text-xs md:text-sm hidden md:block">seus eventos e compromissos</p>
              </div>
            </div>

            {onLogout && (
              <motion.button
                onClick={onLogout}
                className="px-3 py-2 md:px-5 md:py-3 rounded-2xl bg-destructive text-destructive-foreground hover:shadow-lg transition-all flex-shrink-0 ml-2 lowercase"
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

      {/* New/Edit Event Modal */}
      {(showNewEvent || editingId) && (
        <div className="fixed inset-0 bg-foreground/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-3xl p-4 md:p-6 shadow-2xl border-2 border-primary/30 max-w-md w-full mx-4"
          >
            <h3 className="text-lg md:text-xl mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              {editingId ? 'editar evento' : 'novo evento'}
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                value={editingId ? editTitle : newTitle}
                onChange={(e) => editingId ? setEditTitle(e.target.value) : setNewTitle(e.target.value)}
                placeholder="título do evento"
                className="w-full px-4 py-3 rounded-2xl bg-input border-2 border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all"
              />
              <textarea
                value={editingId ? editDescription : newDescription}
                onChange={(e) => editingId ? setEditDescription(e.target.value) : setNewDescription(e.target.value)}
                placeholder="descrição do evento..."
                rows={3}
                className="w-full px-4 py-3 rounded-2xl bg-input border-2 border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all resize-none"
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2 text-foreground/80">data</label>
                  <input
                    type="date"
                    value={editingId ? editDate : newDate}
                    onChange={(e) => editingId ? setEditDate(e.target.value) : setNewDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-input border-2 border-border text-foreground focus:outline-none focus:border-primary transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 text-foreground/80">horário</label>
                  <input
                    type="time"
                    value={editingId ? editTime : newTime}
                    onChange={(e) => editingId ? setEditTime(e.target.value) : setNewTime(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-input border-2 border-border text-foreground focus:outline-none focus:border-primary transition-all"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <motion.button
                  onClick={editingId ? handleSaveEdit : handleAddEvent}
                  className="flex-1 px-5 py-3 rounded-2xl bg-primary text-primary-foreground hover:shadow-lg transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Check className="w-4 h-4 inline mr-2" />
                  salvar
                </motion.button>
                <motion.button
                  onClick={editingId ? handleCancelEdit : handleCloseNewEvent}
                  className="flex-1 px-5 py-3 rounded-2xl bg-muted text-muted-foreground hover:bg-destructive/20 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <X className="w-4 h-4 inline mr-2" />
                  cancelar
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Calendar Grid */}
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-4 md:p-6 shadow-lg border-2 border-primary/30">
              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <motion.button
                  onClick={previousMonth}
                  className="p-2 rounded-xl bg-muted text-muted-foreground hover:bg-primary/20 transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                </motion.button>
                <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-lg md:text-2xl text-foreground">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <motion.button
                  onClick={nextMonth}
                  className="p-2 rounded-xl bg-muted text-muted-foreground hover:bg-primary/20 transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                </motion.button>
              </div>

              {/* Day Names */}
              <div className="grid grid-cols-7 gap-1 md:gap-2 mb-2">
                {dayNames.map(day => (
                  <div key={day} className="text-center text-xs md:text-sm text-muted-foreground py-1 md:py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Days Grid */}
              <div className="grid grid-cols-7 gap-1 md:gap-2">
                {/* Empty cells for days before month starts */}
                {Array.from({ length: startingDayOfWeek }).map((_, index) => (
                  <div key={`empty-${index}`} className="aspect-square" />
                ))}

                {/* Days of the month */}
                {Array.from({ length: daysInMonth }).map((_, index) => {
                  const day = index + 1;
                  const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                  const dayEvents = getEventsForDate(dateString);
                  const isToday = dateString === today;
                  const isSelected = dateString === selectedDate;

                  return (
                    <motion.button
                      key={day}
                      onClick={() => handleDayClick(day)}
                      className={`aspect-square rounded-xl p-1 md:p-2 transition-all relative ${
                        isToday
                          ? 'bg-primary text-primary-foreground'
                          : isSelected
                          ? 'bg-accent text-accent-foreground border-2 border-primary'
                          : 'bg-muted/50 hover:bg-muted text-foreground'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-xs md:text-sm">{day}</span>
                      {dayEvents.length > 0 && (
                        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                          {dayEvents.slice(0, 3).map((_, i) => (
                            <div
                              key={i}
                              className={`w-1 h-1 rounded-full ${
                                isToday ? 'bg-primary-foreground' : 'bg-primary'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Selected Day Events */}
          <div className="lg:col-span-1">
            <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-4 md:p-6 shadow-lg border-2 border-primary/30">
              {!selectedDate ? (
                <div className="flex items-center justify-center h-full min-h-[200px]">
                  <h3 className="text-lg md:text-xl text-center text-muted-foreground lowercase" style={{ fontFamily: 'var(--font-display)' }}>
                    selecione um dia
                  </h3>
                </div>
              ) : (
                <>
                  <h3 className="text-lg md:text-xl mb-3 md:mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                    {formatDate(selectedDate)}
                  </h3>
                  <div className="space-y-3">
                    {/* Add Event Button */}
                    <motion.button
                      onClick={() => setShowNewEvent(true)}
                      className="w-full px-3 md:px-4 py-2 md:py-3 rounded-2xl bg-primary text-primary-foreground hover:shadow-lg transition-all text-sm md:text-base"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Plus className="w-4 h-4 inline mr-1 md:mr-2" />
                      adicionar evento
                    </motion.button>

                    {/* Events List */}
                    {selectedDateEvents.length === 0 ? (
                      <p className="text-muted-foreground text-xs md:text-sm text-center py-4">
                        nenhum evento neste dia
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {selectedDateEvents.map(event => {
                          const isPast = isEventPast(event.date, event.time);
                          return (
                            <div
                              key={event.id}
                              className={`p-3 rounded-xl bg-muted/50 border border-border ${
                                isPast ? 'opacity-60' : ''
                              }`}
                            >
                              <div className="flex items-start justify-between mb-1">
                                <h4 className="text-sm font-medium text-foreground">{event.title}</h4>
                                <div className="flex gap-1">
                                  <motion.button
                                    onClick={() => handleStartEdit(event)}
                                    className="p-1 rounded hover:bg-primary/20"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    <Edit3 className="w-3 h-3" />
                                  </motion.button>
                                  <motion.button
                                    onClick={() => handleDeleteEvent(event.id)}
                                    className="p-1 rounded hover:bg-destructive/20"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </motion.button>
                                </div>
                              </div>
                              <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                                <Clock className="w-3 h-3" />
                                {event.time}
                              </p>
                              {event.description && (
                                <p className="text-xs text-muted-foreground line-clamp-2">
                                  {event.description}
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
