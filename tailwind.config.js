/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors:{
        primaryColor: '#72C2EF',
        secondaryColor: '#F4F4F4',
        darkPrimaryColor: '#00466D',
        darkSecondaryColor: '#001B2B',
        boxColor: '#E8E8E8',
        grennColor: '#58A35B',
        footerColor: '#181818',
        transparentBlackColor: 'rgba(0, 0, 0, 0.4)',
      },
      backgroundImage:{
        bgImage: "url('/images/background.png')",
      },
    },
  },
  plugins: [],
}

