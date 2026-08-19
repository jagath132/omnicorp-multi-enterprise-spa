/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          hub: {
            50: '#f8fafc',
            100: '#f1f5f9',
            500: '#3b82f6',
            600: '#2563eb',
            900: '#0f172a',
            950: '#020617',
          },
          hospital: {
            50: '#f0fdfa',
            100: '#ccfbf1',
            500: '#14b8a6',
            600: '#0d9488',
            700: '#0f766e',
            900: '#134e4a',
          },
          ecommerce: {
            50: '#faf5ff',
            100: '#f3e8ff',
            500: '#a855f7',
            600: '#9333ea',
            700: '#7e22ce',
            900: '#581c87',
          },
          garments: {
            50: '#fffbeb',
            100: '#fef3c7',
            500: '#f59e0b',
            600: '#d97706',
            700: '#b45309',
            900: '#78350f',
          }
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
