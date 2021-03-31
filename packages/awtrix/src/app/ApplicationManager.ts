import { dirname, join, resolve } from 'path'
import { exec } from 'child_process'
import axios from 'axios'
import fs from 'fs-extra'
import decompress from 'decompress'
import { Types } from '@awtrix/common'

type ApplicationIdentifier = Types.Application.ApplicationIdentifier
type ApplicationTranslations = Types.Application.ApplicationTranslations
type ApplicationConfig = Types.Application.ApplicationConfig

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
    await fs.mkdirp(appPath)

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
   * Loads the package.json for the provided app.
   *
   * @param app
   */
  async config(app: ApplicationIdentifier): Promise<ApplicationConfig> {
    const path = join(this.path(app), 'package.json')
    const data = await fs.readFile(path, 'utf-8')

    return JSON.parse(data) as ApplicationConfig
  }

  /**
   * Loads all translations for the provided app.
   *
   * @param app
   */
  async translations(app: ApplicationIdentifier): Promise<ApplicationTranslations> {
    const translationPath = join(this.path(app), 'translations')
    const files = await fs.readdir(translationPath)
    let relevantFiles = files.filter((name) => name.match(/^[a-z]{2}\.json$/))

    let translations: ApplicationTranslations = {}
    for (let file of relevantFiles) {
      let path = join(translationPath, file)
      let locale = file.split('.')[0] as string

      const data = await fs.readFile(path, 'utf-8')
      translations[locale] = JSON.parse(data)
    }

    return translations
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
