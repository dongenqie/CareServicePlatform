// src/api/analysis.js
import axios from 'axios';

// 1) 用 create() 统一管理 baseURL
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000
});

export async function getDescriptiveStatistics(file) {
  // 2) 用 FormData 打包文件
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await apiClient.post(
      '/api/calculate/statisticalAnalysisSimple',
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return response.data;
  } catch (error) {
    console.error('分析请求失败:', error);
    throw error;
  }
}