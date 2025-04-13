import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
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
      keyframes: {
        'dot1': {
          '0%, 20%': { opacity: '0' },
          '30%, 100%': { opacity: '1' },
        },
        'dot2': {
          '0%, 40%': { opacity: '0' },
          '50%, 100%': { opacity: '1' },
        },
        'dot3': {
          '0%, 60%': { opacity: '0' },
          '70%, 100%': { opacity: '1' },
        },
      },
      animation: {
        'bounce-dot1': 'dot1 1.4s infinite',
        'bounce-dot2': 'dot2 1.4s infinite',
        'bounce-dot3': 'dot3 1.4s infinite',
      },
    },
  },
  plugins: [],
};
export default config;
