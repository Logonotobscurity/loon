import React from 'react';
import { motion } from 'framer-motion';

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const SectionWrapper = ({ children, className = '', id }: SectionWrapperProps) => {
  return (
    <motion.section
      id={id}
      className={`container px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.section>
  );
};
