import { FC } from 'react';

interface Option {
  label: string;
  value: string;
}

interface SelectFieldProps {
  label: string;
  value: string;
  options: Option[];
  isEditing: boolean;
  onChange: (value: string) => void;
}

const SelectField: FC<SelectFieldProps> = ({
  label,
  value,
  options,
  isEditing,
  onChange,
}) => {
  return (
    <div className='flex flex-col gap-1'>
      <label className='text-sm font-medium text-gray-700'>{label}</label>
      {isEditing ? (
        <select
          className='rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none'
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value=''>Select {label}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <div>
          {value
            ? value === 'F'
              ? 'Female'
              : value === 'M'
                ? 'Male'
                : value
            : '-'}
        </div>
      )}
    </div>
  );
};

export default SelectField;
