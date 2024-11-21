import React from 'react';
import { Home, TrendingUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface BottomNavigationProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeView,
  onViewChange,
}) => {
  const { t } = useLanguage();

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[400px]">
      <div className="glass-card p-2 grid grid-cols-2 gap-2">
        <button
          onClick={() => onViewChange('home')}
          className={`nav-tab ${activeView === 'home' ? 'nav-tab-active' : ''}`}
        >
          <Home className="w-5 h-5" />
          <span className="text-xs mt-1">{t('home')}</span>
        </button>
        <button
          onClick={() => onViewChange('progress')}
          className={`nav-tab ${activeView === 'progress' ? 'nav-tab-active' : ''}`}
        >
          <TrendingUp className="w-5 h-5" />
          <span className="text-xs mt-1">{t('progress')}</span>
        </button>
      </div>
    </nav>
  );
};