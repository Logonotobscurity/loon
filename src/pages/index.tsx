import React from 'react';
import { AppHeader } from '../components/Header/AppHeader';
import { HeroSection } from '../components/Hero/HeroSection';
import { CapabilitiesSection } from '../components/Capabilities/CapabilitiesSection';

import { MarketplaceSection } from '../features/marketplace/components/MarketplaceSection';
import { BusinessAssessmentSection } from '../components/BusinessAssessment/BusinessAssessmentSection';
import { MergedUseCasesSection } from '../components/UseCases/MergedUseCasesSection';
import { InnovateSection } from '../components/Community/InnovateSection';
import { CommunitySection } from '../components/Community/CommunitySection';
import { TextMarquee } from '../components/Global/TextMarquee';
import { MobileFooterCTA } from '../components/Footer/MobileFooterCTA';
import { Footer } from '../components/Footer/Footer';
import { GridBackground } from '../components/Global/GridBackground';
import Meta from '../components/Meta';

const LandingPage = () => {
  return (
    <>
      <Meta />
      <GridBackground>
        <AppHeader />
        <main>
        <HeroSection />
        <CapabilitiesSection />
        <MarketplaceSection />
        <BusinessAssessmentSection />
        <MergedUseCasesSection />
        <InnovateSection />
        <CommunitySection />
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
