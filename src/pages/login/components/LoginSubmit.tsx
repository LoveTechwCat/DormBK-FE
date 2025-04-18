import { Button } from '@/components/ui/button';

const LoginSubmit = () => {
  return (
    <Button
      type='submit'
      className='mt-2 w-full rounded bg-blue-100 py-4 text-lg text-white transition hover:bg-blue-700'
      style={{ backgroundColor: '#1488DB' }}
    >
      <p className='text-lg'>Login</p>
    </Button>
  );
};

export default LoginSubmit;
