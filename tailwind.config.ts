/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Pinterest Exact Colors
        pinterest: {
          red: '#E60023',
          darkRed: '#AD081B',
          black: '#111111',
          darkGray: '#5F5F5F',
          mediumGray: '#767676',
          lightGray: '#EFEFEF',
          hoverGray: '#E2E2E2',
          white: '#FFFFFF',
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
