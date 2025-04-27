import { z } from 'zod';

// Schema validate cho từng loại thống kê
export const disciplinedSchema = z.object({
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
});

export const totalByBuildingSchema = z.object({
  buildingId: z.string().min(1, 'Building ID is required'),
});

export const validCardsSchema = z.object({});
