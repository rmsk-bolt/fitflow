import React from 'react';
import { LucideIcon, ChevronRight } from 'lucide-react';

interface ExerciseStatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  onClick?: () => void;
}

export const ExerciseStatCard: React.FC<ExerciseStatCardProps> = ({
  icon: Icon,
  label,
  value,
  onClick,
}) => {
  const CardComponent = onClick ? 'button' : 'div';

  return (
    <CardComponent
      onClick={onClick}
      className={`glass-card p-3 flex flex-col relative ${
        onClick ? 'hover:bg-white/5 transition-colors duration-200' : ''
      }`}
    >
      <div className="flex items-center gap-1.5 mb-2">
        <Icon className="w-4 h-4 text-white/60" />
        <p className="text-sm text-white/60 line-clamp-1">{label}</p>
      </div>
      <div className="flex-1 flex items-end justify-center">
        <div className="flex items-center gap-1">
          <p className="text-xl font-bold">{value}</p>
          {onClick && <ChevronRight className="w-4 h-4 text-purple-400" />}
        </div>
      </div>
    </CardComponent>
  );
};