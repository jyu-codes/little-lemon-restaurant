import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  base: '/projects/little-lemon-restaurant/',

  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.jsx',
  },
})