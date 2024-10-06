import React from 'react';
import CodeAnalyzer from './components/CodeAnalyzer';

const App = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center bg-gradient-to-r from-lavender via-babyPink to-paleYellow bg-200% animate-gradient-glow py-6 sm:py-12 font-sans">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        
        <div className="relative px-4 py-10 bg-softWhite shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-4xl font-semibold mb-5 text-center text-gray-800">Code Metrics Calculator</h1>
          <CodeAnalyzer />
        </div>
      </div>
    </div>
  );
};

export default App;
