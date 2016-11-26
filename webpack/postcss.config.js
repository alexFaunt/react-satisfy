const postcssInlineComment = require('postcss-inline-comment')
const postcssCalc = require('postcss-calc')
const postcssNested = require('postcss-nested')
const postcssVars = require('postcss-simple-vars')({ variables: {} }) // TODO put these variables somewhere
const postcssNext = require('postcss-cssnext')({ browsers: ['iOS >= 7', 'Android >= 4', 'Chrome >= 43'] })

module.exports = [
  postcssNext,
  postcssCalc,
  postcssNested,
  postcssVars,
  postcssInlineComment
]
