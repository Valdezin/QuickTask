import React from 'react';
import { Task } from '../types';
import { formatTime, getTimeEfficiencyCategory } from '../utils/taskUtils';
import { CheckCircle, Clock, Trash2 } from 'lucide-react';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete, onDelete }) => {
  const timeCategory = getTimeEfficiencyCategory(task.estimatedTime);
  
  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'very-quick': return 'bg-green-100 text-green-800 border-green-200';
      case 'quick': return 'bg-teal-100 text-teal-800 border-teal-200';
      case 'medium': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'long': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'very-long': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  return (
    <div 
      className={`group bg-white border rounded-lg shadow-sm mb-3 p-4 transition-all duration-300 hover:shadow-md ${
        task.completed ? 'opacity-75 border-gray-200' : 'border-l-4 border-l-blue-500 border-t border-r border-b'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 mr-4">
          <h3 className={`text-lg font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
            {task.title}
          </h3>
          
          <div className="flex items-center mt-2 text-sm">
            <Clock className="h-4 w-4 text-gray-500 mr-1" />
            <span className="text-gray-600 mr-3">{formatTime(task.estimatedTime)}</span>
            
            <span className={`text-xs px-2 py-0.5 rounded-full border ${getCategoryColor(timeCategory)}`}>
              {timeCategory.replace('-', ' ')}
            </span>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => onToggleComplete(task.id)}
            className={`p-2 rounded-full transition-colors duration-200 ${
              task.completed 
                ? 'text-green-600 hover:bg-green-100' 
                : 'text-gray-400 hover:text-green-600 hover:bg-green-100'
            }`}
            aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
          >
            <CheckCircle className="h-5 w-5" />
          </button>
          
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 rounded-full text-gray-400 hover:text-red-600 hover:bg-red-100 transition-colors duration-200"
            aria-label="Delete task"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;