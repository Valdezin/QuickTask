import React from 'react';
import { Clock } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Clock className="h-6 w-6" />
          <h1 className="text-2xl font-bold">QuickTask</h1>
        </div>
        <div className="text-sm">
          <span className="opacity-90">Optimized with</span> 
          <span className="font-semibold ml-1">Short Job First</span>
        </div>
      </div>
    </header>
  );
};

export default Header;