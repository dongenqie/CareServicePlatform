// src/api/auditor.js
import apiClient from '@/utils/request';  // 引入已经配置的 apiClient

// 获取研究员列表
export async function getResearcherList(params) {
  try {
    const response = await apiClient.get('/api/auditor/users', {
      params,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data.data;  // 返回研究员数据
  } catch (error) {
    console.error('获取研究员列表失败:', error);
    throw error;
  }
}

// 获取研究员详情
export async function getResearcherDetail(userId) {
  try {
    const response = await apiClient.get(`/api/auditor/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('获取研究员详情失败:', error)
    throw error
  }
}

// 修改研究员信息
export async function updateResearcher(userId, updatedData) {
  try {
    const response = await apiClient.put(`/api/auditor/users/${userId}`, updatedData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('修改研究员信息失败:', error)
    throw error
  }
}


// 删除研究员
export async function deleteResearcher(userId) {
  try {
    const response = await apiClient.delete(`/api/auditor/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;  // 返回删除结果
  } catch (error) {
    console.error('删除研究员失败:', error);
    throw error;
  }
}
