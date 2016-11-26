
module.exports = class SuppressOutputPlugin {
  constructor(options) {
    this.options = options
  }

  // Configure your plugin with options...
  apply(compiler) { // eslint-disable-line
    compiler.plugin('emit', (compilation, callback) => {
      Object.keys(compilation.assets).forEach((asset) => {
        if (asset.includes(this.options.asset)) delete compilation.assets[asset] // eslint-disable-line
      })
      callback()
    })
  }
}
