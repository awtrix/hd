import path from 'path'
import fs from 'fs'

export default (config: any) => {
  const source = path.join(process.cwd(), 'package.json')
  const dest = path.resolve(`.awtrix/apps/${config.name}/${config.version}/package.json`)

  fs.copyFileSync(source, dest)
  fs.watch(source, () => {
    fs.copyFileSync(source, dest)
  })
}
