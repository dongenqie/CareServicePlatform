// src/api/analysis.js
import apiClient from '@/utils/request';  // 引入已经配置的 apiClient
import axios from 'axios';


// 获取描述性统计分析数据
export async function getDescriptiveStatistics(file) {
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

// 获取相关性分析数据
export async function getCorrelation(formData) {
  try {
    const response = await apiClient.post(
      '/api/calculate/calculateCorrelation',
      formData
    );
    return response.data; // 返回后端响应数据
  } catch (error) {
    console.error('Error getting correlation data:', error);
    throw error;
  }
}

// 获取趋势分析数据
export async function getTrendAnalysis(formData) {
  try {
    const response = await apiClient.post(
      '/api/calculate/predictTrend', // 趋势分析接口地址
      formData
    );
    return response.data; // 返回后端响应数据
  } catch (error) {
    console.error('Error getting trend analysis data:', error);
    throw error; // 重新抛出错误，便于上层捕获
  }
}

// 获取对比分析数据
export async function getComparativeAnalysis(formData) {
  try {
    const response = await apiClient.post(
      '/api/calculate/horizontalComparison', // 这里使用了对比分析的接口
      formData
    );
    return response.data; // 返回后端响应数据
  } catch (error) {
    console.error('获取对比分析数据失败:', error);
    throw error;
  }
}

// 获取对比t检验数据
export async function getTTestAnalysis(formData) {
  try {
    const response = await apiClient.post(
      '/api/calculate/tTest', // 这里使用了对比分析的接口
      formData
    );
    return response.data; // 返回后端响应数据
  } catch (error) {
    console.error('获取对比分析数据失败:', error);
    throw error;
  }
}
