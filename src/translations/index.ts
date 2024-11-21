export type Language = 'en' | 'fr';

export const translations = {
  en: {
    // Auth
    signUp: 'Sign Up',
    signIn: 'Sign In',
    signOut: 'Sign Out',
    email: 'Email',
    password: 'Password',
    name: 'Name',
    enterEmail: 'Enter your email',
    enterPassword: 'Enter your password',
    enterName: 'Enter your name',
    loading: 'Loading...',
    alreadyHaveAccount: 'Already have an account? Sign in',
    needAccount: "Don't have an account? Sign up",
    // Navigation
    home: 'Home',
    progress: 'Progress',
    // General
    welcomeBack: 'Welcome back',
    letsWorkout: "Let's crush today's workout!",
    quickStats: 'Quick Stats',
    totalWorkouts: 'Total Workouts',
    streak: 'Streak',
    yourWorkouts: 'Your Workouts',
    new: 'New',
    noWorkouts: 'No workouts yet',
    createFirst: 'Create your first workout to get started',
    // Workout Creation
    workoutName: 'Workout Name',
    enterWorkoutName: 'e.g., Upper Body Strength',
    createWorkout: 'Create Workout',
    creating: 'Creating...',
    // Exercise Selection
    searchExercises: 'Search exercises...',
    selectedExercises: 'Selected Exercises',
    exercise: 'Exercise',
    of: 'of',
    // Exercise Details
    sets: 'Sets',
    reps: 'Reps',
    rest: 'Rest',
    weight: 'Weight',
    lastWeight: 'Last Weight',
    // Actions
    next: 'Next',
    add: 'Add',
    save: 'Save',
    saving: 'Saving...',
    edit: 'Edit',
    delete: 'Delete',
    cancel: 'Cancel',
    reset: 'Reset',
    resetProgress: 'Reset Exercise Progress',
    resetProgressConfirm: 'Are you sure you want to delete all progress data for this exercise? This action cannot be undone.',
    // Exercise Progress
    selectExercise: 'Select Exercise',
    maxWeight: 'Max Weight',
    improvement: 'Improvement',
    viewDetails: 'View Details',
    noProgressData: 'No progress data available for this exercise yet',
    weightProgression: 'Weight Progression',
    volumeProgression: 'Volume Progression',
    sessionHistory: 'Session History',
    volume: 'Volume',
    avgWeight: 'Average Weight',
    // Exercise Execution
    alternativeExercises: 'Alternative Exercises',
    exerciseDemonstration: 'Exercise demonstration',
    completeAllSets: 'Complete all sets for this exercise',
    setNumber: 'Set',
    weightKg: 'Weight (kg)',
    repsCompleted: 'Reps completed',
    // Completion
    congratulations: 'Congratulations! 🎉',
    workoutCompleted: 'Workout completed successfully',
    totalWeight: 'Total Weight Lifted',
    continue: 'Continue',
    // Modals
    editWorkout: 'Edit Workout',
    deleteWorkout: 'Delete Workout',
    deleteWorkoutConfirm: 'Are you sure you want to delete this workout?',
    lastSession: 'Last Session',
    set: 'Set',
    // Time Ranges
    all: 'All',
    sessions: 'sessions'
  },
  fr: {
    // Auth
    signUp: "S'inscrire",
    signIn: 'Se connecter',
    signOut: 'Se déconnecter',
    email: 'Email',
    password: 'Mot de passe',
    name: 'Nom',
    enterEmail: 'Entrez votre email',
    enterPassword: 'Entrez votre mot de passe',
    enterName: 'Entrez votre nom',
    loading: 'Chargement...',
    alreadyHaveAccount: 'Déjà un compte ? Connectez-vous',
    needAccount: 'Pas de compte ? Inscrivez-vous',
    // Navigation
    home: 'Accueil',
    progress: 'Progrès',
    // General
    welcomeBack: 'Bon retour',
    letsWorkout: "C'est parti pour l'entraînement !",
    quickStats: 'Statistiques',
    totalWorkouts: "Total d'entraînements",
    streak: 'Série',
    yourWorkouts: 'Vos entraînements',
    new: 'Nouveau',
    noWorkouts: "Pas encore d'entraînement",
    createFirst: 'Créez votre premier entraînement pour commencer',
    // Workout Creation
    workoutName: "Nom de l'entraînement",
    enterWorkoutName: 'ex: Haut du corps',
    createWorkout: "Créer l'entraînement",
    creating: 'Création...',
    // Exercise Selection
    searchExercises: 'Rechercher des exercices...',
    selectedExercises: 'Exercices sélectionnés',
    exercise: 'Exercice',
    of: 'sur',
    // Exercise Details
    sets: 'Séries',
    reps: 'Répétitions',
    rest: 'Repos',
    weight: 'Poids',
    lastWeight: 'Dernier poids',
    // Actions
    next: 'Suivant',
    add: 'Ajouter',
    save: 'Enregistrer',
    saving: 'Enregistrement...',
    edit: 'Modifier',
    delete: 'Supprimer',
    cancel: 'Annuler',
    reset: 'Réinitialiser',
    resetProgress: 'Réinitialiser la progression',
    resetProgressConfirm: 'Êtes-vous sûr de vouloir supprimer toutes les données de progression pour cet exercice ? Cette action est irréversible.',
    // Exercise Progress
    selectExercise: 'Sélectionner un exercice',
    maxWeight: 'Poids maximum',
    improvement: 'Progression',
    viewDetails: 'Voir détails',
    noProgressData: "Pas encore de données de progression pour cet exercice",
    weightProgression: 'Progression du poids',
    volumeProgression: 'Progression du volume',
    sessionHistory: 'Historique des séances',
    volume: 'Volume',
    avgWeight: 'Poids moyen',
    // Exercise Execution
    alternativeExercises: 'Exercices alternatifs',
    exerciseDemonstration: "Démonstration de l'exercice",
    completeAllSets: 'Complétez toutes les séries pour cet exercice',
    setNumber: 'Série',
    weightKg: 'Poids (kg)',
    repsCompleted: 'Répétitions effectuées',
    // Completion
    congratulations: 'Félicitations ! 🎉',
    workoutCompleted: 'Entraînement terminé avec succès',
    totalWeight: 'Poids total soulevé',
    continue: 'Continuer',
    // Modals
    editWorkout: "Modifier l'entraînement",
    deleteWorkout: "Supprimer l'entraînement",
    deleteWorkoutConfirm: 'Êtes-vous sûr de vouloir supprimer cet entraînement ?',
    lastSession: 'Dernière séance',
    set: 'Série',
    // Time Ranges
    all: 'Tout',
    sessions: 'séances'
  }
} as const;