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

// 注册方法
export const register = async (username, password, role, email, phone) => {
  try {
    const response = await axios.post('http://localhost:8080/api/user/register', {
      username: username,
      password: password,
      role: role,
      email: email,
      phone: phone,
    });

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
    console.error('注册请求失败:', error);
    return {
      success: false,
      message: '注册失败，请检查网络或稍后再试',
    };
  }
};

// 修改密码方法
export const resetPassword = async (username, email, newPassword) => {
  try {
    const response = await axios.post('http://localhost:8080/api/user/resetPassword', {
      username: username,
      email: email,
      newPassword: newPassword,
    });

    if (response.data.success) {
      return {
        success: true,
        message: response.data.message,
      };
    } else {
      return {
        success: false,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.error('密码重置请求失败:', error);
    return {
      success: false,
      message: '密码重置失败，请检查网络或稍后再试',
    };
  }
};
