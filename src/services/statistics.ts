import axios from 'axios';

interface NumberOfDisciplinedStudents {
  totalStudents: number;
}

interface TotalStudentsByBuildingId {
  totalStudents: number;
}

interface NumberOfValidDormCards {
  totalCards: number;
}

const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    Authorization: token ? `Bearer ${token}` : '',
  };
};

export const fetchDisciplinedStudents = async (
  startDate: string,
  endDate: string,
): Promise<NumberOfDisciplinedStudents> => {
  console.log('from:', startDate, 'to:', endDate);
  const res = await axios.get<NumberOfDisciplinedStudents>(
    `/api/statistics/disciplined-students/`,
    {
      params: { startDate, endDate },
      headers: getAuthHeaders(),
    },
  );
  console.log('Calling fetchDisciplinedStudents');
  return res.data;
};

export const fetchTotalStudentsByBuilding = async (
  buildingId: string,
): Promise<TotalStudentsByBuildingId> => {
  const res = await axios.get<TotalStudentsByBuildingId>(
    `/api/statistics/total-students/${buildingId}`,
    {
      headers: getAuthHeaders(),
    },
  );
  console.log('Calling fetchTotalStudentsByBuilding');
  return res.data;
};

export const fetchValidDormCards =
  async (): Promise<NumberOfValidDormCards> => {
    console.log('Calling fetchValidDormCards');

    const res = await axios.get<NumberOfValidDormCards>(
      `/api/statistics/valid-dormitory-cards`,
      {
        headers: getAuthHeaders(),
      },
    );

    return res.data;
  };
