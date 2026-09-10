/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { 'neo-grey': '#a3a3a3', 'neo-black': '#000000', 'neo-white': '#FFFFFF' },
      fontFamily: { sans: ['"Space Grotesk"', 'sans-serif'] },
      boxShadow: { neo: '5px 8px 0px 0px #000000', 'neo-hover': '2px 4px 0px 0px #000000' },
      borderWidth: { 3: '3px' },
    },
  },
  plugins: [],
};
