import React, { useState, useEffect } from 'react';
import { Student, getStudentDetail } from '@/services/studentService';
import { useParams } from 'react-router-dom';
import Header from '@/components/layout/AfterLogin/Header';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';

const StudentInfo: React.FC = () => {
  const { ssn } = useParams<{ ssn: string }>();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ssn) return;

    const fetchStudentData = async () => {
      try {
        const data = await getStudentDetail(ssn);
        setStudent(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load student information');
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [ssn]);

  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <div className='flex flex-1'>
        <Sidebar />
        <main className='flex flex-1 flex-col justify-between bg-gray-100'>
          {loading && <p>Loading...</p>}
          {error && <p className='text-red-500'>{error}</p>}

          {student && (
            <div className='mx-auto max-w-xl p-4'>
              <h2 className='mb-4 text-xl font-bold'>Student Infomation</h2>
              <div className='space-y-2 rounded bg-white p-4 shadow-md'>
                <h3 className='text-lg font-semibold'>{student.fullName}</h3>
                <p>
                  <strong>SSN:</strong> {student.ssn}
                </p>
                <p>
                  <strong>Mã sinh viên:</strong> {student.studentId}
                </p>
                <p>
                  <strong>Tình trạng học tập:</strong>{' '}
                  {student.studyStatus || 'Không rõ'}
                </p>
                <p>
                  <strong>Lớp:</strong> {student.className || 'Không rõ'}
                </p>
                <p>
                  <strong>Khoa:</strong> {student.faculty || 'Không rõ'}
                </p>
                <p>
                  <strong>Ngày sinh:</strong>{' '}
                  {new Date(student.birthday).toLocaleDateString()}
                </p>
                <p>
                  <strong>Giới tính:</strong> {student.sex || 'Không rõ'}
                </p>
                <p>
                  <strong>Sức khỏe:</strong> {student.healthState || 'Không rõ'}
                </p>
                <p>
                  <strong>Dân tộc:</strong> {student.ethnicGroup || 'Không rõ'}
                </p>
                <p>
                  <strong>Email:</strong> {student.emails.join(', ')}
                </p>
                <p>
                  <strong>SĐT:</strong> {student.phoneNumbers.join(', ')}
                </p>
                <div>
                  <strong>Địa chỉ:</strong>
                  <ul className='list-inside list-disc'>
                    {student.addresses.map((addr, index) => (
                      <li key={index}>
                        {addr.commune}, {addr.district}, {addr.province}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          <Footer />
        </main>
      </div>
    </div>
  );
};

export default StudentInfo;
