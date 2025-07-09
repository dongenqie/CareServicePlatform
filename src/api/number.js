import axios from 'axios';

export const fetchMedicalData = async () => {
    try {
        const response = await axios.get('http://localhost:8080/medical/data');
        // 假设只取 2020 年的数据
        return response.data.data.data2020;
    } catch (error) {
        console.error('Error fetching medical data:', error);
        return [];
    }
};