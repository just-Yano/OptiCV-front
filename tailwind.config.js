const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        muted: 'var(--color-muted)',
        background: 'var(--color-background)',
        accentGreen: 'var(--color-accent-green)',
        accentOlive: 'var(--color-accent-olive)',
        strongText: 'var(--color-strong-text)',
      },
    },
  },
  plugins: [],
};
