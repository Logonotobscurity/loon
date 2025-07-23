import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

interface AssessmentCardProps {
  id: number;
  title: string;
  description: string;
  duration: string;
  icon: string;
}

export const AssessmentCard = ({ title, description, duration, icon }: AssessmentCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      className="glass-card glass-card-hover p-6 cursor-pointer group"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="font-satoshi font-semibold text-xl text-text-white mb-2">{title}</h3>
      <p className="text-text-white-60 font-inter text-sm mb-4">{description}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-text-white-80">
          <Clock className="h-4 w-4" />
          <span className="text-sm">{duration}</span>
        </div>
        <button className="text-primary hover:text-primary-light font-medium text-sm transition-colors">
          Start Free →
        </button>
      </div>
    </motion.div>
  );
};
