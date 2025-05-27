import React, { useEffect, useRef } from 'react';
import { Task } from '../types';
import TaskItem from './TaskItem';
import { Clock } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleComplete, onDelete }) => {
  const listRef = useRef<HTMLDivElement>(null);
  const prevTasksLength = useRef<number>(tasks.length);
  
  // Flash animation when tasks are reordered
  useEffect(() => {
    if (tasks.length > prevTasksLength.current) {
      // A new task was added
      if (listRef.current) {
        listRef.current.classList.add('flash-highlight');
        setTimeout(() => {
          if (listRef.current) {
            listRef.current.classList.remove('flash-highlight');
          }
        }, 500);
      }
    }
    prevTasksLength.current = tasks.length;
  }, [tasks]);
  
  const activeTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);
  
  return (
    <div ref={listRef} className="transition-all duration-300">
      {tasks.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <Clock className="h-12 w-12 mx-auto text-gray-400 mb-3" />
          <h3 className="text-lg font-medium text-gray-700 mb-1">No tasks yet</h3>
          <p className="text-gray-500">Add a task to get started with SJF scheduling</p>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <span>Tasks</span>
              {activeTasks.length > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                  {activeTasks.length}
                </span>
              )}
            </h2>
            
            {activeTasks.length > 0 ? (
              <div className="space-y-1">
                {activeTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggleComplete={onToggleComplete}
                    onDelete={onDelete}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4 bg-gray-50 rounded border border-dashed border-gray-200">
                No active tasks. Add a new task to get started!
              </p>
            )}
          </div>
          
          {completedTasks.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span>Completed</span>
                <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                  {completedTasks.length}
                </span>
              </h2>
              
              <div className="space-y-1">
                {completedTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggleComplete={onToggleComplete}
                    onDelete={onDelete}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TaskList;