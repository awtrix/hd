import fs from 'fs'
import { dirname } from 'path'
import { Types } from '@awtrix/common'
import { build as buildVue } from 'vite'
import vue from '@vitejs/plugin-vue'

export default class BuildService {
  path: string
  json: Types.Application.ApplicationConfig

  constructor (jsonPath: string) {
    this.path = dirname(jsonPath)
    this.json = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'))
  }

  async run (config?: any) {
    console.log(this.json, this.path)

    await this.vite()
  }

  async vite (watch: boolean = false) {
    await buildVue({
      root: this.path,
      plugins: [
        vue(),
      ],
      build: {
        minify: false,
        lib: {
          entry: 'frontend.vue',
          name: `AwtrixComponent.${this.json.name}`,
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
}
