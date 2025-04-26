import { FC, useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import EditField from './EditField';
import EditListField from './EditListField';
import EditAddressField from './EditAddressField';
import { Student, updateStudent } from '@/services/studentService';
import ConfirmDialog from '@/components/layout/ConfirmDialog';
import { Toaster, toast } from 'react-hot-toast'; // Import toast

interface Address {
  commune: string;
  district: string;
  province: string;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student: Student | null;
  handleUpdate: (student: Student) => void;
}

const StudentDetailDialog: FC<Props> = ({
  open,
  onOpenChange,
  student,
  handleUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Student | null>(student);
  const [confirmCancelOpen, setConfirmCancelOpen] = useState(false);
  const [confirmSaveOpen, setConfirmSaveOpen] = useState(false);

  useEffect(() => {
    if (open && student) {
      setFormData(student);
      setIsEditing(false);
    }
  }, [student]);

  if (!student || !formData) return null;

  const parseAddressField = (value: string): Address[] => {
    return value
      ? value.split(';').map((item) => {
          const [commune = '', district = '', province = ''] = item.split(',');
          return { commune, district, province };
        })
      : [];
  };

  const stringifyAddressField = (list: Address[]): string => {
    return list
      .map((addr) => [addr.commune, addr.district, addr.province].join(','))
      .join(';');
  };

  const handleAddressChange = (
    index: number,
    field: keyof Address,
    value: string,
  ) => {
    const addresses = parseAddressField(formData.addresses);
    addresses[index][field] = value;
    handleChange('addresses', stringifyAddressField(addresses));
  };

  const handleAddAddress = () => {
    const addresses = parseAddressField(formData.addresses);
    if (addresses.length < 3) {
      addresses.push({ commune: '', district: '', province: '' });
      handleChange('addresses', stringifyAddressField(addresses));
    }
  };

  const parseListField = (value: string) => {
    return value ? value.split(';').map((v) => v.trim()) : [];
  };

  const stringifyListField = (list: string[]) => {
    return list.map((v) => v.trim()).join(';');
  };

  const handleChange = (field: keyof Student, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = async () => {
    try {
      formData.birthday = formData.birthday.substring(0, 10);
      const data = await updateStudent(formData.ssn, formData);
      setIsEditing(false);
      handleUpdate(formData);
      console.log('Student updated successfully:', data);
      toast.success('Student updated successfully!');
    } catch (error) {
      toast.error(`Failed to update student: ${error}`);
    }
  };

  const handleAddToList = (field: keyof Student) => {
    const list = parseListField(formData[field] as string);
    if (list.length < 3) {
      list.push('');
      handleChange(field, stringifyListField(list));
    }
  };

  const handleListChange = (
    field: keyof Student,
    index: number,
    value: string,
  ) => {
    const list = parseListField(formData[field] as string);
    list[index] = value;
    handleChange(field, stringifyListField(list));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-h-[90vh] max-w-6xl overflow-y-auto rounded-2xl bg-white p-6 shadow-lg'>
        <DialogHeader>
          <DialogTitle className='mb-4 text-2xl font-bold text-gray-800'>
            {isEditing ? 'Edit Student Information' : 'Student Information'}
          </DialogTitle>
        </DialogHeader>

        <div className='grid grid-cols-1 gap-4 text-sm text-gray-700 md:grid-cols-2'>
          <EditField
            label='SSN'
            value={formData.ssn}
            isEditing={isEditing}
            onChange={(value: any) => handleChange('ssn', value)}
          />
          <EditField
            label='Student ID'
            value={formData.student_id}
            isEditing={isEditing}
            onChange={(value: any) => handleChange('student_id', value)}
          />
          {!isEditing && (
            <EditField
              label='Full Name'
              value={formData.first_name + ' ' + formData.last_name}
              isEditing={isEditing}
              onChange={(value: any) => handleChange('first_name', value)}
            />
          )}
          {isEditing && (
            <EditField
              label='First name'
              value={formData.first_name}
              isEditing={isEditing}
              onChange={(value: any) => handleChange('first_name', value)}
            />
          )}
          {isEditing && (
            <EditField
              label='Last name'
              value={formData.last_name}
              isEditing={isEditing}
              onChange={(value: any) => handleChange('last_name', value)}
            />
          )}
          <EditField
            label='Birthday'
            value={formData.birthday.slice(0, 10)}
            isEditing={isEditing}
            onChange={(value: any) => handleChange('birthday', value)}
            type='date'
          />
          <EditField
            label='Sex'
            value={formData.sex === 'M' ? 'Male' : 'Female'}
            isEditing={isEditing}
            onChange={(value: any) => handleChange('sex', value)}
          />
          <EditField
            label='Health State'
            value={formData.health_state || ''}
            isEditing={isEditing}
            onChange={(value: any) => handleChange('health_state', value)}
          />
          <EditField
            label='Ethnic Group'
            value={formData.ethnic_group || ''}
            isEditing={isEditing}
            onChange={(value: any) => handleChange('ethnic_group', value)}
          />
          <EditField
            label='Faculty'
            value={formData.faculty || ''}
            isEditing={isEditing}
            onChange={(value: any) => handleChange('faculty', value)}
          />
          <EditField
            label='Class'
            value={formData.class_name || ''}
            isEditing={isEditing}
            onChange={(value: any) => handleChange('class_name', value)}
          />
          <EditField
            label='Study Status'
            value={formData.study_status || ''}
            isEditing={isEditing}
            onChange={(value: any) => handleChange('study_status', value)}
          />
          <EditField
            label='Building'
            value={formData.building_id || ''}
            isEditing={isEditing}
            onChange={(value: any) => handleChange('building_id', value)}
          />
          <EditField
            label='Room'
            value={formData.room_id || ''}
            isEditing={isEditing}
            onChange={(value: any) => handleChange('room_id', value)}
          />

          <EditAddressField
            label='Addresses'
            values={parseAddressField(formData.addresses)}
            isEditing={isEditing}
            onChange={handleAddressChange}
            onAdd={handleAddAddress}
            maxItems={3}
          />

          <EditListField
            label='Emails'
            values={parseListField(formData.emails)}
            isEditing={isEditing}
            onChange={(index, value) =>
              handleListChange('emails', index, value)
            }
            onAdd={() => handleAddToList('emails')}
            maxItems={3}
          />

          <EditListField
            label='Phone Numbers'
            values={parseListField(formData.phone_numbers)}
            isEditing={isEditing}
            onChange={(index, value) =>
              handleListChange('phone_numbers', index, value)
            }
            onAdd={() => handleAddToList('phone_numbers')}
            maxItems={3}
          />
        </div>

        <DialogFooter>
          <Button
            variant='secondary'
            onClick={() => {
              if (isEditing) {
                setConfirmCancelOpen(true);
              } else {
                onOpenChange(false);
              }
            }}
          >
            {isEditing ? 'Cancel' : 'Close'}
          </Button>
          {isEditing ? (
            <Button
              className='bg-green-500 hover:bg-green-600'
              onClick={() => setConfirmSaveOpen(true)}
            >
              Save
            </Button>
          ) : (
            <Button
              variant='secondary'
              className='bg-sky-200 hover:bg-sky-300'
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
          )}
        </DialogFooter>
        <ConfirmDialog
          open={confirmCancelOpen}
          onOpenChange={setConfirmCancelOpen}
          title='Unsaved Changes'
          message='Your changes will be lost. Are you sure you want to cancel?'
          confirmColor='destructive'
          onConfirm={() => {
            setIsEditing(false);
            setFormData(student);
          }}
        />

        <ConfirmDialog
          open={confirmSaveOpen}
          onOpenChange={setConfirmSaveOpen}
          title='Confirm Save'
          message="Are you sure you want to update this student's information?"
          confirmColor='blue'
          onConfirm={handleSave}
        />
      </DialogContent>
      <Toaster />
    </Dialog>
  );
};

export default StudentDetailDialog;
