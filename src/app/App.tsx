import { useState, useEffect } from 'react';
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
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    // Check if user has valid session token
    const token = localStorage.getItem('sessionToken');
    const savedUsername = localStorage.getItem('username');
    if (token && savedUsername) {
      setUsername(savedUsername);
      setCurrentPage('menu');
    }
    setIsChecking(false);
  }, []);

  const handleLogin = () => {
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      setUsername(savedUsername);
    }
    setCurrentPage('menu');
  };

  const handleLogout = () => {
    localStorage.removeItem('sessionToken');
    localStorage.removeItem('username');
    setUsername('');
    setCurrentPage('login');
  };

  if (isChecking) {
    return (
      <div className="size-full flex items-center justify-center bg-background">
        <div className="text-foreground lowercase">carregando...</div>
      </div>
    );
  }

  const handleSelectOption = (option: string) => {
    if (option === 'discord') {
      setCurrentPage('discord');
    } else if (option === 'notes') {
      setCurrentPage('notes');
    } else if (option === 'study') {
      setCurrentPage('study');
    } else if (option === 'calendar') {
      setCurrentPage('calendar');
    }
  };

  const handleBack = () => {
    setCurrentPage('menu');
  };

  const handleProfile = () => {
    setCurrentPage('profile');
  };

  return (
    <div className="size-full">
      {currentPage === 'login' && (
        <SimpleLoginPage onLogin={handleLogin} />
      )}
      {currentPage === 'menu' && (
        <MenuPage onSelectOption={handleSelectOption} onLogout={handleLogout} onProfile={handleProfile} username={username} />
      )}
      {currentPage === 'profile' && (
        <ProfilePage onBack={handleBack} onLogout={handleLogout} username={username} />
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