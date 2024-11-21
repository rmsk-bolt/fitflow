import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useWorkoutStore } from '../store/workoutStore';
import { ExerciseSelector } from '../components/ExerciseSelector';
import { useLanguage } from '../contexts/LanguageContext';
import { Exercise } from '../types/workout';

interface NewWorkoutViewProps {
  onBack: () => void;
  onComplete: () => void;
}

export const NewWorkoutView: React.FC<NewWorkoutViewProps> = ({ onBack, onComplete }) => {
  const { t } = useLanguage();
  const { addWorkout } = useWorkoutStore();
  const [workoutName, setWorkoutName] = useState('');
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateWorkout = async () => {
    if (!workoutName.trim() || selectedExercises.length === 0) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      await addWorkout(workoutName, selectedExercises);
      onComplete();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to create workout');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-10">
        <div className="glass-card mx-4 mt-4 p-4 flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/10 rounded-xl"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <input
            type="text"
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
            placeholder={t('enterWorkoutName')}
            className="flex-1 transparent text-xl font-bold placeholder:text-white/40"
          />
        </div>
      </div>

      {error && (
        <div className="mx-4 mt-4">
          <div className="glass-card p-4 bg-red-500/20 border-red-500/30">
            <p className="text-red-200">{error}</p>
          </div>
        </div>
      )}

      <div className="mt-6">
        <ExerciseSelector
          selectedExercises={selectedExercises}
          onExercisesChange={setSelectedExercises}
        />
      </div>

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[400px]">
        <button
          onClick={handleCreateWorkout}
          disabled={!workoutName.trim() || selectedExercises.length === 0 || isLoading}
          className="create-workout-button"
        >
          {isLoading ? t('creating') : t('createWorkout')}
        </button>
      </div>
    </div>
  );
};