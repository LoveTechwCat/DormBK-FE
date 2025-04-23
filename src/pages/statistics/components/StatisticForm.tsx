import { StatisticOption } from './StatisticOptions';

type Props = {
  option: StatisticOption;
  formData: Record<string, string>;
  onChange: (name: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
};

const StatisticForm = ({ option, formData, onChange, onSubmit }: Props) => (
  <form className='flex flex-col gap-4' onSubmit={onSubmit}>
    {option.inputs?.map((input) => (
      <label key={input.name} className='flex flex-col text-sm text-gray-700'>
        {input.label}
        <input
          type={input.type}
          placeholder={input.placeholder}
          value={formData[input.name] || ''}
          onChange={(e) => onChange(input.name, e.target.value)}
          className='mt-1 rounded-md border border-gray-300 px-4 py-2 outline-blue-400'
        />
      </label>
    ))}
    <button
      type='submit'
      className='mt-5 ml-auto w-fit rounded-md bg-[#1488DB] px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700'
    >
      Get Data
    </button>
  </form>
);

export default StatisticForm;
