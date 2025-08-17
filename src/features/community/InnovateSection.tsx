import React from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '../../components/Global/SectionWrapper';
import { CTAButton } from '../../components/Global/CTAButton';
import { Text } from '../../lib/DesignSystem';
import { copy } from '../../copy';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    },
  }),
};

const features = [
  {
    title: "Rapid Prototyping",
    description: "Quickly build and test AI agent ideas.",
  },
  {
    title: "Custom Workflows",
    description: "Design agents tailored to your specific business processes.",
  },
  {
    title: "Integration Ready",
    description: "Seamlessly connect with your existing systems.",
  },
];

export const InnovateSection = () => {
  return (
    <SectionWrapper id="innovate" className="relative overflow-hidden">
      {/* Background gradient/shape */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-accent-purple/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow"></div>
      </div>

      <div className="text-center mb-12">
        <Text as="h2" style="h2" className="max-w-3xl mx-auto">
          {copy.innovate.headline}
        </Text>
        <Text style="body" className="mt-4 max-w-2xl mx-auto">
          {copy.innovate.subhead}
        </Text>
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-bg-white-5 border border-border-white-10 rounded-xl p-6 text-center backdrop-blur-sm"
            variants={cardVariants}
            custom={index}
          >
            <Text as="h3" style="h5" className="mb-2">{feature.title}</Text>
            <Text style="body-small" className="text-text-white-60">{feature.description}</Text>
          </motion.div>
        ))}
      </motion.div>

      <div className="text-center">
        <CTAButton variant="primary">
          {copy.innovate.cta}
        </CTAButton>
      </div>
    </SectionWrapper>
  );
};