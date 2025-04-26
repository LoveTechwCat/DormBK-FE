import { FC } from 'react';

interface EditableFieldProps {
  label: string;
  value: string;
  isEditing: boolean;
  onChange: (value: string) => void;
  type?: string; // default is text, use "date" if field is a date
}

const EditField: FC<EditableFieldProps> = ({
  label,
  value,
  isEditing,
  onChange,
  type = 'text',
}) => (
  <div>
    <span className='font-semibold'>{label}:</span>
    {isEditing ? (
      type === 'date' ? (
        <input
          type='date'
          className='w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-400 focus:outline-none'
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          className='w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-400 focus:outline-none'
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )
    ) : (
      <p>{value}</p>
    )}
  </div>
);

export default EditField;
