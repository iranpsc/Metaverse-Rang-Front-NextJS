/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: 'jit', // or 'aot'
  purge: ['./src/**/*.{js,jsx,ts,tsx}'], // path to your application files
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        'sm': '640px',
        'md': '920px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      fontFamily: {
        'Bruno': ['BrunoAceSC-Regular', 'sans-serif'],
        'Bebas': ['BebasNeue-Regular', 'sans-serif'],
        'Digi': ['DigiHamisheRegular', 'sans-serif'],
        'Jana': ['JannaLTBold', 'sans-serif'],
        'IranSans': ['IranSans', 'sans-serif'],
        'Orbitron': ['Orbitron-Bold', 'sans-serif'],
        'JannaLTRegular': ['JannaLTRegular', 'sans-serif'],
      },
      colors: {
        orange: '#FF8D29',
        red: '#FF0000',
        blue: {
          DEFAULT:'#3E00FF',
          light: '#D8FDFC',
          link: '#265AFF',
          linkdark: '#1E48B9'
        },
        gray: {
          lighter: '#CCCCCC',
          light: '#666666',
          DEFAULT:'#333333',
        },
        red: '#FF0000',
        purple: '#A637D9',
        white: '#FFFFFF',
        black: '#000000',
        green: {
          light:'#6EBE33',
          DEFAULT:'#00AE40',
          dark:'#005424',
        },
      },
    },
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

