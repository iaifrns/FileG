/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: '#481c4b',
        secondary: '#e01d5b',
        tersary: '#2bb1eb'
      },
      width: {
        'container-sm': '300px'
      }
    },
  },
  plugins: [],
}

