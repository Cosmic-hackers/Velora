import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        velora: {
          bg: "#F8F7F4",
          card: "#FFFFFF",
          surface: "#F2EFE9",
          text: "#171717",
          muted: "#77736E",
          accent: "#A18A70",
          accentHover: "#8A745C",
          border: "#E9E6E0",
          borderLight: "#F0EDE8",
          white: "#FFFFFF",
          black: "#171717",
          charcoal: "#1F1E1D",
        },
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Playfair Display", "Didot", "Bodoni MT", "Georgia", "serif"],
        sans: ["Plus Jakarta Sans", "Inter", "system-ui", "-apple-system", "sans-serif"],
        editorial: ["Cormorant Garamond", "Playfair Display", "serif"],
      },
      letterSpacing: {
        widestLuxury: "0.25em",
        ultraLuxury: "0.35em",
      },
      boxShadow: {
        subtle: "0 1px 2px rgba(0, 0, 0, 0.03)",
        luxury: "0 10px 30px -10px rgba(23, 23, 23, 0.05)",
        luxuryHover: "0 20px 40px -15px rgba(23, 23, 23, 0.08)",
      },
    },
  },
  plugins: [],
};
export default config;
