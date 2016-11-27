const webpack = require('webpack')
const path = require('path')
const common = require('./common.config')
const env = require('./env')

module.exports = {
  target: 'web',
  context: path.resolve(__dirname, '..'),
  entry: {
    bundle: [
      './src/index.jsx'
    ]
  },
  resolve: common.resolve,
  plugins: common.plugins.concat([
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV)
    })
  ]),
  module: {
    loaders: common.module.loaders.concat([
      {
        test: /\.(jsx|js)$/,
        loader: 'babel-loader',
        exclude: [/node_modules/]
      }
    ])
  }
}
