import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Edit } from 'lucide-react';
import { copy } from '../../copy';

export const MobileFooterCTA = () => {
  return (
    <motion.div
      id="mobile-footer-cta"
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="md:hidden fixed bottom-0 left-0 right-0 bg-bg-dark/95 backdrop-blur-xl border-t border-border-white-20 p-3 sm:p-4 z-40 shadow-lg"
    >
      <div className="flex justify-around items-center">
        <motion.button
          aria-label={copy.footerCTA.primary}
          className="flex flex-col items-center gap-1 text-primary px-4 py-2 rounded-lg hover:bg-bg-white-5 transition-colors"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Phone className="h-5 w-5 sm:h-6 sm:w-6" />
          <span className="text-xs font-medium">{copy.footerCTA.primary}</span>
        </motion.button>
        <motion.button
          aria-label={copy.footerCTA.secondary}
          className="flex flex-col items-center gap-1 text-text-white px-4 py-2 rounded-lg hover:bg-bg-white-5 transition-colors"
        >
          <div className="relative">
            <Edit className="h-5 w-5 sm:h-6 sm:w-6" />
            <motion.div
              className="absolute inset-0 rounded-full bg-primary/50"
              animate={{ scale: [0, 1.5], opacity: [1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
            />
          </div>
          <span className="text-xs font-medium">{copy.footerCTA.secondary}</span>
        </motion.button>
      </div>
    </motion.div>
  );
};
