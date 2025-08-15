import React from 'react';
import Meta from '../components/Meta';
import { GridBackground } from '../components/Global/GridBackground';
import { AppHeader } from '../components/Header/AppHeader';
import { SectionWrapper } from '../components/Global/SectionWrapper';
import { Footer } from '../components/Footer/Footer';

const Pricing = () => {
  return (
    <>
      <Meta 
        title="Pricing | LOG_ON"
        description="Regional pricing that adapts to your economy. Transparent. Fair. Built for teams of all sizes."
        canonical="https://www.log-on.io/pricing"
        breadcrumbs={[
          { name: 'Home', item: 'https://www.log-on.io' },
          { name: 'Pricing', item: 'https://www.log-on.io/pricing' }
        ]}
      />
      <GridBackground>
        <AppHeader />
        <main className="pt-20">
          <SectionWrapper className="py-16 text-center">
            <h1 className="font-satoshi font-bold text-4xl md:text-6xl text-text-white mb-4">Pricing</h1>
            <p className="text-text-white-80 max-w-3xl mx-auto">
              We offer regional pricing to keep access fair worldwide. The goal is to meet you where you are—
              ensuring the same capabilities are available at a price that reflects local purchasing power.
            </p>
          </SectionWrapper>

          <SectionWrapper className="py-12">
            <div className="glass-card p-6">
              <h2 className="font-satoshi font-semibold text-2xl text-text-white mb-3">How regional pricing works</h2>
              <ul className="list-disc list-inside text-text-white-80 space-y-2">
                <li>Baseline USD price adapted by region using publicly available PPP indicators.</li>
                <li>Same features everywhere—no capability paywalls by geography.</li>
                <li>Enterprise and startup programs available on request.</li>
              </ul>
              <p className="text-text-white-70 mt-4">
                We’re gathering feedback on the initial set of regions and tiers. Tell us your needs and we’ll tune this for you.
              </p>
            </div>
          </SectionWrapper>

          <SectionWrapper className="py-12 text-center">
            <h3 className="font-satoshi font-bold text-2xl text-text-white mb-2">Feedback welcome</h3>
            <p className="text-text-white-70">Share your location and team size—
              we’ll propose a draft tier and follow up with a tailored plan.</p>
          </SectionWrapper>
        </main>
        <Footer />
      </GridBackground>
    </>
  );
};

export default Pricing;

