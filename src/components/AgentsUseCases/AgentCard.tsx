import React from 'react';
import { motion } from 'framer-motion';

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
      className="relative p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-lg overflow-hidden group list-none"
    >
      <div className="absolute inset-0 bg-gradient-radial from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10 text-center">
        <img src={imageUrl} alt={name} className="w-24 h-24 rounded-full mx-auto border-2 border-secondary" />
        <h4 className="mt-4 font-bold text-lg text-textLight">{name}</h4>
        <p className="text-sm text-secondary">{blurb}</p>
      </div>
    </motion.li>
  );
};
