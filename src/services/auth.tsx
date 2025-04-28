import axios from 'axios';

interface LoginResponse {
  token: string;
  user: {
    user_name: string;
  };
}

export const login = async (
  username: string,
  password: string,
): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>('/api/auth/login', {
      user_name: username,
      password,
    });

    return response.data;
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    const message =
      err.response?.data?.message || 'An unexpected error occurred';
    throw new Error(message);
  }
};
