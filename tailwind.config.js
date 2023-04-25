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
      'light-background': "#FCFCFD",
      'black': '#000000',
      'white': '#ffffff',
      'findable': '#5732A7',
      'accessible': '#699432',
      'interopereable': '#E38B06',
      'reuseable': '#066EBA',
      'light-stroke': '#EDEBF4',
      'findable-stroke':"#440BC0",
      'gradient-start': "#5DFF11",
      'gradient-mid': '#FFA63D',
      'gradient-end': '#FF0000'

    },
    boxShadow: {
      'glow': '0px 0px 5px 5px',
    }

  },
  plugins: [],
}

