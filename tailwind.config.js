module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
  theme: {
    extend: {
      colors: {
        base: '#F9F9F9',
        surface: '#FFFFFF',
        surface2: '#ECECEC',
        ink: '#6D6D6D',
        ink2: '#3F3F3F',
        muted: '#A8A8A8',
        muted2: '#C4C4C4',
        rule: '#E0E0E0',
        rule2: '#D0D0D0',
        accent: '#F9C74F',
        primary: '#6D6D6D',
        secondary: '#A8A8A8',
        secondaryLight: '#F9F9F9',
        tertiary: '#F9C74F',
      },
      fontFamily: {
        display: ['"Inter Tight"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"Inter Tight"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        deva: ['"Noto Serif Devanagari"', 'serif'],
      },
      letterSpacing: {
        'wider-2': '0.18em',
        'widest-2': '0.32em',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
      },
    },
  },
  plugins: [],
};
