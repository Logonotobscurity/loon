import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { MarketplaceProduct } from '../../data/marketplaceData';

interface EnhancedProductCardProps {
  product: MarketplaceProduct;
  onViewDetails?: (productId: string) => void;
}

export const EnhancedProductCard: React.FC<EnhancedProductCardProps> = ({ 
  product, 
  onViewDetails 
}) => {
  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(product.id);
    }
  };

  return (
    <motion.div
      className="group bg-bg-dark-90 border border-border-white-10 rounded-xl p-6 hover:border-border-white-20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Product Icon */}
      <div className="flex justify-center mb-4">
        <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <img 
            src={product.imageUrl} 
            alt={`${product.name} icon`} 
            className="w-12 h-12 object-contain"
            onError={(e) => {
              // Fallback to a default icon if image fails to load
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          />
          <div className="hidden w-12 h-12 bg-primary/30 rounded-md flex items-center justify-center">
            <ArrowRight className="w-6 h-6 text-primary" />
          </div>
        </div>
      </div>

      {/* Product Name */}
      <h3 className="font-satoshi font-semibold text-lg text-text-white mb-3 text-center group-hover:text-primary transition-colors duration-300">
        {product.name}
      </h3>

      {/* Product Description */}
      <p className="font-inter text-sm text-text-white-70 mb-4 text-center line-clamp-3 leading-relaxed">
        {product.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {product.tags.slice(0, 3).map((tag, index) => (
          <span 
            key={index}
            className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full border border-primary/20"
          >
            {tag}
          </span>
        ))}
        {product.tags.length > 3 && (
          <span className="px-3 py-1 bg-text-white-10 text-text-white-60 text-xs font-medium rounded-full">
            +{product.tags.length - 3} more
          </span>
        )}
      </div>

      {/* CTA Button */}
      <motion.button
        onClick={handleViewDetails}
        className="w-full bg-primary hover:bg-primary-hover text-bg-dark font-satoshi font-medium py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group-hover:bg-primary-hover"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        View Details
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
      </motion.button>
    </motion.div>
  );
};
