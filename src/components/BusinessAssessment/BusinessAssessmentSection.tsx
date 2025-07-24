import React from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '../Global/SectionWrapper';
import { MarketplaceCard } from '../Marketplace/MarketplaceCard';

const assessmentToolsData = [
  {
    sectionLabel: 'Assessment',
    title: 'Market Opportunity Analyzer',
    subheading: 'INSIGHTS',
    workflows: ['Market Size Calculation', 'Competitor Benchmarking', 'Trend Analysis'],
  },
  {
    sectionLabel: 'Assessment',
    title: 'Process Efficiency Auditor',
    subheading: 'OPTIMIZATION',
    workflows: ['Bottleneck Identification', 'Workflow Streamlining', 'ROI Projection'],
  },
  {
    sectionLabel: 'Assessment',
    title: 'AI Readiness Evaluator',
    subheading: 'DIAGNOSTICS',
    workflows: ['Department Analysis', 'Technology Stack Review', 'Implementation Roadmap'],
  },
  {
    sectionLabel: 'Assessment',
    title: 'Security & Compliance Checker',
    subheading: 'GOVERNANCE',
    workflows: ['Regulatory Compliance', 'Data Privacy Audit', 'Security Assessment'],
  },
];

export const BusinessAssessmentSection = () => {
  return (
    <SectionWrapper id="business-assessment" className="relative">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="font-satoshi font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight mb-3 sm:mb-4 px-4 sm:px-0">
          Master Your Market: Orchestrated Intelligence for Unprecedented Profitability
        </h2>
        <p className="max-w-3xl mx-auto font-inter text-base sm:text-lg text-text-white-80 px-4 sm:px-6 lg:px-0">
          AI that Sees, Thinks, and Acts. Evaluate your organization's readiness and unlock new opportunities with our comprehensive assessment tools.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="marketplace-carousel"
      >
        {assessmentToolsData.map((tool, index) => (
          <MarketplaceCard
            key={index}
            sectionLabel={tool.sectionLabel}
            title={tool.title}
            subheading={tool.subheading}
            workflows={tool.workflows}
          />
        ))}
      </motion.div>
    </SectionWrapper>
  );
};
