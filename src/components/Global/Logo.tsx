import React from 'react';

export const Logo = () => {
  return (
    <a href="#" className="font-satoshi font-bold text-2xl text-text-white hover:text-primary transition-colors duration-200 flex items-center gap-2">
      <span className="bg-gradient-to-r from-primary to-accent-blue bg-clip-text text-transparent">LOG</span>
      <span className="text-text-white">_ON</span>
    </a>
  );
};
