import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        // TODO: 배포 시 운영 백엔드 서버 주소로 변경 필요
        target: 'http://localhost:8080',
        changeOrigin: true,
      }
    }
  }
})
