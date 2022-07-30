module.exports = {
  content: [
    './public/**/*.html',
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
   
      gridTemplateRows: {
        // Simple 8 row grid
        '11': 'repeat(11, minmax(0, 1fr))',
        '12': 'repeat(12, minmax(0, 1fr))',
        '15': 'repeat(15, minmax(0, 1fr))',
      },
      gridTemplateColumns: {
        // Simple 8 row grid
        '11': 'repeat(11, minmax(0, 1fr))',
        '12': 'repeat(12, minmax(0, 1fr))',
        '15': 'repeat(15, minmax(0, 1fr))',
      },
      keyframes: {
        hangdown: {
          '0%': { transform: 'y:-300' },
          '10%': { transform: 'y:-250' },
          '20%': { transform: 'y:-200' },
          '30%': { transform: 'y:-150' },
          '40%': { transform: 'y:-100' },
          '50%': { transform: 'y:-50' },
          '60%': { transform: 'y:-20' },
          '100%': { transform: 'y:0' },
        },
      },
      fontFamily:{

        BVP:['Be Vietnam Pro', 'sans-serif']
      },
      animation: {
        'hang': 'hangdown 1s linear 1',
      },
      transitionTimingFunction: {
        'bounced': 'cubic-bezier(.41,1.62,.39,.63)',
        'return': 'cubic-bezier(.29,1.25,.4,1.14)',
 
      },
      backgroundImage: {
        'docnhalang': "url('/src/Asset/Mainpage/sct5.2.svg')",
        'steam': "url('/src/Asset/Mainpage/sct5.3.svg')",
        'artTech':"url('/src/Asset/Mainpage/sct5.4.svg')",
        'shop':"url('/src/component/Shop/heropic.svg')"
        
       
      },
      fontSize: {
        'aCaption': '0.875rem',
        'aCaptionVw': '0.985vw',
        'aButton': '1.1722vw',
        'aButtonVw': '1.1rem',
        'aPara': '22px',
        'aParaVw': '22px',
        'aSubtitle': '2rem',
        'aSubtitleVw': ' 2.0835vw',
        'aTitle2': '4rem',
        'aTitle2Vw': '4rem',
        'aTitle1': '6rem',
        'aTitle1Vw': '6.875vw',
      },
      fontWeight: {
        'title-Subtitle':500,
        'title2-caption':400,
        'p':300,
        'button':600,
        'button-sec':500,
        'caption-600':600
      },
      colors: {
        'primary': '#F7F3EE',
        'whiteText':'#FFFFFF',
        'primaryBlack':'#191919',
        'primaryYellow':'#ffdd00'
      },
      
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('@tailwindcss/typography'),
  ],
}
