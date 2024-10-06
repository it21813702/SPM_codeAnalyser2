/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'Nunito', 'sans-serif'],
      },
      fontSize: {
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
      },
      colors: {
        softWhite: '#F7F7F7',
        softGray: '#E0E0E0',
        lightPurple: '#C9A3E6',
        lavender: '#DCCFF5',
        lavender2: '#E6E6FA',
        babyPink: '#FADADD',
        paleYellow: '#FFFBCC',
        shadowDark: 'rgba(0, 0, 0, 0.1)',
        shadowLight: 'rgba(255, 255, 255, 0.7)',
      },
      animation: {
        'gradient-glow': 'glow 6s ease infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backgroundSize: {
        '200%': '200% 200%',
      },
      boxShadow: {
        soft: '9px 9px 16px rgba(0, 0, 0, 0.15), -9px -9px 16px rgba(255, 255, 255, 0.7)',
      },
    },
  },
  plugins: [],
}

