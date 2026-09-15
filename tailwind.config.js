/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#020617',
          900: '#0F172A',
          800: '#1E293B',
          700: '#2A3B52',
        },
        cyan: {
          400: '#22D3EE',
          500: '#06B6D4',
          600: '#0891B2',
        },
        mint: {
          400: '#34D399',
          500: '#10B981',
        },
        porcelain: {
          50: '#F8FAFC',
          100: '#F1F5F9',
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'radial-glow':
          'radial-gradient(circle at 50% 0%, rgba(6,182,212,0.18), transparent 60%)',
        'aura-grid':
          'linear-gradient(rgba(148,163,184,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.06) 1px, transparent 1px)',
      },
      boxShadow: {
        glow: '0 0 60px -10px rgba(6,182,212,0.35)',
        card: '0 20px 40px -20px rgba(2,6,23,0.5)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        rise: {
          '0%': { opacity: 0, transform: 'translateY(24px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        rise: 'rise 0.7s ease-out both',
      },
      opacity: {
        8: '0.08',
        12: '0.12',
        15: '0.15',
        35: '0.35',
        45: '0.45',
        55: '0.55',
        65: '0.65',
        85: '0.85',
        92: '0.92',
      },
    },
  },
  plugins: [],
}
