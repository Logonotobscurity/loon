import React from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '../Global/SectionWrapper';
import { MarketplaceCard } from './MarketplaceCard';

// Random products for carousel - expanded list
const randomProducts = [
  {
    sectionLabel: 'Automation Ops',
    title: 'Sales Pipeline Bot',
    subheading: 'WORKFLOWS',
    workflows: ['Lead Scoring', 'CRM Sync', 'Follow-up Automation', 'Email Sequences'],
  },
  {
    sectionLabel: 'Assistant Tools',
    title: 'Meeting Summarizer AI',
    subheading: 'WORKFLOWS',
    workflows: ['Transcript Analysis', 'Action Item Extraction', 'Calendar Integration', 'Team Notifications'],
  },
  {
    sectionLabel: 'Analytics & Insights',
    title: 'Performance Dashboard',
    subheading: 'WORKFLOWS',
    workflows: ['Real-time Metrics', 'Predictive Analytics', 'Custom Reports', 'Data Export'],
  },
  {
    sectionLabel: 'Customer Experience',
    title: 'Support Agent Pro',
    subheading: 'WORKFLOWS',
    workflows: ['Ticket Routing', 'Sentiment Analysis', '24/7 Response', 'Multi-language Support'],
  },
  {
    sectionLabel: 'Security & Compliance',
    title: 'Data Privacy Guardian',
    subheading: 'WORKFLOWS',
    workflows: ['GDPR Compliance', 'Access Control', 'Audit Trails', 'Encryption Management'],
  },
  {
    sectionLabel: 'Marketing Automation',
    title: 'Campaign Orchestrator',
    subheading: 'WORKFLOWS',
    workflows: ['A/B Testing', 'Audience Segmentation', 'Content Personalization', 'ROI Tracking'],
  },
  {
    sectionLabel: 'HR & Recruiting',
    title: 'Talent Scout AI',
    subheading: 'WORKFLOWS',
    workflows: ['Resume Screening', 'Interview Scheduling', 'Skill Matching', 'Onboarding Automation'],
  },
  {
    sectionLabel: 'Finance & Accounting',
    title: 'Invoice Processing Bot',
    subheading: 'WORKFLOWS',
    workflows: ['OCR Extraction', 'Payment Reconciliation', 'Expense Categorization', 'Tax Compliance'],
  },
  {
    sectionLabel: 'IT Operations',
    title: 'System Monitor Pro',
    subheading: 'WORKFLOWS',
    workflows: ['Uptime Monitoring', 'Alert Management', 'Log Analysis', 'Performance Optimization'],
  },
  {
    sectionLabel: 'Content Management',
    title: 'Content Publisher AI',
    subheading: 'WORKFLOWS',
    workflows: ['SEO Optimization', 'Multi-channel Publishing', 'Version Control', 'Editorial Calendar'],
  },
];

export const MarketplaceSection = () => {
  return (
    <SectionWrapper id="marketplace" className="relative">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="font-satoshi font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight mb-3 sm:mb-4 px-4 sm:px-0">
          Pay What Your Economy Can Afford
        </h2>
        <p className="max-w-3xl mx-auto font-inter text-base sm:text-lg text-text-white-80 px-4 sm:px-6 lg:px-0">
          Access enterprise-grade AI agents with regional pricing. Explore our marketplace of pre-built solutions tailored to your needs.
        </p>
      </div>

      {/* Random Products Carousel */}
      <div>
        <h3 className="text-xl font-satoshi font-semibold text-text-white mb-6">Featured Products</h3>
        <div className="marketplace-carousel">
          {randomProducts.map((product, index) => (
            <MarketplaceCard
              key={index}
              sectionLabel={product.sectionLabel}
              title={product.title}
              subheading={product.subheading}
              workflows={product.workflows}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};
