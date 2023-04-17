/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'background': "#FBFAFF",
      'black': '#000000',
      'white': '#ffffff',
      'findable': '#5732A7',
      'accessible': '#699432',
      'interopereable': '#E38B06',
      'reuseable': '#066EBA',
      'light-stroke': '#EDEBF4'
    },
    rotate: {
      '0': '-130deg',
      '1': '-130deg',
      '2': '-130deg',
      '3': '-130deg',
      '4': '-130deg',
      '5': '-130deg',
      '50': '0deg',
      '60': '26deg',
      '70': '52deg',
      '80': '78deg',
      '90': '104deg',
      '100': '130deg',
    }
  },
  plugins: [],
}

