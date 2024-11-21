import React from 'react';
import { Dumbbell, Pencil, Trash2 } from 'lucide-react';
import { WorkoutHistory } from '../types/workout';
import { useWorkoutStore } from '../store/workoutStore';
import { useLanguage } from '../contexts/LanguageContext';
import { ConfirmDialog } from './ConfirmDialog';

interface WorkoutCardProps {
  record: WorkoutHistory;
  onClick: () => void;
  onEdit: () => void;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({ record, onClick, onEdit }) => {
  const { t } = useLanguage();
  const { deleteWorkout } = useWorkoutStore();
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteWorkout(record.id);
    } catch (error) {
      console.error('Failed to delete workout:', error);
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const totalExercises = record.exercises.length;

  return (
    <>
      <div
        onClick={onClick}
        className="glass-card p-4 space-y-3 cursor-pointer hover:bg-white/20 transition-all duration-300"
      >
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{record.name || new Date(record.date).toLocaleDateString()}</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="p-2 hover:bg-white/10 rounded-xl"
            >
              <Pencil className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowDeleteConfirm(true);
              }}
              className="p-2 hover:bg-white/10 rounded-xl text-red-400"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2 text-white/60 text-sm">
          <Dumbbell className="w-4 h-4" />
          <span>{totalExercises}</span>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showDeleteConfirm}
        title={t('deleteWorkout')}
        message={t('deleteWorkoutConfirm')}
        confirmLabel={t('delete')}
        cancelLabel={t('cancel')}
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteConfirm(false)}
        isDangerous
      />
    </>
  );
};