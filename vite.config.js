import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // '/api'로 시작하는 모든 요청을 백엔드로 전달
      '/api/v1': {
        target: 'https://boasse-backend.onrender.com',
        changeOrigin: true,
        secure: false,
        // 필요하다면 rewrite를 사용할 수 있지만, 
        // 현재 백엔드 API 명세가 /api/v1을 포함하므로 경로는 유지합니다.
      }
    }
  }
})