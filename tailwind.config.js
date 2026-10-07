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
        nxt: {
          bg: {
            light: '#f2f5f8',
            dark: '#080c12',
          },
          surface: {
            light: '#ffffff',
            dark: '#0f1520',
          },
          border: {
            light: 'rgba(15, 23, 42, 0.1)',
            dark: 'rgba(255, 255, 255, 0.1)',
          },
          cyan: {
            DEFAULT: '#00cfc8',
            hover: '#00baa7',
            glow: 'rgba(0, 207, 200, 0.35)',
            light: '#e0faf8',
          },
          ink: {
            primary: '#070b12',
            secondary: '#5a6578',
            muted: '#8e9aa8',
          },
          darktext: {
            primary: '#f1f5f9',
            secondary: '#94a3b8',
            muted: '#64748b',
          }
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Syne', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'marquee-reverse': 'marquee-reverse 25s linear infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        }
      }
    },
  },
  plugins: [],
}
