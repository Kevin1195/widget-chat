/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // primary: "var(--color-primary)", // Sử dụng biến CSS
        primary: "#d92685",
        secondary: "#a21c63",
      },
    },
  },
  plugins: [],
};
