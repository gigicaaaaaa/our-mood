import { useState, useEffect } from 'react';
import { supabase } from './utils/supabase/client';

import { SimpleLoginPage } from './components/SimpleLoginPage';
import { MenuPage } from './components/MenuPage';
import { SimpleHomePage } from './components/SimpleHomePage';
import { NotesPage } from './components/NotesPage';
import { StudyPage } from './components/StudyPage';
import { CalendarPage } from './components/CalendarPage';
import { ProfilePage } from './components/ProfilePage';

type Page = 'login' | 'menu' | 'discord' | 'notes' | 'study' | 'calendar' | 'profile';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [isChecking, setIsChecking] = useState(true);
  const [user, setUser] = useState<any>(null);

  // 🔥 VERIFICA LOGIN REAL
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();

      if (data.session) {
        setUser(data.session.user);
        setCurrentPage('menu');
      }

      setIsChecking(false);
    };

    checkUser();

    // 🔥 ESCUTA LOGIN/LOGOUT
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          setUser(session.user);
          setCurrentPage('menu');
        } else {
          setUser(null);
          setCurrentPage('login');
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogin = () => {
    setCurrentPage('menu');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setCurrentPage('login');
  };

  if (isChecking) {
    return (
      <div className="size-full flex items-center justify-center">
        carregando...
      </div>
    );
  }

  const handleSelectOption = (option: string) => {
    if (option === 'discord') setCurrentPage('discord');
    if (option === 'notes') setCurrentPage('notes');
    if (option === 'study') setCurrentPage('study');
    if (option === 'calendar') setCurrentPage('calendar');
  };

  const handleBack = () => setCurrentPage('menu');
  const handleProfile = () => setCurrentPage('profile');

  return (
    <div className="size-full">
      {currentPage === 'login' && (
        <SimpleLoginPage onLogin={handleLogin} />
      )}

      {currentPage === 'menu' && (
        <MenuPage
          onSelectOption={handleSelectOption}
          onLogout={handleLogout}
          onProfile={handleProfile}
          username={user?.email || 'user'}
        />
      )}

      {currentPage === 'profile' && (
        <ProfilePage
          onBack={handleBack}
          onLogout={handleLogout}
          username={user?.email || 'user'}
        />
      )}

      {currentPage === 'discord' && (
        <SimpleHomePage onLogout={handleLogout} onBack={handleBack} />
      )}

      {currentPage === 'notes' && (
        <NotesPage onBack={handleBack} onLogout={handleLogout} />
      )}

      {currentPage === 'study' && (
        <StudyPage onBack={handleBack} onLogout={handleLogout} />
      )}

      {currentPage === 'calendar' && (
        <CalendarPage onBack={handleBack} onLogout={handleLogout} />
      )}
    </div>
  );
}
