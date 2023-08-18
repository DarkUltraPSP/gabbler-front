const { text } = require('express');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        "english-violet": "#634B66",
        "cool-grey": "#9590A8",
        "licorice": "#18020C",
        "ash-grey": "#BBCBCB",
        "nyanza": "#E5FFDE",
      },
      border: {
        "border-r": "1px",
      }
    },
  },
  plugins: [],
  darkMode: "class",
};
