/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./_layouts/**/*.{html,js}",
    "./_includes/**/*.{html,js}",
    "./*.{html,md}",
    "./_posts/**/*.{html,md}"
  ],
  theme: {
    fontFamily: {
      'sans': '"Raleway", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      'display': '"Space Grotesk", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    extend: {
      colors: {
        slate: {
          750: '#293548',
        }
      },
      animation: {
        'scroll': 'scroll 30s linear infinite',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
