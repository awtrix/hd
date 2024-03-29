import fs from 'fs-extra'
import path from 'path'
import { build as buildVue } from 'vite'
import vue from '@vitejs/plugin-vue'
import { build as esbuild } from 'esbuild'
import Service from './service'
import chokidar from 'chokidar'
import { debounce } from 'lodash'
// import importStylus from '../../../import-stylus-variables'

interface WatchOptions {
  onChange: (file: string) => void,
}

interface BuildServiceConfig {
  watch: boolean | WatchOptions,
  production: boolean,
  outDir: string,
}

export default class BuildService extends Service<BuildServiceConfig> {
  defaultConfig = {
    production: false,
    watch: false,
    outDir: path.join(this.path, 'dist'),
  }

  async execute (config: BuildServiceConfig) {
    await this.build(config)
    if (config.watch) this.watch(config)
  }

  async build (config: BuildServiceConfig) {
    await fs.mkdirp(config.outDir)

    // It is important to run Vite first, because it will empty the outDir
    await this.compileFrontend(config)
    await this.compileBackend(config)

    // Copy all static files
    await this.copyPackage(config)
    await this.copyTranslations(config)
    await this.copyAssets(config)
  }

  watch (config: BuildServiceConfig) {
    chokidar.watch(this.path, {
      ignored: [
        /(^|[\/\\])\../, // ignore dotfiles
        path.join(this.path, 'node_modules'),
        config.outDir,
      ],
    }).on('all', debounce(async (eventName: string, path: string) => {
      console.clear()
      console.log(`Reacting to ${eventName} for ${path}\n`)

      await this.build(config)

      if (typeof config.watch === 'object') {
        config.watch.onChange(path)
      }
    }, 500))
  }

  async compileFrontend (config: BuildServiceConfig) {
    if (!this.json.awtrix.build.frontend) return

    await buildVue({
      root: this.path,
      clearScreen: false,
      plugins: [
        vue(),
        // TODO: Figure out if we can properly expose stylus variables to
        //       app authors.
        // {
        //   ...importStylus(),
        //   enforce: 'pre',
        // },
      ],
      build: {
        outDir: config.outDir,
        minify: config.production,
        lib: {
          entry: 'frontend.vue',
          name: `AwtrixComponent.${this.json.name}@${this.json.version!.replace(/\./g, '-')}`,
          formats: ['umd'],
        },
        rollupOptions: {
          external: ['vue', '@awtrix/common'],
          output: {
            globals: { vue: 'Vue', '@awtrix/common': 'AwtrixCommon' }
          },
        },
      },
    })
  }

  async compileBackend (config: BuildServiceConfig) {
    if (!this.json.awtrix.build.backend) return

    // We need to set the ESBUILD_BINARY_PATH so that `esbuild.build` can properly
    // spawn the correct binary. This works differently on Windows though, so we
    // need to account for that.
    let binaryPath = process.platform == 'win32' ? 'esbuild.exe' : 'bin/esbuild'
    process.env.ESBUILD_BINARY_PATH = path.join(global.awtrix.rootPath, 'node_modules/esbuild', binaryPath)

    // TODO: Verify types with tsc

    await esbuild({
      format: 'cjs',
      entryPoints: [path.join(this.path, 'backend.ts')],
      outfile: path.join(config.outDir, 'backend.js'),
    })
  }

  async copyPackage (config: BuildServiceConfig) {
    const source = path.join(this.path, 'package.json')
    const dest = path.join(config.outDir, 'package.json')

    // TODO: Also copy node_modules, as they would be required for dev mode
    // TODO: Figure out if we want to also copy the `package-lock.json`
    await fs.copy(source, dest)
  }

  async copyAssets (config: BuildServiceConfig) {
    if (!this.json.awtrix.build.assets) return

    const source = path.join(this.path, 'assets')
    const dest = path.join(config.outDir, 'assets')

    await fs.copy(source, dest)
  }

  async copyTranslations (config: BuildServiceConfig) {
    const source = path.join(this.path, 'translations')
    const englishLocale = path.join(source, 'en.json')

    // Create the translations if they don't already exist
    if (!fs.pathExistsSync(source)) await fs.mkdirp(source)
    if (!fs.pathExistsSync(englishLocale)) {
      // TODO: Add log/info
      await fs.writeFile(englishLocale, '{ }\n')
    }

    await fs.copy(source, path.join(config.outDir, 'translations'))
  }
}
