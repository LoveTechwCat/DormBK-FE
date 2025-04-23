import { useEffect, useState } from 'react';
import { getAllStudents, Student } from '@/services/studentService';
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

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllStudents();
      setStudents(data);
      setFilteredStudents(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = students.filter((student) => {
      const matchesStatus =
        selectedStatus === 'all' || student.studyStatus === selectedStatus;
      const matchesSearch = student.ssn
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
    setFilteredStudents(filtered);
  }, [students, searchQuery, selectedStatus]);

  const handleDelete = (id: string) => {
    console.log('Delete student with ID:', id);
    setStudents((prev) => prev.filter((s) => s.ssn !== id));
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
                />
              </div>
              <div className='mx-6 rounded-md border'>
                <StudentTable
                  students={filteredStudents}
                  onDelete={handleDelete}
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
