import { FC } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react'; // hoặc dùng bất cứ icon nào bạn thích

interface Address {
  commune: string;
  district: string;
  province: string;
}

interface EditAddressFieldProps {
  label: string;
  values: Address[];
  isEditing: boolean;
  onChange: (index: number, field: keyof Address, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
  maxItems?: number;
}

const InputAddress: FC<EditAddressFieldProps> = ({
  label,
  values,
  isEditing,
  onChange,
  onAdd,
  onRemove,
  maxItems = 3,
}) => {
  const renderValues =
    values.length > 0 ? values : [{ commune: '', district: '', province: '' }];

  return (
    <div className='md:col-span-2'>
      <span className='font-semibold'>{label}:</span>

      {renderValues.map((address, i) => (
        <div
          key={i}
          className='relative mt-2 grid grid-cols-1 gap-2 md:grid-cols-3'
        >
          {['commune', 'district', 'province'].map((field) =>
            isEditing ? (
              <input
                key={field}
                className='w-10/12 rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-400 focus:outline-none'
                value={address[field as keyof Address]}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                onChange={(e) =>
                  onChange(i, field as keyof Address, e.target.value)
                }
              />
            ) : (
              <p key={field}>{address[field as keyof Address]}</p>
            ),
          )}
          {/* Nút Remove */}
          {isEditing && values.length > 1 && (
            <button
              type='button'
              className='absolute top-1/2 right-2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700'
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
          + Add Address
        </Button>
      )}
    </div>
  );
};

export default InputAddress;
