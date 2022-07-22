/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ff6903",
      },
      gridTemplateColumns: {
        header: "250px 710px",
        primary: "250px 500px 160px",
      },
      gap: {
        primary: "50px",
      },
      width: {
        primary: "1010px",
      },
    },
  },
  plugins: [],
};
