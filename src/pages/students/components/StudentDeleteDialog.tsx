import { FC } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Student, deleteStudent } from '@/services/studentService';
import { Button } from '@/components/ui/button';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student: Student | null;
}

const StudentDeleteDialog: FC<Props> = ({ open, onOpenChange, student }) => {
  if (!student) return null;
  const handleDelete = async (ssn: string) => {
    try {
      await deleteStudent(ssn);
      onOpenChange(false);
      window.location.reload();
    } catch (error) {
      console.error('Failed to delete student:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-md rounded-2xl bg-white shadow-lg'>
        <DialogHeader>
          <DialogTitle className='text-xl font-semibold text-gray-800'>
            Confirm Deletion
          </DialogTitle>
        </DialogHeader>

        <p className='text-sm text-gray-700'>
          Do you want to delete student with SSN:{' '}
          <span className='font-semibold'>{student.ssn}</span>?
        </p>

        <DialogFooter className='pt-4'>
          <Button variant='secondary' onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant='destructive'
            onClick={() => handleDelete(student.ssn)}
          >
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StudentDeleteDialog;
