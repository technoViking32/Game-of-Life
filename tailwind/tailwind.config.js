/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/*.{html,js}"],
  theme: {
    colors:{
      'winered': '#501f3a',
      'pink' : '#cb2d6f',
      'greywhite': '#cccccc',
      'turquoise': '#14a098',
      'darkgreen': '#0f292f',
      'white': '#ffffff'
    },
  },
  variants: {
    fill: ['dark'], // Enable dark variant for fill
  },
  plugins: [],
  darkMode:'class',
}

