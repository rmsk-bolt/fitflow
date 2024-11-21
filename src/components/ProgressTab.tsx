import React, { useState, useMemo, useEffect } from 'react';
import { ChevronDown, ChevronUp, Calendar, ArrowRight, RotateCcw } from 'lucide-react';
import { useWorkoutStore } from '../store/workoutStore';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { ExerciseProgressDetails } from './ExerciseProgressDetails';
import { ConfirmDialog } from './ConfirmDialog';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

type TimeRange = '5' | '10' | '20' | 'all';

export const ProgressTab: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { 
    getExerciseHistory, 
    getMaxWeight, 
    getProgressData, 
    resetExerciseHistory,
    getExercisesWithData,
    fetchWorkouts,
    isLoading,
    error: storeError
  } = useWorkoutStore();

  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [showExercises, setShowExercises] = useState(false);
  const [timeRange, setTimeRange] = useState<TimeRange>('all');
  const [showDetails, setShowDetails] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch data when component mounts
  useEffect(() => {
    if (user) {
      fetchWorkouts(user.id);
    }
  }, [user, fetchWorkouts]);

  const exerciseNames = useMemo(() => getExercisesWithData(), [getExercisesWithData]);

  const selectedExerciseData = useMemo(() => {
    if (!selectedExercise) return null;

    const data = getProgressData(selectedExercise);
    if (timeRange !== 'all') {
      const limit = parseInt(timeRange);
      return data.slice(-limit);
    }
    return data;
  }, [selectedExercise, timeRange, getProgressData]);

  const handleReset = async () => {
    if (!selectedExercise || !user) return;
    
    try {
      setError(null);
      await resetExerciseHistory(selectedExercise, user.id);
      setSelectedExercise(null);
      setShowResetConfirm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reset exercise history');
    }
  };

  if (showDetails && selectedExercise) {
    return (
      <ExerciseProgressDetails
        exerciseName={selectedExercise}
        data={getProgressData(selectedExercise)}
        onBack={() => setShowDetails(false)}
      />
    );
  }

  const timeRanges: TimeRange[] = ['5', '10', '20', 'all'];

  if (isLoading) {
    return (
      <div className="min-h-screen p-4">
        <div className="glass-card p-6 text-center">
          <p className="text-lg font-medium">{t('loading')}</p>
        </div>
      </div>
    );
  }

  if (storeError || error) {
    return (
      <div className="min-h-screen p-4">
        <div className="glass-card p-6 text-center bg-red-500/20">
          <p className="text-red-200">{storeError || error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{t('progress')}</h2>
        {selectedExercise && (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="p-2 hover:bg-white/10 rounded-xl flex items-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            <span className="text-sm">{t('reset')}</span>
          </button>
        )}
      </div>

      <div className="glass-card p-4">
        <button
          onClick={() => setShowExercises(!showExercises)}
          className="w-full flex items-center justify-between"
        >
          <span className="font-medium">
            {selectedExercise || t('selectExercise')}
          </span>
          {showExercises ? (
            <ChevronUp className="w-5 h-5 text-white/60" />
          ) : (
            <ChevronDown className="w-5 h-5 text-white/60" />
          )}
        </button>

        {showExercises && (
          <div className="mt-2 space-y-1">
            {exerciseNames.length > 0 ? (
              exerciseNames.map((name) => (
                <button
                  key={name}
                  onClick={() => {
                    setSelectedExercise(name);
                    setShowExercises(false);
                  }}
                  className={`w-full p-2 rounded-lg text-left transition-colors duration-200
                    ${selectedExercise === name 
                      ? 'bg-purple-500/20 text-purple-200' 
                      : 'hover:bg-white/10'}`}
                >
                  {name}
                </button>
              ))
            ) : (
              <div className="p-4 text-center text-white/60">
                <p>{t('noProgressData')}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {selectedExercise && selectedExerciseData && selectedExerciseData.length > 0 ? (
        <div className="space-y-4">
          <div className="glass-card p-4">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-white/60" />
              <div className="flex gap-2">
                {timeRanges.map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-3 py-1 rounded-lg text-sm transition-colors duration-200
                      ${timeRange === range 
                        ? 'bg-purple-500/20 text-purple-200' 
                        : 'text-white/60'}`}
                  >
                    {range === 'all' ? t('all') : `${range} ${t('sessions')}`}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={selectedExerciseData}>
                  <XAxis 
                    dataKey="date" 
                    stroke="#ffffff60"
                    tickFormatter={(date) => new Date(date).toLocaleDateString()}
                  />
                  <YAxis 
                    stroke="#ffffff60"
                    tickFormatter={(value) => `${value}kg`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(23, 23, 23, 0.9)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '0.5rem',
                    }}
                    labelStyle={{ color: 'rgba(255, 255, 255, 0.6)' }}
                    formatter={(value: number) => [`${value}kg`, t('weight')]}
                    labelFormatter={(date) => new Date(date).toLocaleDateString()}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="maxWeight" 
                    stroke="#8b5cf6" 
                    strokeWidth={2}
                    dot={{ fill: '#8b5cf6', strokeWidth: 2 }}
                    activeDot={{ r: 6, fill: '#a78bfa' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="glass-card p-3">
              <p className="text-sm text-white/60">{t('maxWeight')}</p>
              <p className="text-xl font-bold">
                {getMaxWeight(selectedExercise)}kg
              </p>
            </div>
            <div className="glass-card p-3">
              <p className="text-sm text-white/60">{t('improvement')}</p>
              <p className="text-xl font-bold">
                {Math.round(
                  ((selectedExerciseData[selectedExerciseData.length - 1].maxWeight -
                    selectedExerciseData[0].maxWeight) /
                    selectedExerciseData[0].maxWeight) *
                    100
                )}%
              </p>
            </div>
            <button
              onClick={() => setShowDetails(true)}
              className="glass-card p-3 text-left"
            >
              <p className="text-sm text-white/60">{t('viewDetails')}</p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-lg font-bold">
                  {getExerciseHistory(selectedExercise).length}
                </span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>
      ) : selectedExercise ? (
        <div className="glass-card p-6 text-center text-white/60">
          <p>{t('noProgressData')}</p>
        </div>
      ) : null}

      <ConfirmDialog
        isOpen={showResetConfirm}
        title={t('resetProgress')}
        message={t('resetProgressConfirm')}
        confirmLabel={t('reset')}
        cancelLabel={t('cancel')}
        onConfirm={handleReset}
        onCancel={() => setShowResetConfirm(false)}
        isDangerous
      />
    </div>
  );
};