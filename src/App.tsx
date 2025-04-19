import { BrowserRouter, useRoutes } from 'react-router-dom';
import { appRoutes } from '@/routes/AppRoutes';

const AppRoutesWrapper = () => {
  const routes = useRoutes(appRoutes);
  return (
    <div className='flex min-h-screen w-screen items-center justify-center'>
      {routes}
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <AppRoutesWrapper />
  </BrowserRouter>
);

export default App;
