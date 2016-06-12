// create debug instance from filename

import Debug from 'debug'
import path from 'path'
import pkg from '../../package.json'

const PATH_HEADS = [
  '/src/client',
  '/src/share',
  path.resolve('src/server'),
  path.resolve('dist/server'),
  path.resolve('src/share'),
  path.resolve('dist/share'),
]

function fileToName (filename) {
  if (typeof filename !== 'string') throw new Error('filename is not string')
  return filename
    .replace(new RegExp('^(' + PATH_HEADS.join('|') + ')'), pkg.name)
    .replace(/\..+$/, '') // remove file extension
    .replace(/\/index$/, '') // remove "index.js"
    .replace(/\//g, ':') // convert separator
}

module.exports = function createDebug (filename) {
  return Debug(fileToName(filename))
}
