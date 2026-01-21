'use client';

import { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

export default function UseEffectDemo() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  // useEffect for window size tracking
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Set initial size
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup - remove event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty dependency array - runs only once

  // useEffect for API data fetching
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        // Simulate API call with dummy data
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const dummyUsers: User[] = [
          { id: 1, name: 'John Doe', email: 'john@example.com' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
          { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
          { id: 4, name: 'Alice Brown', email: 'alice@example.com' }
        ];
        
        setUsers(dummyUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array - runs only once

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">useEffect Demo</h2>
      
      {/* Window Size Display */}
      <div className="mb-6 p-4 bg-blue-50 rounded">
        <h3 className="font-semibold mb-2 text-blue-800">Window Size</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-gray-600">Width: </span>
            <span className="font-mono font-bold text-blue-600">{windowSize.width}px</span>
          </div>
          <div>
            <span className="text-gray-600">Height: </span>
            <span className="font-mono font-bold text-blue-600">{windowSize.height}px</span>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-2">Resize window to see useEffect in action</p>
      </div>

      {/* API Data Display */}
      <div className="p-4 bg-green-50 rounded">
        <h3 className="font-semibold mb-2 text-green-800">User List (from API)</h3>
        {loading ? (
          <p className="text-gray-600">Loading users...</p>
        ) : (
          <div className="space-y-2">
            {users.map(user => (
              <div key={user.id} className="p-2 bg-white rounded border border-gray-200">
                <div className="font-medium text-gray-800">{user.name}</div>
                <div className="text-sm text-gray-600">{user.email}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded text-sm text-gray-700">
        <p><strong>useEffect Hook:</strong></p>
        <p>• Handles side effects (API calls, event listeners)</p>
        <p>• Runs after component renders</p>
        <p>• Cleanup function prevents memory leaks</p>
        <p>• Dependency array controls when it runs</p>
      </div>
    </div>
  );
}
