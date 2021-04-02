import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  root: './web',
  build: {
    outDir: '../dist/web',
  },
  css: {
    preprocessorOptions: {
      stylus: {
        additionalData: `@import '@/stylus/vars/index'`
      }
    }
  },
  plugins: [vue()],
})
