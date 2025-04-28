import axios from 'axios';

const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    Authorization: token ? `Bearer ${token}` : '',
  };
};

export const checkDormitoryCard = async (ssn: string): Promise<any> => {
  try {
    const response = await axios.get(`/api/dormitoryCard/check/${ssn}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Failed to check dormitory card:', error);
    throw error;
  }
};

export const createDormitoryCard = async (ssn: string): Promise<any> => {
  try {
    const response = await axios.post(`/api/dormitoryCard/set/${ssn}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Failed to set dormitory card:', error);
    throw error;
  }
};

export const setDormitoryCard = async (ssn: string): Promise<any> => {
  try {
    const response = await axios.put(`/api/dormitoryCard/set/${ssn}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Failed to set dormitory card:', error);
    throw error;
  }
};
