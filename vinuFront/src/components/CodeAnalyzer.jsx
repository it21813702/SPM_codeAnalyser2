import React, { useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CodeAnalyzer = () => {
  const [code, setCode] = useState('');
  const [metrics, setMetrics] = useState(null);
  const [error, setError] = useState(null);
  const [optimizedCode, setOptimizedCode] = useState('');
  const [showOptimizedCode, setShowOptimizedCode] = useState(false);

  const analyzeCode = async () => {
    try {
      const response = await axios.post('http://localhost:3001/analyze', { code });
      setMetrics(response.data.metrics);
      setError(null);
      // Simulating optimized code generation
      setOptimizedCode(`// Optimized version of your code:\n${code.split('\n').map(line => '// ' + line).join('\n')}`);
    } catch (err) {
      setError('Error analyzing code. Please try again.');
      setMetrics(null);
      setOptimizedCode('');
    }
  };

  const toggleOptimizedCode = () => {
    setShowOptimizedCode(!showOptimizedCode);
  };

  const chartData = metrics
    ? {
        labels: Object.keys(metrics),
        datasets: [
          {
            label: 'Code Metrics',
            data: Object.values(metrics),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
          },
        ],
      }
    : null;

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Code Analysis Results',
      },
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex space-x-4">
        <div className={`w-full ${showOptimizedCode ? 'w-1/2' : ''}`}>
          <textarea
            className="w-full h-40 p-2 border border-gray-300 rounded-md resize-none"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter your JavaScript code here..."
          />
          <div className="mt-4 space-y-2">
            <button
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={analyzeCode}
            >
              Analyze Code
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
        {showOptimizedCode && (
          <div className="w-1/2">
            <textarea
              className="w-full h-40 p-2 border border-gray-300 rounded-md resize-none"
              value={optimizedCode}
              readOnly
              placeholder="Optimized code will appear here..."
            />
            <button
              className="mt-4 w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={toggleOptimizedCode}
            >
              Close Optimized Code
            </button>
          </div>
        )}
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {metrics && (
        <div className="mt-6">
          <Bar data={chartData} options={chartOptions} />
        </div>
      )}
    </div>
  );
};

export default CodeAnalyzer;