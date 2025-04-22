import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Первый экран — холодные оттенки
        frostedWhite: "#FAFAFA",
        glacierGray: "#D1D1D1",
        steelyIce: "#929292",
        obsidian: "#222222",

        // Второй экран — фиолетовые/пастельные оттенки
        softLavender: "#E6E6FA",
        pastelPlum: "#A87CA0", 
        deepViolet: "#5E2B6D",
        royalAubergine: "#2A0E3C",
      },
    },
  },
  plugins: [],
} satisfies Config;
