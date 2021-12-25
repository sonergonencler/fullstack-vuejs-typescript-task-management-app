import { TaskFilters } from '@/types/Task';

interface Filter {
  name: string;
  type: TaskFilters;
}

export const filters: Filter[] = [
  { name: 'Active', type: 'ACTIVE' },
  { name: 'Completed', type: 'COMPLETED' },
  { name: 'Pinned', type: 'PINNED' },
];
