import React from 'react';
import { SectionWrapper } from '../Global/SectionWrapper';
import { CTAButton } from '../Global/CTAButton';
import { StandardCard, StandardCardTitle, StandardCardDescription } from '../Global/StandardCard';
import { motion } from 'framer-motion';

const communityLinks = [
  { title: "Join the Discord", description: "Connect with other developers, ask questions, and share your creations.", link: "#", icon: "/icons/discord.svg" },
  { title: "Follow on Twitter", description: "Stay updated on the latest news, features, and community highlights.", link: "#", icon: "/icons/twitter.svg" },
  { title: "Read the Blog", description: "Dive deeper into agent capabilities, use cases, and technical insights.", link: "#", icon: "/icons/blog.svg" },
];

export const CommunitySection = () => {
  return (
    <SectionWrapper id="community" className="relative">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="font-satoshi font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight mb-3 sm:mb-4 px-4 sm:px-0">
          Join the Community
        </h2>
        <p className="max-w-3xl mx-auto font-inter text-base sm:text-lg text-text-white-80 px-4 sm:px-6 lg:px-0">
          Become part of a growing community of AI agent builders and enthusiasts. Share knowledge, collaborate on projects, and get support.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {communityLinks.map((item, index) => (
          <motion.a
            key={item.title}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="block"
          >
            <StandardCard className="p-6 h-full flex flex-col items-center text-center group">
              <img src={item.icon} alt={`${item.title} Icon`} className="w-12 h-12 mb-4 filter brightness-0 invert group-hover:brightness-100 group-hover:filter-none transition-all duration-300" />
              <StandardCardTitle className="text-center mb-2">{item.title}</StandardCardTitle>
              <StandardCardDescription className="text-center flex-grow">{item.description}</StandardCardDescription>
              {/* Optional: Add a subtle arrow or icon on hover */}
            </StandardCard>
          </motion.a>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="font-inter text-lg text-text-white-80 mb-6">
          Ready to start building?
        </p>
        <CTAButton href="#marketplace" variant="primary">
          Explore the Marketplace
        </CTAButton>
      </div>
    </SectionWrapper>
  );
};