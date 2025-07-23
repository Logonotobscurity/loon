import React from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '../Global/SectionWrapper';
import { ProductCard } from './ProductCard';
import { AssessmentCard } from './AssessmentCard';
import { Tab } from '@headlessui/react';

const marketplaceProducts = [
  {
    id: 1,
    title: "Customer Support Pro",
    description: "AI agent that handles customer inquiries 24/7 with human-like empathy and accuracy",
    price: "From $299/mo",
    thumbnail: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    title: "Sales Intelligence Agent",
    description: "Automatically qualify leads, schedule meetings, and provide real-time sales insights",
    price: "From $499/mo",
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    title: "Content Creator Suite",
    description: "Generate, optimize, and schedule content across all your marketing channels",
    price: "From $399/mo",
    thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop"
  },
  {
    id: 4,
    title: "Data Analytics Engine",
    description: "Transform raw data into actionable insights with automated reporting and predictions",
    price: "From $599/mo",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop"
  }
];

const assessmentTools = [
  {
    id: 1,
    title: "AI Readiness Assessment",
    description: "Evaluate your organization's preparedness for AI adoption across all departments",
    duration: "15 min",
    icon: "🎯"
  },
  {
    id: 2,
    title: "Workflow Automation Audit",
    description: "Identify processes that can be automated to save time and reduce costs",
    duration: "20 min",
    icon: "⚡"
  },
  {
    id: 3,
    title: "ROI Calculator",
    description: "Calculate potential savings and efficiency gains from AI agent deployment",
    duration: "10 min",
    icon: "💰"
  },
  {
    id: 4,
    title: "Security & Compliance Check",
    description: "Ensure your AI implementation meets industry standards and regulations",
    duration: "25 min",
    icon: "🔒"
  }
];

export const MarketplaceSection = () => {
  return (
    <SectionWrapper id="marketplace" className="relative">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="font-satoshi font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight mb-3 sm:mb-4 px-4 sm:px-0">
          Pay What Your Economy Can Afford
        </h2>
        <p className="max-w-3xl mx-auto font-inter text-base sm:text-lg text-text-white-80 px-4 sm:px-6 lg:px-0">
          Access enterprise-grade AI agents with regional pricing. Choose from our marketplace of pre-built solutions or assess your organization's AI readiness with our free tools.
        </p>
      </div>

      <Tab.Group>
        <Tab.List className="flex justify-center space-x-1 rounded-xl bg-bg-white-5 p-1 max-w-md mx-auto mb-12">
          <Tab
            className={({ selected }) =>
              `w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-all duration-200
              ${selected
                ? 'bg-primary text-white shadow'
                : 'text-text-white-80 hover:bg-bg-white-10 hover:text-white'
              }`
            }
          >
            Marketplace
          </Tab>
          <Tab
            className={({ selected }) =>
              `w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-all duration-200
              ${selected
                ? 'bg-primary text-white shadow'
                : 'text-text-white-80 hover:bg-bg-white-10 hover:text-white'
              }`
            }
          >
            Business Assessment Tools
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
            >
              {marketplaceProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </motion.div>
          </Tab.Panel>
          <Tab.Panel>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
            >
              {assessmentTools.map((tool) => (
                <AssessmentCard key={tool.id} {...tool} />
              ))}
            </motion.div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </SectionWrapper>
  );
};
