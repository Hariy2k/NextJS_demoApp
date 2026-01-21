'use client';

import { useEffect, useState } from 'react';

type User = {
  id: number;
  name: string;
};

export default function UseEffectUsers() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'Rahul' },
    { id: 2, name: 'Anita' },
    { id: 3, name: 'Vikram' }
  ]);

  const [newUser, setNewUser] = useState('');

  // Runs whenever users state changes
  useEffect(() => {
    console.log('Users list updated:', users);
  }, [users]);

  const addUser = () => {
    if (!newUser.trim()) return;

    setUsers((prev) => [
      ...prev,
      { id: Date.now(), name: newUser }
    ]);

    setNewUser('');
  };

  const deleteUser = (id: number) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">useEffect – Add / Delete Users</h2>

      <div className="mb-6">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newUser}
            placeholder="Enter user name"
            onChange={(e) => setNewUser(e.target.value)}
            className="flex-1 px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            onClick={addUser}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Add User
          </button>
        </div>

        <ul className="space-y-2">
          {users.map((user) => (
            <li key={user.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span className="font-medium text-black">{user.name}</span>
              <button 
                onClick={() => deleteUser(user.id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 bg-blue-50 rounded text-sm text-gray-700">
        <p><strong>useEffect with State Changes:</strong></p>
        <p>• Effect runs whenever users array changes</p>
        <p>• Console logs show when effect triggers</p>
        <p>• Dependency array [users] controls execution</p>
        <p>• Useful for debugging state changes</p>
      </div>
    </div>
  );
}
