import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { Exercise, WorkoutHistory, ExerciseSet } from '../types/workout';

interface WorkoutStore {
  workouts: WorkoutHistory[];
  exerciseStats: {
    id: string;
    exerciseName: string;
    muscleGroup: string;
    sets: ExerciseSet[];
    date: string;
  }[];
  isLoading: boolean;
  error: string | null;
  fetchWorkouts: (userId: string) => Promise<void>;
  addWorkout: (name: string, exercises: Exercise[], userId: string) => Promise<string>;
  updateWorkout: (id: string, updates: Partial<WorkoutHistory>) => Promise<void>;
  deleteWorkout: (id: string) => Promise<void>;
  addExerciseStats: (workoutId: string, stats: {
    exerciseName: string;
    muscleGroup: string;
    sets: ExerciseSet[];
    date: string;
  }, userId: string) => Promise<void>;
  getExerciseHistory: (exerciseName: string) => {
    id: string;
    exerciseName: string;
    muscleGroup: string;
    sets: ExerciseSet[];
    date: string;
  }[];
  getMaxWeight: (exerciseName: string) => number;
  getProgressData: (exerciseName: string) => { date: string; maxWeight: number; volume: number }[];
  resetExerciseHistory: (exerciseName: string, userId: string) => Promise<void>;
  clearStore: () => void;
}

export const useWorkoutStore = create<WorkoutStore>((set, get) => ({
  workouts: [],
  exerciseStats: [],
  isLoading: false,
  error: null,

  clearStore: () => {
    set({
      workouts: [],
      exerciseStats: [],
      error: null
    });
  },

  fetchWorkouts: async (userId: string) => {
    try {
      set({ isLoading: true, error: null });

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('No active session');

      const [workoutsResponse, statsResponse] = await Promise.all([
        supabase
          .from('workouts')
          .select('*')
          .eq('user_id', userId)
          .order('date', { ascending: false }),
        supabase
          .from('exercise_stats')
          .select('*')
          .eq('user_id', userId)
          .order('date', { ascending: false })
      ]);

      if (workoutsResponse.error) throw workoutsResponse.error;
      if (statsResponse.error) throw statsResponse.error;

      set({
        workouts: workoutsResponse.data || [],
        exerciseStats: statsResponse.data || [],
        isLoading: false
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch data',
        isLoading: false
      });
    }
  },

  addWorkout: async (name: string, exercises: Exercise[], userId: string) => {
    try {
      set({ isLoading: true, error: null });

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('No active session');

      const { data, error } = await supabase
        .from('workouts')
        .insert({
          user_id: userId,
          name,
          exercises: exercises.map(ex => ({
            exerciseId: ex.id,
            name: ex.name,
            muscleGroup: ex.muscleGroup,
            sets: [],
          })),
          date: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      set(state => ({
        workouts: [data, ...state.workouts],
        isLoading: false
      }));

      return data.id;
    } catch (error) {
      console.error('Error adding workout:', error);
      set({
        error: error instanceof Error ? error.message : 'Failed to add workout',
        isLoading: false
      });
      throw error;
    }
  },

  updateWorkout: async (id: string, updates: Partial<WorkoutHistory>) => {
    try {
      set({ isLoading: true, error: null });

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('No active session');

      const { error } = await supabase
        .from('workouts')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      set(state => ({
        workouts: state.workouts.map(workout =>
          workout.id === id ? { ...workout, ...updates } : workout
        ),
        isLoading: false
      }));
    } catch (error) {
      console.error('Error updating workout:', error);
      set({
        error: error instanceof Error ? error.message : 'Failed to update workout',
        isLoading: false
      });
      throw error;
    }
  },

  deleteWorkout: async (id: string) => {
    try {
      set({ isLoading: true, error: null });

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('No active session');

      const { error } = await supabase
        .from('workouts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      set(state => ({
        workouts: state.workouts.filter(workout => workout.id !== id),
        isLoading: false
      }));
    } catch (error) {
      console.error('Error deleting workout:', error);
      set({
        error: error instanceof Error ? error.message : 'Failed to delete workout',
        isLoading: false
      });
      throw error;
    }
  },

  addExerciseStats: async (workoutId: string, stats: {
    exerciseName: string;
    muscleGroup: string;
    sets: ExerciseSet[];
    date: string;
  }, userId: string) => {
    try {
      set({ isLoading: true, error: null });

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('No active session');

      const { data, error } = await supabase
        .from('exercise_stats')
        .insert({
          user_id: userId,
          workout_id: workoutId,
          exercise_name: stats.exerciseName,
          muscle_group: stats.muscleGroup,
          sets: stats.sets,
          date: stats.date
        })
        .select()
        .single();

      if (error) throw error;

      set(state => ({
        exerciseStats: [data, ...state.exerciseStats],
        isLoading: false
      }));
    } catch (error) {
      console.error('Error adding exercise stats:', error);
      set({
        error: error instanceof Error ? error.message : 'Failed to add exercise stats',
        isLoading: false
      });
      throw error;
    }
  },

  getExerciseHistory: (exerciseName: string) => {
    return get().exerciseStats
      .filter(stat => stat.exerciseName === exerciseName)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  },

  getMaxWeight: (exerciseName: string) => {
    return Math.max(
      ...get().exerciseStats
        .filter(stat => stat.exerciseName === exerciseName)
        .flatMap(stat => stat.sets.map(set => set.weight)),
      0
    );
  },

  getProgressData: (exerciseName: string) => {
    return get().exerciseStats
      .filter(stat => stat.exerciseName === exerciseName)
      .map(stat => ({
        date: stat.date,
        maxWeight: Math.max(...stat.sets.map(set => set.weight)),
        volume: stat.sets.reduce((acc, set) => acc + (set.weight * set.reps), 0)
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  },

  resetExerciseHistory: async (exerciseName: string, userId: string) => {
    try {
      set({ isLoading: true, error: null });

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('No active session');

      const { error } = await supabase
        .from('exercise_stats')
        .delete()
        .eq('user_id', userId)
        .eq('exercise_name', exerciseName);

      if (error) throw error;

      set(state => ({
        exerciseStats: state.exerciseStats.filter(stat => 
          stat.exerciseName !== exerciseName
        ),
        isLoading: false
      }));
    } catch (error) {
      console.error('Error resetting exercise history:', error);
      set({
        error: error instanceof Error ? error.message : 'Failed to reset exercise history',
        isLoading: false
      });
      throw error;
    }
  }
}));