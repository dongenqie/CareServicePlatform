import axios from 'axios';

export const fetchHospitalData = async () => {
    try {
        const response = await axios.get('http://localhost:8080/medical/level?province=安徽省');
        return response.data.data2011;
    } catch (error) {
        console.error('Error fetching hospital data:', error);
        return null;
    }
};