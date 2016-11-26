const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')

const envFile = new Buffer(fs.readFileSync(path.resolve(__dirname, '../.env'), 'utf8'))

module.exports = dotenv.parse(envFile)
