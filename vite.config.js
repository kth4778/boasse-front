import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://boasse-backend.onrender.com',
        changeOrigin: true,
        secure: false, // HTTPS 인증서 문제 방지
      }
    }
  }
})
