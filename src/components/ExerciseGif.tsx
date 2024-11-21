import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useLanguage } from '../contexts/LanguageContext';

interface ExerciseGifProps {
  src?: string;
  alt: string;
  className?: string;
}

export const ExerciseGif: React.FC<ExerciseGifProps> = ({ src, alt, className = '' }) => {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div className={`w-full flex items-center justify-center text-white/40 ${className}`}>
        {t('exerciseDemonstration')}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0">
          <Skeleton height="100%" baseColor="#ffffff10" highlightColor="#ffffff20" />
        </div>
      )}
      <img 
        src={src} 
        alt={alt}
        className={`w-full h-full object-cover ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
      />
    </div>
  );
};