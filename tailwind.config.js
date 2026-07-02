export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        "infinite-slider": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "infinite-slider":
          "infinite-slider var(--speed) linear infinite var(--direction)",
      },
    },
  },
  plugins: [],
};