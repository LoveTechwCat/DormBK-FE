import { FC } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Student } from '@/services/studentService';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student: Student | null;
}

const StudentDetailDialog: FC<Props> = ({ open, onOpenChange, student }) => {
  if (!student) return null;
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/students/update/${student.ssn}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-3xl rounded-2xl bg-white shadow-lg'>
        <DialogHeader>
          <DialogTitle className='mb-4 text-2xl font-bold text-gray-800'>
            Student Information
          </DialogTitle>
        </DialogHeader>

        <div className='grid grid-cols-1 gap-4 text-sm text-gray-700 md:grid-cols-2'>
          <div>
            <span className='font-semibold'>SSN:</span> {student.ssn}
          </div>
          <div>
            <span className='font-semibold'>Student ID:</span>{' '}
            {student.student_id}
          </div>
          <div>
            <span className='font-semibold'>Full Name:</span>{' '}
            {student.full_name}
          </div>
          <div>
            <span className='font-semibold'>Birthday:</span>{' '}
            {student.birthday.slice(0, 10)}
          </div>
          <div>
            <span className='font-semibold'>Sex:</span>{' '}
            {student.sex === 'M' ? 'Male' : 'Female'}
          </div>
          <div>
            <span className='font-semibold'>Health State:</span>{' '}
            {student.health_state}
          </div>
          <div>
            <span className='font-semibold'>Ethnic Group:</span>{' '}
            {student.ethnic_group}
          </div>
          <div>
            <span className='font-semibold'>Faculty:</span> {student.faculty}
          </div>
          <div>
            <span className='font-semibold'>Class:</span> {student.class_name}
          </div>
          <div>
            <span className='font-semibold'>Study Status:</span>{' '}
            {student.study_status}
          </div>
          <div>
            <span className='font-semibold'>Building:</span>{' '}
            {student.building_id}
          </div>
          <div>
            <span className='font-semibold'>Room:</span> {student.room_id}
          </div>

          <div className='md:col-span-2'>
            <span className='mb-1 block font-semibold'>Addresses:</span>
            <ul className='list-inside list-disc pl-4'>
              {Array.isArray(student.addresses) &&
              student.addresses.length > 0 ? (
                student.addresses.map((a, i) => <li key={i}>{a}</li>)
              ) : (
                <li>No addresses available</li>
              )}
            </ul>
          </div>
          <div className='md:col-span-2'>
            <span className='font-semibold'>Emails:</span>{' '}
            {Array.isArray(student.emails) && student.emails.length > 0
              ? student.emails.join(', ')
              : 'No emails available'}
          </div>

          <div className='md:col-span-2'>
            <span className='font-semibold'>Phone Numbers:</span>{' '}
            {Array.isArray(student.phone_numbers) &&
            student.phone_numbers.length > 0
              ? student.phone_numbers.join(', ')
              : 'No phone numbers available'}
          </div>
        </div>
        <DialogFooter>
          <Button
            variant='secondary'
            className='focus:ring-0 focus:outline-none'
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
          <Button
            variant='secondary'
            className='bg-sky-200 hover:bg-sky-300'
            onClick={handleEdit}
          >
            Edit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StudentDetailDialog;
