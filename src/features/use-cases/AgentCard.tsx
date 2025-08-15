import React from 'react';
import { ArrowRight } from 'lucide-react';

interface AgentCardProps {
  agent: {
    name: string;
    description: string;
    icon: string; // Assuming icon is a path or simple string for now
    link: string; // Link to the agent's details or marketplace
  };
}

export const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  return (
    <div className="bg-bg-dark/90 backdrop-blur-lg border border-border-white-10 rounded-2xl p-6 flex flex-col items-start transition-all duration-300 hover:border-primary hover:shadow-lg">
      <div className="flex items-center justify-center w-12 h-12 bg-bg-white-10 rounded-xl mb-4">
        {/* Placeholder for icon - replace with actual icon rendering */}
        <img src={agent.icon} alt={`${agent.name} icon`} className="w-8 h-8 object-contain" />
      </div>
      <h3 className="font-satoshi font-bold text-xl text-text-white mb-2">
        {agent.name}
      </h3>
      <p className="text-text-white-60 text-sm mb-4 flex-grow">
        {agent.description}
      </p>
      <a
        href={agent.link}
        className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors duration-200"
      >
        Learn More
        <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
};