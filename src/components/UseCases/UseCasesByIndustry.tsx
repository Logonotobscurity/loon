import React from 'react';
import { Tab } from '@headlessui/react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '../Global/SectionWrapper';
import { CTAButton } from '../Global/CTAButton';
import { 
  Headphones, 
  TrendingUp, 
  Users, 
  FileText, 
  ShoppingCart, 
  BarChart3
} from 'lucide-react';

const industries = [
  {
    name: 'Customer Support',
    icon: Headphones,
    problem: 'Long response times, overwhelmed support teams, and inconsistent customer experiences across channels',
    solutions: [
      '24/7 instant response to customer inquiries',
      'Intelligent ticket routing and prioritization',
      'Multi-language support with real-time translation',
      'Sentiment analysis for proactive issue resolution'
    ],
    workflow: [
      { step: 'Receive Inquiry', desc: 'Agent captures customer message' },
      { step: 'Analyze Intent', desc: 'AI understands context and urgency' },
      { step: 'Provide Solution', desc: 'Instant resolution or smart escalation' },
      { step: 'Learn & Improve', desc: 'Continuous learning from interactions' }
    ]
  },
  {
    name: 'Sales & CRM',
    icon: TrendingUp,
    problem: 'Missed opportunities, manual data entry, and lack of real-time insights into customer behavior',
    solutions: [
      'Automated lead scoring and qualification',
      'Intelligent meeting scheduling and follow-ups',
      'Real-time sales pipeline analytics',
      'Personalized outreach at scale'
    ],
    workflow: [
      { step: 'Lead Capture', desc: 'Automatically collect and enrich leads' },
      { step: 'Qualify & Score', desc: 'AI evaluates lead quality and intent' },
      { step: 'Engage & Nurture', desc: 'Personalized outreach campaigns' },
      { step: 'Close & Optimize', desc: 'Data-driven sales strategies' }
    ]
  },
  {
    name: 'HR & Recruiting',
    icon: Users,
    problem: 'Time-consuming screening processes, bias in hiring, and poor candidate experience',
    solutions: [
      'Resume screening and candidate matching',
      'Automated interview scheduling',
      'Skills assessment and cultural fit analysis',
      'Onboarding workflow automation'
    ],
    workflow: [
      { step: 'Source Candidates', desc: 'AI searches across platforms' },
      { step: 'Screen & Match', desc: 'Intelligent resume analysis' },
      { step: 'Interview & Assess', desc: 'Automated scheduling and evaluation' },
      { step: 'Hire & Onboard', desc: 'Seamless onboarding experience' }
    ]
  },
  {
    name: 'Content & Marketing',
    icon: FileText,
    problem: 'Content creation bottlenecks, inconsistent brand voice, and poor SEO performance',
    solutions: [
      'AI-powered content generation and optimization',
      'Social media scheduling and engagement',
      'SEO analysis and recommendations',
      'Performance tracking and reporting'
    ],
    workflow: [
      { step: 'Plan Content', desc: 'AI suggests topics and keywords' },
      { step: 'Create & Optimize', desc: 'Generate SEO-friendly content' },
      { step: 'Distribute', desc: 'Multi-channel publishing' },
      { step: 'Analyze Impact', desc: 'Track performance and iterate' }
    ]
  },
  {
    name: 'E-commerce',
    icon: ShoppingCart,
    problem: 'Cart abandonment, poor product discovery, and lack of personalization',
    solutions: [
      'Personalized product recommendations',
      'Dynamic pricing optimization',
      'Inventory management and forecasting',
      'Customer journey mapping'
    ],
    workflow: [
      { step: 'Attract Visitors', desc: 'Targeted marketing campaigns' },
      { step: 'Personalize Experience', desc: 'AI-driven recommendations' },
      { step: 'Convert to Sale', desc: 'Optimize checkout process' },
      { step: 'Retain & Grow', desc: 'Post-purchase engagement' }
    ]
  },
  {
    name: 'Data Analytics',
    icon: BarChart3,
    problem: 'Data silos, manual reporting, and delayed insights affecting decision-making',
    solutions: [
      'Automated data collection and cleaning',
      'Real-time dashboard generation',
      'Predictive analytics and forecasting',
      'Natural language data querying'
    ],
    workflow: [
      { step: 'Collect Data', desc: 'Aggregate from all sources' },
      { step: 'Process & Clean', desc: 'AI ensures data quality' },
      { step: 'Analyze & Visualize', desc: 'Generate actionable insights' },
      { step: 'Predict & Advise', desc: 'Forecast trends and opportunities' }
    ]
  }
];

