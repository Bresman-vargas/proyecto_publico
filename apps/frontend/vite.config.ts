import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), ],resolve: {
    alias: {
      '@proyecto_publico/schemas': path.resolve(__dirname, '../../packages/schemas')
    },
  },
  server: {
    fs: {
      allow: ['..'] // Esto permite que Vite lea archivos en /packages
    }
  }
})
