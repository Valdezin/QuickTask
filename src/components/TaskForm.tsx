import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

interface TaskFormProps {
  onAddTask: (title: string, estimatedTime: number) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('15');
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (title.trim() && Number(estimatedTime) > 0) {
      onAddTask(title.trim(), Number(estimatedTime));
      setTitle('');
      setEstimatedTime('15');
      setIsExpanded(false);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6 transition-all duration-300">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="What task needs to be done?"
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (e.target.value && !isExpanded) setIsExpanded(true);
              }}
              onFocus={() => setIsExpanded(true)}
            />
            <button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg transition-colors duration-200 flex items-center"
              disabled={!title.trim() || Number(estimatedTime) <= 0}
            >
              <PlusCircle className="h-5 w-5 mr-1" />
              <span>Add</span>
            </button>
          </div>
          
          {isExpanded && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 animate-fadeIn">
              <div className="w-full sm:w-auto">
                <label htmlFor="estimatedTime" className="block text-sm font-medium text-gray-700 mb-1">
                  Estimated Time (minutes)
                </label>
                <input
                  id="estimatedTime"
                  type="number"
                  min="1"
                  max="480"
                  className="w-full sm:w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={estimatedTime}
                  onChange={(e) => setEstimatedTime(e.target.value)}
                />
              </div>
              
              <div className="w-full sm:flex-1">
                <div className="text-sm text-gray-500 mb-1">Efficiency Rating</div>
                <div className="flex space-x-2">
                  {[5, 15, 30, 60, 120].map((time) => (
                    <button
                      key={time}
                      type="button"
                      className={`text-xs px-2 py-1 rounded-full transition-colors ${
                        Number(estimatedTime) === time
                          ? 'bg-blue-100 text-blue-800 border border-blue-300'
                          : 'bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200'
                      }`}
                      onClick={() => setEstimatedTime(time.toString())}
                    >
                      {time < 60 ? `${time}m` : `${time / 60}h`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default TaskForm;