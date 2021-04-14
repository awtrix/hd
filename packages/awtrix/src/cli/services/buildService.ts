import fs from 'fs-extra'
import path from 'path'
import { Types } from '@awtrix/common'
import { build as buildVue } from 'vite'
import vue from '@vitejs/plugin-vue'
import esbuild from 'esbuild'
import Service from './service'

interface BuildServiceConfig {
  watch: boolean,
}

export default class BuildService extends Service<BuildServiceConfig> {
  defaultConfig = {
    watch: false,
  }

  async run (config?: Partial<BuildServiceConfig>) {
    config = { ...this.defaultConfig, ...config }

    const outDir = config.watch ? `.awtrix/apps/${this.json.name}/${this.json.version}` : 'dist'
    await fs.mkdirp(path.join(this.path, outDir))

    // It is important to run Vite first, because it will empty the outDir
    if (this.json.build.frontend) await this.vite(config.watch)
    if (this.json.build.backend) await this.backend(config.watch)
    if (this.json.build.assets) await this.assets(config.watch)

    await this.packageJson()
    await this.translations(config.watch)
  }

  async vite (watch: boolean = false) {
    await buildVue({
      root: this.path,
      plugins: [
        vue(),
      ],
      build: {
        outDir: 'dist',
        minify: false,
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

  async backend (watch: boolean = false) {
    // We need to set the ESBUILD_BINARY_PATH so that `esbuild.build` can properly
    // spawn the correct binary.
    process.env.ESBUILD_BINARY_PATH = path.resolve(__dirname, '../node_modules/esbuild/bin/esbuild')

    // TODO: Verify types with tsc

    await esbuild.build({
      entryPoints: [path.join(this.path, 'backend.ts')],
      outfile: path.join(this.path, 'dist/backend.js'),
      watch: false, // true for watch mode
    })
  }

  async packageJson () {
    const source = path.join(this.path, 'package.json')
    const dest = path.join(this.path, 'dist/package.json')

    // TODO: Figure out if we want to also copy the `package-lock.json`
    await fs.copy(source, dest)
  }

  async assets (watch: boolean = false) {
    const source = path.join(this.path, 'assets')
    const dest = path.join(this.path, 'dist/assets')

    await fs.copy(source, dest)

    // // Watch for asset changes
    // chokidar.watch(source).on('all', debounce(() => {
    //   fs.copySync(source, dest)
    // }, 500))
  }

  async translations (watch: boolean = false) {
    const source = path.join(this.path, 'translations')
    const englishLocale = path.join(source, 'en.json')

    // Create the translations if they don't already exist
    if (!fs.pathExistsSync(source)) await fs.mkdirp(source)
    if (!fs.pathExistsSync(englishLocale)) {
      // TODO: Add log/info
      await fs.writeFile(englishLocale, '{ }\n')
    }

    await fs.copy(source, path.join(this.path, 'dist/translations'))
  }
}
