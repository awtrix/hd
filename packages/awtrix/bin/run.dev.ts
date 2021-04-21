import cli from '../src/cli'
import path from 'path'

global.awtrix = {
  rootPath: path.dirname(path.resolve(__dirname)),
  mode: 'dev'
}

cli(process.argv)
