import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StandardCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
  withGradient?: boolean;
}

/**
 * A standard card component with optional hover effects and gradient background.
 *
 * @param {object} props - The properties for the component.
 * @param {React.ReactNode} props.children - The content to display inside the card.
 * @param {string} [props.className] - Additional CSS classes to apply to the card.
 * @param {Function} [props.onClick] - The function to call when the card is clicked.
 * @param {boolean} [props.hoverable=true] - Whether the card should have hover effects.
 * @param {boolean} [props.withGradient=true] - Whether the card should have a gradient background.
 * @returns {JSX.Element} The rendered card component.
 */
export const StandardCard: React.FC<StandardCardProps> = ({ 
  children, 
  className = '', 
  onClick,
  hoverable = true,
  withGradient = true
}) => {
  const CardWrapper = hoverable ? motion.div : 'div';
  const hoverProps = hoverable ? {
    whileHover: { scale: 1.02, y: -5 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.3, ease: 'easeOut' }
  } : {};

  return (
    <CardWrapper
      {...hoverProps}
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl bg-bg-white-10 backdrop-blur-xl border border-border-white-20 shadow-lg
        ${hoverable ? 'cursor-pointer hover:bg-bg-white-12 hover:border-primary hover:shadow-glass transition-all duration-300' : ''} 
        ${className}`}
    >
      {withGradient && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent-purple/10 opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/90 via-transparent to-transparent" />
        </>
      )}
      <div className="relative z-10">
        {children}
      </div>
    </CardWrapper>
  );
};

interface StandardCardIconProps {
  icon: LucideIcon;
  className?: string;
}

/**
 * An icon component for use within a StandardCard.
 *
 * @param {object} props - The properties for the component.
 * @param {LucideIcon} props.icon - The icon to display.
 * @param {string} [props.className] - Additional CSS classes to apply to the icon container.
 * @returns {JSX.Element} The rendered icon component.
 */
export const StandardCardIcon: React.FC<StandardCardIconProps> = ({ icon: Icon, className = '' }) => {
  return (
    <div className={`bg-primary/10 backdrop-blur-sm p-4 rounded-xl mb-4 group-hover:bg-primary/20 transition-colors duration-300 ${className}`}>
      <Icon className="h-8 w-8 text-primary" />
    </div>
  );
};

interface StandardCardTitleProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * A title component for use within a StandardCard.
 *
 * @param {object} props - The properties for the component.
 * @param {React.ReactNode} props.children - The content to display as the title.
 * @param {string} [props.className] - Additional CSS classes to apply to the title.
 * @returns {JSX.Element} The rendered title component.
 */
export const StandardCardTitle: React.FC<StandardCardTitleProps> = ({ children, className = '' }) => {
  return (
    <h3 className={`font-satoshi font-semibold text-xl text-text-white mb-3 ${className}`}>
      {children}
    </h3>
  );
};

interface StandardCardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * A description component for use within a StandardCard.
 *
 * @param {object} props - The properties for the component.
 * @param {React.ReactNode} props.children - The content to display as the description.
 * @param {string} [props.className] - Additional CSS classes to apply to the description.
 * @returns {JSX.Element} The rendered description component.
 */
export const StandardCardDescription: React.FC<StandardCardDescriptionProps> = ({ children, className = '' }) => {
  return (
    <p className={`text-text-white-60 font-inter text-sm leading-relaxed ${className}`}>
      {children}
    </p>
  );
};
