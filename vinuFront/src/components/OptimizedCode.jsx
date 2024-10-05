import React from 'react';

const OptimizedCode = ({ optimizedCode, onClose }) => (
  <div className="w-1/2">
    <textarea
      className="w-full h-40 p-2 border border-gray-300 rounded-md resize-none"
      value={optimizedCode}
      readOnly
      placeholder="Optimized code will appear here..."
    />
    <button
      className="mt-4 w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      onClick={onClose}
    >
      Close Optimized Code
    </button>
  </div>
);

export default OptimizedCode;