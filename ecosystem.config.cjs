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
      }
    }
  ]
};
  