export const UseCasesByIndustry = () => {
  return (
    <SectionWrapper id="use-cases" className="relative">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="font-satoshi font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight mb-3 sm:mb-4 px-4 sm:px-0">
          Transform Every Department with AI
        </h2>
        <p className="max-w-3xl mx-auto font-inter text-base sm:text-lg text-text-white-80 px-4 sm:px-6 lg:px-0">
          Discover how LOG_ON agents solve real business challenges across industries and departments
        </p>
      </div>

      <Tab.Group>
        <div className="sticky top-16 sm:top-20 z-20 bg-bg-dark/80 backdrop-blur-xl pb-2 sm:pb-4 mb-6 sm:mb-8 -mx-4 sm:mx-0 px-4 sm:px-0">
          <Tab.List 
            className="flex overflow-x-auto scrollbar-hide gap-2 pb-2"
            role="tablist"
            aria-label="Industry use cases"
          >
            {industries.map((industry) => {
              const Icon = industry.icon;
              return (
                <Tab
                  key={industry.name}
                  className={({ selected }) =>
                    `flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg font-medium whitespace-nowrap transition-all duration-200 text-xs sm:text-sm md:text-base
                    ${selected
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-bg-white-5 text-text-white-80 hover:bg-bg-white-10 hover:text-white'
                    }`
                  }
                  role="tab"
                >
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="hidden sm:inline">{industry.name}</span>
                  <span className="sm:hidden">{industry.name.split(' ')[0]}</span>
                </Tab>
              );
            })}
          </Tab.List>
        </div>

        <Tab.Panels>
          {industries.map((industry, idx) => {
            const Icon = industry.icon;
            return (
              <Tab.Panel key={idx}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12"
                >
                  {/* Problem & Solutions */}
                  <div>
                    <div className="glass-card p-8 mb-6">
                      <h3 className="font-satoshi font-semibold text-2xl mb-4 flex items-center gap-3">
                        <Icon className="h-8 w-8 text-primary" />
                        The Challenge
                      </h3>
                      <p className="text-text-white-80 leading-relaxed">{industry.problem}</p>
                    </div>

                    <div className="glass-card p-8">
                      <h4 className="font-satoshi font-semibold text-xl mb-4">AI-Powered Solutions</h4>
                      <ul className="space-y-3">
                        {industry.solutions.map((solution, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                            <span className="text-text-white-80">{solution}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Workflow Diagram */}
                  <div>
                    <h4 className="font-satoshi font-semibold text-xl mb-6">How It Works</h4>
                    <div className="space-y-4">
                      {industry.workflow.map((step, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: i * 0.1 }}
                          className="flex items-center gap-4"
                        >
                          <div className="flex-shrink-0">
                            <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                              <span className="font-bold text-primary">{i + 1}</span>
                            </div>
                          </div>
                          <div className="flex-1 glass-card p-4">
                            <h5 className="font-semibold text-text-white mb-1">{step.step}</h5>
                            <p className="text-sm text-text-white-60">{step.desc}</p>
                          </div>
                          {i < industry.workflow.length - 1 && (
                            <div className="absolute left-6 top-16 h-4 w-0.5 bg-border-white-20" />
                          )}
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                      <CTAButton variant="primary" className="w-full sm:w-auto">
                        Deploy {industry.name} Agent
                      </CTAButton>
                      <CTAButton variant="secondary" className="w-full sm:w-auto">
                        View Demo
                      </CTAButton>
                    </div>
                  </div>
                </motion.div>
              </Tab.Panel>
            );
          })}
        </Tab.Panels>
      </Tab.Group>
    </SectionWrapper>
  );
};
