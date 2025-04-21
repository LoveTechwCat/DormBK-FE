import { useState } from 'react';
import { StatisticOptionKey, STATISTIC_OPTIONS } from './StatisticsOptions';

const MainSection = () => {
  const [selectedKey, setSelectedKey] =
    useState<StatisticOptionKey>('disciplined');

  const currentOption = STATISTIC_OPTIONS.find(
    (opt) => opt.key === selectedKey,
  )!;

  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
      <div className='col-span-1 rounded-2xl bg-white p-6 shadow-md'>
        <h3 className='mb-4 text-xl font-semibold text-gray-800'>
          Statistics Options
        </h3>
        <div className='flex flex-col gap-3'>
          {STATISTIC_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setSelectedKey(opt.key)}
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

      <div className='col-span-2 rounded-2xl bg-white p-6 shadow-md'>
        <h3 className='mb-4 text-xl font-semibold text-gray-800'>
          {currentOption.label}
        </h3>

        {selectedKey === 'validCards' ? (
          // OPTION 3: title + button in one horizontal line
          <div className='flex items-center justify-between'>
            <span className='text-base font-medium text-gray-800'>
              Number of valid dorm cards
            </span>
            <button
              type='button'
              className='rounded-md bg-[#1488DB] px-5 py-2 text-sm font-medium text-white hover:bg-blue-700'
            >
              Get Data
            </button>
          </div>
        ) : (
          // OPTION 1 & 2: standard form
          <form className='flex flex-col gap-4'>
            {currentOption.inputs?.map((input) => (
              <label
                key={input.name}
                className='flex flex-col text-sm text-gray-700'
              >
                {input.label}
                <input
                  type={input.type}
                  placeholder={input.placeholder}
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
        )}
      </div>
    </div>
  );
};

export default MainSection;
