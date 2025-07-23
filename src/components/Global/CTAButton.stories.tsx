import type { Meta, StoryObj } from '@storybook/react';
import { CTAButton } from './CTAButton';
import { Sparkles } from 'lucide-react';

const meta: Meta<typeof CTAButton> = {
  title: 'Global/CTAButton',
  component: CTAButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'accent', 'outline'],
    },
    children: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Action',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Action',
  },
};

export const Accent: Story = {
  args: {
    variant: 'accent',
    children: 'Accent Action',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline Action',
  },
};

export const WithIcon: Story = {
  args: {
    variant: 'primary',
    children: (
      <>
        <Sparkles className="mr-2 h-5 w-5" />
        Action with Icon
      </>
    ),
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    children: 'Disabled Button',
    disabled: true,
  },
};
