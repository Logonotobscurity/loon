import React from 'react';

interface ButtonBlackShadowProps {
  text?: string;
  onClick?: () => void;
  className?: string;
}

const ButtonBlackShadow: React.FC<ButtonBlackShadowProps> = ({ 
  text = "Start", 
  onClick,
  className = "" 
}) => {
  return (
    <button 
      onClick={onClick}
      className={`group h-8 select-none rounded-lg bg-gradient-to-b from-zinc-800 via-zinc-900 to-zinc-600 px-3 text-sm leading-8 text-white shadow-[0_-1px_0_1px_rgba(0,0,0,0.8)_inset,0_0_0_1px_rgb(9_9_11)_inset,0_0.5px_0_1.5px_#71717a_inset] hover:bg-gradient-to-b hover:from-zinc-900 hover:via-zinc-900 hover:to-zinc-700 active:shadow-[0_3px_0_0_rgba(0,0,0)_inset] ${className}`}
    >
      <span className='block group-active:[transform:translate3d(0,1px,0)]'>
        {text}
      </span>
    </button>
  );
};

export default ButtonBlackShadow;
