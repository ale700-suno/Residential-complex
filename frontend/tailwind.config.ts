import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        graphite: {
          DEFAULT: '#1A1D23',
          light: '#2A2E36',
          dark: '#0F1114',
        },
        ocean: {
          DEFAULT: '#0B1D3A',
          deep: '#061224',
          mid: '#143052',
        },
        sand: {
          DEFAULT: '#C4A882',
          light: '#D4BC9A',
          dark: '#A68B6A',
        },
        gold: {
          DEFAULT: '#C9A962',
          light: '#E2C88A',
          dark: '#A68B45',
        },
        milk: {
          DEFAULT: '#F5F0E8',
          dark: '#E8E0D4',
        },
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body: ['var(--font-jost)', 'system-ui', 'sans-serif'],
        accent: ['var(--font-cinzel)', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-luxury':
          'linear-gradient(135deg, #0B1D3A 0%, #1A1D23 50%, #061224 100%)',
        'gradient-gold':
          'linear-gradient(135deg, #C9A962 0%, #E2C88A 50%, #A68B45 100%)',
      },
      animation: {
        shimmer: 'shimmer 3s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite alternate',
        'gradient-shift': 'gradient-shift 8s ease infinite',
      },
      keyframes: {
        shimmer: {
          '0%, 100%': { backgroundPosition: '200% center' },
          '50%': { backgroundPosition: '-200% center' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(201, 169, 98, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(201, 169, 98, 0.6)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;
