#!/usr/bin/env node

const path = require('path')

global.awtrix = {
  rootPath: path.dirname(path.resolve(__dirname)),
  mode: 'static'
}

require('../dist/backend/cli').default(process.argv)
