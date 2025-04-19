import axios from 'axios';

export const login = async (username: string, password: string) => {
  const res = await axios.post(`/api/auth/login`, {
    user_name: username,
    password,
  });
  return res.data;
};
