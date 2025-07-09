// src/api/deepseek.js
import axios from 'axios';
 
const apiKey = 'sk-de8d054e84d14b3695193c5b9e9061e1'; // 替换为实际的API Key
const deepSeekUrl = 'https://api.deepseek.com/v1/chat/completions'; // DeepSeek API地址
 
axios.defaults.headers.common['Authorization'] = `Bearer ${apiKey}`;

