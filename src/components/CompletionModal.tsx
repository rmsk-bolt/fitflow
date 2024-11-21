import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Weight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface CompletionModalProps {
  totalWeight: number;
  onClose: () => void;
}

export const CompletionModal: React.FC<CompletionModalProps> = ({
  totalWeight,
  onClose,
}) => {
  const { t } = useLanguage();

  useEffect(() => {
    const end = Date.now() + 3000;
    const colors = ['#ffffff', '#4f46e5', '#60a5fa'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }, []);

  return (
    <div className="modal">
      <div className="glass-card p-6 w-full max-w-sm mx-auto space-y-6 animate-zoom-in">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">{t('congratulations')}</h2>
          <p className="text-white/60">{t('workoutCompleted')}</p>
        </div>

        <div className="glass-card p-4 flex items-center gap-4">
          <div className="p-2 rounded-xl bg-blue-500/20">
            <Weight className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <p className="text-sm text-white/60">{t('totalWeight')}</p>
            <p className="text-xl font-bold">{totalWeight}kg</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="glass-button w-full py-3 bg-blue-500/20 hover:bg-blue-500/30"
        >
          {t('continue')}
        </button>
      </div>
    </div>
  );
};