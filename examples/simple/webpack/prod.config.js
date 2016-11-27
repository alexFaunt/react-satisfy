const path = require('path')
const client = require('./client.config')
const webpack = require('webpack')
const postcss = require('./postcss.config.js')
const postcssNano = require('cssnano')({ autoprefixer: false })

module.exports = Object.assign({}, client, {
  // devtool: 'cheap-source-map',
  output: {
    filename: '[name].js',
    path: './public/generated/'
  },
  plugins: client.plugins.concat([
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: postcss.concat(postcssNano)
      }
    })
  ])
})
