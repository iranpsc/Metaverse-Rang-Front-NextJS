/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: "jit", // or 'aot'
  purge: ["./src/**/*.{js,jsx,ts,tsx}"], // path to your application files
  darkMode: ["class"],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

