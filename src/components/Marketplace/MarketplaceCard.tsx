import React from 'react';
import { motion } from 'framer-motion';

interface MarketplaceCardProps {
  sectionLabel: string;
  title: string;
  subheading: string;
  workflows: string[];
  backgroundImage?: string;
}

export const MarketplaceCard: React.FC<MarketplaceCardProps> = ({
  sectionLabel,
  title,
  subheading,
  workflows,
  backgroundImage,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="marketplace-card"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
      }}
    >
      {/* Abstract gradient background */}
      <div className="marketplace-card-gradient" />
      
      {/* Bottom overlay */}
      <div className="marketplace-card-overlay" />
      
      {/* Content */}
      <div className="marketplace-card-content">
        <span className="marketplace-card-label">{sectionLabel}</span>
        <h3 className="marketplace-card-title">{title}</h3>
        <p className="marketplace-card-subheading">{subheading}</p>
        
        <ul className="marketplace-card-workflows">
          {workflows.map((workflow, index) => (
            <li key={index} className="marketplace-card-workflow-item">
              {workflow}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};
