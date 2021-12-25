export type Task = {
  _id: string;
  text: string;
  isCompleted: boolean;
  isPinned: boolean;
  list: string;
};

export type TaskFilters = 'ACTIVE' | 'COMPLETED' | 'PINNED';
