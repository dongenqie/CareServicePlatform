import axios from 'axios';

// 统一管理请求
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',  // 或者指定你的后端 API 地址
  timeout: 100000,
});

// 添加请求拦截器，设置 Authorization 头
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
