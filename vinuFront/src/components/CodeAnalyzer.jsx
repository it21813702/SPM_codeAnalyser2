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

  const analyzeCode = async () => {
    try {
      const response = await axios.post('http://localhost:3001/analyze', { code });
      setMetrics(response.data.metrics);
      setError(null);
    } catch (err) {
      setError('Error analyzing code. Please try again.');
      setMetrics(null);
    }
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
      <div>
        <textarea
          className="w-full h-40 p-2 border border-gray-300 rounded-md resize-none"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter your JavaScript code here..."
        />
      </div>
      <button
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={analyzeCode}
      >
        Analyze Code
      </button>
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