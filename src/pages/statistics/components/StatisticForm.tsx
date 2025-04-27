import { useState, useRef, useEffect } from 'react';
import { StatisticOption } from './StatisticOptions';

type Props = {
  option: StatisticOption;
  formData: Record<string, string>;
  onChange: (name: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
};

const StatisticForm = ({ option, formData, onChange, onSubmit }: Props) => {
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const [selectedMode, setSelectedMode] = useState<'manual' | 'calendar'>(
    'calendar',
  );

  useEffect(() => {
    option.inputs?.forEach((input) => {
      if (!inputRefs.current[input.name]) {
        inputRefs.current[input.name] = null;
      }
    });
  }, [option.inputs]);

  const handleDivClick = (inputName: string) => {
    const input = inputRefs.current[inputName];
    if (input && selectedMode === 'calendar') {
      input.showPicker?.();
      input.focus();
    }
  };

  const handleInputChange = (name: string, value: string) => {
    if (selectedMode === 'calendar') {
      const formatted = value.replace(/-/g, '/');
      onChange(name, formatted);
    } else {
      onChange(name, value);
    }
  };

  const hasDateInput = option.inputs?.some((input) => input.type === 'date');

  return (
    <form className='flex flex-col gap-4' onSubmit={onSubmit}>
      {hasDateInput && (
        <div className='flex gap-4'>
          <button
            type='button'
            onClick={() => setSelectedMode('manual')}
            className={`rounded-md px-4 py-2 text-sm font-medium ${
              selectedMode === 'manual'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Nhập tay
          </button>
          <button
            type='button'
            onClick={() => setSelectedMode('calendar')}
            className={`rounded-md px-4 py-2 text-sm font-medium ${
              selectedMode === 'calendar'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Chọn lịch
          </button>
        </div>
      )}

      {option.inputs?.map((input) => (
        <label key={input.name} className='flex flex-col text-sm text-gray-700'>
          {input.label}
          <div
            className='relative flex flex-col gap-2'
            onClick={() => input.type === 'date' && handleDivClick(input.name)}
          >
            {input.type === 'date' ? (
              <>
                <input
                  type='text'
                  disabled={selectedMode !== 'manual'}
                  placeholder='YYYY/MM/DD'
                  value={formData[input.name] || ''}
                  onChange={(e) =>
                    handleInputChange(input.name, e.target.value)
                  }
                  className={`w-full rounded-md border px-4 py-2.5 text-base outline-none ${
                    selectedMode === 'manual'
                      ? 'border-blue-500 bg-white text-gray-800'
                      : 'border-gray-300 bg-gray-100 text-gray-400'
                  }`}
                />
                <div className='relative'>
                  <input
                    ref={(el) => {
                      if (input.type === 'date') {
                        inputRefs.current[input.name] = el;
                      }
                    }}
                    type='date'
                    disabled={selectedMode !== 'calendar'}
                    placeholder={input.placeholder}
                    value={formData[input.name]?.replace(/\//g, '-') || ''}
                    onChange={(e) =>
                      handleInputChange(input.name, e.target.value)
                    }
                    className={`w-full rounded-md border px-4 py-2.5 pr-10 text-base outline-none ${
                      selectedMode === 'calendar'
                        ? 'border-blue-500 bg-white text-gray-800'
                        : 'border-gray-300 bg-gray-100 text-gray-400'
                    }`}
                  />
                </div>
              </>
            ) : (
              <input
                type={input.type}
                placeholder={input.placeholder}
                value={formData[input.name] || ''}
                onChange={(e) => onChange(input.name, e.target.value)}
                className='mt-1 w-full rounded-md border border-gray-400 bg-gray-50 px-4 py-2.5 text-base text-gray-800 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-500'
              />
            )}
          </div>
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
};

export default StatisticForm;
