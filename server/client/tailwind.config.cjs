/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        advitoBg: "#0E0F12",
        advitoCard: "#151821",
        advitoAccent: "#22C55E"
      }
    }
  },
  plugins: []
};
