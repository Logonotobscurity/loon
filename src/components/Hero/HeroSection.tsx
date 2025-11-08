import React, { Suspense, lazy, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '../Global/SectionWrapper';
import { copy } from '../../copy';
import { CTAButton } from '../Global/CTAButton';
import { ResponsiveModal } from '../Global/ResponsiveModal';
import { JoinWaitlistModal } from '../../components/Global/JoinWaitlistModal';
import { LoadingSpinner } from '../Global/LoadingSpinner';
import AssessmentModal from '../../features/assessment/AssessmentModal';
import { trackEvent } from '../../analytics/analytics';

const AnimatedBlob = lazy(() => import('./AnimatedBlob'));
const ConversationDialogue = lazy(() => import('../../features/conversation/ConversationDialogue').then(module => ({ default: module.default })));



/**
 * The hero section of the landing page.
 *
 * @returns {JSX.Element} The rendered hero section.
 */
export const HeroSection = () => {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [waitlistMode, setWaitlistMode] = useState<'waitlist' | 'vendor'>('waitlist');
  const [assessmentOpen, setAssessmentOpen] = useState(false);



  const openWaitlist = (mode: 'waitlist' | 'vendor') => {
    setWaitlistMode(mode);
    setWaitlistOpen(true);
    trackEvent('cta_click', { location: 'hero', label: mode === 'vendor' ? 'Become a Vendor' : 'Join Waitlist' });
  };

  const openAssessment = () => {
    setAssessmentOpen(true);
    trackEvent('assessment_open', { location: 'hero' });
  };

  return (
    <SectionWrapper id="hero" className="relative overflow-hidden min-h-[100dvh] flex flex-col items-center justify-center pt-16 sm:pt-20">
      {/* 3D Animation - hidden on small mobile */}
      <div className="absolute inset-0 z-0 opacity-20 sm:opacity-30 md:opacity-50">
        <Suspense fallback={null}>
          <AnimatedBlob />
        </Suspense>
      </div>
      <div className="relative z-10 w-full max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4 sm:mb-6 font-satoshi font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tight bg-gradient-to-r from-primary via-accent-blue to-accent-purple bg-clip-text text-transparent"
        >
          {copy.hero.headline}
        </motion.h1>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-4 sm:mt-6 max-w-2xl mx-auto text-text-white-80 font-inter text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed px-2 sm:px-0"
        >
          {copy.hero.subheadline}
        </motion.h2>

        {/* Hero CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 sm:mt-8 flex items-center justify-center gap-3 sm:gap-4"
        >
          <CTAButton variant="primary" onClick={() => openWaitlist('waitlist')}>Join Waitlist</CTAButton>
        </motion.div>
        
        {/* BI-GPT Conversation integrated in hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 sm:mt-12"
        >
          <Suspense fallback={<div className="h-96 flex items-center justify-center"><div className="animate-pulse text-text-white-60">Loading conversation...</div></div>}>
            <ConversationDialogue startInHero={true} className="max-w-3xl mx-auto" />
          </Suspense>
        </motion.div>
      </div>

      {/* Modals */}
      <ResponsiveModal isOpen={waitlistOpen} onClose={() => setWaitlistOpen(false)} title={waitlistMode === 'vendor' ? 'Become a Vendor / Developer' : 'Join the Waitlist'}>
        <JoinWaitlistModal mode={waitlistMode} onClose={() => setWaitlistOpen(false)} />
      </ResponsiveModal>

      <AssessmentModal isOpen={assessmentOpen} onClose={() => setAssessmentOpen(false)} />
    </SectionWrapper>
  );
};
