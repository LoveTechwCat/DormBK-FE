import { FC } from 'react';
import { Button } from '@/components/ui/button';

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
  maxItems?: number;
}

const EditAddressField: FC<EditAddressFieldProps> = ({
  label,
  values,
  isEditing,
  onChange,
  onAdd,
  maxItems = 3,
}) => {
  return (
    <div className='md:col-span-2'>
      <span className='font-semibold'>{label}:</span>
      {values.length > 0 ? (
        values.map((address, i) => (
          <div key={i} className='mt-2 grid grid-cols-1 gap-2 md:grid-cols-3'>
            {['commune', 'district', 'province'].map((field) =>
              isEditing ? (
                <input
                  key={field}
                  className='rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-400 focus:outline-none'
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
          </div>
        ))
      ) : (
        <div>No addresses available</div>
      )}

      {isEditing && values.length < maxItems && (
        <Button className='mt-2' variant='outline' onClick={onAdd}>
          + Add Address
        </Button>
      )}
    </div>
  );
};

export default EditAddressField;
