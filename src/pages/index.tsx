import React, { Suspense, lazy } from 'react';
import { AppHeader } from '../components/Header/AppHeader';
import { HeroSection } from '../components/Hero/HeroSection';
import { CapabilitiesSection } from '../components/Capabilities/CapabilitiesSection';
import { TextMarquee } from '../components/Global/TextMarquee';

import { Footer } from '../components/Footer/Footer';
import { GridBackground } from '../components/Global/GridBackground';
import Meta from '../components/Meta';
import { LoadingSpinner } from '../components/Global/LoadingSpinner';

const MarketplaceSection = lazy(() => import('../features/marketplace/components/MarketplaceSection').then(module => ({ default: module.MarketplaceSection })));
const UseCasesByIndustry = lazy(() => import('../features/use-cases/UseCasesByIndustry').then(module => ({ default: module.UseCasesByIndustry })));
const ConversationDialogue = lazy(() => import('../features/conversation/ConversationDialogue').then(module => ({ default: module.default })));

const LandingPage = () => {
  return (
    <>
      <Meta 
        title="LOG_ON - AI Agent Marketplace | Voice-First Business Intelligence"
        canonical="https://www.log-on.io/"
      />
      <GridBackground>
        <AppHeader />
        <main>
          <HeroSection />
          <CapabilitiesSection />
          <Suspense fallback={<LoadingSpinner />}>
            <MarketplaceSection />
          </Suspense>
          <Suspense fallback={<LoadingSpinner />}>
            <UseCasesByIndustry />
          </Suspense>

          <TextMarquee 
            text="Converse, Convert, Conquer: The Power of Voice-First Business Intelligence • "
            bidirectional={true}
            speed={30}
          />
        </main>
        <Footer />
      </GridBackground>
    </>
  );
};

export default LandingPage;
