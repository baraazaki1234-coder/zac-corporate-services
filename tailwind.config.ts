import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0F1F3D',
          900: '#0B1730',
          800: '#0F1F3D',
          700: '#1B3358',
          600: '#274672'
        },
        gold: {
          DEFAULT: '#B8894A',
          light: '#D3AE7A',
          dark: '#8C6635'
        },
        paper: '#F7F5F0',
        line: '#E4E0D6'
      },
      fontFamily: {
        arabic: ['var(--font-arabic)', 'sans-serif'],
        sans: ['var(--font-english)', 'sans-serif']
      },
      borderRadius: {
        sm: '2px',
        DEFAULT: '3px',
        md: '4px'
      }
    }
  },
  plugins: []
};

export default config;
