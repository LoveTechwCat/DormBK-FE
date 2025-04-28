import { FC } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface EditListFieldProps {
  label: string;
  values: string[];
  isEditing: boolean;
  onChange: (index: number, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
  maxItems?: number;
}

const EditForm: FC<EditListFieldProps> = ({
  label,
  values,
  isEditing,
  onChange,
  onAdd,
  onRemove,
  maxItems = 3,
}) => {
  const renderValues = values.length > 0 ? values : [''];

  return (
    <div className='md:col-span-2'>
      <span className='font-semibold'>{label}:</span>

      {renderValues.map((value, i) => (
        <div key={i} className='relative mt-2 flex items-center gap-2'>
          {isEditing ? (
            <input
              className='w-11/12 rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-400 focus:outline-none'
              value={value}
              placeholder={label}
              onChange={(e) => onChange(i, e.target.value)}
            />
          ) : (
            <p>{value}</p>
          )}
          {/* Nút Remove */}
          {isEditing && values.length > 1 && (
            <button
              type='button'
              className='flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700'
              onClick={() => onRemove(i)}
            >
              X
              <X size={14} />
            </button>
          )}
        </div>
      ))}

      {/* Nút Add */}
      {isEditing && values.length < maxItems && (
        <Button className='mt-2' variant='outline' onClick={onAdd}>
          + Add {label}
        </Button>
      )}
    </div>
  );
};

export default EditForm;
