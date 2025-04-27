'use client';

import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AddStudentHeader from './components/AddStudentHeader';
import EditField from '@/components/layout/EditField';
import SelectField from '@/components/layout/SelectField';
import BooleanSelectField from '@/components/layout/BooleanSelectField';
import EditAddressField from '@/components/layout/EditAddressField';
import EditListField from '@/components/layout/EditListField';
import { DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import ConfirmDialog from '@/components/layout/ConfirmDialog';
import CalendarIcon from '@/assets/calendar.svg';
import { useState } from 'react';

const AddStudent = () => {
  const [formData, setFormData] = useState<any>({
    new_ssn: '',
    student_id: '',
    first_name: '',
    last_name: '',
    birthday: '',
    sex: '',
    has_health_insurance: false,
    health_state: '',
    ethnic_group: '',
    faculty: '',
    class_name: '',
    study_status: '',
    building_id: '',
    room_id: '',
    addresses: [],
    emails: [],
    phone_numbers: [],
  });

  const [isEditing, setIsEditing] = useState(true);
  const [confirmCancelOpen, setConfirmCancelOpen] = useState(false);
  const [confirmSaveOpen, setConfirmSaveOpen] = useState(false);

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // TODO: Save logic here
    console.log('Saving student:', formData);
    setIsEditing(false);
  };

  const handleAddressChange = (index: number, value: any) => {
    const updated = [...formData.addresses];
    updated[index] = value;
    setFormData((prev: any) => ({ ...prev, addresses: updated }));
  };

  const handleAddAddress = () => {
    setFormData((prev: any) => ({
      ...prev,
      addresses: [...(prev.addresses || []), ''],
    }));
  };

  const handleListChange = (field: string, index: number, value: any) => {
    const updated = [...(formData[field] || [])];
    updated[index] = value;
    setFormData((prev: any) => ({ ...prev, [field]: updated }));
  };

  const handleAddToList = (field: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: [...(prev[field] || []), ''],
    }));
  };

  const parseAddressField = (addresses: any) => addresses || [];
  const parseListField = (list: any) => list || [];

  return (
    <div className='flex min-h-screen w-full flex-col'>
      <Header />
      <div className='flex flex-1'>
        <Sidebar />
        <main className='flex flex-1 flex-col justify-between bg-gray-100'>
          <div className='px-20 py-8'>
            <div className='mb-6 flex items-start justify-between'>
              <AddStudentHeader />
            </div>

            {/* Form Input */}
            <div className='grid grid-cols-1 gap-4 text-sm text-gray-700 md:grid-cols-2'>
              <EditField
                label='SSN'
                value={formData.new_ssn}
                isEditing={isEditing}
                onChange={(v: any) => handleChange('new_ssn', v)}
              />
              <EditField
                label='Student ID'
                value={formData.student_id}
                isEditing={isEditing}
                onChange={(v: any) => handleChange('student_id', v)}
              />
              <EditField
                label='First name'
                value={formData.first_name}
                isEditing={isEditing}
                onChange={(v: any) => handleChange('first_name', v)}
              />
              <EditField
                label='Last name'
                value={formData.last_name}
                isEditing={isEditing}
                onChange={(v: any) => handleChange('last_name', v)}
              />
              <EditField
                label='Birthday'
                value={formData.birthday.slice(0, 10)}
                type='date'
                isEditing={isEditing}
                onChange={(v: any) => handleChange('birthday', v)}
                icon={<img src={CalendarIcon} className='h-5 w-5' />}
              />
              <SelectField
                label='Sex'
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
                value={formData.health_state}
                isEditing={isEditing}
                onChange={(v: any) => handleChange('health_state', v)}
              />
              <EditField
                label='Ethnic Group'
                value={formData.ethnic_group}
                isEditing={isEditing}
                onChange={(v: any) => handleChange('ethnic_group', v)}
              />
              <EditField
                label='Faculty'
                value={formData.faculty}
                isEditing={isEditing}
                onChange={(v: any) => handleChange('faculty', v)}
              />
              <EditField
                label='Class'
                value={formData.class_name}
                isEditing={isEditing}
                onChange={(v: any) => handleChange('class_name', v)}
              />
              <SelectField
                label='Study Status'
                value={formData.study_status}
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
                onChange={(index, v) => handleListChange('emails', index, v)}
                onAdd={() => handleAddToList('emails')}
                maxItems={3}
              />
              <EditListField
                label='Phone Numbers'
                values={parseListField(formData.phone_numbers)}
                isEditing={isEditing}
                onChange={(index, v) =>
                  handleListChange('phone_numbers', index, v)
                }
                onAdd={() => handleAddToList('phone_numbers')}
                maxItems={3}
              />
            </div>

            <DialogFooter>
              <Button
                variant='secondary'
                onClick={() =>
                  isEditing ? setConfirmCancelOpen(true) : setIsEditing(false)
                }
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
              }}
            />
            <ConfirmDialog
              open={confirmSaveOpen}
              onOpenChange={setConfirmSaveOpen}
              title='Confirm Save'
              message="Are you sure you want to save this student's information?"
              confirmColor='blue'
              onConfirm={handleSave}
            />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default AddStudent;
