'use client';

import { useState } from 'react';

/**
 * CounterDemo component demonstrates the useState hook
 * 
 * useState is used to manage the counter state in this component.
 * The count variable holds the current state value,
 * and setCount is the function to update that value.
 */
export default function CounterDemo() {
  // Initialize state with useState hook
  // count: current state value (starts at 0)
  // setCount: function to update the count
  const [count, setCount] = useState(0);

  // Handler function to increment counter
  const handleIncrement = () => {
    // Using the functional update form to ensure we get the latest state
    setCount(prevCount => prevCount + 1);
  };

  // Handler function to decrement counter
  const handleDecrement = () => {
    setCount(prevCount => prevCount - 1);
  };

  // Handler function to reset counter
  const handleReset = () => {
    setCount(0);
  };

  return (
    <div className="space-y-6">
      {/* Code Example */}
      <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
        <pre className="text-sm">
          <code>{`// useState Hook Example
const [count, setCount] = useState(0);

// Update state
setCount(count + 1);  // Direct update
setCount(prev => prev + 1);  // Functional update`}</code>
        </pre>
      </div>

      {/* Interactive Demo */}
      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 text-blue-800">
          Interactive Counter Demo
        </h3>
        
        {/* Display current count */}
        <div className="text-center mb-6">
          <div className="text-5xl font-bold text-blue-600 mb-2">
            {count}
          </div>
          <p className="text-gray-600">
            Current count value
          </p>
        </div>

        {/* Control buttons */}
        <div className="flex justify-center gap-3 flex-wrap">
          <button
            onClick={handleDecrement}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
          >
            Decrease (-1)
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
          >
            Reset (0)
          </button>
          <button
            onClick={handleIncrement}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
          >
            Increase (+1)
          </button>
        </div>

        {/* Explanation */}
        <div className="mt-6 p-4 bg-white rounded-lg">
          <h4 className="font-semibold mb-2 text-gray-800">What's happening:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Each button click calls setCount() to update state</li>
            <li>• React detects the state change and re-renders the component</li>
            <li>• The new count value is displayed in the UI</li>
            <li>• State persists between re-renders</li>
          </ul>
        </div>
      </div>

      {/* Multiple State Example */}
      <div className="bg-purple-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 text-purple-800">
          Multiple State Variables
        </h3>
        <MultipleStateExample />
      </div>
    </div>
  );
}

/**
 * Example showing multiple useState hooks in one component
 */
function MultipleStateExample() {
  const [name, setName] = useState('React Developer');
  const [isLearning, setIsLearning] = useState(true);
  const [skills, setSkills] = useState(['useState', 'useEffect']);

  const addSkill = () => {
    const newSkill = prompt('Enter a new skill:');
    if (newSkill && newSkill.trim()) {
      setSkills([...skills, newSkill.trim()]);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name:
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="learning"
          checked={isLearning}
          onChange={(e) => setIsLearning(e.target.checked)}
          className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
        />
        <label htmlFor="learning" className="text-sm font-medium text-gray-700">
          Currently Learning
        </label>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium text-gray-700">
            Skills:
          </label>
          <button
            onClick={addSkill}
            className="px-3 py-1 bg-purple-500 text-white text-sm rounded hover:bg-purple-600 transition-colors"
          >
            Add Skill
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-purple-100 text-purple-700 text-sm rounded"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="text-xs text-gray-500 mt-3">
        <p>This example shows multiple independent state variables:</p>
        <ul className="mt-1 space-y-1">
          <li>• name: string state for text input</li>
          <li>• isLearning: boolean state for checkbox</li>
          <li>• skills: array state for skill list</li>
        </ul>
      </div>
    </div>
  );
}
