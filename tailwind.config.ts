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
        bgop: "#1A1F2D", // Более глубокий темно-синий/серый
        dopHover: "#8B9692", // Мягкий серый для hover
        dop: "#3C4245", // Чуть светлее, чем раньше
        light: "#E5E5E5", // Приглушенный белый
        dark: "#252A34", // Насыщенный темный
      },
    },
  },
  plugins: [],
} satisfies Config;
