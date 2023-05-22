module.exports = {
  darkMode: 'class',
  content: [
    'src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'light': {
          'background': '#ffffff',
          'text': '#222222',
          'primary': '#7029ff',
          'secondary': '#f1eaff',
          'accent': '#aa80ff'
        },
        'dark': {
          'background': '#090909',
          'text': '#ffffff',
          'primary': '#7029ff',
          'secondary': '#f1eaff',
          'accent': '#aa80ff',
        },
      },
    },
  },
  plugins: [],
};
