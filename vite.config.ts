import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base path for GitHub Pages project site: https://apalpan.github.io/state-of-ai-aec/
export default defineConfig({
  base: '/state-of-ai-aec/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1200,
  },
})
