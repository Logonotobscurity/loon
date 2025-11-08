import React from 'react';
import { LucideProps } from 'lucide-react';
import { StandardCard, StandardCardIcon, StandardCardTitle, StandardCardDescription } from '../Global/StandardCard';

interface FeatureCardProps {
  icon: React.ComponentType<LucideProps>;
  title: string;
  description: string;
}

/**
 * A card component that displays a feature with an icon, title, and description.
 *
 * @param {object} props - The properties for the component.
 * @param {React.ComponentType<LucideProps>} props.icon - The icon for the feature.
 * @param {string} props.title - The title of the feature.
 * @param {string} props.description - The description of the feature.
 * @returns {JSX.Element} The rendered feature card.
 */
export const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  return (
    <StandardCard className="p-6 group h-full" hoverable={false}>
      <StandardCardIcon icon={Icon as any} />
      <StandardCardTitle>{title}</StandardCardTitle>
      <StandardCardDescription>{description}</StandardCardDescription>
    </StandardCard>
  );
};
