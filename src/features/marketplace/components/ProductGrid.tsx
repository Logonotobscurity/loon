import React, { memo } from 'react';
import { ProductMarketplaceCard } from './ProductMarketplaceCard';
import { MarketplaceProduct } from '../data/marketplaceData';

interface ProductGridProps {
  products: MarketplaceProduct[];
  onViewDetails: (productId: string) => void;
}

export const ProductGrid = memo(({ products, onViewDetails }: ProductGridProps) => {
  return (
    <div className="flex overflow-x-auto space-x-4 sm:space-x-6 pb-4 hide-scrollbar">
      {products.map(product => (
        <ProductMarketplaceCard
          key={product.id}
          product={product}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
});

ProductGrid.displayName = 'ProductGrid';