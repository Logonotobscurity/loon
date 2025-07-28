import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { AppHeader } from '../components/Header/AppHeader';
import { Footer } from '../components/Footer/Footer';
import { GridBackground } from '../components/Global/GridBackground';
import { SectionWrapper } from '../components/Global/SectionWrapper';
import { CTAButton } from '../components/Global/CTAButton';
import { ResponsiveModal } from '../components/Global/ResponsiveModal';
import { marketplaceProducts } from '../features/marketplace/data/marketplaceData';
import { ProductMarketplaceCard } from '../features/marketplace/components/ProductMarketplaceCard';
import Meta from '../components/Meta';
import { useMarketplaceFilters } from '../features/marketplace/hooks/useMarketplaceFilters';
import { filterProducts } from '../features/marketplace/utils/filterUtils';
import { FilterPanel } from '../features/marketplace/components/FilterPanel';
import { ProductGrid } from '../features/marketplace/components/ProductGrid';
import { CreatorModal } from '../features/marketplace/components/CreatorModal';
import { debounce } from '../utils/debounce';

const Marketplace = () => {
  const [showCreatorModal, setShowCreatorModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const { filters, updateFilter, resetFilters } = useMarketplaceFilters();
  const [searchQuery, setSearchQuery] = useState('');

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      updateFilter('search', value);
    }, 300),
    [updateFilter]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    debouncedSearch(e.target.value);
  };

  const trendingProducts = useMemo(() => 
    marketplaceProducts.filter(product => product.isTrending),
    []
  );

  const filteredProducts = useMemo(() => 
    filterProducts(marketplaceProducts, filters),
    [filters]
  );

  const handleViewDetails = (productId: string) => {
    navigate(`/marketplace/products/${productId}`);
  };



  return (
    <>
      <Meta />
      <GridBackground>
        <AppHeader />
        
        <main className="pt-20">
          {/* Hero Section */}
          <SectionWrapper className="text-center py-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-satoshi font-bold text-4xl md:text-6xl lg:text-7xl leading-tight mb-6">
                Unlock Your Business Potential:<br />
                <span className="gradient-text">The LOG_ON AI Marketplace</span>
              </h1>
              <p className="max-w-4xl mx-auto font-inter text-lg md:text-xl text-text-white-80 mb-8 px-4">
                Discover powerful AI Agents, Automations, Integrations, and more. Built for growth, optimized for your economy.
              </p>
              <CTAButton 
                variant="primary" 
                size="lg"
                onClick={() => document.getElementById('marketplace-products')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore All Solutions
                <ArrowRight className="w-5 h-5 ml-2" />
              </CTAButton>
            </motion.div>
          </SectionWrapper>

          {/* Discover & Explore Section */}
          <SectionWrapper className="py-16">
            <div className="text-center mb-12">
              <h2 className="font-satoshi font-bold text-3xl md:text-4xl text-text-white mb-4">
                Discover Your Next Breakthrough
              </h2>
              <p className="text-text-white-70 max-w-2xl mx-auto">
                Guide yourself to relevant solutions that transform your business operations
              </p>
            </div>
            
            <div className="grid md:grid-cols-1 gap-6 mb-16">
              <motion.div
                className="glass-card p-6 text-center group hover:border-primary/50 transition-all duration-300"
                whileHover={{ y: -4 }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-satoshi font-semibold text-xl text-text-white mb-3">See What's Trending</h3>
                <p className="text-text-white-70 mb-4">Explore popular agents and community-contributed automations.</p>
                <button 
                  onClick={() => document.getElementById('trending-products')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-primary hover:text-primary-hover font-medium"
                  aria-label="View trending products"
                >
                  View Trending →
                </button>
              </motion.div>
            </div>
          </SectionWrapper>

          {/* Create & Monetize Section */}
          <SectionWrapper className="py-16 bg-bg-dark-95">
            <div className="text-center mb-12">
              <h2 className="font-satoshi font-bold text-3xl md:text-4xl text-text-white mb-4">
                Innovate & Partner with LOG_ON
              </h2>
              <p className="text-text-white-70 max-w-2xl mx-auto">
                Join our ecosystem of creators and build the future of autonomous business
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                className="glass-card p-6 text-center group hover:border-primary/50 transition-all duration-300"
                whileHover={{ y: -4 }}
              >
                <h3 className="font-satoshi font-semibold text-xl text-text-white mb-3">Become a Creator</h3>
                <p className="text-text-white-70 mb-4">Build, publish, and monetize your AI agents & automations on LOG_ON.</p>
                <CTAButton 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowCreatorModal(true)}
                >
                  Get Started
                </CTAButton>
              </motion.div>
              
              <motion.div
                className="glass-card p-6 text-center group hover:border-primary/50 transition-all duration-300"
                whileHover={{ y: -4 }}
              >
                <h3 className="font-satoshi font-semibold text-xl text-text-white mb-3">Submit Your Solutions</h3>
                <p className="text-text-white-70 mb-4">Got an idea? Share your no-code/low-code automations with our global audience.</p>
                <CTAButton variant="outline" size="sm">
                  Submit Solution
                </CTAButton>
              </motion.div>
              
              <motion.div
                className="glass-card p-6 text-center group hover:border-primary/50 transition-all duration-300"
                whileHover={{ y: -4 }}
              >
                <h3 className="font-satoshi font-semibold text-xl text-text-white mb-3">Monetize Your Creations</h3>
                <p className="text-text-white-70 mb-4">Leverage our marketplace for fair revenue sharing and reach a growing user base.</p>
                <CTAButton variant="outline" size="sm">
                  Learn More
                </CTAButton>
              </motion.div>
            </div>
          </SectionWrapper>

          {/* What's Trending Section */}
          {trendingProducts.length > 0 && (
            <SectionWrapper id="trending-products" className="py-16">
              <div className="text-center mb-12">
                <h2 className="font-satoshi font-bold text-3xl md:text-4xl text-text-white mb-4">
                  What's Trending
                </h2>
                <p className="text-text-white-70 max-w-2xl mx-auto">
                  Explore the most popular AI agents and automations trending in our marketplace.
                </p>
              </div>
              
              <div className="flex overflow-x-auto pb-4 hide-scrollbar gap-4 sm:gap-6">
                {trendingProducts.map((product) => (
                  <ProductMarketplaceCard
                    key={product.id}
                    product={product}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            </SectionWrapper>
          )}

          {/* All Agents & Automations Section */}
          <SectionWrapper id="marketplace-products" className="py-16">
            <div className="mb-8">
              <h2 className="font-satoshi font-bold text-3xl md:text-4xl text-text-white mb-4 text-center">
                Browse All Agents & Automations
              </h2>
              
              {/* Search and Filter */}
              <FilterPanel 
                filters={{...filters, search: searchQuery}}
                onFilterChange={updateFilter} 
                onSearchChange={handleSearchChange} 
              />
            </div>

            <div className="mb-6 text-center">
              <p className="text-text-white-60 text-sm">
                Showing {filteredProducts.length} of {marketplaceProducts.length} products
                {(filters.category !== 'all' || filters.industry !== 'all' || filters.search) && (
                  <button 
                    onClick={resetFilters}
                    className="ml-4 text-primary hover:text-primary-light text-xs underline"
                  >
                    Clear all filters
                  </button>
                )}
              </p>
            </div>

            {/* Products Grid - Responsive */}
            <ProductGrid products={filteredProducts} onViewDetails={handleViewDetails} />

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-text-white-60 text-lg">
                  No products found matching your criteria. Try adjusting your search or category filter.
                </p>
                <p className="text-text-white-40 text-sm mt-2">
                  Total products available: {marketplaceProducts.length}
                </p>
              </div>
            )}
          </SectionWrapper>
        </main>

        <Footer />
      </GridBackground>
      
      {showCreatorModal && (
        <ResponsiveModal isOpen={showCreatorModal} onClose={() => setShowCreatorModal(false)}>
          <CreatorModal onClose={() => setShowCreatorModal(false)} />
        </ResponsiveModal>
      )}
    </>
  );
};

export default Marketplace;
