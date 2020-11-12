import { join, resolve } from 'path'
import { exec } from 'child_process'
import axios from 'axios'
import fs from 'fs'
import decompress from 'decompress'
import mkdirp from 'mkdirp'
import { ApplicationIdentifier, ApplicationConfig } from '../types/Application'

export default class ApplicationManager {
  constructor (protected homeDir: string) {}

  /**
   * TODO
   *
   * @param app TODO
   * @return String
   */
  path(app: ApplicationIdentifier) {
    return resolve(join(this.homeDir, 'apps', app.name, app.version))
  }

  /**
   * TODO
   *
   * @param app
   */
  getDownloadUrl(app: ApplicationIdentifier): Promise<string> {
    return new Promise((resolve, reject) => {
      exec(`npm view @awtrix/${app.name}-app@${app.version} dist.tarball`, (err, stdout) => {
        if (err) {
          return reject(err)
        }

        resolve(stdout)
      })
    })
  }

  /**
   * TODO
   *
   * @param app
   */
  async download(app: ApplicationIdentifier) {
    // First, make sure the app path exists
    const appPath = this.path(app)
    await mkdirp(appPath)

    // Fetch the download URL from npm
    const url = await this.getDownloadUrl(app)

    // Download the app's tarball
    const tarballPath = join(appPath, 'source.tgz')
    const writer = fs.createWriteStream(tarballPath)
    const response = await axios.get(url, { responseType: 'stream' })
    response.data.pipe(writer)

    // Wait for the tarball to be downloaded
    await new Promise((resolve, reject) => {
      writer.on('finish', resolve)
      writer.on('error', reject)
    })

    // Decompress the tarball
    await decompress(tarballPath, appPath, {
      map: (file) => {
        file.path = file.path.replace(/^package\//, '')
        return file
      }
    })

    // Remove the tarball
    fs.unlinkSync(tarballPath)
  }

  /**
   * TODO
   *
   * @param app
   */
  config(app: ApplicationIdentifier): ApplicationConfig {
    const path = join(this.path(app), 'package.json')
    return JSON.parse(fs.readFileSync(path, 'utf-8')) as ApplicationConfig
  }

  /**
   * TODO
   *
   * @param app
   */
  install(app: ApplicationIdentifier) {
    return new Promise((resolve, reject) => {
      exec(`npm install --production`, {
        cwd: this.path(app),
      }, (err, stdout) => {
        if (err) {
          return reject(err)
        }

        resolve(stdout)
      })
    })
  }

  /**
   * TODO
   *
   * @param app
   */
  async downloadAndInstall(app: ApplicationIdentifier) {
    await this.download(app)
    await this.install(app)
  }
}
