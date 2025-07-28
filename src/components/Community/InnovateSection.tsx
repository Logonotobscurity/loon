import React from 'react';
import { SectionWrapper } from '../Global/SectionWrapper';
import { CTAButton } from '../Global/CTAButton';

export const InnovateSection = () => {
  return (
    <SectionWrapper>
      <div className="text-center mb-12">
        <h2 className="font-satoshi font-bold text-3xl md:text-4xl text-text-white mb-4">
          Innovate & Partner with LOG_ON
        </h2>
        <p className="text-text-white-70 max-w-2xl mx-auto">
          Join our ecosystem of creators and build the future of autonomous business
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-bg-dark-80 p-8 rounded-2xl text-center">
          <h3 className="font-satoshi font-bold text-xl text-text-white mb-4">Become a Creator</h3>
          <p className="text-text-white-70 mb-6">
            Build, publish, and monetize your AI agents & automations on LOG_ON.
          </p>
          <CTAButton variant="secondary">Get Started</CTAButton>
        </div>
        <div className="bg-bg-dark-80 p-8 rounded-2xl text-center">
          <h3 className="font-satoshi font-bold text-xl text-text-white mb-4">Submit Your Solutions</h3>
          <p className="text-text-white-70 mb-6">
            Got an idea? Share your no-code/low-code automations with our global audience.
          </p>
          <CTAButton variant="secondary">Submit Solution</CTAButton>
        </div>
        <div className="bg-bg-dark-80 p-8 rounded-2xl text-center">
          <h3 className="font-satoshi font-bold text-xl text-text-white mb-4">Monetize Your Creations</h3>
          <p className="text-text-white-70 mb-6">
            Leverage our marketplace for fair revenue sharing and reach a growing user base.
          </p>
          <CTAButton variant="secondary">Learn More</CTAButton>
        </div>
      </div>
    </SectionWrapper>
  );
};