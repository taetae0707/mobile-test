/** @type {import("tailwindcss").Config} */
module.exports = {
  mode: "jit",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      xl: "1440px",
    },
    extend: {
      animation: {
        rolling_1: "30s linear infinite normal none running rolling_2",
        rolling_2: "30s linear infinite rolling_2",
      },
      keyframes: {
        rolling_1: {
          "0%": { transform: "translateX(100%)" },
          "50%": { transform: "translateX(-100%)" },
          "50.1%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
        rolling_2: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-200%)" },
        },
      },
    },
  },
  plugins: [],
};
