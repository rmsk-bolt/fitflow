import React from 'react';
import { Exercise } from '../types/workout';
import { ChevronRight, Weight, Repeat } from 'lucide-react';

interface ExerciseListProps {
  exercises: Exercise[];
  onExerciseClick: (exercise: Exercise) => void;
}

export const ExerciseList: React.FC<ExerciseListProps> = ({
  exercises,
  onExerciseClick,
}) => {
  return (
    <div className="space-y-4">
      {exercises.map((exercise) => (
        <div
          key={exercise.id}
          onClick={() => onExerciseClick(exercise)}
          className="glass-card p-4 cursor-pointer hover:bg-white/20 transition-all duration-300"
        >
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h4 className="font-medium">{exercise.name}</h4>
              <p className="text-sm text-white/60">{exercise.muscleGroup}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-white/80">
                <Weight className="w-4 h-4" />
                <span>{exercise.weight}kg</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Repeat className="w-4 h-4" />
                <span>
                  {exercise.sets}×{exercise.reps}
                </span>
              </div>
              <ChevronRight className="w-5 h-5 text-white/40" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};