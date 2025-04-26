import { useEffect, useState } from 'react';
import {
  getAllStudents,
  Student,
  getNotFamilyStudent,
} from '@/services/studentService';
import StudentHeader from './components/StudentHeader';
import StudentFilter from './components/StudentFilter';
import StudentTable from './components/StudentTable';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';

const StudentsPage = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [noFamilyStudent, setNoFamilyStudent] = useState<Student[]>([]);
  const [sortOrder, setSortOrder] = useState<'none' | 'asc' | 'desc'>('none');

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllStudents();
      const noFamilyData = await getNotFamilyStudent();
      setNoFamilyStudent(noFamilyData);
      setStudents(data);
      setFilteredStudents(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    let filtered: Student[] = [];

    if (selectedStatus === 'No_family') {
      const noFamilySSNs = new Set(noFamilyStudent.map((s) => s.ssn));
      filtered = students.filter((student) => {
        const matchesSearch = student.ssn
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        return noFamilySSNs.has(student.ssn) && matchesSearch;
      });
    } else {
      filtered = students.filter((student) => {
        const matchesStatus =
          selectedStatus === 'all' || student.study_status === selectedStatus;
        const matchesSearch = student.ssn
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
      });
    }
    if (sortOrder !== 'none') {
      filtered.sort((a, b) => {
        return sortOrder === 'asc'
          ? a.ssn.localeCompare(b.ssn)
          : b.ssn.localeCompare(a.ssn);
      });
    }

    setFilteredStudents(filtered);
  }, [students, searchQuery, selectedStatus, noFamilyStudent, sortOrder]);

  const handleDelete = (id: string) => {
    console.log('Delete student with ID:', id);
    setStudents((prev) => prev.filter((s) => s.ssn !== id));
  };
  const handleUpdate = (updatedStudent: Student) => {
    setStudents((prev) =>
      prev.map((s) => (s.ssn === updatedStudent.ssn ? updatedStudent : s)),
    );
  };

  return (
    <div className='flex min-h-screen w-full flex-col'>
      <Header />
      <div className='flex flex-1'>
        <Sidebar />
        <main className='flex flex-1 flex-col justify-between bg-gray-100'>
          <div className='px-20 py-8'>
            <StudentHeader />
            <div className='rounded-xl bg-white pb-6 shadow-md'>
              <div className='sticky top-0 z-20 bg-white px-6 pt-6 pb-2'>
                <h2 className='mb-4 text-xl font-semibold'>Student List</h2>
                <StudentFilter
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  selectedStatus={selectedStatus}
                  setSelectedStatus={setSelectedStatus}
                  sortOrder={sortOrder}
                  setSortOrder={setSortOrder}
                />
              </div>
              <div className='mx-6 rounded-md border'>
                <StudentTable
                  students={filteredStudents}
                  onDelete={handleDelete}
                  handleUpdate={handleUpdate}
                />
              </div>
            </div>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default StudentsPage;
