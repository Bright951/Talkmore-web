/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode:"class",
  theme: {
    extend: {
      boxShadow: {
        'dark-md':'0 4px 6px rgba(0, 0, 0, 0.6)',
      },
    },
  },
  plugins: [],
}