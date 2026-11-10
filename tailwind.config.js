/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Extracted from the Command Ojo '98 brand
        forest: {
          DEFAULT: "#16332B",
          light: "#1F4A3D",
          dark: "#0E241D",
        },
        gold: {
          DEFAULT: "#D9A94F",
          light: "#E8C57C",
          dark: "#B98A32",
        },
        cream: {
          DEFAULT: "#FAF7F0",
          dark: "#F0EAD9",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
