import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CTAButton } from './CTAButton';

interface ButtonCrossArrowProps {
  text?: string;
  onClick?: () => void;
  className?: string;
}

/**
 * A button component with a cross-arrow icon, built on top of CTAButton.
 *
 * @param {object} props - The properties for the component.
 * @param {string} [props.text='See all agent'] - The text to display inside the button.
 * anpm install
 * @param {Function} [props.onClick] - The function to call when the button is clicked.
 * @param {string} [props.className] - Additional CSS classes to apply to the button.
 * @returns {JSX.Element} The rendered button component.
 */
const ButtonCrossArrow: React.FC<ButtonCrossArrowProps> = ({ 
  text = "See all agent", 
  onClick,
  className = ""
}) => {
  return (
    <CTAButton 
      onClick={onClick}
      variant="primary"
      className={`!px-4 !py-2 text-sm font-medium shadow-md hover:shadow-lg ${className}`}
    >
      <span className="inline-flex items-center gap-2">
        {text}
        <ArrowRight className="h-4 w-4" />
      </span>
    </CTAButton>
  );
};

export default ButtonCrossArrow;
