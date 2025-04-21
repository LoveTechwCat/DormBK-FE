import { FC } from 'react';
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
import { useNavigate } from 'react-router-dom';

interface Props {
  students: Student[];
  onDelete: (id: string) => void;
}

const StudentTable: FC<Props> = ({ students, onDelete }) => {
  const navigate = useNavigate();

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
            <TableCell>{student.roomId}</TableCell>
            <TableCell>{student.buildingId}</TableCell>
            <TableCell>{student.studyStatus}</TableCell>
            <TableCell className='flex gap-2'>
              <Button
                className='bg-blue-100 hover:bg-sky-200'
                variant='outline'
                size='sm'
                onClick={() => navigate(`/students/${student.ssn}`)}
              >
                View
              </Button>
              <Button
                variant='destructive'
                size='sm'
                onClick={() => onDelete(student.ssn)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default StudentTable;
