// src/App.jsx
import React from 'react';
import CodeAnalyzer from './components/CodeAnalyzer';

const App = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-4xl p-8 bg-white rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-center mb-8">JavaScript Code Analyzer</h1>
        <CodeAnalyzer />
      </div>
    </div>
  );
};

export default App;
