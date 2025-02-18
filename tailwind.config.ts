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
       bgop : "#C1BAA1",
       dopHover: "#88816A",
        dop: "#6E6A5E",
        light: "#F5F5F5",
        dark: "#2D2D2D",
      },
    },
  },
  plugins: [],
} satisfies Config;
