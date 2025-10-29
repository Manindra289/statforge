/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        category:{
          DEFAULT:"#3b82f6",
          strength:"#FF4C4C",
          intelligence:"#3B82F6",
          vitality : "#22C55E", 
          wisdom : "#A855F7 ", 
          resistance:"#CA8A04"
        }
      },
    },
  },
  plugins: [],
};
