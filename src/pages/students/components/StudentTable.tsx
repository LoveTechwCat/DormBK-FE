import { FC, useState } from 'react';
import { deleteStudent, Student } from '@/services/studentService';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import ConfirmDialog from '@/components/layout/ConfirmDialog';
import StudentDetailDialog from './StudentDetailDialog';
import { toast, Toaster } from 'react-hot-toast';

interface StudentTableProps {
  students: Student[];
  onDelete: (id: string) => void;
  handleUpdate: (student: Student) => void;
}

const StudentTable: FC<StudentTableProps> = ({
  students,
  onDelete,
  handleUpdate,
}) => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [openView, setOpenView] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleView = (student: Student) => {
    setSelectedStudent(student);
    setOpenView(true);
  };

  const handleDelete = (student: Student) => {
    setSelectedStudent(student);
    setOpenDelete(true);
  };

  const confirmDelete = async (ssn: string) => {
    try {
      await deleteStudent(ssn);
      onDelete(ssn);
      toast.success('Student deleted successfully!');
    } catch (error: any) {
      toast.error(`Failed to delete student: ${error.message || ''}`);
      throw error; // để ConfirmDialog biết là lỗi (nếu cần)
    }
  };

  return (
    <div>
      <Table>
        <TableHeader className='sticky top-0'>
          <TableRow>
            <TableHead>SSN</TableHead>
            <TableHead>Student ID</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Faculty</TableHead>
            <TableHead>Room</TableHead>
            <TableHead>Building</TableHead>
            <TableHead>Study Status</TableHead>
            <TableHead className='text-center'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className='text-center'>
                No students found
              </TableCell>
            </TableRow>
          ) : (
            students.map((student) => (
              <TableRow key={student.ssn}>
                <TableCell>{student.ssn}</TableCell>
                <TableCell>{student.student_id}</TableCell>
                <TableCell>
                  {student.first_name + ' ' + student.last_name}
                </TableCell>
                <TableCell>{student.faculty}</TableCell>
                <TableCell>
                  {student.room_id && student.room_id !== ''
                    ? student.room_id
                    : 'None'}
                </TableCell>
                <TableCell>
                  {student.building_id && student.building_id !== ''
                    ? student.building_id
                    : 'None'}
                </TableCell>
                <TableCell>{student.study_status}</TableCell>
                <TableCell className='flex gap-2'>
                  <Button
                    className='bg-blue-100 hover:bg-sky-200'
                    variant='outline'
                    size='sm'
                    onClick={() => handleView(student)}
                  >
                    View
                  </Button>
                  <Button
                    variant='destructive'
                    size='sm'
                    onClick={() => handleDelete(student)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <Toaster />
      {/* Dialogs */}
      <StudentDetailDialog
        open={openView}
        onOpenChange={setOpenView}
        student={selectedStudent}
        handleUpdate={handleUpdate}
      />
      <ConfirmDialog
        open={openDelete}
        onOpenChange={setOpenDelete}
        onConfirm={async () => {
          if (selectedStudent) {
            await confirmDelete(selectedStudent.ssn);
            setOpenDelete(false);
          }
        }}
        title='Confirm Deletion'
        message={
          <>
            Do you want to delete student with SSN:{' '}
            <span className='font-semibold'>
              {selectedStudent?.ssn ?? 'N/A'}
            </span>
            ?
          </>
        }
      />
    </div>
  );
};

export default StudentTable;
