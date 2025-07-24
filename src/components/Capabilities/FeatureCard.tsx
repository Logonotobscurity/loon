import React from 'react';
import { LucideProps } from 'lucide-react';
import { StandardCard, StandardCardIcon, StandardCardTitle, StandardCardDescription } from '../Global/StandardCard';

interface FeatureCardProps {
  icon: React.ComponentType<LucideProps>;
  title: string;
  description: string;
}

export const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  return (
    <StandardCard className="p-6 group h-full" hoverable={false}>
      <StandardCardIcon icon={Icon as any} />
      <StandardCardTitle>{title}</StandardCardTitle>
      <StandardCardDescription>{description}</StandardCardDescription>
    </StandardCard>
  );
};
