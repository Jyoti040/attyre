/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        paleWhite:'#F8F7F4',
        white : '#FFFFFF',
        darkPink:'#E31B54',
        lightPink:'#F63D68',
        lighterPink:'#ffe4eb',
        grayishBlue:'#475467',
        darkBlack:'#101828',
        darkBlue:'#344054',
        blackishBlue :'#101828',
        lightGray:'#eaecf0',
        darkGray : '#oc111d'
      } ,
      fontFamily:{
        playfair:['"PlayFair Display"','serif'],
        inter:['"Inter"','sans-serif'],
      }
    },
  },
  plugins: [],
}

