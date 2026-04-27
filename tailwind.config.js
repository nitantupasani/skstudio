module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
  theme: {
    extend: {
      colors: {
        base: '#0A0A0A',
        surface: '#111110',
        surface2: '#161614',
        ink: '#EDEAE3',
        ink2: '#C9C2B5',
        muted: '#8A8680',
        muted2: '#585652',
        rule: '#1F1E1B',
        rule2: '#2A2825',
        accent: '#E8DFC9',
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
