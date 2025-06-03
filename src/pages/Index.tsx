
import React from 'react';
import Calculator from '@/components/Calculator';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Online Calculator</h1>
        <Calculator />
      </div>
    </div>
  );
};

export default Index;
