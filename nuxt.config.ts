export default defineNuxtConfig({
  devtools: {
    enabled: false,
  },

  css: ["~/assets/css/main.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: ["@pinia/nuxt", "@nuxt/image"],

  pinia: {
    storesDirs: ["./store/**"],
  },

  image: {
    quality: 80,
    format: ["webp", "jpeg"],
  },

  runtimeConfig: {
    tokenSecret: process.env.TOKEN_SECRET,
    node_env: process.env.NODE_ENV,
  },

  compatibilityDate: "2024-10-08",
});
