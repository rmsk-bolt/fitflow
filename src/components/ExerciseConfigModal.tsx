import React, { useState } from 'react';
import { Exercise } from '../types/workout';
import { Minus, Plus } from 'lucide-react';

interface ExerciseConfigModalProps {
  exercise: Omit<Exercise, 'id'>;
  onConfirm: (config: Pick<Exercise, 'sets' | 'reps' | 'restTime'>) => void;
  onCancel: () => void;
}

export const ExerciseConfigModal: React.FC<ExerciseConfigModalProps> = ({
  exercise,
  onConfirm,
  onCancel,
}) => {
  const [config, setConfig] = useState({
    sets: 3,
    reps: 12,
    restTime: 60,
  });

  const updateValue = (key: keyof typeof config, increment: boolean) => {
    setConfig(prev => ({
      ...prev,
      [key]: Math.max(1, prev[key] + (increment ? 1 : -1))
    }));
  };

  return (
    <div className="modal">
      <div className="glass-card p-6 w-full max-w-sm mx-auto space-y-6">
        <h3 className="text-lg font-semibold text-center">{exercise.name}</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Sets</span>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => updateValue('sets', false)}
                className="glass-button p-1"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center">{config.sets}</span>
              <button 
                onClick={() => updateValue('sets', true)}
                className="glass-button p-1"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span>Reps</span>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => updateValue('reps', false)}
                className="glass-button p-1"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center">{config.reps}</span>
              <button 
                onClick={() => updateValue('reps', true)}
                className="glass-button p-1"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span>Rest (seconds)</span>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => updateValue('restTime', false)}
                className="glass-button p-1"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center">{config.restTime}</span>
              <button 
                onClick={() => updateValue('restTime', true)}
                className="glass-button p-1"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={onCancel}
            className="flex-1 glass-button py-2"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(config)}
            className="flex-1 glass-button py-2 bg-blue-500/20 hover:bg-blue-500/30"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};