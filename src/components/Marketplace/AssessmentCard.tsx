import React from 'react';
import { Clock } from 'lucide-react';
import { StandardCard, StandardCardTitle, StandardCardDescription } from '../Global/StandardCard';

interface AssessmentCardProps {
  id: number;
  title: string;
  description: string;
  duration: string;
  icon: string;
}

export const AssessmentCard = ({ title, description, duration, icon }: AssessmentCardProps) => {
  return (
    <StandardCard className="p-6 group">
      <div className="text-4xl mb-4">{icon}</div>
      <StandardCardTitle>{title}</StandardCardTitle>
      <StandardCardDescription className="mb-4">{description}</StandardCardDescription>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-text-white-80">
          <Clock className="h-4 w-4" />
          <span className="text-sm">{duration}</span>
        </div>
        <button className="text-primary hover:text-primary-light font-medium text-sm transition-colors">
          Start Free →
        </button>
      </div>
    </StandardCard>
  );
};
