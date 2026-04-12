/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        luxury: {
          black: '#0a0a0a',
          charcoal: '#141414',
          graphite: '#1f1f1f',
          mist: '#e8e6e3',
          pearl: '#f5f3f0',
          gold: '#b8952e',
          'gold-light': '#d4b85c',
          'gold-dark': '#8f7324',
          silver: '#737373',
          page: '#ffffff',
          surface: '#f7f7f5',
          'surface-2': '#efeee9',
          border: '#e5e2dc',
          ink: '#1a1a1a',
          'ink-secondary': '#3d3d3d',
          'ink-muted': '#5c5c5c',
        },
      },
      fontFamily: {
        sans: ['Cairo', 'sans-serif'],
        display: ['Cairo', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient':
          'linear-gradient(135deg, rgba(10,10,10,0.88) 0%, rgba(30,30,30,0.72) 50%, rgba(10,10,10,0.85) 100%)',
        'gold-shine':
          'linear-gradient(110deg, #c9a962 0%, #dfc88a 45%, #c9a962 90%)',
      },
      boxShadow: {
        luxury: '0 20px 45px -12px rgba(0, 0, 0, 0.08)',
        gold: '0 4px 24px rgba(184, 149, 46, 0.12)',
      },
      animation: {
        shimmer: 'shimmer 2.5s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
