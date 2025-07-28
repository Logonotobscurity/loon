import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CTAButton } from './CTAButton';

interface ButtonCrossArrowProps {
  text?: string;
  onClick?: () => void;
  className?: string;
}

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
