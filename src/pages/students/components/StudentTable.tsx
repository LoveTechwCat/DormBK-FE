import { FC, useState } from 'react';
import { Student } from '@/services/studentService';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import StudentDeleteDialog from './StudentDeleteDialog';
import StudentDetailDialog from './StudentDetailDialog';

interface Props {
  students: Student[];
  onDelete: (id: string) => void;
}

const StudentTable: FC<Props> = ({ students, onDelete }) => {
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

  return (
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
        {students.map((student) => (
          <TableRow key={student.ssn}>
            <TableCell>{student.ssn}</TableCell>
            <TableCell>{student.studentId}</TableCell>
            <TableCell>{student.fullName}</TableCell>
            <TableCell>{student.faculty}</TableCell>
            <TableCell>{student.roomId ? student.roomId : 'None'}</TableCell>
            <TableCell>
              {student.buildingId ? student.buildingId : 'None'}
            </TableCell>
            <TableCell>{student.studyStatus}</TableCell>
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
        ))}
      </TableBody>
      <StudentDetailDialog
        open={openView}
        onOpenChange={setOpenView}
        student={selectedStudent}
      />
      <StudentDeleteDialog
        open={openDelete}
        onOpenChange={setOpenDelete}
        student={selectedStudent}
      />
    </Table>
  );
};

export default StudentTable;
