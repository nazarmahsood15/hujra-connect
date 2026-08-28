import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        app: {
          bg: "var(--bg)",
          bgSoft: "var(--bg-soft)",
          card: "var(--card)",
          ink: "var(--ink)",
          inkSoft: "var(--ink-soft)",
          border: "var(--border)",
        },
        teal: { DEFAULT: "var(--teal)", 2: "var(--teal-2)" },
        marigold: { DEFAULT: "var(--marigold)", 2: "var(--marigold-2)" },
        maroon: "var(--maroon)",
        brass: "var(--brass)",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        xl2: "18px",
      },
    },
  },
  plugins: [],
};

export default config;
