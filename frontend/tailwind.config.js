/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      keyframes: {
        smoke: {
          '0%': { transform: 'translateY(10px) scale(0.85)', opacity: '0' },
          '40%': { opacity: '0.8' },
          '100%': { transform: 'translateY(-60px) scale(1.3)', opacity: '0' },
        }
      },
      animation: {
        smoke: 'smoke 4s ease-out infinite',
      }
    },
  },
  plugins: [],
}

