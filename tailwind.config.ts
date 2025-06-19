import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // enables 'dark:' variants using class strategy
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx,html}"],

  theme: {
    extend: {
      colors: {
        // This allows using `bg-sidebar` etc. based on your CSS variable
        nav: "#2f3b43",
        boder:"#202c33",
        cad: "#111b21",
        heading:"#e9edef",
        conversation: "#222e35",
        chatHeader:"#202c33",
        chatInputBg:"#242626",
        
        brand: {
          light: "#6366f1",
        },
      },
    },
  },
  plugins: [],
};

export default config;
