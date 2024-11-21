import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../contexts/AuthContext';
import { X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const authSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
});

type AuthFormData = z.infer<typeof authSchema>;

interface AuthModalProps {
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const { t } = useLanguage();
  const { signUp, signIn, error: authError } = useAuth();
  const [isSignUp, setIsSignUp] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
  });

  const onSubmit = async (data: AuthFormData) => {
    setIsLoading(true);
    try {
      if (isSignUp) {
        await signUp(data.email, data.password, data.name);
      } else {
        await signIn(data.email, data.password);
      }
      onClose();
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal">
      <div className="glass-card p-6 w-full max-w-sm mx-auto space-y-6 animate-zoom-in">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">
            {isSignUp ? t('signUp') : t('signIn')}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-xl"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {isSignUp && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">
                {t('name')}
              </label>
              <input
                {...register('name')}
                type="text"
                className="w-full"
                placeholder={t('enterName')}
              />
              {errors.name && (
                <p className="text-sm text-red-400">{errors.name.message}</p>
              )}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">
              {t('email')}
            </label>
            <input
              {...register('email')}
              type="email"
              className="w-full"
              placeholder={t('enterEmail')}
            />
            {errors.email && (
              <p className="text-sm text-red-400">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">
              {t('password')}
            </label>
            <input
              {...register('password')}
              type="password"
              className="w-full"
              placeholder={t('enterPassword')}
            />
            {errors.password && (
              <p className="text-sm text-red-400">{errors.password.message}</p>
            )}
          </div>

          {authError && (
            <div className="glass-card p-4 bg-red-500/20 border-red-500/30">
              <p className="text-red-200">{authError}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="glass-button w-full py-3 bg-blue-500/20 hover:bg-blue-500/30 disabled:opacity-50"
          >
            {isLoading
              ? t('loading')
              : isSignUp
              ? t('signUp')
              : t('signIn')}
          </button>
        </form>

        <div className="text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm text-white/60 hover:text-white transition-colors duration-200"
          >
            {isSignUp ? t('alreadyHaveAccount') : t('needAccount')}
          </button>
        </div>
      </div>
    </div>
  );
};