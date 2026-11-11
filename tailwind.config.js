/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#fafafa",
        surface: "#ffffff",
        brand: {
          orange: "#ff5429",
          "orange-light": "#fff1ee",
          green: "#10b981",
          "green-light": "#ecfdf5",
          purple: "#7c3aed",
          "purple-light": "#f5f3ff",
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      animation: {
        'float-slow': 'floating 6s ease-in-out infinite',
        'float-reverse': 'floatingRev 7s ease-in-out infinite',
        'float-gentle': 'floatingGentle 5s ease-in-out infinite',
      },
      keyframes: {
        floating: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1deg)' },
        },
        floatingRev: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(10px) rotate(-1deg)' },
        },
        floatingGentle: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      }
    },
  },
  plugins: [],
}
