import React from 'react';
import { motion } from 'framer-motion';
import { LucideProps } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ComponentType<LucideProps>;
  title: string;
  description: string;
}

export const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="glass-card glass-card-hover p-6 hover:shadow-glow transition-all duration-300 cursor-pointer group"
    >
      <div className="bg-primary/10 backdrop-blur-sm p-4 rounded-xl mb-4 group-hover:bg-primary/20 transition-colors duration-300">
        <Icon className="h-8 w-8 text-primary" />
      </div>
      <h3 className="text-xl font-satoshi font-semibold text-text-white mb-2">{title}</h3>
      <p className="text-text-white-60 font-inter text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
};
