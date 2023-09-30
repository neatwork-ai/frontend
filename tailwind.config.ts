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
        "glass-gradient":
          "linear-gradient(180deg, rgba(140, 155, 249, 0.5), rgba(255, 255, 255, 0))",
        "gradient-dark-blue": "linear-gradient(to bottom, #111212, #0C265E)",
      },
      backgroundColor: {
        "dark-blue": "#121315",
        glass: "rgba(255, 255, 255, 0.25)",
      },
      colors: {
        "green-dim": "#DAEBE7",
        "nav-blue": "#567CCA",
        "indicator-dot": "#AAAAAA",
      },
      borderRadius: {
        xl: "20px",
      },
      boxShadow: {
        glass: "0 4px 24px rgba(0, 0, 0, 0.25)",
        "nav-shadow": "0 4px 4px rgba(86, 124, 202, 0.5)",
        strong:
          "0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.5)",
      },
      backdropFilter: {
        blur: "blur(40px)",
      },
      fontFamily: {
        exo: ["Exo", "sans-serif"], // Adding the Exo font
      },
    },
  },
  plugins: [],
};
export default config;
