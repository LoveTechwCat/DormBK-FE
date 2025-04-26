import { FC, ReactNode, useRef } from 'react';

interface EditableFieldProps {
  label: string;
  value: string;
  isEditing: boolean;
  onChange: (value: string) => void;
  type?: string;
  icon?: ReactNode;
}

const EditField: FC<EditableFieldProps> = ({
  label,
  value,
  isEditing,
  onChange,
  type = 'text',
  icon,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleIconClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      if (type === 'date') {
        inputRef.current.showPicker?.();
      }
    }
  };

  return (
    <div>
      <span className='font-semibold'>{label}:</span>
      {isEditing ? (
        <div className='relative w-full'>
          <input
            ref={inputRef}
            type={type}
            className='w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 focus:border-blue-400 focus:outline-none'
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
          {icon && (
            <button
              type='button'
              onClick={handleIconClick}
              className='absolute top-1/2 right-0 -translate-y-1/2 text-gray-400 transition-colors hover:text-blue-400 focus:ring-0 focus:outline-none'
            >
              {icon}
            </button>
          )}
        </div>
      ) : (
        <p>{value}</p>
      )}
    </div>
  );
};

export default EditField;
