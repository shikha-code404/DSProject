/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        /* ── Core palette ── */
        primary: {
          50:  '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',  /* dark-mode primary */
          500: '#8b5cf6',
          600: '#7c3aed',  /* light-mode primary */
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        navy: {
          900: '#0F172A',
          800: '#1E293B',
          700: '#243247',
          600: '#2D3E55',
        },
        slate: {
          850: '#162032',
        },
        accent: {
          cyan:    '#06B6D4',
          emerald: '#10B981',
          orange:  '#F97316',
          violet:  '#8B5CF6',
          pink:    '#EC4899',
          yellow:  '#FACC15',  /* dark-mode accent */
          amber:   '#EAB308',  /* light-mode accent */
        },
        danger: {
          light: '#DC2626',
          dark:  '#EF4444',
        },
      },
      fontFamily: {
        sans:  ['Inter', 'system-ui', 'sans-serif'],
        head:  ['Poppins', 'system-ui', 'sans-serif'],
        mono:  ['"JetBrains Mono"', 'Consolas', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-dark': 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)',
      },
      boxShadow: {
        'glow-primary': '0 0 20px rgba(139,92,246,0.45)',  /* violet-500 */
        'glow-cyan':    '0 0 20px rgba(6,182,212,0.4)',
        'glow-emerald': '0 0 20px rgba(16,185,129,0.4)',
        'glow-orange':  '0 0 20px rgba(249,115,22,0.4)',
        'glow-violet':  '0 0 30px rgba(139,92,246,0.35)',
        'card':         '0 4px 24px rgba(0,0,0,0.25)',
        'card-hover':   '0 8px 40px rgba(0,0,0,0.4)',
      },
      animation: {
        'float':    'float 6s ease-in-out infinite',
        'shimmer':  'shimmer 2s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition:  '200% 0' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 1 },
          '50%':      { opacity: 0.6 },
        },
      },
      transitionDuration: {
        400: '400ms',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
