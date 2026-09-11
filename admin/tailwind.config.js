/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#06070a',
          900: '#090b11',
          850: '#0d101a',
          800: '#121624',
          700: '#1c2236'
        }
      }
    },
  },
  plugins: [],
}
