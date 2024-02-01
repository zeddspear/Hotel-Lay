/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        main: "#2D2327",
        secondaryMain: "#62466B",
        tertiaryMain: "#45364B",
      },
    },
  },
  plugins: [],
};
