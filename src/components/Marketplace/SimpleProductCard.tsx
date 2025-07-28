import React from 'react';
import { MarketplaceProduct } from '../../data/marketplaceData';

interface SimpleProductCardProps {
  product: MarketplaceProduct;
  onViewDetails?: (productId: string) => void;
}

export const SimpleProductCard: React.FC<SimpleProductCardProps> = ({ 
  product, 
  onViewDetails 
}) => {
  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(product.id);
    }
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-blue-500 transition-all duration-300">
      {/* Product Icon */}
      <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
        <span className="text-white text-lg font-bold">
          {product.name.substring(0, 2)}
        </span>
      </div>

      {/* Product Name */}
      <h3 className="text-white font-semibold text-base mb-2 text-center">
        {product.name}
      </h3>

      {/* Product Description */}
      <p className="text-gray-300 text-sm mb-3 text-center">
        {product.description.substring(0, 80)}...
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-4 justify-center">
        {product.tags.slice(0, 2).map((tag, index) => (
          <span 
            key={index}
            className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* CTA Button */}
      <button
        onClick={handleViewDetails}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
      >
        View Details
      </button>
    </div>
  );
};
