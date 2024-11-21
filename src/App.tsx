import React, { useState, useEffect } from 'react';
import { useWorkoutStore } from './store/workoutStore';
import { WorkoutCard } from './components/WorkoutCard';
import { NewWorkoutView } from './views/NewWorkoutView';
import { EditWorkoutView } from './views/EditWorkoutView';
import { WorkoutExecution } from './components/WorkoutExecution';
import { ProgressTab } from './components/ProgressTab';
import { BottomNavigation } from './components/BottomNavigation';
import { Languages, Plus } from 'lucide-react';
import { useLanguage } from './contexts/LanguageContext';
import { useAuth } from './contexts/AuthContext';
import { AuthModal } from './components/AuthModal';
import { WorkoutHistory } from './types/workout';

function App() {
  const { t, language, toggleLanguage } = useLanguage();
  const { user, signOut } = useAuth();
  const { workouts, fetchWorkouts, isLoading, error } = useWorkoutStore();
  const [view, setView] = useState<'home' | 'newWorkout' | 'editWorkout' | 'workout' | 'execution' | 'progress'>('home');
  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutHistory | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(!user);

  useEffect(() => {
    if (user) {
      fetchWorkouts(user.id);
    }
  }, [user, fetchWorkouts]);

  if (!user) {
    return <AuthModal onClose={() => setShowAuthModal(false)} />;
  }

  const handleWorkoutClick = (workout: WorkoutHistory) => {
    setSelectedWorkout(workout);
    setView('workout');
  };

  const handleEditWorkout = (workout: WorkoutHistory) => {
    setSelectedWorkout(workout);
    setView('editWorkout');
  };

  const renderContent = () => {
    switch (view) {
      case 'newWorkout':
        return (
          <NewWorkoutView
            onBack={() => setView('home')}
            onComplete={() => {
              setView('home');
              if (user) fetchWorkouts(user.id);
            }}
          />
        );

      case 'editWorkout':
        if (!selectedWorkout) return null;
        return (
          <EditWorkoutView
            workout={selectedWorkout}
            onBack={() => setView('home')}
            onComplete={() => {
              setView('home');
              if (user) fetchWorkouts(user.id);
            }}
          />
        );

      case 'workout':
        if (!selectedWorkout) return null;
        return (
          <WorkoutExecution
            workout={selectedWorkout}
            onComplete={() => {
              setSelectedWorkout(null);
              setView('home');
              if (user) fetchWorkouts(user.id);
            }}
            onBack={() => {
              setSelectedWorkout(null);
              setView('home');
            }}
          />
        );

      case 'progress':
        return <ProgressTab />;

      default:
        return (
          <div className="min-h-screen px-4 pb-24">
            <header className="py-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold">
                    {`${t('welcomeBack')}, ${user.user_metadata.name || user.email}`}
                  </h1>
                  <p className="text-white/60">{t('letsWorkout')}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleLanguage}
                    className="p-2 hover:bg-white/10 rounded-xl flex items-center gap-2"
                  >
                    <Languages className="w-5 h-5" />
                    <span className="text-sm font-medium uppercase">{language}</span>
                  </button>
                  <button
                    onClick={() => signOut()}
                    className="p-2 hover:bg-white/10 rounded-xl text-sm"
                  >
                    {t('signOut')}
                  </button>
                </div>
              </div>
            </header>

            <main className="space-y-6">
              <div className="glass-card p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">{t('quickStats')}</h2>
                </div>
                <div className="glass-card p-4">
                  <p className="text-white/60 text-sm">{t('totalWorkouts')}</p>
                  <p className="text-2xl font-bold">{workouts?.length || 0}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">{t('yourWorkouts')}</h2>
                  <button
                    onClick={() => setView('newWorkout')}
                    className="glass-button px-4 py-2 flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    {t('new')}
                  </button>
                </div>

                {isLoading ? (
                  <div className="glass-card p-6 text-center">
                    <p className="text-lg font-medium">{t('loading')}</p>
                  </div>
                ) : error ? (
                  <div className="glass-card p-6 text-center bg-red-500/20">
                    <p className="text-red-200">{error}</p>
                  </div>
                ) : workouts && workouts.length > 0 ? (
                  <div className="space-y-4">
                    {workouts.map((workout) => (
                      <WorkoutCard
                        key={workout.id}
                        record={workout}
                        onClick={() => handleWorkoutClick(workout)}
                        onEdit={() => handleEditWorkout(workout)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="glass-card p-6 text-center">
                    <p className="text-lg font-medium mb-2">{t('noWorkouts')}</p>
                    <p className="text-white/60">{t('createFirst')}</p>
                  </div>
                )}
              </div>
            </main>
          </div>
        );
    }
  };

  return (
    <>
      {renderContent()}
      {!['newWorkout', 'editWorkout', 'workout', 'execution'].includes(view) && (
        <BottomNavigation
          activeView={view}
          onViewChange={setView}
        />
      )}
    </>
  );
}

export default App;