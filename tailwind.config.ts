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
          red: '#E60023',           // Primary brand red
          darkRed: '#AD081B',       // Hover state red
          black: '#111111',         // Primary text, active nav bg
          darkGray: '#5F5F5F',      // Secondary text
          mediumGray: '#767676',    // Icons, tertiary text
          lightGray: '#EFEFEF',     // Search bg, borders
          hoverGray: '#E2E2E2',     // Hover background for buttons
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
