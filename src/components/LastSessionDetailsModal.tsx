import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { ExerciseSet } from '../types/workout';

interface LastSessionDetailsModalProps {
  exerciseName: string;
  sets: ExerciseSet[];
  onClose: () => void;
}

export const LastSessionDetailsModal: React.FC<LastSessionDetailsModalProps> = ({
  exerciseName,
  sets,
  onClose,
}) => {
  const { t } = useLanguage();
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  };

  return (
    <div className={`modal ${isClosing ? 'animate-fade-out' : ''}`}>
      <div className={`glass-card p-6 w-full max-w-sm mx-auto space-y-6 ${
        isClosing ? 'animate-zoom-out' : 'animate-zoom-in'
      }`}>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{exerciseName}</h3>
            <p className="text-white/60">{t('lastSession')}</p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-xl -mt-2 -mr-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          {sets.map((set, index) => (
            <div key={index} className="glass-card p-4">
              <div className="flex justify-between items-center">
                <span className="text-white/60">
                  {t('set')} {index + 1}
                </span>
                <span className="font-medium">
                  {set.reps} {t('reps')} × {set.weight}kg
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};