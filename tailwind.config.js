module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,mdx,css}",
    "./content/**/*.{md,mdx,js,jsx,css}",
    "./src/styles/**/*.css",
    "./src/components/**/*.js",
    "./content/**/*.mdx"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#072a20',
        secondary: '#05241b',
        accent: '#57c06a',
        highlight: '#7be58a',
        background: '#041e16',
      },
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'ui-sans-serif', 'system-ui'],
      },
      maxWidth: {
        'screen-xl': '1280px',
      },
      fontSize: {
        '5xl': '3rem',
      },
      screens: {
        'md': '768px',
      },
    },
  },
  plugins: [],
}
