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
    whileTap: { scale: 0.98 }
  } : {};

  return (
    <CardWrapper
      {...hoverProps}
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl bg-bg-white-10 backdrop-blur-xl border border-border-white-10 
        ${hoverable ? 'cursor-pointer hover:bg-bg-white-12 hover:border-border-white-20 hover:shadow-glass transition-all duration-300' : ''} 
        ${className}`}
    >
      {withGradient && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent-purple/5 opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-transparent to-transparent" />
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

export const StandardCardDescription: React.FC<StandardCardDescriptionProps> = ({ children, className = '' }) => {
  return (
    <p className={`text-text-white-60 font-inter text-sm leading-relaxed ${className}`}>
      {children}
    </p>
  );
};
