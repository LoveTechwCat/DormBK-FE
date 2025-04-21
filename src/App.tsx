import { BrowserRouter, useRoutes } from 'react-router-dom';
import { appRoutes } from '@/routes/AppRoutes';
import { AuthProvider } from '@/hooks/AuthContext';

const AppRoutesWrapper = () => {
  const routes = useRoutes(appRoutes);
  return (
    <div className='flex min-h-screen w-screen items-center justify-center'>
      {routes}
    </div>
  );
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <AppRoutesWrapper />
    </BrowserRouter>
  </AuthProvider>
);

export default App;
