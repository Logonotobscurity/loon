import React from 'react';
import { useNavigate } from 'react-router-dom';
import { marketplaceProducts } from '../../features/marketplace/data/marketplaceData';
import { ProductMarketplaceCard } from '../../features/marketplace/components/ProductMarketplaceCard';
import { SectionWrapper } from '../Global/SectionWrapper';
import { CTAButton } from '../Global/CTAButton';

export const MarketplaceSection = () => {
  const navigate = useNavigate();
  const randomProducts = [...marketplaceProducts].sort(() => 0.5 - Math.random()).slice(0, 4);

  const handleViewDetails = (productId: string) => {
    navigate(`/marketplace/products/${productId}`);
  };

  return (
    <SectionWrapper>
      <div className="text-center mb-12">
        <h2 className="font-satoshi font-bold text-3xl md:text-4xl text-text-white mb-4">
          Explore Our AI Marketplace
        </h2>
        <p className="text-text-white-70 max-w-2xl mx-auto">
          Discover powerful agents and automations built by our creator community.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {randomProducts.map((product) => (
          <ProductMarketplaceCard
            key={product.id}
            product={product}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>
      <div className="text-center mt-12">
        <CTAButton variant="primary" onClick={() => navigate('/marketplace')}>
          View Full Marketplace
        </CTAButton>
      </div>
    </SectionWrapper>
  );
};
