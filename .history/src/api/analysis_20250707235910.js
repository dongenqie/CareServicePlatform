// src/api/analysis.js
import axios from 'axios';

// 1) 用 create() 统一管理 baseURL
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 30000
});

// 获取描述性统计分析数据
export async function getDescriptiveStatistics(file) {
  const token = localStorage.getItem('token');  // 确保从 localStorage 中获取到有效的 token
  console.log("Token:", token);  // 打印 token 以检查是否获取到正确的值
  if (!token) {
    throw new Error("No valid token found");
  }

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await apiClient.post(
      '/api/calculate/statisticalAnalysisSimple',
      formData,
      { 
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`  // 确保正确传递 JWT Token
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('分析请求失败:', error);
    throw error;
  }
}

// 获取相关性分析数据
export async function getCorrelation(file, attributeName1, attributeName2) {
  const token = localStorage.getItem('token');
  console.log("Token:", token); // 打印 Token，确认它是否正确
  if (!token) {
    throw new Error("No valid token found");
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('attributeName1', attributeName1);
  formData.append('attributeName2', attributeName2);

  try {
    const response = await apiClient.post(
      '/api/calculate/calculateCorrelation', 
      formData, 
      {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      }
    });

    return response.data; // 返回后端响应数据
  } catch (error) {
    console.error('分析请求失败:', error);
    throw error;
  }
}

