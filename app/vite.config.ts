import vue from '@vitejs/plugin-vue'
import path from 'path'
import { splitVendorChunkPlugin } from 'vite'
import { defineConfig } from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig({
  base: 'https://klausbetz.github.io/calc-ui/',
  build: {
    outDir: './dist',
    emptyOutDir: true
  },
  resolve: {
    alias: {
      '@calculator': path.resolve(__dirname, './packages')
    }
  },
  publicDir: './packages/application/public',
  plugins: [vue(), splitVendorChunkPlugin()]
})
