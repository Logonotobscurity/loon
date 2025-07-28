import React from 'react';
import Lottie from 'lottie-react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '../Global/SectionWrapper';
import { CTAButton } from '../Global/CTAButton';
import { Text } from '../../lib/DesignSystem';
import { copy } from '../../copy';
import sparklesAnimation from './sparkles.json';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const CommunitySection = () => {
  return (
    <SectionWrapper id="community">
      <motion.div
        className="text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.div variants={itemVariants}>
          <Text as="h2" style="h2">
            {copy.community.headline}
          </Text>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Text style="body" className="mt-4 max-w-2xl mx-auto">
            {copy.community.subhead}
          </Text>
        </motion.div>
        <motion.div variants={itemVariants} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <CTAButton variant="outline">{copy.community.ctas[1]}</CTAButton>
          <div className="relative">
            <CTAButton variant="primary" className="!px-10 !py-4">
              {copy.community.ctas[2]}
            </CTAButton>
            <div className="absolute -top-8 -right-8 w-24 h-24 pointer-events-none">
              <Lottie animationData={sparklesAnimation} loop={true} />
            </div>
          </div>
          <CTAButton variant="secondary">{copy.community.ctas[0]}</CTAButton>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
};
