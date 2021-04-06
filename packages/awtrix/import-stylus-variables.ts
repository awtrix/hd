import type { Plugin } from 'vite'
import path from 'path'

export default function importStylus(): Plugin {
  return {
    name: 'vite-stylus-import-plugin',
    async transform(code, id) {
      if (/.stylus$/g.test(id)) {
        return {
          code: `
            @import "${path.resolve(__dirname, 'web/assets/stylus/vars/index')}"
            ${code}
          `,
          map: null,
        }
      }
      return null
    }
  }
}
