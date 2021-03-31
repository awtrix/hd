import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import importStylus from './import-stylus-variables'

// https://vitejs.dev/config/
export default defineConfig({
  root: './web',
  build: {
    target: 'esnext',
    outDir: '../dist/frontend',
  },
  plugins: [
    vue(),
    {
      ...importStylus(),
      enforce: 'pre',
    },
  ],
})
