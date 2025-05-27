export interface Task {
  id: string;
  title: string;
  estimatedTime: number; // in minutes
  completed: boolean;
  createdAt: number; // timestamp
}

export type TaskSortFunction = (a: Task, b: Task) => number;