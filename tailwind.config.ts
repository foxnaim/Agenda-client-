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
        bgop: "rgb(193, 186, 161)",
        dopHover: "rgb(136, 129, 106)",
        dop: "rgb(110, 106, 94)",
        light: "rgb(245, 245, 245)",
        dark: "rgb(45, 45, 45)",
      },
    },
  },
  plugins: [],
} satisfies Config;
