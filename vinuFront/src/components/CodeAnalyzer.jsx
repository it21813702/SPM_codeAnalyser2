// src/components/CodeAnalyzer.jsx
import React, { useState } from 'react';
import axios from 'axios';

const CodeAnalyzer = () => {
  const [code, setCode] = useState('');
  const [metrics, setMetrics] = useState(null);

  const handleAnalyze = async () => {
    try {
      const response = await axios.post('http://localhost:3001/analyze', { code });
      setMetrics(response.data);
    } catch (error) {
      console.error('Error analyzing code:', error);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full max-w-3xl h-40 p-4 border border-gray-300 rounded-md resize-none"
        placeholder="Enter your JavaScript code here..."
      />
      <button
        onClick={handleAnalyze}
        className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition"
      >
        Analyze Code
      </button>

      {metrics && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold">Analysis Results</h2>
          <pre className="bg-gray-100 p-4 rounded-md mt-4">{JSON.stringify(metrics, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default CodeAnalyzer;

