import React from 'react';

const CodeInput = ({ code, setCode, onAnalyze, showOptimizedCode, optimizedCode, toggleOptimizedCode, language }) => (
  <div className={`w-full ${showOptimizedCode ? 'w-1/2' : ''}`}>
    <textarea
      className="w-full h-40 p-4 bg-softWhite rounded-lg shadow-soft focus:outline-none focus:ring-2 focus:ring-lightPurple font-sans"
      value={code}
      onChange={(e) => setCode(e.target.value)}
      placeholder={`Enter your ${language} code here...`}
    />
    <div className="mt-4 space-y-2">
      <button
        className="w-full bg-lightPurple text-white font-semibold py-3 px-4 rounded-full shadow-soft hover:shadow-lg"
        onClick={onAnalyze}
      >
        Analyze {language.charAt(0).toUpperCase() + language.slice(1)} Code
      </button>
      {optimizedCode && (
        <button
          className="w-full bg-green-500 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-full shadow-soft"
          onClick={toggleOptimizedCode}
        >
          {showOptimizedCode ? 'Hide Optimized Code' : 'View Optimized Code'}
        </button>
      )}
    </div>
  </div>
);

export default CodeInput;
