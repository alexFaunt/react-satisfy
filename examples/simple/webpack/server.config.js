// This config is used by server side render to load CSS modules
const common = require('./common.config')
const path = require('path')
const SuppressOutputPlugin = require('./plugins/SuppressOutputPlugin')

module.exports = Object.assign({}, common, {
  target: 'node',
  output: {
    path: path.resolve(__dirname, '../trash/'),
    libraryTarget: 'commonjs2' // Has to be set to this
  },
  plugins: [
    new SuppressOutputPlugin({ asset: 'main' }) // Suppress the generated css file
  ].concat(common.plugins) // I think order here is important
})
