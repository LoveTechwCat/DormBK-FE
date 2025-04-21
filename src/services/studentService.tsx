import axios from 'axios';

export interface Student {
  ssn: string;
  studentId: string;
  hasHealthInsurance: boolean;
  studyStatus?: string;
  className?: string;
  faculty?: string;
  buildingId?: string;
  roomId?: string;
  fullName: string;
  birthday: string;
  sex?: string;
  healthState?: string;
  ethnicGroup?: string;
  addresses: { commune: string; district: string; province: string }[];
  emails: string[];
  phoneNumbers: string[];
}

export const getAllStudents = async (): Promise<Student[]> => {
  const response = await axios.get<Student[]>('/api/students');
  return response.data;
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
