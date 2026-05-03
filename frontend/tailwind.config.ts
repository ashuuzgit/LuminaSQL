import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}" 
  ],
  theme: {
    extend: {
      boxShadow: {
        card: "0 15px 40px rgba(15, 23, 42, 0.08)",
      },
      keyframes: {
        stripes: {
          '0%, 100%': { backgroundPosition: '0 0' },
          '50%': { backgroundPosition: '40px 0' },
        },
      },
      animation: {
        stripes: 'stripes 1.5s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
