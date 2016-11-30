require('babel-register')({
  plugins: ['rewire']
});

global.document = require('jsdom').jsdom('<html><body></body></html>')
global.window = document.defaultView
global.navigator = window.navigator

process.on('unhandledRejection', (e) => console.log(e))
