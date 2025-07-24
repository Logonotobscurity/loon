import React from 'react';
import { AppHeader } from '../components/Header/AppHeader';
import { HeroSection } from '../components/Hero/HeroSection';
import { CapabilitiesSection } from '../components/Capabilities/CapabilitiesSection';
import { MarketplaceSection } from '../components/Marketplace/MarketplaceSection';
import { BusinessAssessmentSection } from '../components/BusinessAssessment/BusinessAssessmentSection';
import { UseCasesByIndustry } from '../components/UseCases/UseCasesByIndustry';
import { AgentsUseCasesSection } from '../components/AgentsUseCases/AgentsUseCasesSection';
import { CommunitySection } from '../components/Community/CommunitySection';
import { MobileFooterCTA } from '../components/Footer/MobileFooterCTA';
import { Footer } from '../components/Footer/Footer';
import { GridBackground } from '../components/Global/GridBackground';

const LandingPage = () => {
  return (
    <GridBackground>
      <AppHeader />
      <main>
        <HeroSection />
        <CapabilitiesSection />
        <MarketplaceSection />
        <BusinessAssessmentSection />
        <UseCasesByIndustry />
        <AgentsUseCasesSection />
        <CommunitySection />
      </main>
      <Footer />
      <MobileFooterCTA />
    </GridBackground>
  );
};

export default LandingPage;
