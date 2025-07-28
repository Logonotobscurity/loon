/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      // Primary brand colors
      primary: {
        DEFAULT: '#1a66ff',
        hover: '#0052e6',
        dark: '#0061ff',
        light: '#6397ff',
      },
      // Secondary brand colors
      secondary: {
        DEFAULT: '#9e9eff',
        dark: '#8585ff',
        light: '#b8b8ff',
      },
      // Accent colors
      accent: {
        red: '#e55649',
        orange: '#f16434',
        purple: '#d0adf0',
        blue: '#9e9eff',
      },
      // Background colors
      bg: {
        white: '#ffffff',
        'white-95': '#ffffffe6',
        'white-10': '#ffffff1a',
        'white-5': '#ffffff0d',
        'white-3': '#ffffff03',
        'white-12': '#ffffff1f',
        light: '#f7f7f7',
        'light-alt': '#f6f6f8',
        muted: '#e9e9e9',
        dark: '#09090b',
        'dark-90': '#06081fe0',
        'dark-95': '#0a0a0bf2',
        darker: '#000000',
        'dark-overlay': '#00000033',
        gray: '#3b3b3b',
        'gray-light': '#72768b29',
      },
      // Text colors
      text: {
        white: '#ffffff',
        'white-10': '#ffffff1a',
        'white-40': '#ffffff66',
        'white-60': '#ffffff99',
        'white-70': '#ffffffb3',
        'white-90': '#ffffffe6',
        'white-80': '#ffffffcc',
        light: '#fafafa',
        'light-alt': '#f4f4f5',
        muted: '#a3b0b3',
        'muted-alt': '#8f8f8f',
        'muted-dark': '#5c708099',
        gray: '#636363',
        dark: '#252222',
        black: '#000000',
        'black-96': '#000000f5',
        'black-97': '#000000f7',
        'black-88': '#000000e0',
      },
      // Border colors
      border: {
        'white-60': '#ffffff99',
        'white-20': '#ffffff33',
        'white-12': '#ffffff1f',
        'white-10': '#ffffff1a',
        'white-5': '#ffffff0d',
        white: '#ffffff',
        light: '#dfe3e4',
        muted: '#d2d2d2',
        gray: '#858585',
        dark: '#27272a',
        darker: '#222222',
      },
      // Fill colors
      fill: {
        white: '#ffffff',
        'white-90': '#ffffffe6',
        slate: '#1e293b',
        dark: '#252222',
        black: '#000000',
        'black-96': '#000000f5',
        'black-97': '#000000f7',
      },
      // Utility
      transparent: 'transparent',
      current: 'currentColor',
    },
    fontFamily: {
      'times': ['Times New Roman', 'serif'],
      'sans': ['sans-serif'],
      'satoshi': ['Satoshi', 'Satoshi Placeholder', 'sans-serif'],
      'inter': ['Inter', 'Inter Placeholder', 'sans-serif'],
    },
    fontSize: {
      'xs': ['12px', { lineHeight: '1' }],
      'sm': ['14px', { lineHeight: '1.25' }],
      'base': ['16px', { lineHeight: '1.5' }],
      'lg': ['18px', { lineHeight: '1.75' }],
      'xl': ['20px', { lineHeight: '1.75' }],
      '2xl': ['24px', { lineHeight: '1.5' }],
      '3xl': ['30px', { lineHeight: '1.25' }],
      '4xl': ['36px', { lineHeight: '1.25' }],
      '5xl': ['48px', { lineHeight: '1.15' }],
      '6xl': ['60px', { lineHeight: '1.1' }],
      '7xl': ['72px', { lineHeight: '1' }],
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        md: '2rem',
        lg: '4rem',
      },
    },
    extend: {
      spacing: {
        '7': '1.75rem',
      },
      gridTemplateColumns: {
        '12': 'repeat(12, 1fr)',
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
        '3xl': '40px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
        'gradient-dark': 'linear-gradient(180deg, #09090b 0%, #000000 100%)',
        'gradient-brand': 'linear-gradient(135deg, #1a66ff 0%, #9e9eff 100%)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-sm': '0 4px 16px 0 rgba(0, 0, 0, 0.17)',
        'glow': '0 0 20px rgba(26, 102, 255, 0.5)',
        'glow-lg': '0 0 40px rgba(26, 102, 255, 0.3)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
