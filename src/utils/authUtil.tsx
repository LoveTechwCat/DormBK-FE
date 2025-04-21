export const logoutUser = (navigate: (path: string) => void) => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('authUser');
  navigate('/login');
};
