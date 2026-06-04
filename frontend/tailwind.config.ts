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
        slideIn: {
          'from': { transform: 'translateY(100%)', opacity: '0' },
          'to': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(3, 61, 155, 0.4)' },
          '50%': { boxShadow: '0 0 0 10px rgba(3, 61, 155, 0)' },
        },
      },
      animation: {
        stripes: 'stripes 1.5s linear infinite',
        slideIn: 'slideIn 0.3s ease-out',
        glow: 'glow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
