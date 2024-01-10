/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        "red-full": "#D82B33",
        "dark-full": "#252224",
        "gray-full": "#9C9C9C",
        "red-light": "#F5C8CA;",
        "dark-light": "#c7c6c6",
        "gray-light": "#e5e5e5",
        "red-ulta-light": "#fbe9ea",
        "dark-ultra-light": "#E9E8E9",
        "gray-ultra-light": "#f5f5f5",
      },
      boxShadow: {
        bottom: "0 4px 2px -2px rgba(0, 0, 0, 0.1)",
      },
      maxWidth: {
        custom: "1600px",
      },
    },
  },
  plugins: [],
};
