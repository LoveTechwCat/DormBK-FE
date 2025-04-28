import { z } from 'zod';

const dateFormatRegex = /^\d{4}\/\d{2}\/\d{2}$/;

const isValidDate = (value: string): boolean => {
  if (!dateFormatRegex.test(value)) return false;

  const [yearStr, monthStr, dayStr] = value.split('/');
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);

  if (month < 1 || month > 12) return false;
  if (day < 1) return false;

  const monthLengths = [
    31,
    (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  if (day > monthLengths[month - 1]) return false;

  return true;
};

export const disciplinedSchema = z.object({
  startDate: z
    .string()
    .min(1, 'Start Date is required')
    .regex(dateFormatRegex, 'Start Date must be in YYYY/MM/DD format')
    .refine(isValidDate, 'Start Date is not a valid date'),
  endDate: z
    .string()
    .min(1, 'End Date is required')
    .regex(dateFormatRegex, 'End Date must be in YYYY/MM/DD format')
    .refine(isValidDate, 'End Date is not a valid date'),
});

export const totalByBuildingSchema = z.object({
  buildingId: z
    .string()
    .min(1, 'Building ID is required')
    .refine(
      (val) => val.length === 5,
      'Building ID must be exactly 5 characters long',
    ),
});
export const validCardsSchema = z.object({});
