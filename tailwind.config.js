/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,

  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        neutral: {
          950: "#1F1F1F",
        },
      },
    },
  },
  plugins: [],
};
