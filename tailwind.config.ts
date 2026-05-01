import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#0f0f0d",
          2: "#161614",
          3: "#1e1e1b",
          4: "#222220",
        },
        accent: {
          DEFAULT: "#e8f44a",
          dark: "#c8d63a",
        },
        upfit: {
          text: "#f0ede6",
          muted: "#888880",
          faint: "#444440",
          border: "rgba(255,255,255,0.08)",
          border2: "rgba(255,255,255,0.14)",
        },
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-dm-serif)", "Georgia", "serif"],
      },
      borderColor: {
        DEFAULT: "rgba(255,255,255,0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
