import { ReactNode, useState } from 'react';
import { StatisticOptionKey, STATISTIC_OPTIONS } from './StatisticOptions';
import StatisticForm from './StatisticForm';
import StatisticDisplay from './StatisticDisplay';
import { useFetch } from '@/hooks/useFetch';
import { handleStatisticsSubmit } from '@/services/statisticsService';

const MainSection = () => {
  const [selectedKey, setSelectedKey] =
    useState<StatisticOptionKey>('disciplined');
  const [formData, setFormData] = useState<Record<string, string>>({});

  const fetchMap: Record<StatisticOptionKey, ReturnType<typeof useFetch>> = {
    disciplined: useFetch(),
    totalByBuilding: useFetch(),
    validCards: useFetch(),
  };

  const { data, loading, error, handleFetch } = fetchMap[selectedKey];

  const currentOption = STATISTIC_OPTIONS.find(
    (opt) => opt.key === selectedKey,
  )!;

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    await handleStatisticsSubmit(selectedKey, formData, handleFetch);
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
              onClick={() => {
                setSelectedKey(opt.key);
                setFormData({});
              }}
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

        {loading && <p className='mt-4 text-blue-600'>Loading...</p>}
        {error && <p className='mt-4 text-red-600'>Error: {error}</p>}
        {(data as ReactNode) && (
          <pre className='mt-4 rounded bg-gray-100 p-4 text-sm'>
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
};

export default MainSection;
