import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        baskervville: ["Baskervville", "serif"],
      },
      fontSize: {
        "clamp-xl": "clamp(1rem, 2vw + 1rem, 2rem)",
        "clamp-2xl": "clamp(1.5rem, 2.5vw + 1.5rem, 3rem)",
      },
    },
  },
  plugins: [],
};
export default config;
