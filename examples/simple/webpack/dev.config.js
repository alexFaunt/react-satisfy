const path = require('path')
const client = require('./client.config')
const env = require('./env')

module.exports = Object.assign({}, client, {
  devtool: 'eval-source-maps',
  output: {
    filename: '[name].js',
    path: '/',
    publicPath: '/generated/'
  },
  devServer: {
    stats: { colors: true, progress: true, chunks: false },
    proxy: {
      '/': {
        target: `http://localhost:${env.PORT}`, // TODO different hosts?
        secure: false
      }
    }
  }
})
