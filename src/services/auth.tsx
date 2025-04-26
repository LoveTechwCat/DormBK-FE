import axios from 'axios';

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post('/api/auth/login', {
      user_name: username,
      password,
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};
