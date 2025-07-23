import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CTAButton } from './CTAButton';

describe('CTAButton', () => {
  it('renders the button with the correct text', () => {
    render(<CTAButton>Click Me</CTAButton>);
    const buttonElement = screen.getByText(/Click Me/i);
    expect(buttonElement).toBeInTheDocument();
  });

  it('applies the primary variant class by default', () => {
    render(<CTAButton>Primary Button</CTAButton>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('bg-primary');
  });

  it('applies the secondary variant class when specified', () => {
    render(<CTAButton variant="secondary">Secondary Button</CTAButton>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('bg-secondary');
  });

  it('applies the accent variant class when specified', () => {
    render(<CTAButton variant="accent">Accent Button</CTAButton>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('bg-accent');
  });

  it('applies the outline variant class when specified', () => {
    render(<CTAButton variant="outline">Outline Button</CTAButton>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('border-2', 'border-primary');
  });

  it('is disabled when the disabled prop is true', () => {
    render(<CTAButton disabled>Disabled</CTAButton>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeDisabled();
  });

  it('applies custom className when provided', () => {
    render(<CTAButton className="custom-class">Custom Class</CTAButton>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('custom-class');
  });

  it('handles onClick events', () => {
    const mockOnClick = jest.fn();
    render(<CTAButton onClick={mockOnClick}>Clickable</CTAButton>);
    const buttonElement = screen.getByRole('button');
    buttonElement.click();
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
