import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { MarketplaceProduct } from '../data/marketplaceData';

interface ProductMarketplaceCardProps {
  product: MarketplaceProduct;
  onViewDetails?: (productId: string) => void;
  backgroundImage?: string;
}

export const ProductMarketplaceCard = memo(({
  product,
  onViewDetails,
  backgroundImage,
}: ProductMarketplaceCardProps) => {
  const handleClick = () => {
    if (onViewDetails) {
      onViewDetails(product.id);
    }
  };

  // Convert category to readable label
  const categoryLabels: { [key: string]: string } = {
    'automation-ops': 'AUTOMATION OPS',
    'assistant-tools': 'ASSISTANT TOOLS',
    'process-mining': 'PROCESS MINING',
    'integration-services': 'INTEGRATION SERVICES',
    'agent-catalog': 'AGENT CATALOG'
  };

  const sectionLabel = categoryLabels[product.category] || product.category.toUpperCase();

  // Check if image exists, use gradient if not
  const hasImage = backgroundImage || (product.imageUrl && product.imageUrl !== '/images/placeholder.png');
  const imageUrl = backgroundImage || product.imageUrl;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="marketplace-card cursor-pointer flex-shrink-0 w-80 sm:w-96 mr-6"
      style={{
        backgroundImage: hasImage ? `url(${imageUrl})` : undefined,
      }}
      onClick={handleClick}
    >
      {/* Abstract gradient background - always present as fallback */}
      <div className="marketplace-card-gradient" />
      
      {/* Bottom overlay */}
      <div className="marketplace-card-overlay" />
      
      {/* Content */}
      <div className="marketplace-card-content">
        <span className="marketplace-card-label">{sectionLabel}</span>
        <h3 className="marketplace-card-title">{product.name}</h3>
        <p className="marketplace-card-subheading">FEATURES</p>
        
        <ul className="marketplace-card-workflows">
          {product.tags.slice(0, 4).map((tag, index) => (
            <li key={index} className="marketplace-card-workflow-item">
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
});

ProductMarketplaceCard.displayName = 'ProductMarketplaceCard';
