module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,mdx,css}",
    "./content/**/*.{md,mdx,js,jsx,css}",
    "./src/styles/**/*.css",
    "./content/**/*.mdx",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#001E3C',
        'dark-gray': '#0A253E',
        'success-green': '#00CC66',
        'blue-accent': '#0073BB',
        coral: '#FF7F50',
        'light-gray': '#E0E0E0',
      },
      fontFamily: {
        sans: ['Inter', 'Helvetica', 'Arial', 'ui-sans-serif', 'system-ui'],
      },
      lineHeight: {
        relaxed: '1.6',
      },
      maxWidth: {
        'screen-xl': '1280px',
      },
      fontSize: {
        '5xl': '3rem',
      },
      screens: {
        md: '768px',
      },
    },
  },
  plugins: [],
};
