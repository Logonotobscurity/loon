import React from 'react';
import { motion } from 'framer-motion';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

/**
 * An icon button component with hover and tap animations.
 *
 * @param {object} props - The properties for the component.
 * @param {React.ReactNode} props.children - The icon to display inside the button.
 * @param {string} [props.className] - Additional CSS classes to apply to the button.
 * @returns {JSX.Element} The rendered icon button component.
 */
export const IconButton = ({ children, className, ...props }: IconButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};
