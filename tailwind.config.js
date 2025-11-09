/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./_layouts/**/*.{html,js}", "./_includes/**/*.{html,js}"],
  theme: {
    fontFamily: {
      'sans': '"Raleway", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
    },
    extend: {
      colors: {
        slate: {
          750: '#293548',
        }
      }
    },
  },
  plugins: [],
}
