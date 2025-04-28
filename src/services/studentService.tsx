import axios from 'axios';

export interface Student {
  new_ssn: string;
  ssn: string;
  first_name: string;
  last_name: string;
  birthday: string;
  sex: string;
  health_state: string | null;
  ethnic_group: string | null;
  student_id: string;
  has_health_insurance: boolean;
  study_status: string | null;
  class_name: string | null;
  faculty: string | null;
  building_id: string;
  room_id: string;
  phone_numbers: string;
  emails: string;
  addresses: string;
}

const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    Authorization: token ? `Bearer ${token}` : '',
  };
};

export const getAllStudents = async (): Promise<Student[]> => {
  const response = await axios.get<Student[]>('/api/students', {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const deleteStudent = async (ssn: string): Promise<void> => {
  try {
    await axios.delete(`/api/students/${ssn}`);
  } catch (error) {
    console.error('Failed to delete student:', error);
    throw error;
  }
};

export const getStudentDetail = async (ssn: string): Promise<Student> => {
  const response = await axios.get<Student>(`/api/students/${ssn}`);
  return response.data;
};

export const updateStudent = async (
  ssn: string,
  student: Partial<Student>,
): Promise<Student> => {
  try {
    const response = await axios.put<Student>(`/api/students/${ssn}`, student, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    const err = error as { response?: { data?: { message?: string } } };
    const message = err.response?.data?.message || 'Failed to update student';
    throw new Error(message);
  }
};

export const getNotFamilyStudent = async (): Promise<Student[]> => {
  const response = await axios.get<Student[]>('/api/students/no-relatives');
  return response.data;
};

export const addStudent = async (student: Student): Promise<Student> => {
  try {
    const response = await axios.post<Student>('/api/students', student, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to add student:', error);
    throw error;
  }
};
