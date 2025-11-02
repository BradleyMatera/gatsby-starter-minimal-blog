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
        navy: '#001E3C',      // Primary background
        'dark-gray': '#0A253E', // Secondary backgrounds
        'success-green': '#00CC66', // Status indicators
        'blue-accent': '#0073BB',   // Accents and CTAs
        coral: '#FF7F50',     // Highlight for CTAs or warnings
        'light-gray': '#E0E0E0',    // Text and subtle elements
      },
      fontFamily: {
        sans: ['Inter', 'Helvetica', 'Arial', 'ui-sans-serif', 'system-ui'],
      },
      lineHeight: {
        'relaxed': '1.6',
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
