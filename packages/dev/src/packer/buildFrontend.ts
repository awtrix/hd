import { spawn } from 'child_process'
import { join } from 'path'

export default (config: any, target: any) => {
  return new Promise((resolve, reject) => {
    const service = spawn('vue-cli-service build', [
      '--target lib',
      `--name AwtrixComponent.${config.name}`,
      `--dest ${join(process.cwd(), `.awtrix/apps/${config.name}/${config.version}`)}`,
      '--no-clean',
      '--watch',
      join(process.cwd(), 'frontend.vue')
    ], {
      cwd: join(__dirname, '../..'),
      detached: false,
      shell: true,
    })

    service.stdout?.on('data', (data) => {
      console.log(data.toString())
    })

    service.stderr?.on('data', (data) => {
      console.log(data.toString())
    })

    service.on('error', (err) => {
      console.log(err)
    })

    resolve()
  })
}
