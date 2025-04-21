export type StatisticOptionKey =
  | 'disciplined'
  | 'totalByBuilding'
  | 'validCards';

export interface StatisticInput {
  name: string;
  label: string;
  type: 'text' | 'date';
  placeholder?: string;
}

export interface StatisticOption {
  key: StatisticOptionKey;
  label: string;
  inputs?: StatisticInput[];
}

export const STATISTIC_OPTIONS: StatisticOption[] = [
  {
    key: 'disciplined',
    label: 'Disciplined Students',
    inputs: [
      { name: 'startDate', label: 'Start Date', type: 'date' },
      { name: 'endDate', label: 'End Date', type: 'date' },
    ],
  },
  {
    key: 'totalByBuilding',
    label: 'Total Students by Building ID',
    inputs: [
      {
        name: 'buildingId',
        label: 'Building ID',
        type: 'text',
        placeholder: 'Enter building ID',
      },
    ],
  },
  {
    key: 'validCards',
    label: 'Number of Valid Dorm Cards',
    inputs: [], // No inputs needed
  },
];
