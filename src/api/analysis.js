// src/api/analysis.js

import axios from 'axios';

const getDescriptiveStatistics = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post('http://localhost:8080/api/calculate/statisticalAnalysisSimple', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.data.status === 'success') {
      return response.data;
    } else {
      throw new Error("分析失败");
    }
  } catch (error) {
    console.error("分析请求失败:", error);
    throw error;
  }
};

export { getDescriptiveStatistics };

