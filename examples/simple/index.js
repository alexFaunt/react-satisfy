/* eslint-disable global-require, import/newline-after-import, no-console */

// Extra config on top of babelrc to make the app load CSS files as modules
require('babel-register')({
  plugins: [
    [
      'babel-plugin-webpack-loaders',
      {
        config: './webpack/server.config.js',
        verbose: false
      }
    ]
  ]
})
require('babel-polyfill')

const path = require('path')

const getApp = () => require('./src/server').default
const startApp = () => getApp().listen(process.env.PORT || 3000, (error) => {
  if (error) console.error(error)
  else console.log('App started!')
})

// start the app!
let server = startApp()

// In dev mode we need to destroy the cache and restart the server if there are file changes
// Or server side render will be wrong.
if (process.env.NODE_ENV !== 'production') {
  const appDelete = () => {
    // delete everything from the require cache
    Object.keys(require.cache)
      .forEach((id) => {
        if (!id.includes('node_modules')) delete require.cache[id]
      })

    // Kill the server and when complete restart it.
    server.close(() => {
      console.log('App restarting...')
      try {
        server = startApp()
      }
      catch (error) {
        console.error(error)
      }
    })
  }

  // Watching file system with chokidar
  const chokidar = require('chokidar')
  const watcher = chokidar.watch(path.join(__dirname, './src/'))
  watcher.on('ready', () => watcher.on('change', () => appDelete()))
}
