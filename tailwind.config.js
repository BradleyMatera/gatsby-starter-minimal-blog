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
        primary: '#132A13',
        secondary: '#31572C',
        accent: '#4F772D',
        highlight: '#90A955',
        background: '#ECF39E',
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
