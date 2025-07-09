// src/api/deepseek.js
import apiClient from '@/utils/request';
import axios from 'axios';
 
const apiKey = 'sk-de8d054e84d14b3695193c5b9e9061e1'; // 替换为实际的API Key
const deepSeekUrl = 'https://api.deepseek.com/v1/chat/completions'; // DeepSeek API地址
 
axios.defaults.headers.common['Authorization'] = `Bearer ${apiKey}`;

// 调用 DeepSeek 聊天接口并返回 AI 回复文本
export async function sendDeepSeekChat(prompt) {
  const resp = await apiClient.post(
    deepSeekUrl,
    {
      model: 'deepseek-chat',
      messages: [{ role: 'user', content: prompt }]
    }
  );
  // DeepSeek 返回结构与 OpenAI 类似
  return resp.data.choices[0].message.content;
}
