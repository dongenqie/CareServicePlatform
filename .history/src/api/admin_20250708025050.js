// src/api/admin.js
import axios from 'axios';

const BASE = 'http://localhost:8080/api';
const getToken = () => localStorage.getItem('token');

/**
 * 获取管理员反馈申请列表
 * @param {number} current 当前页码，默认 1
 * @param {number} size 每页数量，默认 10
 * @returns Promise<记录数组>
 */
export function getApplications(current = 1, size = 10) {
    const token = getToken();
  return axios
    .get(`${BASE}/export/admin/applications`,
    {
      params: { current, size },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      if (res.data.success) {
        return res.data.data.records;
      } else {
        return Promise.reject(res.data.message);
      }
    });
}

// 处理申请的接口
export function handleApplication(applicationId, isApproved, adminReply) {
    const token = getToken();
  return axios
    .post(`${BASE}/export/admin/handleApplication`,
      { applicationId, isApproved, adminReply },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(res => res.data);
}

