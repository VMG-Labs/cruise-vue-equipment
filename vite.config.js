import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/webapp/vueequipment',
  build: {
    outDir: 'dist',
  },
  plugins: [vue()],
})