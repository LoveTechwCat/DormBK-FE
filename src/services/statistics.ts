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

export const fetchDisciplinedStudents = async (
  from: string,
  to: string,
): Promise<NumberOfDisciplinedStudents> => {
  const res = await axios.get<NumberOfDisciplinedStudents>(
    `/api/statistics/disciplined-students`,
    {
      params: { from, to },
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
  );
  console.log('Calling fetchTotalStudentsByBuilding');
  return res.data;
};

export const fetchValidDormCards =
  async (): Promise<NumberOfValidDormCards> => {
    const res = await axios.get<NumberOfValidDormCards>(
      `/api/statistics/valid-dormitory-cards`,
    );
    console.log('Calling fetchValidDormCards');
    return res.data;
  };
