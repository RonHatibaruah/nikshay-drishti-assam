/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#060f1e',
          900: '#0a192f',
          850: '#0c1e3d',
          800: '#0f274a',
          700: '#173c6d',
          600: '#1d4ed8',
          500: '#2563eb',
          100: '#dbeafe',
          50: '#eff6ff'
        },
        assam: {
          green: '#006400',
          darkgreen: '#004d00',
          gold: '#c99700',
          red: '#c0262d'
        }
      }
    },
  },
  plugins: [],
}
