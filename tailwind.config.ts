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
          bg: "#F5F0E8",
          card: "#FAF7F2",
          surface: "#EFE9DE",
          text: "#171717",
          muted: "#77716A",
          accent: "#9B8065",
          accentHover: "#846B52",
          border: "#DED8CF",
          borderLight: "#ECE7DF",
          white: "#FFFFFF",
          black: "#111111",
          gold: "#A88D70",
          charcoal: "#1F1F1F",
          sand: "#E5DDD0",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Cormorant Garamond", "Didot", "Bodoni MT", "Georgia", "serif"],
        sans: ["Plus Jakarta Sans", "Inter", "system-ui", "-apple-system", "sans-serif"],
        editorial: ["Cinzel", "Playfair Display", "serif"],
      },
      letterSpacing: {
        widestLuxury: "0.25em",
        ultraLuxury: "0.35em",
      },
      boxShadow: {
        subtle: "0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)",
        luxury: "0 10px 30px -10px rgba(23, 23, 23, 0.08)",
        luxuryHover: "0 20px 40px -15px rgba(23, 23, 23, 0.12)",
      },
    },
  },
  plugins: [],
};
export default config;

