module.exports = {
    apps: [
      {
        name: 'MTSoft',
        port: '3000',
        exec_mode: 'fork',
        instances: '1',
        script: './.output/server/index.mjs',
        env_production: {
          NODE_ENV: 'production',
          MONGODB_URI:"mongodb+srv://audrius:Man0pass@tvora.gpj0kpq.mongodb.net/ModerniTvora?retryWrites=true&w=majority",
          SALT:"10",
          TOKEN_SECRET:"super_slaptas_secret",
          NODEMAILER_PASS_AUDRIUS:"kpvnngbeztgkssde",
          NODEMAILER_PASS_ANDRIUS:"tbbrxstjaniwekcn",
          NODEMAILER_PASS_HARIS:"gzqkwerrhslujhyr",
          NUXT_PUBLIC_CLOUD_NAME:"dwndoufbt",
          NUXT_PUBLIC_CLOUD_API_KEY:"756325126456533",
          CLOUDINARY_CLOUD_NAME:"dwndoufbt",
          CLOUDINARY_API_SECRET:"_f7rBw5jRm5SkK-DhVVkmuAZXiE",
          CLOUDINARY_API_KEY:"756325126456533",
          GITHUB_WEBHOOK_SECRET:"nesamone",
        },
      }
    ]
  }
  