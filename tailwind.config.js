/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'black': '#000000',
      'white': '#ffffff',
      'findable': '#5732A7',
      'accessible': '#699432',
      'interopereable': '#E38B06',
      'reuseable': '#066EBA',
    },
  },
  plugins: [],
}

