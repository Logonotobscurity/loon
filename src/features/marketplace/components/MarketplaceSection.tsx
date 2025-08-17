import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { marketplaceProducts, MarketplaceProduct } from '../data/marketplaceData';
import { ProductMarketplaceCard } from './ProductMarketplaceCard';
import { SectionWrapper } from '../../../components/Global/SectionWrapper';
import { CTAButton } from '../../../components/Global/CTAButton';
import { useMarketplaceStore } from '../../../store/marketplaceStore';


interface MarketplaceSectionProps {
  isFullPage?: boolean; // New prop to indicate if it's the full marketplace page
}

// This component is currently used on the homepage to show a random selection.
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
      <div className="flex overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
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

// This component could be used on the actual marketplace page
export const FullMarketplaceSection = () => {
  const navigate = useNavigate();
  const searchQuery = useMarketplaceStore((state) => state.filters.search);
  const filters = useMarketplaceStore((state) => state.filters);

  const productGridRef = useRef<HTMLDivElement>(null); // Ref for scrolling

  // Scroll to the top of the product grid when filteredProducts changes
  useEffect(() => {
    if (productGridRef.current) {
      productGridRef.current.scrollTop = 0;
    }
  }, [searchQuery, filters]); // Depend on searchQuery and filters

  const filteredProducts = marketplaceProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch; // Only filtering by search query for now
  });

  const handleViewDetails = (productId: string) => {
    navigate(`/marketplace/products/${productId}`);
  };

  return (
    <SectionWrapper>
      <div className="text-center mb-12">
        <h2 className="font-satoshi font-bold text-3xl md:text-4xl text-text-white mb-4">
          All AI Products
        </h2>
        <p className="text-text-white-70 max-w-2xl mx-auto">
          Browse the complete list of agents and automations.
        </p>
      </div>
      <div ref={productGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto max-h-[calc(100vh-300px)]"> {/* Example grid layout - Added max-height and overflow for scrolling */}
        {filteredProducts.map((product: MarketplaceProduct) => (
          <ProductMarketplaceCard
            key={product.id}
            product={product}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>
    </SectionWrapper>
  );
};
