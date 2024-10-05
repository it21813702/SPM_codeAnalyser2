import React, { useState } from 'react';
import CodeInput from './CodeInput';
import OptimizedCode from './OptimizedCode';
import MetricsChart from './MetricsChart';
import { analyzeCode } from '../utils/codeAnalysis';

const CodeAnalyzer = () => {
  const [code, setCode] = useState('');
  const [metrics, setMetrics] = useState(null);
  const [error, setError] = useState(null);
  const [optimizedCode, setOptimizedCode] = useState('');
  const [showOptimizedCode, setShowOptimizedCode] = useState(false);

  const handleAnalyze = async () => {
    try {
      const result = await analyzeCode(code);
      setMetrics(result.metrics);
      setError(null);
      setOptimizedCode(`// Optimized version of your code:\n${code.split('\n').map(line => '// ' + line).join('\n')}`);
    } catch (err) {
      setError('Error analyzing code. Please try again.');
      setMetrics(null);
      setOptimizedCode('');
    }
  };

  const toggleOptimizedCode = () => setShowOptimizedCode(!showOptimizedCode);

  return (
    <div className="space-y-6">
      <div className="flex space-x-4">
        <CodeInput
          code={code}
          setCode={setCode}
          onAnalyze={handleAnalyze}
          showOptimizedCode={showOptimizedCode}
          optimizedCode={optimizedCode}
          toggleOptimizedCode={toggleOptimizedCode}
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