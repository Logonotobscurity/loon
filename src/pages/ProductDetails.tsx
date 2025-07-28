import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Star, ExternalLink, Shield, Clock, Users } from 'lucide-react';
import { AppHeader } from '../components/Header/AppHeader';
import { Footer } from '../components/Footer/Footer';
import { GridBackground } from '../components/Global/GridBackground';
import { SectionWrapper } from '../components/Global/SectionWrapper';
import { CTAButton } from '../components/Global/CTAButton';
import { marketplaceProducts, customMarketplaceCategories } from '../features/marketplace/data/marketplaceData';
import Meta from '../components/Meta';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const product = marketplaceProducts.find(p => p.id === id);
  const category = customMarketplaceCategories.find(c => c.value === product?.category);
  
  if (!product) {
    return (
      <GridBackground>
        <AppHeader />
        <main className="pt-20">
          <SectionWrapper className="text-center py-16">
            <h1 className="font-satoshi font-bold text-4xl text-text-white mb-4">
              Product Not Found
            </h1>
            <p className="text-text-white-70 mb-8">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <CTAButton 
              variant="primary"
              onClick={() => navigate('/marketplace')}
            >
              Back to Marketplace
            </CTAButton>
          </SectionWrapper>
        </main>
        <Footer />
      </GridBackground>
    );
  }

  return (
    <>
      <Meta 
        title={`${product.name} | LOG_ON Marketplace`}
        description={product.description}
      />
      <GridBackground>
        <AppHeader />
        
        <main className="pt-20">
          {/* Breadcrumb */}
          <SectionWrapper className="py-4">
            <nav className="flex items-center gap-2 text-sm">
              <Link 
                to="/marketplace" 
                className="text-text-white-60 hover:text-primary transition-colors"
              >
                Marketplace
              </Link>
              <span className="text-text-white-40">/</span>
              <span className="text-text-white-60">{category?.name}</span>
              <span className="text-text-white-40">/</span>
              <span className="text-text-white">{product.name}</span>
            </nav>
          </SectionWrapper>

          {/* Product Header */}
          <SectionWrapper className="py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <button
                onClick={() => navigate('/marketplace')}
                className="flex items-center gap-2 text-text-white-60 hover:text-primary transition-colors mb-6"
                aria-label="Back to Marketplace"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Marketplace
              </button>

              <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Product Image & Basic Info */}
                <div>
                  <div className="w-40 h-40 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center mb-6 mx-auto lg:mx-0">
                    <img 
                      src={product.imageUrl} 
                      alt={`${product.name} icon`} 
                      className="w-24 h-24 object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <div className="hidden w-24 h-24 bg-primary/30 rounded-xl flex items-center justify-center">
                      <ExternalLink className="w-12 h-12 text-primary" />
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="glass-card p-4">
                      <Shield className="w-6 h-6 text-primary mx-auto mb-2" />
                      <div className="text-xs text-text-white-60">Security</div>
                      <div className="text-sm font-semibold text-text-white">Enterprise</div>
                    </div>
                    <div className="glass-card p-4">
                      <Clock className="w-6 h-6 text-secondary mx-auto mb-2" />
                      <div className="text-xs text-text-white-60">Setup Time</div>
                      <div className="text-sm font-semibold text-text-white">&lt; 30 min</div>
                    </div>
                    <div className="glass-card p-4">
                      <Users className="w-6 h-6 text-primary mx-auto mb-2" />
                      <div className="text-xs text-text-white-60">Users</div>
                      <div className="text-sm font-semibold text-text-white">1000+</div>
                    </div>
                  </div>
                </div>

                {/* Product Details */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full border border-primary/20">
                      {category?.name}
                    </span>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                      <span className="text-sm text-text-white-60 ml-2">(4.8)</span>
                    </div>
                  </div>

                  <h1 className="font-satoshi font-bold text-3xl lg:text-4xl text-text-white mb-4">
                    {product.name}
                  </h1>

                  <p className="text-text-white-80 text-lg leading-relaxed mb-6">
                    {product.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {product.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-text-white-10 text-text-white-70 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <CTAButton variant="primary" size="lg" className="flex-1">
                      <Download className="w-5 h-5 mr-2" />
                      Install Now
                    </CTAButton>
                    <CTAButton variant="outline" size="lg" className="flex-1">
                      <ExternalLink className="w-5 h-5 mr-2" />
                      View Demo
                    </CTAButton>
                  </div>

                  {/* Pricing Info */}
                  <div className="mt-8 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-text-white-60">Starting at</div>
                        <div className="text-2xl font-bold text-primary">Free</div>
                        <div className="text-xs text-text-white-60">with regional pricing</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-text-white-60">Enterprise</div>
                        <div className="text-lg font-semibold text-text-white">Contact Us</div>
                        <div className="text-xs text-text-white-60">custom solutions</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </SectionWrapper>

          {/* Detailed Information Tabs */}
          <SectionWrapper className="py-16">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {/* Overview */}
                <div className="glass-card p-6">
                  <h3 className="font-satoshi font-semibold text-xl text-text-white mb-4">
                    Overview
                  </h3>
                  <p className="text-text-white-70 leading-relaxed mb-4">
                    {product.description} This powerful solution integrates seamlessly with your existing workflow and provides enterprise-grade capabilities with regional pricing that works for your economy.
                  </p>
                  <ul className="space-y-2 text-text-white-70">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      Quick deployment in under 30 minutes
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      Enterprise-grade security and compliance
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      24/7 community and professional support
                    </li>
                  </ul>
                </div>

                {/* Technical Requirements */}
                <div className="glass-card p-6">
                  <h3 className="font-satoshi font-semibold text-xl text-text-white mb-4">
                    Requirements
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-text-white-60 mb-1">Platform</div>
                      <div className="text-text-white">Web, Cloud, API</div>
                    </div>
                    <div>
                      <div className="text-sm text-text-white-60 mb-1">Integration</div>
                      <div className="text-text-white">REST API, Webhooks, SDKs</div>
                    </div>
                    <div>
                      <div className="text-sm text-text-white-60 mb-1">Data Sources</div>
                      <div className="text-text-white">CSV, JSON, Database, APIs</div>
                    </div>
                    <div>
                      <div className="text-sm text-text-white-60 mb-1">Deployment</div>
                      <div className="text-text-white">Cloud, On-premise, Hybrid</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Use Cases */}
              <div className="glass-card p-8">
                <h3 className="font-satoshi font-semibold text-2xl text-text-white mb-6 text-center">
                  Common Use Cases
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Process Automation",
                      description: "Streamline repetitive tasks and improve operational efficiency",
                      icon: "⚡"
                    },
                    {
                      title: "Data Integration",
                      description: "Connect disparate systems and ensure data consistency",
                      icon: "🔗"
                    },
                    {
                      title: "Business Intelligence",
                      description: "Generate insights and make data-driven decisions",
                      icon: "📊"
                    }
                  ].map((useCase, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl mb-3">{useCase.icon}</div>
                      <h4 className="font-semibold text-text-white mb-2">{useCase.title}</h4>
                      <p className="text-sm text-text-white-70">{useCase.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SectionWrapper>

          {/* Related Products */}
          <SectionWrapper className="py-16 bg-bg-dark-95">
            <div className="text-center mb-8">
              <h2 className="font-satoshi font-bold text-3xl text-text-white mb-4">
                Related Solutions
              </h2>
              <p className="text-text-white-70">
                Explore other products in the {category?.name} category
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {marketplaceProducts
                .filter(p => p.category === product.category && p.id !== product.id)
                .slice(0, 3)
                .map((relatedProduct) => (
                  <motion.div
                    key={relatedProduct.id}
                    className="glass-card p-6 group hover:border-primary/50 transition-all duration-300"
                    whileHover={{ y: -4 }}
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <img 
                        src={relatedProduct.imageUrl} 
                        alt={relatedProduct.name} 
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                    <h3 className="font-satoshi font-semibold text-lg text-text-white mb-2 text-center">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-text-white-70 text-sm text-center mb-4 line-clamp-2">
                      {relatedProduct.description}
                    </p>
                    <CTAButton
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => navigate(`/marketplace/products/${relatedProduct.id}`)}
                    >
                      View Details
                    </CTAButton>
                  </motion.div>
                ))}
            </div>
          </SectionWrapper>
        </main>

        <Footer />
      </GridBackground>
    </>
  );
};

export default ProductDetails;
