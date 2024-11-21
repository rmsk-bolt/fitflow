export type Exercise = {
  id: string;
  name: string;
  muscleGroup: string;
  sets: number;
  reps: number;
  restTime: number;
  gifUrl?: string;
};

export type ExerciseSet = {
  weight: number;
  reps: number;
};

export type ExerciseStats = {
  id: string;
  exerciseName: string;
  muscleGroup: string;
  sets: ExerciseSet[];
  date: string;
};

export type WorkoutHistory = {
  id: string;
  name: string;
  exercises: {
    exerciseId: string;
    name: string;
    muscleGroup: string;
    sets: ExerciseSet[];
  }[];
  date: string;
};