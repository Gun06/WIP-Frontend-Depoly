import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        run: {
          bg: "#0a0a0a",
          surface: "#141414",
          border: "#2a2a2a",
          volt: "#dfff4f",
          muted: "#6b6b6b",
        },
      },
      fontFamily: {
        display: ["var(--font-oswald)", "'Pretendard Variable'", "Pretendard", "system-ui", "sans-serif"],
        body: ["'Pretendard Variable'", "Pretendard", "var(--font-geist)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
