import React from 'react';
import { AppHeader } from '../components/Header/AppHeader';
import { HeroSection } from '../components/Hero/HeroSection';
import { CapabilitiesSection } from '../components/Capabilities/CapabilitiesSection';

import { MarketplaceSection } from '../features/marketplace/components/MarketplaceSection';
import { UseCasesByIndustry } from '../features/use-cases/UseCasesByIndustry';
import { TextMarquee } from '../components/Global/TextMarquee';
import { MobileFooterCTA } from '../components/Footer/MobileFooterCTA';
import { Footer } from '../components/Footer/Footer';
import { GridBackground } from '../components/Global/GridBackground';
import Meta from '../components/Meta';
import ConversationDialogue from '../features/conversation/ConversationDialogue';

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
        <MarketplaceSection />
        <UseCasesByIndustry />
        <TextMarquee 
          text="Converse, Convert, Conquer: The Power of Voice-First Business Intelligence • "
          bidirectional={true}
          speed={30}
        />
        </main>
      <Footer />
      <MobileFooterCTA />
    </GridBackground>
  </>
 );
};

export default LandingPage;
