module.exports = {
    apps: [
      {
        name: 'MTSoft',
        port: '3000',
        exec_mode: 'fork',
        instances: 'max',
        script: './.output/server/index.mjs'
      }
    ]
  }
  