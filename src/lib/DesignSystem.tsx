import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

// Text Primitives with new design system
const textStyles = cva('', {
  variants: {
    style: {
      h1: 'font-satoshi font-bold text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight text-text-white',
      h2: 'font-satoshi font-bold text-3xl md:text-4xl lg:text-5xl leading-tight text-text-white',
      h3: 'font-satoshi font-medium text-2xl md:text-3xl leading-snug text-text-white',
      h4: 'font-inter font-semibold text-xl md:text-2xl text-text-white',
      h5: 'font-inter font-medium text-lg md:text-xl text-text-white-90',
      h6: 'font-inter font-medium text-base md:text-lg text-text-white-90',
      body: 'font-inter text-base leading-relaxed text-text-white-80',
      'body-large': 'font-inter text-lg leading-relaxed text-text-white-80',
      'body-small': 'font-sans text-xs text-text-white-60',
      caption: 'font-inter text-sm text-text-white-60',
      serif: 'font-times text-base text-text-white-80',
    },
    color: {
      default: '',
      primary: 'text-primary',
      accent: 'text-accent-purple',
      muted: 'text-text-muted',
      gradient: 'bg-gradient-to-r from-primary via-accent-blue to-accent-purple bg-clip-text text-transparent',
    },
  },
  defaultVariants: {
    style: 'body',
    color: 'default',
  },
});

// Allow 'as' prop for semantic elements
type TextProps = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
} & React.HTMLAttributes<HTMLElement> & VariantProps<typeof textStyles>;

export const Text: React.FC<TextProps> = ({ as: Component = 'p', className, style, color, ...props }) => (
  <Component className={twMerge(textStyles({ style, color }), className)} {...props} />
);


// Layout Primitives
const flexStyles = cva('flex', {
  variants: {
    direction: {
      row: 'flex-row',
      col: 'flex-col',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
    },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
    },
  },
});

type FlexProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof flexStyles>;

export const Flex: React.FC<FlexProps> = ({ className, direction, align, justify, ...props }) => (
  <div className={twMerge(flexStyles({ direction, align, justify }), className)} {...props} />
);

const gridStyles = cva('grid', {
  variants: {
    cols: {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      12: 'grid-cols-12',
    },
    gap: {
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-8',
    },
  },
});

type GridProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof gridStyles>;

export const Grid: React.FC<GridProps> = ({ className, cols, gap, ...props }) => (
  <div className={twMerge(gridStyles({ cols, gap }), className)} {...props} />
);
