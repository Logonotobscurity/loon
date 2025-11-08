import React from 'react';
import { motion } from 'framer-motion';

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

/**
 * A wrapper component for sections with animation effects.
 *
 * @param {object} props - The properties for the component.
 * @param {React.ReactNode} props.children - The content to display inside the section.
 * @param {string} [props.className] - Additional CSS classes to apply to the section.
 * @param {string} [props.id] - The ID of the section.
 * @returns {JSX.Element} The rendered section wrapper component.
 */
export const SectionWrapper = ({ children, className = '', id }: SectionWrapperProps) => {
  return (
    <motion.section
      id={id}
      className={`container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.section>
  );
};
