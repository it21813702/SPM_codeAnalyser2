// frontend/src/components/CodeAnalyzer.jsx
import React, { useState } from 'react';
import CodeInput from './CodeInput';
import OptimizedCode from './OptimizedCode';
import MetricsChart from './MetricsChart';
import { analyzeCode } from '../utils/codeAnalysis';

const CodeAnalyzer = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [metrics, setMetrics] = useState(null);
  const [error, setError] = useState(null);
  const [optimizedCode, setOptimizedCode] = useState('');
  const [showOptimizedCode, setShowOptimizedCode] = useState(false);

  const handleAnalyze = async () => {
    try {
      const result = await analyzeCode(code, language);
      setMetrics(result.metrics);
      setError(null);
      setOptimizedCode(`// Optimized version of your ${language} code:\n${code.split('\n').map(line => '// ' + line).join('\n')}`);
    } catch (err) {
      setError(`Error analyzing ${language} code. Please try again.`);
      setMetrics(null);
      setOptimizedCode('');
    }
  };

  const toggleOptimizedCode = () => setShowOptimizedCode(!showOptimizedCode);

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <label htmlFor="language-select" className="block text-sm font-medium text-gray-700">Select Language:</label>
        <select
          id="language-select"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
        </select>
      </div>
      <div className="flex space-x-4">
        <CodeInput
          code={code}
          setCode={setCode}
          onAnalyze={handleAnalyze}
          showOptimizedCode={showOptimizedCode}
          optimizedCode={optimizedCode}
          toggleOptimizedCode={toggleOptimizedCode}
          language={language}
        />
        {showOptimizedCode && (
          <OptimizedCode
            optimizedCode={optimizedCode}
            onClose={toggleOptimizedCode}
          />
        )}
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {metrics && <MetricsChart metrics={metrics} />}
    </div>
  );
};

export default CodeAnalyzer;