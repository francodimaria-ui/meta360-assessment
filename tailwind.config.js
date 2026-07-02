/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#101020",
        surface: "#191A2C",
        surface2: "#20223A",
        line: "#2E2F49",
        ink: "#F5F4FA",
        dim: "#A6A5C4",
        blue: {
          DEFAULT: "#3B7FC4",
          dark: "#2A5D96",
          light: "#6FA8DC",
        },
        red: {
          DEFAULT: "#FF4B4B",
          dark: "#D93030",
        },
        gold: "#D9A756",
        green: "#34B378",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Manrope'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      boxShadow: {
        card: "0 4px 28px -8px rgba(0,0,0,0.45)",
      },
    },
  },
  plugins: [],
}

