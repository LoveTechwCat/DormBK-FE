'use client';

import EditField from '@/components/layout/EditField';
import SelectField from '@/components/layout/SelectField';
import BooleanSelectField from '@/components/layout/BooleanSelectField';
import EditForm from './EditForm';
import ConfirmDialog from '@/components/layout/ConfirmDialog';
import { DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import CalendarIcon from '@/assets/calendar.svg';
import { useState } from 'react';
import InputAddress from './InputAddress';
import { Student, addStudent, updateStudent } from '@/services/studentService';
import { toast, Toaster } from 'react-hot-toast';
import {
  DormitoryCard,
  checkDormitoryCard,
  setDormitoryCard,
  createDormitoryCard,
} from '@/services/DormitoryCardService';
import { set } from 'zod';

interface Address {
  commune: string;
  district: string;
  province: string;
}

const AddStudentForm = () => {
  const [formData, setFormData] = useState<Student>({
    new_ssn: '',
    ssn: '',
    first_name: '',
    last_name: '',
    birthday: '',
    sex: '',
    health_state: null,
    ethnic_group: null,
    student_id: '',
    has_health_insurance: false,
    study_status: null,
    class_name: null,
    faculty: null,
    building_id: '',
    room_id: '',
    phone_numbers: '',
    emails: '',
    addresses: '',
  });

  const [isEditing, setIsEditing] = useState(true);
  const [confirmSaveOpen, setConfirmSaveOpen] = useState(false);
  const [confirmUpdateOpen, setConfirmUpdateOpen] = useState(false);

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

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

  const parseListField = (value: string) => {
    return value ? value.split(';').map((v) => v.trim()) : [];
  };

  const stringifyListField = (list: string[]) => {
    return list.map((v) => v.trim()).join(';');
  };

  const handleUpdate = async () => {
    console.log('Updating student:', formData);
    try {
      await updateStudent(formData.new_ssn, formData);
      await setDormitoryCard(formData.new_ssn);
      setIsEditing(false);
      toast.success('Student updated successfully!');
    } catch (error) {
      if ((error as any).response) {
        if ((error as any).response.data.error === 'Validation error') {
          const fieldErrors: Record<string, string[]> = (error as any).response
            .data.details.fieldErrors;

          const errorMessages = Object.values(fieldErrors)
            .map((errors: string[]) => errors[0])
            .join('. ');

          toast.error(`Failed to update student: ${errorMessages}`);
        } else {
          toast.error(
            `Failed to update student: ${(error as any).response.data.message}`,
          );
        }
      } else {
        toast.error('Failed to update student: Unknown error');
      }
    }
  };

  const handleSave = async () => {
    console.log('Saving student:', formData);
    try {
      formData.ssn = formData.new_ssn;
      formData.birthday = formData.birthday.substring(0, 10);
      formData.has_health_insurance = formData.has_health_insurance === true;
      const validity = await checkDormitoryCard(formData.ssn);
      if (validity === 0) {
        const data = await addStudent(formData);
        await createDormitoryCard(formData.ssn);
        formData.ssn = formData.new_ssn;
      } else if (validity === 1) {
        setConfirmUpdateOpen(true);
        return;
      } else {
        toast.error('Student with this SSN has already existest!');
        return;
      }
      setIsEditing(false);
      toast.success('Student updated successfully!');
    } catch (error) {
      formData.new_ssn = formData.ssn;
      if ((error as any).response) {
        if ((error as any).response.data.error === 'Validation error') {
          const fieldErrors: Record<string, string[]> = (error as any).response
            .data.details.fieldErrors;

          const errorMessages = Object.values(fieldErrors)
            .map((errors: string[]) => errors[0])
            .join('. ');

          toast.error(`Failed to update student: ${errorMessages}`);
        } else {
          toast.error(
            `Failed to update student: ${(error as any).response.data.message}`,
          );
        }
      } else {
        toast.error('Failed to update student: Unknown error');
      }
    }
  };

  const handleAddressChange = (
    index: number,
    field: keyof Address,
    value: string,
  ) => {
    let addresses = parseAddressField(formData.addresses);

    while (addresses.length <= index) {
      addresses.push({ commune: '', district: '', province: '' });
    }

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

  const handleRemoveAddress = (index: number) => {
    const addresses = parseAddressField(formData.addresses);
    const newAddresses = addresses.filter((_, i) => i !== index);
    handleChange('addresses', stringifyAddressField(newAddresses));
  };

  const handleRemoveEmail = (index: number) => {
    const emails = parseListField(formData.emails);
    const newEmails = emails.filter((_, i) => i !== index);
    handleChange('emails', stringifyListField(newEmails));
  };

  const handleRemovePhones = (index: number) => {
    const phones = parseListField(formData.phone_numbers);
    const newPhones = phones.filter((_, i) => i !== index);
    handleChange('phone_numbers', stringifyListField(newPhones));
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
  const handleAddToList = (field: keyof Student) => {
    const list = parseListField(formData[field] as string);
    list.push('');
    handleChange(field, stringifyListField(list));
  };

  return (
    <div className='grid grid-cols-1 gap-4 rounded-lg bg-white p-6 text-sm text-gray-700 shadow-md md:grid-cols-2'>
      {!isEditing && (
        <div className='col-span-full mb-4 flex items-center justify-between text-2xl'>
          {' '}
          Student information{' '}
        </div>
      )}
      <Toaster />
      <EditField
        label='SSN (*)'
        value={formData.new_ssn}
        isEditing={isEditing}
        onChange={(v: any) => handleChange('new_ssn', v)}
      />
      <EditField
        label='Student ID (*)'
        value={formData.student_id}
        isEditing={isEditing}
        onChange={(v: any) => handleChange('student_id', v)}
      />
      <EditField
        label='First name (*)'
        value={formData.first_name}
        isEditing={isEditing}
        onChange={(v: any) => handleChange('first_name', v)}
      />
      <EditField
        label='Last name(*)'
        value={formData.last_name}
        isEditing={isEditing}
        onChange={(v: any) => handleChange('last_name', v)}
      />
      <EditField
        label='Birthday (*)'
        value={formData.birthday.slice(0, 10)}
        type='date'
        isEditing={isEditing}
        onChange={(v: any) => handleChange('birthday', v)}
        icon={<img src={CalendarIcon} className='h-5 w-5' />}
      />
      <SelectField
        label='Sex (*)'
        value={formData.sex}
        options={[
          { label: 'Male', value: 'M' },
          { label: 'Female', value: 'F' },
        ]}
        isEditing={isEditing}
        onChange={(v: any) => handleChange('sex', v)}
      />
      <BooleanSelectField
        label='Has health insurance'
        value={formData.has_health_insurance}
        options={[
          { label: 'Yes', value: true },
          { label: 'No', value: false },
        ]}
        isEditing={isEditing}
        onChange={(v: any) => handleChange('has_health_insurance', v)}
      />
      <EditField
        label='Health State'
        value={formData.health_state || ''}
        isEditing={isEditing}
        onChange={(v: any) => handleChange('health_state', v)}
      />
      <EditField
        label='Ethnic Group (*)'
        value={formData.ethnic_group || ''}
        isEditing={isEditing}
        onChange={(v: any) => handleChange('ethnic_group', v)}
      />
      <EditField
        label='Faculty'
        value={formData.faculty || ''}
        isEditing={isEditing}
        onChange={(v: any) => handleChange('faculty', v)}
      />
      <EditField
        label='Class'
        value={formData.class_name || ''}
        isEditing={isEditing}
        onChange={(v: any) => handleChange('class_name', v)}
      />
      <SelectField
        label='Study Status (*)'
        value={formData.study_status || ''}
        options={[
          { label: 'Active', value: 'Active' },
          { label: 'Non active', value: 'Non_Active' },
        ]}
        isEditing={isEditing}
        onChange={(v) => handleChange('study_status', v)}
      />
      <SelectField
        label='Building'
        value={formData.building_id}
        options={[
          { label: 'BK001', value: 'BK001' },
          { label: 'BK002', value: 'BK002' },
          { label: 'BK003', value: 'BK003' },
          { label: 'BK004', value: 'BK004' },
        ]}
        isEditing={isEditing}
        onChange={(v) => handleChange('building_id', v)}
      />
      <SelectField
        label='Room'
        value={formData.room_id}
        options={[
          { label: 'P.104', value: 'P.104' },
          { label: 'P.201', value: 'P.201' },
          { label: 'P.202', value: 'P.202' },
          { label: 'P.203', value: 'P.203' },
          { label: 'P.204', value: 'P.204' },
          { label: 'P.301', value: 'P.301' },
          { label: 'P.302', value: 'P.302' },
          { label: 'P.303', value: 'P.303' },
          { label: 'P.304', value: 'P.304' },
          { label: 'P.401', value: 'P.401' },
          { label: 'P.402', value: 'P.402' },
          { label: 'P.403', value: 'P.403' },
          { label: 'P.404', value: 'P.404' },
        ]}
        isEditing={isEditing}
        onChange={(v) => handleChange('room_id', v)}
      />
      <InputAddress
        label='Addresses'
        values={parseAddressField(formData.addresses)}
        isEditing={isEditing}
        onChange={handleAddressChange}
        onAdd={handleAddAddress}
        maxItems={3}
        onRemove={handleRemoveAddress}
      />
      <div className='mr-4'>
        <EditForm
          label='Emails'
          values={parseListField(formData.emails)}
          isEditing={isEditing}
          onChange={(index, v) => handleListChange('emails', index, v)}
          onAdd={() => handleAddToList('emails')}
          maxItems={3}
          onRemove={handleRemoveEmail}
        />
      </div>
      <div className='mr-4'>
        <EditForm
          label='Phone Numbers'
          values={parseListField(formData.phone_numbers)}
          isEditing={isEditing}
          onChange={(index, v) => handleListChange('phone_numbers', index, v)}
          onAdd={() => handleAddToList('phone_numbers')}
          maxItems={3}
          onRemove={handleRemovePhones}
        />
      </div>

      <DialogFooter className='col-span-full'>
        {isEditing ? (
          <Button
            className='mt-6 bg-green-500 hover:bg-green-600'
            onClick={() => setConfirmSaveOpen(true)}
          >
            Save
          </Button>
        ) : (
          <Button
            variant='secondary'
            className='mt-6 bg-sky-200 hover:bg-sky-300'
            onClick={() => window.location.reload()}
          >
            Add new student
          </Button>
        )}
      </DialogFooter>
      <ConfirmDialog
        open={confirmSaveOpen}
        onOpenChange={setConfirmSaveOpen}
        title='Confirm Save'
        message="Are you sure you want to save this student's information?"
        confirmColor='blue'
        onConfirm={handleSave}
      />
      <ConfirmDialog
        open={confirmUpdateOpen}
        onOpenChange={setConfirmUpdateOpen}
        title='Confirm update'
        message='Student with this SSN has already existest. Do you want to save change?'
        confirmColor='blue'
        onConfirm={handleUpdate}
      />
    </div>
  );
};

export default AddStudentForm;
