import fs from 'fs'
import { promisify } from 'util'

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

export default async function (path: string, replacements: { [x: string]: string }): Promise<void> {
  let content = await readFile(path, 'utf-8')

  Object.keys(replacements).forEach(key => {
    const regex = new RegExp(`:${key}:`, 'g')
    content = content.replace(regex, replacements[key])
  })

  return writeFile(path, content)
}
