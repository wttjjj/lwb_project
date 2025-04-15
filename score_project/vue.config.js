const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  outputDir: 'docs',
  publicPath: process.env.NODE_ENV === 'production'
        ? '/wtt_project/'
        : '/',
})
