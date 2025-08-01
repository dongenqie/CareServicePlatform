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
      '/api': {
        target: 'http://localhost:8080',  // 确保后端地址是 http://localhost:8080
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),  // 确保 API 请求的路径正确重写
      }
    }
  }
})
