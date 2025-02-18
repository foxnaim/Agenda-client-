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
      },
    },
  },
  plugins: [],
} satisfies Config;
