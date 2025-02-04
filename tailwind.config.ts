import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./App.tsx"],
  theme: {
    extend: {
      colors: {},
      keyframes: {
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        colorCycle: {
          "0%, 100%": { color: "var(--pink)" },
          "50%": { color: "var(--blue)" },
        },
      },
      animation: {
        shimmer: "shimmer 2.5s infinite linear",
        colorCycle: "colorCycle 5s infinite",
      },
    },
  },
  plugins: [],
};
export default config;
