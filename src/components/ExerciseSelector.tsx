import React, { useState, useMemo } from 'react';
import { Exercise } from '../types/workout';
import { Plus, Search, X, ChevronDown, ChevronUp } from 'lucide-react';
import { exerciseDatabase, muscleGroupTranslations } from '../data/exercises';
import { ExerciseConfigModal } from './ExerciseConfigModal';
import { useLanguage } from '../contexts/LanguageContext';
import { ExerciseGif } from './ExerciseGif';

interface ExerciseSelectorProps {
  selectedExercises: Exercise[];
  onExercisesChange: (exercises: Exercise[]) => void;
}

export const ExerciseSelector: React.FC<ExerciseSelectorProps> = ({
  selectedExercises,
  onExercisesChange,
}) => {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<string>(Object.keys(exerciseDatabase)[0]);
  const [selectedExercise, setSelectedExercise] = useState<typeof exerciseDatabase[keyof typeof exerciseDatabase][number] | null>(null);
  const [showSelectedExercises, setShowSelectedExercises] = useState(false);

  const handleAddExercise = (exercise: Exercise) => {
    onExercisesChange([...selectedExercises, exercise]);
    setSelectedExercise(null);
  };

  const handleRemoveExercise = (exerciseId: string) => {
    onExercisesChange(selectedExercises.filter(ex => ex.id !== exerciseId));
  };

  const availableExercises = useMemo(() => {
    let exercises;
    if (searchQuery) {
      exercises = Object.values(exerciseDatabase).flat().filter(ex => {
        const translation = ex.translations[language];
        return (
          translation.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          translation.muscleGroup.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
    } else {
      exercises = exerciseDatabase[activeTab] || [];
    }
    
    const selectedNames = new Set(selectedExercises.map(ex => ex.name));
    return exercises.filter(ex => !selectedNames.has(ex.translations[language].name));
  }, [searchQuery, activeTab, selectedExercises, language]);

  // Split muscle groups into two rows
  const muscleGroups = Object.keys(exerciseDatabase);
  const firstRow = muscleGroups.slice(0, Math.ceil(muscleGroups.length / 2));
  const secondRow = muscleGroups.slice(Math.ceil(muscleGroups.length / 2));

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      {selectedExercises.length > 0 && (
        <div className="mx-4 mb-4">
          <button
            onClick={() => setShowSelectedExercises(!showSelectedExercises)}
            className="glass-card w-full p-3 flex items-center justify-between transition-colors duration-200 hover:bg-white/5"
          >
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-white/80">{t('selectedExercises')}</h3>
              <span className="px-2 py-0.5 text-sm bg-purple-500/20 rounded-full text-purple-400">
                {selectedExercises.length}
              </span>
            </div>
            {showSelectedExercises ? (
              <ChevronUp className="w-5 h-5 text-white/60" />
            ) : (
              <ChevronDown className="w-5 h-5 text-white/60" />
            )}
          </button>
          
          <div className={`overflow-hidden transition-all duration-300 ease-in-out
            ${showSelectedExercises ? 'max-h-[60vh] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}
          >
            <div className="glass-card p-3">
              <div className="grid grid-cols-2 gap-2">
                {selectedExercises.map((exercise) => (
                  <div key={exercise.id} className="glass-card p-2.5">
                    <div className="flex flex-col h-full">
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <p className="font-medium text-sm line-clamp-1">{exercise.name}</p>
                          <button
                            onClick={() => handleRemoveExercise(exercise.id)}
                            className="p-1 rounded-lg hover:bg-white/10 transition-colors duration-200 -mt-1 -mr-1"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-xs text-white/60 mt-0.5">
                          {exercise.sets} × {exercise.reps} | {exercise.restTime}s
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="px-4 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            placeholder={t('searchExercises')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10"
          />
        </div>

        {!searchQuery && (
          <div className="space-y-2">
            <div className="flex gap-2">
              {firstRow.map((muscleGroup) => (
                <button
                  key={muscleGroup}
                  onClick={() => setActiveTab(muscleGroup)}
                  className={`flex-1 px-3 py-2 rounded-xl text-center text-sm transition-colors duration-200
                    ${activeTab === muscleGroup 
                      ? 'glass-button bg-purple-500/20 text-purple-200' 
                      : 'text-white/60 hover:bg-white/10'}`}
                >
                  {muscleGroupTranslations[muscleGroup][language]}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              {secondRow.map((muscleGroup) => (
                <button
                  key={muscleGroup}
                  onClick={() => setActiveTab(muscleGroup)}
                  className={`flex-1 px-3 py-2 rounded-xl text-center text-sm transition-colors duration-200
                    ${activeTab === muscleGroup 
                      ? 'glass-button bg-purple-500/20 text-purple-200' 
                      : 'text-white/60 hover:bg-white/10'}`}
                >
                  {muscleGroupTranslations[muscleGroup][language]}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="grid grid-cols-2 gap-2">
          {availableExercises.map((exercise) => {
            const translation = exercise.translations[language];
            return (
              <div key={translation.name} className="glass-card p-3">
                <div className="flex flex-col h-full">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm line-clamp-1">{translation.name}</h4>
                    <p className="text-xs text-white/60 line-clamp-1">{translation.muscleGroup}</p>
                    {exercise.gifUrl && (
                      <div className="mt-2 rounded-lg overflow-hidden">
                        <ExerciseGif
                          src={exercise.gifUrl}
                          alt={translation.name}
                          className="w-full aspect-square"
                        />
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => setSelectedExercise(exercise)}
                    className="mt-2 w-full p-1.5 rounded-xl bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 transition-colors duration-200"
                  >
                    <Plus className="w-4 h-4 mx-auto" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedExercise && (
        <ExerciseConfigModal
          exercise={{
            ...selectedExercise,
            name: selectedExercise.translations[language].name,
            muscleGroup: selectedExercise.translations[language].muscleGroup,
            gifUrl: selectedExercise.gifUrl,
          }}
          onConfirm={(config) => {
            handleAddExercise({
              id: crypto.randomUUID(),
              name: selectedExercise.translations[language].name,
              muscleGroup: selectedExercise.translations[language].muscleGroup,
              gifUrl: selectedExercise.gifUrl,
              ...config,
            });
          }}
          onCancel={() => setSelectedExercise(null)}
        />
      )}
    </div>
  );
};