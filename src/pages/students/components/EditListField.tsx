import { FC } from 'react';
import { Button } from '@/components/ui/button';

interface EditListFieldProps {
  label: string;
  values: string[];
  isEditing: boolean;
  onChange: (index: number, value: string) => void;
  onAdd: () => void;
  maxItems?: number;
}

const EditListField: FC<EditListFieldProps> = ({
  label,
  values,
  isEditing,
  onChange,
  onAdd,
  maxItems = 3,
}) => (
  <div className='md:col-span-2'>
    <span className='font-semibold'>{label}:</span>
    {values.length > 0 ? (
      values.map((value, i) => (
        <div key={i} className='mt-1'>
          {isEditing ? (
            <input
              className='w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-400 focus:outline-none'
              value={value}
              onChange={(e) => onChange(i, e.target.value)}
            />
          ) : (
            <p>{value}</p>
          )}
        </div>
      ))
    ) : (
      <div>No {label.toLowerCase()} available</div>
    )}

    {isEditing && values.length < maxItems && (
      <Button className='mt-2' variant='outline' onClick={onAdd}>
        + Add {label}
      </Button>
    )}
  </div>
);

export default EditListField;
