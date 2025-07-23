import React from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '../Global/SectionWrapper';
import { Sparkles, MessageSquare, Code2, BarChart, Calendar, Shield } from 'lucide-react';

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

export const AgentsUseCasesSection = () => {
  return (
    <SectionWrapper id="popular-use-cases" className="relative">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="font-satoshi font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight mb-3 sm:mb-4 px-4 sm:px-0">
          Popular Use Cases
        </h2>
        <p className="max-w-3xl mx-auto font-inter text-base sm:text-lg text-text-white-80 px-4 sm:px-6 lg:px-0">
          See how businesses are using LOG_ON agents to automate workflows and accelerate growth
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {popularUseCases.map((useCase, index) => {
          const Icon = useCase.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="glass-card glass-card-hover p-6 cursor-pointer group"
            >
              <div className="bg-primary/10 backdrop-blur-sm p-4 rounded-xl mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <Icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-satoshi font-semibold text-xl text-text-white mb-3">
                {useCase.title}
              </h3>
              <p className="text-text-white-60 font-inter text-sm mb-4 leading-relaxed">
                {useCase.description}
              </p>
              <div className="space-y-2">
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
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
};
