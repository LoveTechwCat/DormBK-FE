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
            {student.studentId}
          </div>
          <div>
            <span className='font-semibold'>Full Name:</span> {student.fullName}
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
            {student.healthState}
          </div>
          <div>
            <span className='font-semibold'>Ethnic Group:</span>{' '}
            {student.ethnicGroup}
          </div>
          <div>
            <span className='font-semibold'>Faculty:</span> {student.faculty}
          </div>
          <div>
            <span className='font-semibold'>Class:</span> {student.className}
          </div>
          <div>
            <span className='font-semibold'>Study Status:</span>{' '}
            {student.studyStatus}
          </div>
          <div>
            <span className='font-semibold'>Building:</span>{' '}
            {student.buildingId}
          </div>
          <div>
            <span className='font-semibold'>Room:</span> {student.roomId}
          </div>

          <div className='md:col-span-2'>
            <span className='mb-1 block font-semibold'>Addresses:</span>
            <ul className='list-inside list-disc pl-4'>
              {student.addresses.map((a, i) => (
                <li key={i}>{`${a.commune}, ${a.district}, ${a.province}`}</li>
              ))}
            </ul>
          </div>

          <div className='md:col-span-2'>
            <span className='font-semibold'>Emails:</span>{' '}
            {student.emails.join(', ')}
          </div>
          <div className='md:col-span-2'>
            <span className='font-semibold'>Phone Numbers:</span>{' '}
            {student.phoneNumbers.join(', ')}
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
