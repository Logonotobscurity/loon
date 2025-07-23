import React from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

interface CTAButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  className?: string;
}

export const CTAButton = ({ children, variant = 'primary', className, ...props }: CTAButtonProps) => {
  const baseClasses = 'font-inter font-medium px-6 py-3 rounded-lg transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group';
  
  const variants = {
    primary: 'bg-primary hover:bg-primary-dark text-text-white shadow-lg hover:shadow-glow hover:-translate-y-0.5 focus:ring-4 focus:ring-primary/20',
    secondary: 'bg-bg-white-10 hover:bg-bg-white-12 text-text-white backdrop-blur-sm border border-border-white-20 hover:border-border-white-60 focus:ring-4 focus:ring-bg-white-10',
    accent: 'bg-gradient-to-r from-accent-purple to-accent-blue text-text-white hover:shadow-glow hover:-translate-y-0.5 focus:ring-4 focus:ring-accent-purple/20',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-text-white focus:ring-4 focus:ring-primary/20',
  };

  // Add glassmorphism effect for secondary variant
  const glassEffect = variant === 'secondary' ? 'before:absolute before:inset-0 before:bg-gradient-glass before:opacity-50' : '';

  return (
    <motion.button
      whileHover={{ y: props.disabled ? 0 : -2, scale: props.disabled ? 1 : 1.02 }}
      whileTap={{ scale: props.disabled ? 1 : 0.98 }}
      className={twMerge(baseClasses, variants[variant], glassEffect, className)}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary-light to-accent-blue opacity-0 group-hover:opacity-20 transition-opacity duration-300"
          initial={false}
        />
      )}
    </motion.button>
  );
};
