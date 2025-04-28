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
