import { Task, TaskSortFunction } from '../types';

// Generate a unique ID
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Short Job First sorting algorithm
export const sortBySJF: TaskSortFunction = (a: Task, b: Task) => {
  // First sort by completion status
  if (a.completed && !b.completed) return 1;
  if (!a.completed && b.completed) return -1;
  
  // Then sort by estimated time (SJF)
  if (a.completed && b.completed) {
    return b.createdAt - a.createdAt; // Most recently completed first
  }
  
  return a.estimatedTime - b.estimatedTime;
};

// Get time efficiency category based on estimated time
export const getTimeEfficiencyCategory = (minutes: number): string => {
  if (minutes <= 5) return 'very-quick';
  if (minutes <= 15) return 'quick';
  if (minutes <= 30) return 'medium';
  if (minutes <= 60) return 'long';
  return 'very-long';
};

// Format minutes into a readable time string
export const formatTime = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours} hr`;
  }
  
  return `${hours} hr ${remainingMinutes} min`;
};