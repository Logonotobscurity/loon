import React from 'react';
import { motion } from 'framer-motion';
import { StandardCard, StandardCardTitle, StandardCardDescription } from '../Global/StandardCard';

interface AgentCardProps {
  name: string;
  blurb: string;
  imageUrl: string;
  index: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    },
  }),
};

export const AgentCard = ({ name, blurb, imageUrl, index }: AgentCardProps) => {
  return (
    <motion.li
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index}
      className="list-none"
    >
      <StandardCard className="p-6 group text-center">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-24 h-24 rounded-full mx-auto border-2 border-primary mb-4" 
        />
        <StandardCardTitle className="text-center">{name}</StandardCardTitle>
        <StandardCardDescription className="text-center">{blurb}</StandardCardDescription>
      </StandardCard>
    </motion.li>
  );
};
