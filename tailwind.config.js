/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        pr: "#0B2447",
        sr:"#19376D",
        tr:"#A5D7E8"
      }
    },
  },
  plugins: [],
}