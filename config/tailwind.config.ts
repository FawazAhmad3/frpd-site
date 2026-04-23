import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './App.tsx',
    './src/**/*.{js,ts,jsx,tsx}',
    './src/data/**/*.json',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0f172a',
          light: '#1e293b',
          accent: '#3b82f6',
          white: '#f8fafc',
          gray: '#f1f5f9',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
