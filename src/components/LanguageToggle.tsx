import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Languages } from 'lucide-react';

export const LanguageToggle: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="p-2 rounded-xl hover:bg-white/10 transition-colors duration-200 flex items-center gap-2"
    >
      <Languages className="w-5 h-5" />
      <span className="text-sm font-medium uppercase">{language}</span>
    </button>
  );
};