/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          950: '#070a08',
          900: '#0c0f0d',
          850: '#111713',
          800: '#16201a',
          700: '#1d2c23',
          600: '#253129',
          500: '#34463a',
          border: 'rgba(37, 49, 41, 0.6)',
          borderHover: 'rgba(195, 167, 142, 0.4)',
        },
        champagne: {
          DEFAULT: '#c3a78e',
          light: '#d9c2ad',
          dark: '#8f7862',
          gold: '#d4af37',
        },
        parchment: {
          DEFAULT: '#efe9df',
          muted: '#e5ddd0',
          dim: 'rgba(239, 233, 223, 0.65)',
          faint: 'rgba(239, 233, 223, 0.25)',
        }
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-instrument)', 'Instrument Sans', '-apple-system', 'sans-serif'],
        mono: ['var(--font-mono)', 'IBM Plex Mono', 'monospace'],
      },
      letterSpacing: {
        luxury: '0.22em',
        caps: '0.14em',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        }
      }
    },
  },
  plugins: [],
};
