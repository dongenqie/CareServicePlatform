// src/api/display.js
import apiClient from '@/utils/request';  // 引入已经配置的 apiClient

// 获取所有医疗费用数据
export const getAllCostData = async () => {
  try {
    const response = await apiClient.get('/api/hospital/cost/all');
    // 添加日志以确保数据正确返回
    console.log('API 响应数据:', response);  // 打印整个响应，查看是否包含 data 属性
    if (response && response.data) {
      return response;  // 返回完整的响应数据
    } else {
      console.error('返回的数据为空或格式错误');
      throw new Error('API 响应数据为空');
    }
  } catch (error) {
    console.error('获取医疗费用数据失败:', error);
    throw error;  // 抛出错误以便后续处理
  }
};