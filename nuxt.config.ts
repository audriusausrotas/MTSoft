// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },
  css: ["~/assets/css/main.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: ["nuxt-mongoose", "@pinia/nuxt", "@nuxt/image", "@nuxtjs/cloudinary"],

  mongoose: {
    uri: process.env.MONGODB_URI,
    options: {},
    modelsDir: "models",
  },

  pinia: {
    storesDirs: ["./store/**"],
  },

  runtimeConfig: {
    public: {
      cloudApiKey: process.env.NUXT_PUBLIC_CLOUD_API_KEY,
      cloudName: process.env.NUXT_PUBLIC_CLOUD_NAME,
    },
  },

  compatibilityDate: "2024-09-29",
});
