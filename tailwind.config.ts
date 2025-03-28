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
        bgop: "#293133",
        dopHover: "rgb(145, 153, 148) ",
        dop: "rgb(67, 72, 73)",
        light: "rgb(245, 245, 245)",
        dark: "rgb(45, 45, 45)",
      },
    },
  },
  plugins: [],
} satisfies Config;