import path from 'path'
import fs from 'fs-extra'
import { debounce } from 'lodash'
import chokidar from 'chokidar'

export default (config: any, directory: string) => {
  const source = path.join(process.cwd(), directory)
  const dest = path.resolve(`.awtrix/apps/${config.name}/${config.version}/${directory}`)

  fs.copySync(source, dest)
  chokidar.watch(source).on('all', debounce(() => {
    fs.copySync(source, dest)
  }, 500))
}
