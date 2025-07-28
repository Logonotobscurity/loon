import React from 'react';
import { motion } from 'framer-motion';
import { Tab } from '@headlessui/react';
import { SectionWrapper } from '../Global/SectionWrapper';
import { StandardCard, StandardCardIcon, StandardCardTitle, StandardCardDescription } from '../Global/StandardCard';
import { 
  Sparkles, MessageSquare, Code2, BarChart, Calendar, Shield,
  Headphones, TrendingUp, Users, FileText, ShoppingCart, BarChart3
} from 'lucide-react';

const popularUseCases = [
  {
    icon: MessageSquare,
    title: "Customer Service Automation",
    description: "Handle support tickets, live chat, and email inquiries with AI agents that understand context and provide accurate solutions.",
    examples: [
      "Resolve 80% of tickets automatically",
      "24/7 multilingual support",
      "Sentiment-based routing"
    ]
  },
  {
    icon: Code2,
    title: "Code Generation & Review",
    description: "Accelerate development with AI that writes, reviews, and optimizes code across multiple languages and frameworks.",
    examples: [
      "Generate boilerplate code instantly",
      "Automated code reviews",
      "Bug detection and fixes"
    ]
  },
  {
    icon: BarChart,
    title: "Data Analysis & Reporting",
    description: "Transform raw data into actionable insights with automated analysis, visualization, and report generation.",
    examples: [
      "Real-time dashboard creation",
      "Predictive analytics",
      "Natural language queries"
    ]
  },
  {
    icon: Sparkles,
    title: "Content Creation at Scale",
    description: "Generate high-quality content for blogs, social media, and marketing campaigns while maintaining brand voice.",
    examples: [
      "SEO-optimized articles",
      "Social media campaigns",
      "Product descriptions"
    ]
  },
  {
    icon: Calendar,
    title: "Meeting & Calendar Management",
    description: "Automate scheduling, meeting prep, and follow-ups with AI that understands priorities and preferences.",
    examples: [
      "Smart meeting scheduling",
      "Automated meeting notes",
      "Action item tracking"
    ]
  },
  {
    icon: Shield,
    title: "Security & Compliance",
    description: "Monitor systems, detect anomalies, and ensure compliance with AI agents trained on security best practices.",
    examples: [
      "Real-time threat detection",
      "Compliance monitoring",
      "Automated incident response"
    ]
  }
];

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
    ]
  }
];

export const MergedUseCasesSection = () => {
  return (
    <SectionWrapper id="use-cases" className="relative">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="font-satoshi font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight mb-3 sm:mb-4 px-4 sm:px-0">
          Transform Your Business with AI
        </h2>
        <p className="max-w-3xl mx-auto font-inter text-base sm:text-lg text-text-white-80 px-4 sm:px-6 lg:px-0">
          See how businesses are using LOG_ON agents to automate workflows, solve real challenges, and accelerate growth across every department
        </p>
      </div>

      <Tab.Group>
        <Tab.List className="flex justify-center mb-8 sm:mb-12 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 px-4 sm:px-0">
            <Tab
              className={({ selected }) =>
                `px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium whitespace-nowrap transition-all duration-200 text-sm sm:text-base
                ${selected
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-bg-white-5 text-text-white-80 hover:bg-bg-white-10 hover:text-white'
                }`
              }
            >
              Popular Use Cases
            </Tab>
            <Tab
              className={({ selected }) =>
                `px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium whitespace-nowrap transition-all duration-200 text-sm sm:text-base
                ${selected
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-bg-white-5 text-text-white-80 hover:bg-bg-white-10 hover:text-white'
                }`
              }
            >
              By Department
            </Tab>
          </div>
        </Tab.List>

        <Tab.Panels>
          {/* Popular Use Cases Panel */}
          <Tab.Panel>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {popularUseCases.map((useCase, index) => {
                const Icon = useCase.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <StandardCard className="p-6 group h-full">
                      <StandardCardIcon icon={Icon} />
                      <StandardCardTitle>{useCase.title}</StandardCardTitle>
                      <StandardCardDescription className="mb-4">
                        {useCase.description}
                      </StandardCardDescription>
                      <div className="space-y-2 mt-auto">
                        <p className="text-xs font-medium text-text-white-80 uppercase tracking-wide">Examples:</p>
                        <ul className="space-y-1">
                          {useCase.examples.map((example, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-text-white-60">
                              <div className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                              {example}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </StandardCard>
                  </motion.div>
                );
              })}
            </div>
          </Tab.Panel>

          {/* By Department Panel */}
          <Tab.Panel>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {industries.map((industry, index) => {
                const Icon = industry.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <StandardCard className="p-6 group h-full">
                      <StandardCardIcon icon={Icon} />
                      <StandardCardTitle>{industry.name}</StandardCardTitle>
                      <StandardCardDescription className="mb-4">
                        {industry.problem}
                      </StandardCardDescription>
                      <div className="space-y-2 mt-auto">
                        <p className="text-xs font-medium text-text-white-80 uppercase tracking-wide">Solutions:</p>
                        <ul className="space-y-1">
                          {industry.solutions.slice(0, 3).map((solution, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-text-white-60">
                              <div className="h-1.5 w-1.5 rounded-full bg-primary/60 mt-1.5 flex-shrink-0" />
                              {solution}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </StandardCard>
                  </motion.div>
                );
              })}
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </SectionWrapper>
  );
};
