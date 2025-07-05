import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    proxy: {
      // 所有 /api 的请求，转发到 http://localhost:8080
      '/api': {
        target: process.env.VITE_API_BASE_URL || 'http://localhost:8080',
        changeOrigin: true,
        // 如果后台接口前缀也是 /api，可以不 rewrite
        // rewrite: path => path.replace(/^\/api/, '/api'),
      }
    }
  }

})
