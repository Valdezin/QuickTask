import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { Task } from './types';
import { generateId, sortBySJF } from './utils/taskUtils';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('sjf-tasks', []);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleAddTask = (title: string, estimatedTime: number) => {
    const newTask: Task = {
      id: generateId(),
      title,
      estimatedTime,
      completed: false,
      createdAt: Date.now()
    };
    
    setTasks(prevTasks => [...prevTasks, newTask].sort(sortBySJF));
  };

  const handleToggleComplete = (id: string) => {
    setTasks(prevTasks => 
      prevTasks
        .map(task => 
          task.id === id 
            ? { ...task, completed: !task.completed, createdAt: !task.completed ? Date.now() : task.createdAt } 
            : task
        )
        .sort(sortBySJF)
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  // Ensure we don't render with localStorage content during SSR
  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Task Prioritizer</h1>
          <p className="text-gray-600">
            Tasks are automatically sorted using the <strong>Short Job First</strong> algorithm,
            optimizing for efficiency by completing shorter tasks first.
          </p>
        </div>
        
        <TaskForm onAddTask={handleAddTask} />
        
        <TaskList 
          tasks={tasks} 
          onToggleComplete={handleToggleComplete}
          onDelete={handleDeleteTask}
        />
      </main>
      
      <footer className="border-t border-gray-200 mt-12 py-6 text-center text-gray-500 text-sm">
        <div className="container mx-auto px-4">
          <p>© {new Date().getFullYear()} QuickTask SJF Scheduler</p>
          <p>Part of VLDZ Umbrella</p>
          
        </div>
      </footer>
    </div>
  );
}

export default App;