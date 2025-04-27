import { ReactNode, useState } from 'react';
import { StatisticOptionKey, STATISTIC_OPTIONS } from './StatisticOptions';
import StatisticForm from './StatisticForm';
import StatisticDisplay from './StatisticDisplay';
import { useFetch } from '@/hooks/useFetch';
import { handleStatisticsSubmit } from '@/services/statisticsService';
import StatisticDataDisplay from './StatisticDataDisplay';
import { AlertTriangle } from 'lucide-react';

const MainSection = () => {
  const [selectedKey, setSelectedKey] =
    useState<StatisticOptionKey>('disciplined');
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [localError, setLocalError] = useState<string | null>(null);

  const fetchMap: Record<StatisticOptionKey, ReturnType<typeof useFetch>> = {
    disciplined: useFetch(),
    totalByBuilding: useFetch(),
    validCards: useFetch(),
  };

  const { data, loading, error, handleFetch, resetting } =
    fetchMap[selectedKey];

  const currentOption = STATISTIC_OPTIONS.find(
    (opt) => opt.key === selectedKey,
  )!;

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    console.log('handleSubmit', selectedKey, formData);

    try {
      await handleStatisticsSubmit(selectedKey, formData, handleFetch);
      setFormData({});
      setLocalError(null);
    } catch (err) {
      if (err instanceof Error) {
        setLocalError(err.message);
      } else {
        setLocalError('Unexpected error');
      }
    }
  };

  const handleSelectOption = (key: StatisticOptionKey) => {
    fetchMap[selectedKey].handleReset();
    setSelectedKey(key);
    setFormData({});
    setLocalError(null);
  };

  return (
    <div className='flex flex-col gap-6 md:flex-row'>
      <div className='w-full rounded-2xl bg-white p-6 shadow-md md:w-1/3'>
        <h3 className='mb-4 text-xl font-semibold text-gray-800'>
          Statistics Options
        </h3>
        <div className='flex flex-col gap-3'>
          {STATISTIC_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              onClick={() => handleSelectOption(opt.key)}
              className={`rounded-lg px-4 py-2 text-left font-medium transition-all duration-150 ${
                selectedKey === opt.key
                  ? 'bg-[#1488DB] text-white shadow'
                  : 'bg-white text-gray-800 hover:bg-blue-100 hover:text-blue-700'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className='w-full rounded-2xl bg-white p-6 shadow-md md:w-2/3'>
        <h3 className='mb-4 text-xl font-semibold text-gray-800'>
          {currentOption.label}
        </h3>

        {selectedKey === 'validCards' ? (
          <StatisticDisplay onClick={handleSubmit} />
        ) : (
          <StatisticForm
            option={currentOption}
            formData={formData}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
          />
        )}

        {loading && (
          <div className='mt-6 flex items-center justify-center gap-2 text-blue-600'>
            <svg className='h-5 w-5 animate-spin' viewBox='0 0 24 24'>
              <circle
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'
                fill='none'
              />
              <path
                d='M4 12a8 8 0 018-8'
                stroke='currentColor'
                strokeWidth='4'
                strokeLinecap='round'
              />
            </svg>
            <span className='text-base font-medium'>Loading...</span>
          </div>
        )}

        {(localError || error) && (
          <div className='mt-6 flex flex-col gap-2 rounded-md border border-red-400 bg-red-100 p-4 text-red-700'>
            <div className='flex items-center gap-2'>
              <AlertTriangle className='h-5 w-5' />
              <span className='text-base font-medium'>Error:</span>
            </div>
            <pre className='text-sm whitespace-pre-wrap'>
              {localError || error}
            </pre>{' '}
          </div>
        )}

        {(data as ReactNode) && (
          <div
            className={`transition-opacity duration-300 ${resetting ? 'opacity-0' : 'opacity-100'}`}
          >
            <StatisticDataDisplay data={data} compact={false} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MainSection;
