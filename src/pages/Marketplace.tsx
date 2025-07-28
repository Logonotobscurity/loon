import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, ArrowRight, Sparkles } from 'lucide-react';
import { AppHeader } from '../components/Header/AppHeader';
import { Footer } from '../components/Footer/Footer';
import { GridBackground } from '../components/Global/GridBackground';
import { SectionWrapper } from '../components/Global/SectionWrapper';
import { CTAButton } from '../components/Global/CTAButton';
import { EnhancedProductCard } from '../components/Marketplace/EnhancedProductCard';
import { SimpleProductCard } from '../components/Marketplace/SimpleProductCard';
import { ProductMarketplaceCard } from '../components/Marketplace/ProductMarketplaceCard';
import { MarketplaceCard } from '../components/Marketplace/MarketplaceCard';
import { ResponsiveModal } from '../components/Global/ResponsiveModal';
import { marketplaceProducts, MarketplaceProduct, customMarketplaceCategories, industryCategories } from '../data/marketplaceData';
import Meta from '../components/Meta';

const Marketplace = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showCreatorModal, setShowCreatorModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const trendingProducts = marketplaceProducts.filter(product => product.isTrending);

  const filteredProducts = marketplaceProducts.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesIndustry = selectedIndustry === 'all' || product.industry === selectedIndustry;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesIndustry && matchesSearch;
  });

  const handleViewDetails = (productId: string) => {
    navigate(`/marketplace/products/${productId}`);
  };

  const CreatorModal = () => (
    <motion.div
      className="bg-bg-dark-90 border border-border-white-20 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
    >
        <button
          onClick={() => setShowCreatorModal(false)}
          className="float-right text-text-white-60 hover:text-text-white transition-colors"
        >
          ✕
        </button>
        
        <div className="mb-6">
          <h2 className="font-satoshi font-bold text-2xl text-text-white mb-4">
            Unlock Your Creator Potential with LOG_ON
          </h2>
          <p className="text-text-white-80 mb-6">
            Joining the LOG_ON creator community means transforming your ideas into powerful AI agents and automations. Whether you're a seasoned developer or a no-code enthusiast, our comprehensive toolkit makes it easy to build, publish, and monetize your intelligence.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
              <h3 className="font-semibold text-primary mb-2">Easy-to-Use SDK/APIs</h3>
              <p className="text-sm text-text-white-70">Seamless integration for robust development.</p>
            </div>
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
              <h3 className="font-semibold text-primary mb-2">No-Code/Low-Code Tools</h3>
              <p className="text-sm text-text-white-70">Build automations without complex coding.</p>
            </div>
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
              <h3 className="font-semibold text-primary mb-2">Global/Regional Reach</h3>
              <p className="text-sm text-text-white-70">Tap into a growing user base, including our Africa-first market.</p>
            </div>
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
              <h3 className="font-semibold text-primary mb-2">Fair Monetization</h3>
              <p className="text-sm text-text-white-70">Earn revenue through our transparent marketplace model.</p>
            </div>
          </div>
        </div>
        
        <form className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              className="bg-bg-dark border border-border-white-20 rounded-lg px-4 py-3 text-text-white placeholder-text-white-40 focus:border-primary focus:outline-none"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="bg-bg-dark border border-border-white-20 rounded-lg px-4 py-3 text-text-white placeholder-text-white-40 focus:border-primary focus:outline-none"
            />
          </div>
          
          <select className="w-full bg-bg-dark border border-border-white-20 rounded-lg px-4 py-3 text-text-white focus:border-primary focus:outline-none">
            <option value="">Developer Type</option>
            <option value="individual">Individual Developer</option>
            <option value="agency">Small Agency</option>
            <option value="enterprise">Enterprise Solution Provider</option>
            <option value="other">Other</option>
          </select>
          
          <div>
            <label className="block text-text-white-80 mb-2">Primary Interest (select all that apply):</label>
            <div className="grid grid-cols-2 gap-2">
              {['Building AI Agents', 'Creating Automations', 'Providing Integration Services', 'Consulting/Partnership'].map((interest) => (
                <label key={interest} className="flex items-center gap-2 text-sm text-text-white-70">
                  <input type="checkbox" className="rounded border-border-white-20" />
                  {interest}
                </label>
              ))}
            </div>
          </div>
          
          <textarea
            placeholder="Message/Brief Idea (Optional)"
            rows={4}
            className="w-full bg-bg-dark border border-border-white-20 rounded-lg px-4 py-3 text-text-white placeholder-text-white-40 focus:border-primary focus:outline-none resize-none"
          />
          
          <CTAButton variant="primary" className="w-full">
            Apply to Become a Creator
          </CTAButton>
          
          <p className="text-xs text-text-white-60 text-center">
            Our team will review your application and provide access to our developer toolkit and resources.
          </p>
        </form>
    </motion.div>
  );

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
              
              <div className="hidden lg:grid lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {trendingProducts.map((product) => (
                  <ProductMarketplaceCard
                    key={product.id}
                    product={product}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>

              <div className="lg:hidden">
                <div className="overflow-x-auto scrollbar-hide">
                  <div className="flex gap-4 pb-4" style={{ width: 'max-content' }}>
                    {trendingProducts.map((product) => (
                      <div key={product.id} className="flex-shrink-0 w-80">
                        <ProductMarketplaceCard
                          product={product}
                          onViewDetails={handleViewDetails}
                        />
                      </div>
                    ))}
                  </div>
                </div>
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
              <div className="flex flex-col lg:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-white-40 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search products, tags, or descriptions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-bg-dark-90 border border-border-white-20 rounded-lg pl-10 pr-4 py-3 text-text-white placeholder-text-white-40 focus:border-primary focus:outline-none"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-4 lg:w-auto">
                  <select
                    value={selectedIndustry}
                    onChange={(e) => setSelectedIndustry(e.target.value)}
                    className="bg-bg-dark-90 border border-border-white-20 rounded-lg px-4 py-3 text-text-white focus:border-primary focus:outline-none min-w-[200px]"
                  >
                    <option value="all">All Industries</option>
                    {industryCategories.map((industry) => (
                      <option key={industry.id} value={industry.id}>
                        {industry.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Category Navigation */}
              <div className="flex flex-wrap gap-2 mb-8 justify-center">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === 'all'
                      ? 'bg-primary text-bg-dark'
                      : 'bg-bg-dark-90 text-text-white-70 hover:text-text-white border border-border-white-20'
                  }`}
                >
                  All Categories
                </button>
                {customMarketplaceCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedCategory === category.id
                        ? 'bg-primary text-bg-dark'
                        : 'bg-bg-dark-90 text-text-white-70 hover:text-text-white border border-border-white-20'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Description */}
            {selectedCategory !== 'all' && (
              <div className="text-center mb-8">
                {customMarketplaceCategories
                  .filter(cat => cat.id === selectedCategory)
                  .map(category => (
                    <div key={category.id}>
                      <h3 className="font-satoshi font-semibold text-2xl text-text-white mb-2">
                        {category.title}
                      </h3>
                      <p className="text-text-white-70 max-w-3xl mx-auto">
                        {category.description}
                      </p>
                    </div>
                  ))}
              </div>
            )}

            {/* Filter Status & Debug Info */}
            <div className="mb-6 text-center">
              <div className="flex flex-wrap items-center justify-center gap-2 mb-2">
                {selectedCategory !== 'all' && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                    Category: {customMarketplaceCategories.find(cat => cat.id === selectedCategory)?.name}
                    <button 
                      onClick={() => setSelectedCategory('all')}
                      className="ml-2 hover:text-primary-light"
                    >
                      ×
                    </button>
                  </span>
                )}
                {selectedIndustry !== 'all' && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary border border-secondary/20">
                    Industry: {industryCategories.find(ind => ind.id === selectedIndustry)?.name}
                    <button 
                      onClick={() => setSelectedIndustry('all')}
                      className="ml-2 hover:text-secondary-light"
                    >
                      ×
                    </button>
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent-purple/10 text-accent-purple border border-accent-purple/20">
                    Search: "{searchQuery}"
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="ml-2 hover:text-accent-purple-light"
                    >
                      ×
                    </button>
                  </span>
                )}
              </div>
              <p className="text-text-white-60 text-sm">
                Showing {filteredProducts.length} of {marketplaceProducts.length} products
                {(selectedCategory !== 'all' || selectedIndustry !== 'all' || searchQuery) && (
                  <button 
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedIndustry('all');
                      setSearchQuery('');
                    }}
                    className="ml-4 text-primary hover:text-primary-light text-xs underline"
                  >
                    Clear all filters
                  </button>
                )}
              </p>
            </div>

            {/* Products Grid - Desktop */}
            <div className="hidden lg:grid lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductMarketplaceCard
                  key={product.id}
                  product={product}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>

            {/* Products Horizontal Scroll - Mobile/Tablet */}
            <div className="lg:hidden">
              <div className="overflow-x-auto scrollbar-hide">
                <div className="flex gap-4 pb-4" style={{ width: 'max-content' }}>
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="flex-shrink-0 w-80">
                      <ProductMarketplaceCard
                        product={product}
                        onViewDetails={handleViewDetails}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

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
          <CreatorModal />
        </ResponsiveModal>
      )}
    </>
  );
};

export default Marketplace;
