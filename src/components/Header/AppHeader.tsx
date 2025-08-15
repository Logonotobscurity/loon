import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu as MenuIcon, X } from 'lucide-react';
import { Logo } from '../Global/Logo';
import { CTAButton } from '../Global/CTAButton';
import { EnhancedDropdownMenu } from './EnhancedDropdownMenu';
import { navigationConfig } from '../../config/navigation';
import { ResponsiveModal } from '../Global/ResponsiveModal';
import { JoinWaitlistModal } from '../Global/JoinWaitlistModal';
import { trackEvent } from '../../analytics/analytics';

export const AppHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'waitlist' | 'vendor'>('waitlist');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openWaitlist = () => {
    setModalMode('waitlist');
    setIsModalOpen(true);
    trackEvent('cta_click', { location: 'header', label: 'Join Waitlist' });
  };

  const openVendor = () => {
    setModalMode('vendor');
    setIsModalOpen(true);
    trackEvent('cta_click', { location: 'header', label: 'Become a Vendor' });
  };

  const menuVariants = {
    closed: { opacity: 0, y: "-100%" },
    open: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 20 } },
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <motion.div
        className={`border-b transition-all duration-300 ${scrolled ? 'bg-bg-dark/80 backdrop-blur-xl border-border-white-10' : 'bg-transparent border-transparent'}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        <div className="container px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14 sm:h-16">
          <Link to="/">
            <Logo />
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/bi-gpt"
              className="relative px-4 py-2 text-text-white font-medium hover:text-primary transition-colors duration-200 group"
            >
              <span className="flex items-center gap-2">
                <span className="text-lg">🤖</span>
                BI-GPT Elite
                <span className="absolute -top-1 -right-1 text-xs bg-accent-orange text-text-white px-1.5 py-0.5 rounded-full animate-pulse">AI</span>
              </span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
            <EnhancedDropdownMenu 
              title={navigationConfig.solutions.label}
              sections={navigationConfig.solutions.sections}
              highlight={navigationConfig.solutions.highlight}
            />
                <EnhancedDropdownMenu 
                  title={navigationConfig.marketplace.label}
                  sections={navigationConfig.marketplace.sections}
                  highlight={navigationConfig.marketplace.highlight}
                />
            <EnhancedDropdownMenu 
              title={navigationConfig.developers.label}
              sections={navigationConfig.developers.sections}
              highlight={navigationConfig.developers.highlight}
            />
            <EnhancedDropdownMenu 
              title={navigationConfig.resources.label}
              sections={navigationConfig.resources.sections}
              highlight={navigationConfig.resources.highlight}
            />
          </nav>
          <div className="hidden md:flex items-center gap-2 lg:gap-4">
            <CTAButton 
              variant="outline" 
              className="!px-4 lg:!px-6 !py-2 lg:!py-3 text-sm lg:text-base"
              onClick={openWaitlist}
            >
              Join Waitlist
            </CTAButton>
            <CTAButton 
              variant="primary" 
              className="!px-4 lg:!px-6 !py-2 lg:!py-3 text-sm lg:text-base"
              onClick={openVendor}
            >
              Become a Vendor
            </CTAButton>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(true)} aria-label="Open menu" className="p-2 hover:bg-bg-white-10 rounded-lg transition-colors">
              <MenuIcon className="h-6 w-6 text-text-white" />
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 bg-bg-dark bg-gradient-dark z-50 md:hidden">
            <div className="container">
              <div className="flex justify-between items-center h-16 sm:h-20">
                <Logo />
                <button onClick={() => setIsOpen(false)} aria-label="Close menu" className="p-2 hover:bg-bg-white-10 rounded-lg transition-colors">
                  <X className="h-6 w-6 text-text-white" />
                </button>
              </div>
              <nav className="flex flex-col items-center gap-6 sm:gap-8 mt-12 sm:mt-16">
                <Link 
                  to="/bi-gpt" 
                  className="text-2xl font-satoshi font-medium text-text-white hover:text-primary transition-colors duration-200 flex items-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-2xl">🤖</span>
                  BI-GPT Elite
                  <span className="text-xs bg-accent-orange text-text-white px-2 py-1 rounded-full animate-pulse">AI</span>
                </Link>
                <a href="#" className="text-2xl font-satoshi font-medium text-text-white hover:text-primary transition-colors duration-200">
                  Solutions
                </a>
                <Link 
                  to="/marketplace" 
                  className="text-2xl font-satoshi font-medium text-text-white hover:text-primary transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Marketplace
                </Link>
                <a href="#" className="text-2xl font-satoshi font-medium text-text-white hover:text-primary transition-colors duration-200">
                  Developers
                </a>
                <a href="#" className="text-2xl font-satoshi font-medium text-text-white hover:text-primary transition-colors duration-200">
                  Resources
                </a>
                <CTAButton 
                  variant="primary" 
                  className="w-full mt-8"
                  onClick={() => { setIsOpen(false); openWaitlist(); }}
                >Join Waitlist</CTAButton>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ResponsiveModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={modalMode === 'vendor' ? 'Become a Vendor / Developer' : 'Join the Waitlist'}
      >
        <JoinWaitlistModal mode={modalMode} onClose={() => setIsModalOpen(false)} />
      </ResponsiveModal>
    </header>
  );
};
