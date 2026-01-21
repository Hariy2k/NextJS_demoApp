'use client';

import { useState, useEffect } from 'react';

export default function UseEffectPatterns() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [data, setData] = useState<string[]>([]);

  // Pattern 1: Runs only ONCE (empty dependency array [])
  useEffect(() => {
    console.log('🟢 EFFECT 1: Runs only once on component mount');
    console.log('This is perfect for initial setup, API calls, subscriptions');
    
    // Simulate initial data loading
    const initialData = ['Item 1', 'Item 2', 'Item 3'];
    setData(initialData);
    console.log('Initial data loaded:', initialData);
  }, []); // Empty array = runs only once

  // Pattern 2: Runs on EVERY render (no dependency array)
  useEffect(() => {
    console.log('🔴 EFFECT 2: Runs on every render');
    console.log('Current count:', count, 'Current name:', name);
  }); // No dependency array = runs after every render

  // Pattern 3: Runs when dependencies CHANGE [count, name]
  useEffect(() => {
    console.log('🔵 EFFECT 3: Runs when count or name changes');
    console.log('Count changed to:', count);
    console.log('Name changed to:', name || '(empty)');
    
    // This is perfect for reacting to specific state changes
    if (count > 5) {
      console.log('🎉 Count is greater than 5!');
    }
  }, [count, name]); // Dependencies = runs when count or name changes

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">useEffect Dependency Patterns</h2>
      
      {/* Controls */}
      <div className="space-y-4 mb-6">
        <div className="flex gap-2 items-center">
          <button
            onClick={() => setCount(count + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Increment Count ({count})
          </button>
          <button
            onClick={() => setCount(0)}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Reset Count
          </button>
        </div>
        
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="flex-1 px-3 text-black py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => setName('')}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Clear Name
          </button>
        </div>
      </div>

      {/* Pattern Explanations */}
      <div className="space-y-4">
        <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded">
          <h3 className="font-semibold text-green-800 mb-2">🟢 Pattern 1: Runs Once []</h3>
          <p className="text-sm text-gray-700 mb-2">
            Perfect for: Initial setup, API calls, event listeners, subscriptions
          </p>
          <code className="text-xs bg-gray-100 p-2 block rounded">
            useEffect(() =&gt; {'{'} console.log('Runs once'); {'}'}, []);
          </code>
        </div>

        <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded">
          <h3 className="font-semibold text-red-800 mb-2">🔴 Pattern 2: Runs Every Render</h3>
          <p className="text-sm text-gray-700 mb-2">
            Use with caution! Can cause infinite loops. Good for debugging.
          </p>
          <code className="text-xs bg-gray-100 p-2 block rounded">
            useEffect(() =&gt; {'{'} console.log('Runs every render'); {'}'}, []);
          </code>
        </div>

        <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
          <h3 className="font-semibold text-blue-800 mb-2">🔵 Pattern 3: Runs with Dependencies [count, name]</h3>
          <p className="text-sm text-gray-700 mb-2">
            Perfect for: Reacting to specific state changes, validation, side effects
          </p>
          <code className="text-xs bg-gray-100 p-2 block rounded">
            useEffect(() =&gt; {'{'} console.log('Runs when count/name changes'); {'}'}, [count, name]);
          </code>
        </div>
      </div>

      {/* Current State Display */}
      <div className="mt-6 p-4 bg-gray-50 rounded">
        <h3 className="font-semibold mb-2">Current State:</h3>
        <div className="text-sm space-y-1">
          <p><strong>Count:</strong> {count}</p>
          <p><strong>Name:</strong> {name || '(empty)'}</p>
          <p><strong>Data Items:</strong> {data.length}</p>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-4 p-4 bg-yellow-50 rounded text-sm text-yellow-800">
        <p className="font-semibold mb-1">📝 Instructions:</p>
        <p>1. Open browser console (F12)</p>
        <p>2. Click buttons and type in the input</p>
        <p>3. Watch the console to see when each effect runs</p>
        <p>4. Notice the colored indicators: 🟢🔴🔵</p>
      </div>
    </div>
  );
}
