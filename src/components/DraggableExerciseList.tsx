import React, { useState } from 'react';
import { Exercise } from '../types/workout';
import { GripVertical } from 'lucide-react';

interface DraggableExerciseListProps {
  exercises: Exercise[];
  onReorder: (exercises: Exercise[]) => void;
}

export const DraggableExerciseList: React.FC<DraggableExerciseListProps> = ({
  exercises,
  onReorder,
}) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null) return;

    const newExercises = [...exercises];
    const draggedExercise = newExercises[draggedIndex];
    newExercises.splice(draggedIndex, 1);
    newExercises.splice(index, 0, draggedExercise);

    onReorder(newExercises);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div className="space-y-3">
      {exercises.map((exercise, index) => (
        <div
          key={exercise.id}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragEnd={handleDragEnd}
          className="glass-card p-4 flex items-center gap-3 cursor-move"
        >
          <GripVertical className="w-5 h-5 text-white/40" />
          <div>
            <h4 className="font-medium">{exercise.name}</h4>
            <p className="text-sm text-white/60">
              {exercise.sets} × {exercise.reps} | {exercise.restTime}s rest
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};