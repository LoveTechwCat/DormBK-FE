import axios from 'axios';

export interface Student {
  ssn: string;
  student_id: string;
  has_health_insurance: boolean;
  study_status?: string;
  class_name?: string;
  faculty?: string;
  building_id?: string;
  room_id?: string;
  full_name: string;
  birthday: string;
  sex?: string;
  health_state?: string;
  ethnic_group?: string;
  addresses: string[];
  emails: string[];
  phone_numbers: string[];
}

export const getAllStudents = async (): Promise<Student[]> => {
  const response = await axios.get<Student[]>('/api/students');
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
  const response = await axios.put<Student>(`/api/students/${ssn}`, student, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const getNotFamilyStudent = async (): Promise<Student[]> => {
  const response = await axios.get<Student[]>('/api/students/no-relatives');
  return response.data;
};
