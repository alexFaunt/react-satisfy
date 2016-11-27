// This config is used by server side render to load CSS modules
// And by webpack for the client bundle both dev and prod
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const postcss = require('./postcss.config.js')

const extractCSS = new ExtractTextPlugin({ filename: '[name].css', allChunks: true })


module.exports = {
  plugins: [
    extractCSS,
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss
      }
    })
  ],
  resolve: {
    modules: ['node_modules', 'src', 'src/shared/components'],
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: extractCSS.extract({
          loader: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
        })
      }
    ]
  }
}
