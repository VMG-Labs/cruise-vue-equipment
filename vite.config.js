import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
	base: '/webapp/11eb3f2d-fc7d-4415-b0f2-4a203e158597',
  build: {
	  outDir: 'dist',
  },
  plugins: [vue()],
})