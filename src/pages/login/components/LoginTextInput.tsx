type LoginInputProps = {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const LoginInput = ({ name, value, onChange }: LoginInputProps) => {
  const type = name.toLowerCase() === 'password' ? 'password' : 'text';
  const placeholder = `Enter your ${name.toLowerCase()}`;
  return (
    <div className='mb-4'>
      <label className='block text-xl font-normal'>{name}</label>
      <input
        type={type}
        className='mt-1 block w-full rounded border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none'
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default LoginInput;
