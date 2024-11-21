import React, { useState } from 'react';
import { Exercise } from '../types/workout';
import { Minus, Plus, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface SetCompletionModalProps {
  exercise: Exercise;
  onComplete: (sets: { weight: number; reps: number }[]) => void;
  onClose: () => void;
  lastWeight?: number;
}

export const SetCompletionModal: React.FC<SetCompletionModalProps> = ({
  exercise,
  onComplete,
  onClose,
  lastWeight = 0,
}) => {
  const { t } = useLanguage();
  const [setData, setSetData] = useState<{ weight: number; reps: number }[]>(
    Array(3).fill({ weight: Math.max(0, lastWeight), reps: 12 })
  );
  const [isClosing, setIsClosing] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const updateValue = (
    setIndex: number,
    field: 'weight' | 'reps',
    increment: boolean
  ) => {
    setSetData(prev => prev.map((set, idx) => {
      if (idx !== setIndex) return set;
      const value = field === 'weight' ? 2.5 : 1;
      const newValue = set[field] + (increment ? value : -value);
      return {
        ...set,
        [field]: Math.max(0, newValue)
      };
    }));
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 300);
  };

  const handleComplete = () => {
    setIsClosing(true);
    setTimeout(() => {
      onComplete(setData);
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div className={`modal ${isClosing ? 'animate-fade-out' : ''}`}>
      <div className={`glass-card p-6 w-full max-w-sm mx-auto space-y-6 ${isClosing ? 'animate-zoom-out' : 'animate-zoom-in'}`}>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{exercise.name}</h3>
            <p className="text-white/60">{t('completeAllSets')}</p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-white/10 rounded-xl -mt-2 -mr-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-6 max-h-[60vh] overflow-y-auto">
          {setData.map((set, index) => (
            <div key={index} className="glass-card p-4 space-y-4">
              <h4 className="font-medium">{t('setNumber')} {index + 1}</h4>
              
              <div className="space-y-2">
                <label className="text-sm text-white/80">{t('weightKg')}</label>
                <div className="flex items-center justify-between gap-4">
                  <button 
                    onClick={() => updateValue(index, 'weight', false)}
                    className="glass-button p-2"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="text-xl font-bold">{set.weight}</span>
                  <button 
                    onClick={() => updateValue(index, 'weight', true)}
                    className="glass-button p-2"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-white/80">{t('repsCompleted')}</label>
                <div className="flex items-center justify-between gap-4">
                  <button 
                    onClick={() => updateValue(index, 'reps', false)}
                    className="glass-button p-2"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="text-xl font-bold">{set.reps}</span>
                  <button 
                    onClick={() => updateValue(index, 'reps', true)}
                    className="glass-button p-2"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleComplete}
          className="glass-button w-full py-3 bg-blue-500/20 hover:bg-blue-500/30"
        >
          {t('add')}
        </button>
      </div>
    </div>
  );
};