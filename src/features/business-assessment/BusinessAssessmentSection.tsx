import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '../Global/SectionWrapper';
import { StandardCard, StandardCardTitle, StandardCardDescription } from '../Global/StandardCard';
import ButtonBlackShadow from '../Global/ButtonBlackShadow';
import { AssessmentModal, AssessmentType } from '../Assessment/AssessmentModal';
import { trackEvent } from '../../analytics/analytics';

const assessmentToolsData: {
  sectionLabel: string;
  title: string;
  subheading: string;
  workflows: string[];
  type: AssessmentType;
}[] = [
  {
    sectionLabel: 'Assessment',
    title: 'AI Readiness Evaluator',
    subheading: 'DIAGNOSTICS',
    workflows: ['Department Analysis', 'Technology Stack Review', 'Implementation Roadmap'],
    type: 'ai-readiness',
  },
  {
    sectionLabel: 'Assessment',
    title: 'Workflow Automation Audit',
    subheading: 'OPTIMIZATION',
    workflows: ['Bottleneck Identification', 'Workflow Streamlining', 'ROI Projection'],
    type: 'workflow-automation',
  },
  {
    sectionLabel: 'Assessment',
    title: 'ROI Calculator',
    subheading: 'INSIGHTS',
    workflows: ['Investment Analysis', 'Savings Calculation', 'Payback Projection'],
    type: 'roi-calculator',
  },
  {
    sectionLabel: 'Assessment',
    title: 'Security & Compliance Checker',
    subheading: 'GOVERNANCE',
    workflows: ['Regulatory Compliance', 'Data Privacy Audit', 'Security Assessment'],
    type: 'security-compliance',
  },
];

export const BusinessAssessmentSection = () => {
  const [isAssessmentOpen, setAssessmentOpen] = useState(false);
  const [currentAssessment, setCurrentAssessment] = useState<AssessmentType>('ai-readiness');

  const openAssessment = (type: AssessmentType) => {
    setCurrentAssessment(type);
    setAssessmentOpen(true);
    try { trackEvent('assessment_open', { source: 'business-assessment', type }); } catch {}
  };

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
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
      >
        {assessmentToolsData.map((tool, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <StandardCard className="p-6 h-full flex flex-col cursor-pointer hover:border-primary/30 transition-colors duration-200">
              <span className="text-xs font-medium text-text-white-60 uppercase tracking-wide mb-2">
                {tool.sectionLabel}
              </span>
              <StandardCardTitle>{tool.title}</StandardCardTitle>
              <span className="text-sm font-medium text-primary mb-4">
                {tool.subheading}
              </span>
              <div className="flex-grow">
                <p className="text-xs font-medium text-text-white-80 uppercase tracking-wide mb-2">Workflows:</p>
                <ul className="space-y-2">
                  {tool.workflows.map((workflow, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-text-white-60">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                      {workflow}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 flex justify-center">
                <button 
                  onClick={() => openAssessment(tool.type)}
                  className="px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-light transition-colors duration-200"
                >
                  Start Assessment →
                </button>
              </div>
            </StandardCard>
          </motion.div>
        ))}
      </motion.div>

      <AssessmentModal 
        isOpen={isAssessmentOpen} 
        onClose={() => setAssessmentOpen(false)} 
        assessmentType={currentAssessment} 
      />
    </SectionWrapper>
  );
};
