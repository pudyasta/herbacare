/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./core/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "green-dark": "#20270C",
        "green-normal": "#718F2D",
        "green-semilight": "#AAD60B",
        "green-light": "#C7FF00",
        "grey-500": "#6D7079",
        "grey-200": "#B6B8BC",
        "grey-50": "#F3F3F3",
      },
      backgroundImage: {
        "gradient-45": "linear-gradient(45deg, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
