/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: '#D4973B',
          'gold-hover': '#E2A74F',
          bronze: '#854D0E',
          'bronze-deep': '#5C330A',
          amber: '#A16207'
        },
        dark: {
          bg: '#090807',
          surface: '#141210',
          elevated: '#1F1B17',
          border: 'rgba(255, 255, 255, 0.08)'
        },
        light: {
          bg: '#FAF9F6',
          surface: '#FFFFFF',
          muted: '#F5F5F4',
          border: 'rgba(28, 25, 23, 0.08)'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif']
      },
      animation: {
        'marquee-left': 'marquee-left 35s linear infinite',
        'marquee-right': 'marquee-right 35s linear infinite',
        'pulse-subtle': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      keyframes: {
        'marquee-left': {
          '0%': { transform: 'translate3d(0%, 0, 0)' },
          '100%': { transform: 'translate3d(-50%, 0, 0)' }
        },
        'marquee-right': {
          '0%': { transform: 'translate3d(-50%, 0, 0)' },
          '100%': { transform: 'translate3d(0%, 0, 0)' }
        }
      }
    }
  },
  plugins: []
};
