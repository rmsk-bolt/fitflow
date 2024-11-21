import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, ChevronLeft, ArrowRight, Weight, Repeat, Timer } from 'lucide-react';
import { SetCompletionModal } from './SetCompletionModal';
import { CompletionModal } from './CompletionModal';
import { LastSessionDetailsModal } from './LastSessionDetailsModal';
import { useLanguage } from '../contexts/LanguageContext';
import { useWorkoutStore } from '../store/workoutStore';
import { useAuth } from '../contexts/AuthContext';
import { Exercise, ExerciseSet } from '../types/workout';
import { ExerciseGif } from './ExerciseGif';

interface WorkoutExecutionProps {
  workout: {
    id: string;
    name: string;
    exercises: Exercise[];
  };
  onComplete: () => void;
  onBack: () => void;
}

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  onClick?: () => void;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, label, value, onClick }) => {
  const CardComponent = onClick ? 'button' : 'div';
  return (
    <CardComponent
      onClick={onClick}
      className={`glass-card p-3 flex flex-col relative ${
        onClick ? 'hover:bg-white/5 transition-colors duration-200' : ''
      }`}
    >
      <div className="flex items-center gap-1.5 mb-2">
        <Icon className="w-4 h-4 text-white/60" />
        <p className="text-sm text-white/60 line-clamp-1">{label}</p>
      </div>
      <div className="flex-1 flex items-end justify-center">
        <p className="text-xl font-bold">{value}</p>
      </div>
    </CardComponent>
  );
};

export const WorkoutExecution: React.FC<WorkoutExecutionProps> = ({
  workout,
  onComplete,
  onBack,
}) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { getExerciseHistory, addExerciseStats } = useWorkoutStore();
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showSetModal, setShowSetModal] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [totalWeight, setTotalWeight] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const currentExercise = workout.exercises[currentExerciseIndex];
  const exerciseHistory = getExerciseHistory(currentExercise.name);
  const lastSession = exerciseHistory[0];
  const lastWeight = lastSession?.sets[0]?.weight || 0;

  useEffect(() => {
    let interval: number;
    if (isTimerRunning) {
      interval = window.setInterval(() => {
        setTimer(prev => {
          if (prev >= currentExercise.restTime) {
            setIsTimerRunning(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, currentExercise.restTime]);

  const handleSetComplete = async (sets: ExerciseSet[]) => {
    if (!user) {
      setError('User not authenticated');
      return;
    }

    try {
      setError(null);
      const exerciseWeight = sets.reduce((acc, set) => acc + (set.weight * set.reps), 0);
      setTotalWeight(prev => prev + exerciseWeight);

      await addExerciseStats(
        workout.id,
        {
          exerciseName: currentExercise.name,
          muscleGroup: currentExercise.muscleGroup,
          sets,
          date: new Date().toISOString()
        },
        user.id
      );

      if (currentExerciseIndex === workout.exercises.length - 1) {
        setShowSetModal(false);
        setShowCompletionModal(true);
      } else {
        setShowSetModal(false);
        setCurrentExerciseIndex(prev => prev + 1);
      }
      
      setTimer(0);
      setIsTimerRunning(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to save exercise stats');
      console.error('Error saving exercise stats:', error);
    }
  };

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const resetTimer = () => {
    setTimer(0);
    setIsTimerRunning(false);
  };

  return (
    <div className="min-h-screen flex flex-col pb-24">
      <div className="glass-card m-4 p-4">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-xl">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h2 className="text-xl font-bold">{currentExercise.name}</h2>
            <p className="text-white/60">
              {t('exercise')} {currentExerciseIndex + 1} {t('of')} {workout.exercises.length}
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 glass-card bg-red-500/20 border-red-500/30">
            <p className="text-red-200">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-4">
          <StatCard
            icon={Weight}
            label={t('lastWeight')}
            value={lastWeight ? `${lastWeight}kg` : '--'}
            onClick={lastWeight > 0 ? () => setShowHistoryModal(true) : undefined}
          />
          <StatCard
            icon={Repeat}
            label={t('reps')}
            value={currentExercise.reps}
          />
          <StatCard
            icon={Timer}
            label={t('rest')}
            value={`${currentExercise.restTime}s`}
          />
        </div>
      </div>

      <div className="glass-card mx-4 mb-4 overflow-hidden">
        <ExerciseGif 
          src={currentExercise.gifUrl} 
          alt={currentExercise.name}
          className="w-full aspect-square"
        />
      </div>

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[400px]">
        <div className="glass-card p-4 flex items-center gap-4">
          <div className="flex-1 flex items-center gap-4">
            <div className="text-2xl font-bold tabular-nums">
              {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
            </div>
            <div className="flex gap-2">
              <button
                onClick={toggleTimer}
                className="glass-button p-3 rounded-full"
              >
                {isTimerRunning ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={resetTimer}
                className="glass-button p-3 rounded-full"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </div>
          <button
            onClick={() => setShowSetModal(true)}
            className="glass-button px-4 py-3 flex items-center gap-2"
          >
            <span>{t('next')}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {showSetModal && (
        <SetCompletionModal
          exercise={currentExercise}
          onComplete={handleSetComplete}
          onClose={() => setShowSetModal(false)}
          lastWeight={lastWeight}
        />
      )}

      {showCompletionModal && (
        <CompletionModal
          totalWeight={totalWeight}
          sessionsCompleted={exerciseHistory.length + 1}
          onClose={onComplete}
        />
      )}

      {showHistoryModal && lastSession && (
        <LastSessionDetailsModal
          exerciseName={currentExercise.name}
          sets={lastSession.sets}
          onClose={() => setShowHistoryModal(false)}
        />
      )}
    </div>
  );
};