import React from 'react';

interface GridBackgroundProps {
  children: React.ReactNode;
}

/**
 * A component that provides a grid background with decorative gradient and blur effects.
 *
 * @param {object} props - The properties for the component.
 * @param {React.ReactNode} props.children - The content to display on top of the grid background.
 * @returns {JSX.Element} The rendered component with a grid background.
 */
export const GridBackground = ({ children }: GridBackgroundProps) => {
  return (
    <div className="w-full min-h-screen bg-bg-dark relative overflow-hidden">
      {/* Decorative gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050505] via-[#101010] to-[#202020]" />
      
      {/* Decorative blur elements */}
      <div className="absolute top-0 left-1/4 w-56 h-56 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-56 h-56 bg-accent-orange/20 rounded-full blur-3xl" />
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-[size:32px_32px]" />
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
