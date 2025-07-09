import axios from 'axios';

export const fetchAllData = async () => {
    try {
        const response = await axios.get('http://localhost:8080/medical/levelAll');
        return response;
    } catch (error) {
        console.error('Error fetching hospital data:', error);
        return null;
    }
};