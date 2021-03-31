import tar from 'tar'
import fs from 'fs-extra'
import path from 'path'
import Service from './service'

interface PackServiceConfig {
  sourceDir: string,
  outFile: string
}

export default class PackService extends Service<PackServiceConfig> {
  defaultConfig = {
    sourceDir: path.join(this.path, 'dist'),
    outFile: path.join(this.path, `${this.json.name}@${this.json.version}.tar.gz`),
  }

  async execute (config: PackServiceConfig) {
    const dirContent = await fs.readdir(config.sourceDir!)
    const archive = tar.create({
      gzip: true, cwd: config.sourceDir!,
    }, dirContent)

    archive.pipe(fs.createWriteStream(config.outFile!))
  }
}
