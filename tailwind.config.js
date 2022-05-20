
const withMT = require("@material-tailwind/react/utils/withMT"); 

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      transitionProperty: {
        'height': 'height, max-height',
        'spacing': 'margin, padding',
      },
      animation: {
        minimize: "minimize 1s 1",
        fadeIn: 'fadeIn 300ms ease-in-out',
        fadeOut: 'fadeOut 300ms ease-in-out',
      },
      keyframes: {
        fadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        minimize: {
          '0%': {
            trasform: " translateY(100%)",
            hieght: "100%"
          },
          '100%': {
            transform: "translateX(0px)",
            hieght: "0px"
          }

        }
      },

      colors: {
        'modal': 'rgba(10, 10, 10, 0.6)',
      },
    },
  },
  plugins: [],
  
});
