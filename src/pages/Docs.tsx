import React from 'react';
import Meta from '../components/Meta';
import { GridBackground } from '../components/Global/GridBackground';
import { AppHeader } from '../components/Header/AppHeader';
import { SectionWrapper } from '../components/Global/SectionWrapper';
import { Footer } from '../components/Footer/Footer';

const Docs = () => {
  return (
    <>
      <Meta 
        title="Docs | LOG_ON"
        description="LOG_ON documentation: Quickstart, API overview, SDKs, and examples."
        canonical="https://www.log-on.io/docs"
        breadcrumbs={[
          { name: 'Home', item: 'https://www.log-on.io' },
          { name: 'Docs', item: 'https://www.log-on.io/docs' }
        ]}
      />
      <GridBackground>
        <AppHeader />
        <main className="pt-20">
          <SectionWrapper className="py-16 text-center">
            <h1 className="font-satoshi font-bold text-4xl md:text-6xl text-text-white mb-4">Documentation</h1>
            <p className="text-text-white-80 max-w-3xl mx-auto">Build on LOG_ON with a fast Quickstart, API reference, SDKs, and real examples.</p>
          </SectionWrapper>

          <SectionWrapper id="quickstart" className="py-12">
            <h2 className="font-satoshi font-semibold text-2xl text-text-white mb-3">Quickstart</h2>
            <ol className="list-decimal list-inside text-text-white-80 space-y-2">
              <li>Sign up and create a workspace</li>
              <li>Install your first agent from the Marketplace</li>
              <li>Connect data sources and integrations</li>
              <li>Test and deploy a workflow</li>
            </ol>
          </SectionWrapper>

          <SectionWrapper id="api" className="py-12">
            <h2 className="font-satoshi font-semibold text-2xl text-text-white mb-3">API Overview</h2>
            <div className="glass-card p-6 text-text-white-80">
              <p>REST endpoints for agents, workflows, runs, and data connections. OAuth2 / API keys supported.</p>
            </div>
          </SectionWrapper>

          <SectionWrapper id="sdks" className="py-12">
            <h2 className="font-satoshi font-semibold text-2xl text-text-white mb-3">SDKs</h2>
            <ul className="list-disc list-inside text-text-white-80 space-y-2">
              <li>TypeScript SDK (client + server)</li>
              <li>Python SDK for data and automation</li>
              <li>Webhooks and events</li>
            </ul>
          </SectionWrapper>

          <SectionWrapper id="examples" className="py-12">
            <h2 className="font-satoshi font-semibold text-2xl text-text-white mb-3">Examples</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'Report Automation', desc: 'Nightly ETL to dashboard publish' },
                { title: 'Support Agent', desc: 'Ticket triage and resolution suggestions' },
                { title: 'Sales Forecasting', desc: 'Predictive analytics with alerts' },
              ].map((ex) => (
                <div key={ex.title} className="glass-card p-6">
                  <h3 className="font-semibold text-text-white mb-2">{ex.title}</h3>
                  <p className="text-text-white-70 text-sm">{ex.desc}</p>
                </div>
              ))}
            </div>
          </SectionWrapper>
        </main>
        <Footer />
      </GridBackground>
    </>
  );
};

export default Docs;

