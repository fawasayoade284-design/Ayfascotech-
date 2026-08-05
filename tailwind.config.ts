import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#060B18",
        "navy-2": "#0B1428",
        royal: "#2F5CFF",
        emerald: "#12C48B",
        cyan: "#3CE8E1",
        ink: "#E8EDFB",
        "ink-dim": "#8FA0C7",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      borderRadius: {
        xl2: "18px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
