import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#032B91',
        'primary-bg': '#F5F5F5',
        'blue-bg': '#CCE4FF',
        'blue-primary': '#1488DB',
      },
    },
  },
  plugins: [],
};

export default config;
