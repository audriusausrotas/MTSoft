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
    salt: process.env.SALT,
    tokenSecret: process.env.TOKEN_SECRET,
    mongodbUri: process.env.MONGODB_URI,
    nodemailerPassAudrius: process.env.NODEMAILER_PASS_AUDRIUS,
    nodemailerPassAndrius: process.env.NODEMAILER_PASS_ANDRIUS,
    nodemailerPassHaris: process.env.NODEMAILER_PASS_HARIS,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
    cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
    public: {
      cloudApiKey: process.env.NUXT_PUBLIC_CLOUD_API_KEY,
      cloudName: process.env.NUXT_PUBLIC_CLOUD_NAME,
    },
  },

  compatibilityDate: "2024-10-08",
});
