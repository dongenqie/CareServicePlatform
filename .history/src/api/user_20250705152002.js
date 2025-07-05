//src/api/user.js
import axios from 'axios';

// 登录方法
export const login = async (username, password) => {
  try {
    // 发送POST请求到后端
    const response = await axios.post('http://localhost:8080/api/user/login', {
      username: username,
      password: password,
    });

    // 如果登录成功，返回用户数据和token
    if (response.data.success) {
      return {
        success: true,
        message: response.data.message,
        user: response.data.user,
        token: response.data.token,
      };
    } else {
      return {
        success: false,
        message: response.data.message,
      };
    }
  } catch (error) {
    // 请求失败，返回错误信息
    console.error('登录请求失败:', error);
    return {
      success: false,
      message: '登录失败，请检查网络或稍后再试',
    };
  }
};
