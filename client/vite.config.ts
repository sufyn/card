import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@assets': resolve(__dirname, './assets'),
      '@shared': resolve(__dirname, '../shared'),
    },
  },
  build: {
    outDir: 'dist',
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
})