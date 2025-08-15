import React from 'react';
import Meta from '../components/Meta';
import { GridBackground } from '../components/Global/GridBackground';
import { AppHeader } from '../components/Header/AppHeader';
import { SectionWrapper } from '../components/Global/SectionWrapper';
import { Footer } from '../components/Footer/Footer';

const About = () => {
  return (
    <> 
      <Meta 
        title="About | LOG_ON"
        description="Learn about LOG_ON: mission, team, and our open invitation to builders."
        canonical="https://www.log-on.io/about"
        breadcrumbs={[
          { name: 'Home', item: 'https://www.log-on.io' },
          { name: 'About', item: 'https://www.log-on.io/about' }
        ]}
      />
      <GridBackground>
        <AppHeader />
        <main className="pt-20">
          <SectionWrapper className="py-16 text-center">
            <h1 className="font-satoshi font-bold text-4xl md:text-6xl text-text-white mb-4">About LOG_ON</h1>
            <p className="text-text-white-80 max-w-3xl mx-auto">We’re building autonomous, ReAct-enabled agents that turn intent into business outcomes.</p>
          </SectionWrapper>

          <SectionWrapper id="mission" className="py-12">
            <h2 className="font-satoshi font-semibold text-2xl text-text-white mb-3">Mission</h2>
            <p className="text-text-white-80">Empower every team to automate work and grow with intelligent agents that are reliable, explainable, and secure.</p>
          </SectionWrapper>

          <SectionWrapper id="team" className="py-12">
            <h2 className="font-satoshi font-semibold text-2xl text-text-white mb-3">Team</h2>
            <div className="glass-card p-6">
              <h3 className="font-semibold text-text-white">Founder: Oluwamayowa Logo</h3>
              <p className="text-text-white-70 mt-2">Driving product, engineering, and partnerships to bring autonomous BI to every business.</p>
            </div>
          </SectionWrapper>

          <SectionWrapper id="timeline" className="py-12">
            <h2 className="font-satoshi font-semibold text-2xl text-text-white mb-3">Timeline</h2>
            <ul className="list-disc list-inside text-text-white-80 space-y-2">
              <li>2024 — LOG_ON founded, first agents released</li>
              <li>2025 — Voice-first BI-GPT integration and marketplace expansion</li>
            </ul>
          </SectionWrapper>

          <SectionWrapper id="careers" className="py-12 text-center">
            <h2 className="font-satoshi font-semibold text-2xl text-text-white mb-3">Careers</h2>
            <p className="text-text-white-70 max-w-2xl mx-auto">We welcome builders with skills in AI, web, data, and automation. If you’re passionate about autonomous systems and business impact, we want to hear from you.</p>
            <p className="text-text-white-60 text-sm mt-2">Anyone with skills willing to join the team is invited to reach out.</p>
          </SectionWrapper>
        </main>
        <Footer />
      </GridBackground>
    </>
  );
};

export default About;

