import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu as MenuIcon, X } from 'lucide-react';
import { Logo } from '../Global/Logo';
import { CTAButton } from '../Global/CTAButton';
import { DropdownMenu } from './DropdownMenu';
import { copy } from '../../copy';

export const AppHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuVariants = {
    closed: { opacity: 0, y: "-100%" },
    open: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 20 } },
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <motion.div
        className="glass-card glass-card-hover border-0 border-b border-border-white-10 rounded-none"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        <div className="container px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 sm:h-20">
          <Logo />
          <nav className="hidden md:flex items-center gap-4">
            {copy.nav.map((link) =>
              link.items ? (
                <DropdownMenu key={link.label} title={link.label} items={link.items} />
              ) : (
                <a key={link.label} href={link.href} className="text-sm font-inter font-medium text-text-white-80 hover:text-primary transition-colors duration-200">
                  {link.label}
                </a>
              )
            )}
          </nav>
          <div className="hidden md:flex items-center gap-2 lg:gap-4">
            <CTAButton variant="outline" className="!px-4 lg:!px-6 !py-2 lg:!py-3 text-sm lg:text-base">Sign In</CTAButton>
            <CTAButton variant="primary" className="!px-4 lg:!px-6 !py-2 lg:!py-3 text-sm lg:text-base">Get Started</CTAButton>
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
                {copy.nav.map((link) => (
                  <a key={link.label} href={link.href || '#'} className="text-2xl font-satoshi font-medium text-text-white hover:text-primary transition-colors duration-200">
                    {link.label}
                  </a>
                ))}
                <CTAButton variant="primary" className="w-full mt-8">Get Started</CTAButton>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
