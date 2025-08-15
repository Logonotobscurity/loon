import React from 'react';
import Meta from '../components/Meta';
import { GridBackground } from '../components/Global/GridBackground';
import { AppHeader } from '../components/Header/AppHeader';
import { SectionWrapper } from '../components/Global/SectionWrapper';
import { Footer } from '../components/Footer/Footer';

const Features = () => {
  return (
    <>
      <Meta 
        title="Features | LOG_ON"
        description="Explore LOG_ON capabilities: autonomous agents, workflow automation, integrations, and enterprise-grade security."
        canonical="https://www.log-on.io/features"
        breadcrumbs={[
          { name: 'Home', item: 'https://www.log-on.io' },
          { name: 'Features', item: 'https://www.log-on.io/features' }
        ]}
      />
      <GridBackground>
        <AppHeader />
        <main className="pt-20">
          <SectionWrapper className="py-16 text-center">
            <h1 className="font-satoshi font-bold text-4xl md:text-6xl text-text-white mb-4">Platform Features</h1>
            <p className="text-text-white-80 max-w-3xl mx-auto">Autonomous agents that understand your business, automate workflows, and scale with demand.</p>
          </SectionWrapper>

          <SectionWrapper id="value-props" className="py-12">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'Autonomous Agents', desc: 'Specialized agents (support, sales, ops) that work 24/7.' },
                { title: 'Workflow Automation', desc: 'Declarative workflows with human-in-the-loop controls.' },
                { title: 'Enterprise Security', desc: 'RBAC, audit logs, and data locality options.' }
              ].map((f) => (
                <div key={f.title} className="glass-card p-6">
                  <h3 className="font-semibold text-text-white mb-2">{f.title}</h3>
                  <p className="text-text-white-70 text-sm">{f.desc}</p>
                </div>
              ))}
            </div>
          </SectionWrapper>

          <SectionWrapper id="architecture" className="py-12">
            <h2 className="font-satoshi font-bold text-2xl text-text-white mb-4">Reference Architecture</h2>
            <div className="glass-card p-6 text-text-white-80">
              <p>Agents ↔ Workflow Engine ↔ Integrations ↔ Data Layer. Built for reliability and modularity.</p>
            </div>
          </SectionWrapper>

          <SectionWrapper className="py-16 text-center">
            <h3 className="font-satoshi font-bold text-3xl text-text-white mb-4">Ready to see it live?</h3>
            <p className="text-text-white-70">Head to the Marketplace or start a conversation with the agent in the hero.</p>
          </SectionWrapper>
        </main>
        <Footer />
      </GridBackground>
    </>
  );
};

export default Features;

