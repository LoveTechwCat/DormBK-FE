import {
  fetchDisciplinedStudents,
  fetchTotalStudentsByBuilding,
  fetchValidDormCards,
} from './statistics';
import { StatisticOptionKey } from '@/pages/statistics/components/StatisticOptions';
import { HandleFetch } from '@/hooks/useFetch';

export const handleStatisticsSubmit = async (
  selectedKey: StatisticOptionKey,
  formData: Record<string, string>,
  handleFetch: HandleFetch,
) => {
  switch (selectedKey) {
    case 'disciplined': {
      const from = formData.startDate || '';
      const to = formData.endDate || '';
      await handleFetch(() => fetchDisciplinedStudents(from, to));
      break;
    }
    case 'totalByBuilding': {
      const id = formData.buildingId || '';
      await handleFetch(() => fetchTotalStudentsByBuilding(id));
      break;
    }
    case 'validCards':
      await handleFetch(fetchValidDormCards);
      break;
    default:
      throw new Error('Invalid statistic key');
  }
};
