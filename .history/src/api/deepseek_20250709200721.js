// src/api/deepseek.js
import axios from 'axios';

const apiKey = 'sk-de8d054e84d14b3695193c5b9e9061e1'; // 替换为实际的API Key
const deepSeekUrl = 'https://api.deepseek.com/v1/chat/completions'; // DeepSeek API地址

// 封装调用 DeepSeek API 的函数
export async function sendMessageToDeepSeek(messageContent) {
  try {
    // 在此请求中局部设置请求头
    const response = await axios.post(deepSeekUrl, {
      model: 'deepseek-chat',
      messages: [
        {
          role: 'user',
          content: messageContent
        }
      ]
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });

    // 返回 DeepSeek API 的回答
    return response.data.choices[0].message.content;
  } catch (error) {
    // 捕获请求错误并返回错误信息
    console.error('Error calling DeepSeek API:', error);
    throw new Error('API 请求失败');
  }
}