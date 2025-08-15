import React from 'react';
import { motion } from 'framer-motion';
import { StandardCard, StandardCardTitle, StandardCardDescription } from '../Global/StandardCard';
import { ChevronRight } from 'lucide-react';

interface UseCase {
  title: string;
  description: string;
  link?: string; // Optional link for a specific use case page
}

interface UseCaseListProps {
  title: string;
  useCases: UseCase[];
}

const listItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.4,
      ease: "easeOut"
    },
  }),
};

export const UseCaseList: React.FC<UseCaseListProps> = ({ title, useCases }) => {
  return (
    <div className="w-full">
      <h3 className="font-satoshi font-bold text-xl text-text-white mb-6">{title}</h3>
      <ul className="space-y-4">
        {useCases.map((useCase, index) => (
          <motion.li
            key={index}
            variants={listItemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={index}
            className="list-none"
          >
            <StandardCard
              className={`p-5 flex justify-between items-center ${useCase.link ? 'cursor-pointer hover:bg-bg-white-10 transition-colors duration-200' : ''}`}
              onClick={() => useCase.link && window.open(useCase.link, '_blank')}
            >
              <div>
                <StandardCardTitle className="text-lg mb-1">{useCase.title}</StandardCardTitle>
                <StandardCardDescription className="text-sm text-text-white-60">
                  {useCase.description}
                </StandardCardDescription>
              </div>
              {useCase.link && (
                <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 ml-4" />
              )}
            </StandardCard>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};