import React, { useState } from 'react';
import { X, Search, ChevronRight } from 'lucide-react';
import { Exercise } from '../types/workout';
import { ExerciseSelector } from './ExerciseSelector';

interface NewWorkoutModalProps {
  onClose: () => void;
  onSave: (name: string, exercises: Exercise[]) => void;
}

export const NewWorkoutModal: React.FC<NewWorkoutModalProps> = ({ onClose, onSave }) => {
  const [step, setStep] = useState<'name' | 'exercises'>('name');
  const [name, setName] = useState('');
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);

  const handleSave = () => {
    if (!name.trim()) return;
    onSave(name, selectedExercises);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="p-4 border-b border-white/10 flex justify-between items-center">
          <div className="flex items-center gap-2">
            {step === 'exercises' && (
              <button 
                onClick={() => setStep('name')}
                className="p-2 hover:bg-white/10 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            )}
            <h2 className="text-lg font-semibold">
              {step === 'name' ? 'New Workout' : 'Add Exercises'}
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-xl"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="overflow-y-auto max-h-[calc(100vh-10rem)]">
          {step === 'name' ? (
            <div className="p-4 space-y-4">
              <div className="space-y-2">
                <label htmlFor="workout-name" className="text-sm font-medium text-white/80">
                  Workout Name
                </label>
                <input
                  type="text"
                  id="workout-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Upper Body Strength"
                  className="w-full"
                />
              </div>
              <button
                onClick={() => setStep('exercises')}
                disabled={!name.trim()}
                className="glass-button w-full py-3 flex items-center justify-between px-4 disabled:opacity-50"
              >
                <span>Continue to add exercises</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <ExerciseSelector
              selectedExercises={selectedExercises}
              onExercisesChange={setSelectedExercises}
            />
          )}
        </div>

        {step === 'exercises' && (
          <div className="p-4 border-t border-white/10">
            <button
              onClick={handleSave}
              disabled={selectedExercises.length === 0}
              className="glass-button w-full py-3 disabled:opacity-50"
            >
              Create Workout ({selectedExercises.length} exercises)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};