/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          50: '#FDFBF7',
          100: '#FAF7F2',
          200: '#F4EAD4',
          300: '#E8DCBF',
        },
        forest: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        },
        warm: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
      },
      fontFamily: {
        display: ['Fredoka', 'Quicksand', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'Nunito', 'sans-serif'],
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        '2xs': '0 1px 1px 0 rgba(0, 0, 0, 0.04)',
        warm: '0 8px 24px -4px rgba(180, 83, 9, 0.08), 0 4px 12px -2px rgba(6, 78, 59, 0.06)',
        'warm-hover': '0 12px 32px -4px rgba(180, 83, 9, 0.14), 0 6px 16px -2px rgba(6, 78, 59, 0.1)',
        glow: '0 0 25px rgba(245, 158, 11, 0.25)',
      },
      borderWidth: {
        '3': '3px',
      },
      scale: {
        '97': '0.97',
        '98': '0.98',
        '99': '0.99',
        '102': '1.02',
        '103': '1.03',
      },
    },
  },
  plugins: [],
};
