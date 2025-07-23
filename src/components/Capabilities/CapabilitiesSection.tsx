import React from 'react';
import { BrainCircuit, Users, Zap, ShieldCheck, Lock, Monitor } from 'lucide-react';
import { SectionWrapper } from '../Global/SectionWrapper';
import { FeatureCard } from './FeatureCard';
import { copy } from '../../copy';

const icons = [BrainCircuit, Lock, Monitor, Users, Zap, ShieldCheck];

export const CapabilitiesSection = () => {
  return (
    <SectionWrapper id="capabilities" className="relative">
      {/* Decorative grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
      
      <div className="text-center relative z-10">
        <h2 className="font-satoshi font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight px-4 sm:px-0">Build Smarter, Sell Faster, Support Instantly</h2>
        <p className="mt-3 sm:mt-4 max-w-3xl mx-auto font-inter text-base sm:text-lg text-text-white-80 px-4 sm:px-6 lg:px-0">
          Transform your enterprise with LOG_ON's autonomous agents - intelligent AI partners that understand your business, automate complex workflows, and scale with your growth. From customer support to data analysis, deploy specialized agents that work 24/7 to amplify your team's capabilities.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-8 sm:mt-12 relative z-10">
        {copy.capabilities.map((feature, index) => (
          <FeatureCard key={index} {...feature} icon={icons[index]} />
        ))}
      </div>
    </SectionWrapper>
  );
};
