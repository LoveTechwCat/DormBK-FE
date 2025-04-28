import {
  fetchDisciplinedStudents,
  fetchTotalStudentsByBuilding,
  fetchValidDormCards,
} from './statistics';
import { StatisticOptionKey } from '@/pages/statistics/components/StatisticOptions';
import { HandleFetch } from '@/hooks/useFetch';
import { z } from 'zod';
import {
  disciplinedSchema,
  totalByBuildingSchema,
  validCardsSchema,
} from '@/pages/statistics/validator';

const fieldNameMap: Record<string, string> = {
  startDate: 'Start Date',
  endDate: 'End Date',
  buildingId: 'Building ID',
};

export const handleStatisticsSubmit = async (
  selectedKey: StatisticOptionKey,
  formData: Record<string, string>,
  handleFetch: HandleFetch,
) => {
  try {
    const validate = (schema: z.ZodSchema) => {
      const result = schema.safeParse(formData);
      if (!result.success) {
        const errorMessages = result.error.errors
          .map((e) => {
            const fieldName = fieldNameMap[e.path[0]] || e.path.join('.');
            if (e.message.toLowerCase().includes('required')) {
              return `${fieldName} is required`;
            }
            return ` ${e.message}`;
          })
          .map((msg) => `${msg}`)
          .join('\n');
        throw new Error(errorMessages);
      }
    };

    switch (selectedKey) {
      case 'disciplined': {
        validate(disciplinedSchema);
        const from = formData.startDate || '';
        const to = formData.endDate || '';
        await handleFetch(() => fetchDisciplinedStudents(from, to));
        break;
      }
      case 'totalByBuilding': {
        validate(totalByBuildingSchema);
        const id = formData.buildingId || '';
        await handleFetch(() => fetchTotalStudentsByBuilding(id));
        break;
      }
      case 'validCards': {
        validate(validCardsSchema);
        await handleFetch(() => fetchValidDormCards());
        break;
      }
      default:
        throw new Error('Invalid statistic key');
    }
  } catch (err) {
    if (err instanceof z.ZodError) {
      const errorMessages = err.errors
        .map((e) => {
          const fieldName = fieldNameMap[e.path[0]] || e.path.join('.');
          if (e.message.toLowerCase().includes('required')) {
            return `${fieldName} is required`;
          }
          return `${fieldName}: ${e.message}`;
        })
        .join('\n');
      throw new Error(errorMessages);
    }
    throw err;
  }
};
