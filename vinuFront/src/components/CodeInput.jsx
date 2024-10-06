// frontend/src/components/CodeInput.jsx
import React from 'react';

const CodeInput = ({ code, setCode, onAnalyze, showOptimizedCode, optimizedCode, toggleOptimizedCode, language }) => (
  <div className={`w-full ${showOptimizedCode ? 'w-1/2' : ''}`}>
    <textarea
      className="w-full h-40 p-2 border border-gray-300 rounded-md resize-none"
      value={code}
      onChange={(e) => setCode(e.target.value)}
      placeholder={`Enter your ${language} code here...`}
    />
    <div className="mt-4 space-y-2">
      <button
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={onAnalyze}
      >
        Analyze {language.charAt(0).toUpperCase() + language.slice(1)} Code
      </button>
      {optimizedCode && (
        <button
          className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={toggleOptimizedCode}
        >
          {showOptimizedCode ? 'Hide Optimized Code' : 'View Optimized Code'}
        </button>
      )}
    </div>
  </div>
);

export default CodeInput;