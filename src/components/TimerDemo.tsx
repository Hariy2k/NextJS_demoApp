'use client';

import { useState, useEffect } from 'react';

/**
 * TimerDemo component demonstrates the useEffect hook
 * 
 * useEffect is used to handle side effects like timers, data fetching,
 * subscriptions, and manually changing the DOM.
 */
export default function TimerDemo() {
  // State for the timer
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  // State for data fetching simulation
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // State for window size tracking
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  /**
   * useEffect for Timer functionality
   * This effect runs whenever `isActive` or `seconds` changes
   * The dependency array [isActive, seconds] controls when this effect runs
   */
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    // Only set up interval when timer is active
    if (isActive) {
      console.log('Timer started: Setting up interval');
      
      // Set up interval to increment seconds every second
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      console.log('Timer stopped: Clearing interval');
      // Clear interval when timer is stopped
      if (interval) clearInterval(interval);
    }

    // Cleanup function: runs when component unmounts or before re-running effect
    return () => {
      console.log('Cleanup: Clearing interval');
      if (interval) clearInterval(interval);
    };
  }, [isActive, seconds]); // Dependency array

  /**
   * useEffect for window size tracking
   * This effect runs only once on mount due to empty dependency array
   */
  useEffect(() => {
    // Handler to update window size state
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Add event listener when component mounts
    console.log('Adding resize event listener');
    window.addEventListener('resize', handleResize);

    // Cleanup: remove event listener when component unmounts
    return () => {
      console.log('Removing resize event listener');
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array means this runs only once

  /**
   * useEffect for data fetching simulation
   * This effect runs whenever `loading` changes
   */
  useEffect(() => {
    if (loading) {
      console.log('Starting data fetch simulation');
      
      // Simulate API call with setTimeout
      const fetchData = async () => {
        try {
          // Simulate network delay
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          // Simulate successful data fetch
          const mockData = `Data fetched at ${new Date().toLocaleTimeString()}`;
          setData(mockData);
          setError(null);
          console.log('Data fetch successful:', mockData);
        } catch (err) {
          setError('Failed to fetch data');
          console.error('Data fetch failed:', err);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [loading]);

  // Timer control functions
  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setSeconds(0);
    setIsActive(false);
  };

  // Data fetching functions
  const startDataFetch = () => {
    setLoading(true);
    setData(null);
    setError(null);
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Code Example */}
      <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
        <pre className="text-sm">
          <code>{`// useEffect Hook Examples

// 1. Timer with cleanup
useEffect(() => {
  let interval = setInterval(() => {
    setSeconds(s => s + 1);
  }, 1000);
  
  return () => clearInterval(interval); // Cleanup
}, [isActive]);

// 2. Event listener
useEffect(() => {
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []); // Empty array = runs once

// 3. Data fetching
useEffect(() => {
  if (loading) {
    fetchData().then(setData).catch(setError);
  }
}, [loading]);`}</code>
        </pre>
      </div>

      {/* Timer Demo */}
      <div className="bg-green-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 text-green-800">
          Timer with useEffect
        </h3>
        
        <div className="text-center mb-6">
          <div className="text-5xl font-bold text-green-600 mb-2 font-mono">
            {formatTime(seconds)}
          </div>
          <p className="text-gray-600">
            Timer: {isActive ? 'Running' : 'Stopped'}
          </p>
        </div>

        <div className="flex justify-center gap-3 flex-wrap">
          <button
            onClick={toggleTimer}
            className={`px-4 py-2 rounded-lg transition-colors font-medium ${
              isActive 
                ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {isActive ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={resetTimer}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
          >
            Reset
          </button>
        </div>

        <div className="mt-4 p-3 bg-white rounded-lg text-sm text-gray-600">
          <p><strong>Console logs:</strong> Open browser console to see useEffect lifecycle logs</p>
        </div>
      </div>

      {/* Data Fetching Demo */}
      <div className="bg-yellow-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 text-yellow-800">
          Data Fetching Simulation
        </h3>
        
        <button
          onClick={startDataFetch}
          disabled={loading}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 disabled:bg-gray-400 transition-colors font-medium mb-4"
        >
          {loading ? 'Fetching...' : 'Fetch Data'}
        </button>

        <div className="space-y-3">
          {loading && (
            <div className="p-3 bg-yellow-100 border border-yellow-300 rounded-lg">
              <p className="text-yellow-800">⏳ Loading data...</p>
            </div>
          )}
          
          {data && (
            <div className="p-3 bg-green-100 border border-green-300 rounded-lg">
              <p className="text-green-800">✅ {data}</p>
            </div>
          )}
          
          {error && (
            <div className="p-3 bg-red-100 border border-red-300 rounded-lg">
              <p className="text-red-800">❌ {error}</p>
            </div>
          )}
        </div>
      </div>

      {/* Window Size Tracking */}
      <div className="bg-purple-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 text-purple-800">
          Window Size Tracking
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-600">
              {windowSize.width}px
            </div>
            <p className="text-sm text-gray-600">Width</p>
          </div>
          <div className="bg-white p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-600">
              {windowSize.height}px
            </div>
            <p className="text-sm text-gray-600">Height</p>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mt-3">
          Resize your browser window to see the useEffect in action!
        </p>
      </div>

      {/* useEffect Explanation */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          useEffect Key Concepts
        </h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">1. Dependency Array</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• <code>[]</code> - Runs only once (on mount)</li>
              <li>• <code>[dep1, dep2]</code> - Runs when dependencies change</li>
              <li>• No array - Runs after every render</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">2. Cleanup Function</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Prevents memory leaks</li>
              <li>• Runs before component unmounts</li>
              <li>• Runs before effect re-runs</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">3. Common Use Cases</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Data fetching and API calls</li>
              <li>• Setting up subscriptions</li>
              <li>• Timers and intervals</li>
              <li>• DOM manipulation</li>
              <li>• Event listeners</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
