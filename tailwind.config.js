const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#A1B5D8',
        muted: '#738290',
        background: '#FFFCF7',
        accentGreen: '#E4F0D0',
        accentOlive: '#C2D8B9',
        strongText: '#2C2F36',
      },
    },
  },
  plugins: [],
};
