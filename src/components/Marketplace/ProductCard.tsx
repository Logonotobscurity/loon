import React from 'react';
import { motion } from 'framer-motion';
import { CTAButton } from '../Global/CTAButton';

interface ProductCardProps {
  id: number;
  title: string;
  description: string;
  price: string;
  thumbnail: string;
}

export const ProductCard = ({ title, description, price, thumbnail }: ProductCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      className="glass-card glass-card-hover overflow-hidden group cursor-pointer"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 to-transparent" />
      </div>
      <div className="p-6">
        <h3 className="font-satoshi font-semibold text-xl text-text-white mb-2">{title}</h3>
        <p className="text-text-white-60 font-inter text-sm mb-4 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-primary font-medium">{price}</span>
          <CTAButton variant="secondary" className="!py-2 !px-4 text-sm">
            Learn More
          </CTAButton>
        </div>
      </div>
    </motion.div>
  );
};
