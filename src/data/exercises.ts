import { Language } from '../translations';

type ExerciseTranslations = {
  [key in Language]: {
    name: string;
    muscleGroup: string;
  };
};

export type ExerciseData = {
  translations: ExerciseTranslations;
  sets: number;
  reps: number;
  restTime: number;
  gifUrl?: string;
};

type MuscleGroupTranslations = {
  [key in Language]: string;
};

export const muscleGroupTranslations: { [key: string]: MuscleGroupTranslations } = {
  'Chest': {
    en: 'Chest',
    fr: 'Pectoraux'
  },
  'Back': {
    en: 'Back',
    fr: 'Dos'
  },
  'Legs': {
    en: 'Legs',
    fr: 'Jambes'
  },
  'Shoulders': {
    en: 'Shoulders',
    fr: 'Épaules'
  },
  'Arms': {
    en: 'Arms',
    fr: 'Bras'
  },
  'Core': {
    en: 'Core',
    fr: 'Abdominaux'
  }
};

export const exerciseDatabase: { [key: string]: ExerciseData[] } = {
  'Chest': [
    {
      translations: {
        en: { name: 'Bench Press', muscleGroup: 'Chest' },
        fr: { name: 'Développé couché', muscleGroup: 'Pectoraux' }
      },
      sets: 3,
      reps: 10,
      restTime: 90,
      gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Bench-Press.gif'
    },
    {
      translations: {
        en: { name: 'Incline Dumbbell Press', muscleGroup: 'Chest' },
        fr: { name: 'Développé incliné haltères', muscleGroup: 'Pectoraux' }
      },
      sets: 3,
      reps: 12,
      restTime: 60,
      gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Incline-Dumbbell-Press.gif'
    },
    {
      translations: {
        en: { name: 'Push-Ups', muscleGroup: 'Chest' },
        fr: { name: 'Pompes', muscleGroup: 'Pectoraux' }
      },
      sets: 3,
      reps: 15,
      restTime: 60,
      gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Push-Up.gif'
    }
  ],
  'Back': [
    {
      translations: {
        en: { name: 'Pull-Ups', muscleGroup: 'Back' },
        fr: { name: 'Tractions', muscleGroup: 'Dos' }
      },
      sets: 3,
      reps: 8,
      restTime: 90,
      gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Pull-up.gif'
    },
    {
      translations: {
        en: { name: 'Barbell Row', muscleGroup: 'Back' },
        fr: { name: 'Rowing barre', muscleGroup: 'Dos' }
      },
      sets: 3,
      reps: 12,
      restTime: 60,
      gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Bent-Over-Barbell-Row.gif'
    }
  ],
  'Legs': [
    {
      translations: {
        en: { name: 'Squats', muscleGroup: 'Legs' },
        fr: { name: 'Squats', muscleGroup: 'Jambes' }
      },
      sets: 4,
      reps: 10,
      restTime: 90,
      gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Squat.gif'
    },
    {
      translations: {
        en: { name: 'Deadlift', muscleGroup: 'Legs' },
        fr: { name: 'Soulevé de terre', muscleGroup: 'Jambes' }
      },
      sets: 3,
      reps: 8,
      restTime: 120,
      gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Deadlift.gif'
    }
  ],
  'Shoulders': [
    {
      translations: {
        en: { name: 'Military Press', muscleGroup: 'Shoulders' },
        fr: { name: 'Développé militaire', muscleGroup: 'Épaules' }
      },
      sets: 3,
      reps: 10,
      restTime: 90,
      gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Seated-Barbell-Military-Press.gif'
    },
    {
      translations: {
        en: { name: 'Lateral Raises', muscleGroup: 'Shoulders' },
        fr: { name: 'Élévations latérales', muscleGroup: 'Épaules' }
      },
      sets: 3,
      reps: 15,
      restTime: 60,
      gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Lateral-Raise.gif'
    }
  ],
  'Arms': [
    {
      translations: {
        en: { name: 'Bicep Curls', muscleGroup: 'Arms' },
        fr: { name: 'Curl biceps', muscleGroup: 'Bras' }
      },
      sets: 3,
      reps: 12,
      restTime: 60,
      gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Curl.gif'
    },
    {
      translations: {
        en: { name: 'Tricep Extensions', muscleGroup: 'Arms' },
        fr: { name: 'Extensions triceps', muscleGroup: 'Bras' }
      },
      sets: 3,
      reps: 12,
      restTime: 60,
      gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Triceps-Pushdown.gif'
    }
  ],
  'Core': [
    {
      translations: {
        en: { name: 'Crunches', muscleGroup: 'Core' },
        fr: { name: 'Crunchs', muscleGroup: 'Abdominaux' }
      },
      sets: 3,
      reps: 20,
      restTime: 45,
      gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Crunch.gif'
    },
    {
      translations: {
        en: { name: 'Plank', muscleGroup: 'Core' },
        fr: { name: 'Planche', muscleGroup: 'Abdominaux' }
      },
      sets: 3,
      reps: 30,
      restTime: 45,
      gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Plank.gif'
    }
  ]
};