import { spawn } from 'child_process'
import { join } from 'path'

export default (config: any, target: any) => {
  return new Promise((resolve, reject) => {
    const service = spawn('npx tsc', [
      '--module commonjs',
      '--lib es6',
      `--outDir ${join(process.cwd(), `.awtrix/apps/${config.name}/${config.version}`)}`,
      '--types',
      '--watch',
      join(process.cwd(), 'backend.ts')
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
