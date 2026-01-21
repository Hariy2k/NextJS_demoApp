'use client';

import { useState } from 'react';

export default function UseStateCounter() {
  // useState hook to manage counter state
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">useState Counter Demo</h2>
      
      <div className="text-center mb-6">
        <div className="text-4xl font-bold text-blue-600 mb-2">{count}</div>
        <p className="text-gray-600">Current count</p>
      </div>

      <div className="flex gap-3 justify-center">
        <button
          onClick={decrement}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Decrease
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          Reset
        </button>
        <button
          onClick={increment}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          Increase
        </button>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded text-sm text-gray-700">
        <p><strong>useState Hook:</strong></p>
        <p>• Manages component state</p>
        <p>• Returns [state, setState] pair</p>
        <p>• Triggers re-render when state changes</p>
      </div>
    </div>
  );
}
