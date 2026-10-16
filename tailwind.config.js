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
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
        },
      },
      fontFamily: {
        display: ['Fredoka', 'Quicksand', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'Nunito', 'sans-serif'],
      },
      boxShadow: {
        warm: '0 8px 24px -4px rgba(180, 83, 9, 0.08), 0 4px 12px -2px rgba(6, 78, 59, 0.06)',
        'warm-hover': '0 12px 32px -4px rgba(180, 83, 9, 0.14), 0 6px 16px -2px rgba(6, 78, 59, 0.1)',
        glow: '0 0 25px rgba(245, 158, 11, 0.25)',
      },
    },
  },
  plugins: [],
};
