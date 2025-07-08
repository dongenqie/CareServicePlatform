// src/api/display.js
import apiClient from '@/utils/request';  // 引入已经配置的 apiClient

// 获取所有医疗费用数据
export const getAllCostData = async () => {
  try {
    const response = await apiClient.get('/api/hospital/cost/all');
    return response.data;  // 返回数据
  } catch (error) {
    console.error('获取医疗费用数据失败:', error);
    throw error;
  }
};