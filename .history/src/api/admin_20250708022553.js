// src/api/admin.js
import axios from 'axios';

// 处理申请的接口
export function handleApplication(applicationId, isApproved, adminReply) {
  return axios.post('http://localhost:8080/api/admin/handleApplication', 
    {
      applicationId: applicationId,  // 申请ID
      isApproved: isApproved,        // 审批结果 (true: 已处理, false: 拒绝)
      adminReply: adminReply         // 管理员回复消息
    },
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`  // 获取存储在localStorage中的JWT token
      }
    })
    .then(response => {
      return response.data;  // 返回响应的数据
    })
    .catch(error => {
      console.error("Error handling application:", error);
      throw error;  // 抛出错误
    });
}
