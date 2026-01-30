'use client';

import { useState, useEffect } from 'react';

interface WeatherData {
  location: {
    name: string;
    country: string;
    coordinates: { lat: number; lon: number };
  };
  current: {
    temperature: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    description: string;
    icon: string;
    wind_speed: number;
    wind_direction: number;
    visibility: number;
    uv_index: number;
  };
  timestamp: string;
}

interface UserData {
  id: number;
  name: string;
  email: string;
  username: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export default function RouteThree() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState<string | null>(null);
  const [city, setCity] = useState('London');

  const [users, setUsers] = useState<UserData[]>([]);
  const [getLoading, setGetLoading] = useState(false);
  const [postLoading, setPostLoading] = useState(false);
  const [putLoading, setPutLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [dataError, setDataError] = useState<string | null>(null);
  const [operationResult, setOperationResult] = useState<string | null>(null);

  const fetchWeather = async (cityName: string) => {
    setWeatherLoading(true);
    setWeatherError(null);
    
    try {
      const response = await fetch(`/api/weather?city=${encodeURIComponent(cityName)}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch weather data');
      }
      
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      setWeatherError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setWeatherLoading(false);
    }
  };

  const fetchDatabaseData = async (type: 'users') => {
    setGetLoading(true);
    setDataError(null);
    setOperationResult(null);
    
    try {
      const response = await fetch(`/api/database?type=${type}`, {
        method: 'GET'
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch data');
      }
      
      const result = await response.json();
      setUsers(result.data);
      setOperationResult(`GET operation successful: Retrieved ${result.data.length} users`);
      
    } catch (error) {
      setDataError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setGetLoading(false);
    }
  };

  const createData = async (type: 'user' | 'post' | 'todo', data: any) => {
    setPostLoading(true);
    setDataError(null);
    setOperationResult(null);
    
    try {
      const response = await fetch('/api/database', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type, data }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create data');
      }
      
      const result = await response.json();
      setOperationResult(`POST operation successful: Created ${type} with ID ${result.data.id}`);
      
      // Refresh users list if we created a user
      if (type === 'user') {
        fetchDatabaseData('users');
      }
      
    } catch (error) {
      setDataError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setPostLoading(false);
    }
  };

  const updateData = async (type: 'user' | 'post' | 'todo', id: number, data: any) => {
    setPutLoading(true);
    setDataError(null);
    setOperationResult(null);
    
    try {
      const response = await fetch('/api/database', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type, id, data }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update data');
      }
      
      const result = await response.json();
      setOperationResult(`PUT operation successful: Updated ${type} with ID ${id}`);
      
      // Refresh users list if we updated a user
      if (type === 'user') {
        fetchDatabaseData('users');
      }
      
    } catch (error) {
      setDataError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setPutLoading(false);
    }
  };

  const deleteData = async (type: 'user' | 'post' | 'todo', id: number) => {
    setDeleteLoading(true);
    setDataError(null);
    setOperationResult(null);
    
    try {
      const response = await fetch(`/api/database?type=${type}&id=${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete data');
      }
      
      const result = await response.json();
      setOperationResult(`DELETE operation successful: Deleted ${type} with ID ${id}`);
      
      // Refresh users list if we deleted a user
      if (type === 'user') {
        fetchDatabaseData('users');
      }
      
    } catch (error) {
      setDataError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setDeleteLoading(false);
    }
  };

  const fetchAllData = () => {
    fetchWeather(city);
    fetchDatabaseData('users');
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">API Integration Demo</h1>
        <p className="text-gray-600">
          Real-time data from external APIs and database connections
        </p>
      </div>

      <div className="space-y-6">
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Weather API</h2>
          
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Enter city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="flex-1 px-3 py-2 border rounded"
            />
            <button 
              onClick={() => fetchWeather(city)}
              disabled={weatherLoading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
              {weatherLoading ? 'Loading...' : 'Get Weather'}
            </button>
          </div>

          {weatherError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {weatherError}
            </div>
          )}

          {weatherData && (
            <div className="bg-gray-50 p-4 rounded">
              <h3 className="font-semibold mb-2">
                {weatherData.location.name}, {weatherData.location.country}
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>Temperature: {weatherData.current.temperature}°C</div>
                <div>Feels like: {weatherData.current.feels_like}°C</div>
                <div>Humidity: {weatherData.current.humidity}%</div>
                <div>Wind Speed: {weatherData.current.wind_speed} m/s</div>
                <div>Pressure: {weatherData.current.pressure} hPa</div>
                <div>Description: {weatherData.current.description}</div>
                <div>Visibility: {weatherData.current.visibility} km</div>
                <div>Coordinates: {weatherData.location.coordinates.lat.toFixed(2)}, {weatherData.location.coordinates.lon.toFixed(2)}</div>
              </div>
            </div>
          )}
        </div>

        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Database API Operations</h2>
          
          {operationResult && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              {operationResult}
            </div>
          )}

          {dataError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {dataError}
            </div>
          )}

          <div className="space-y-6">
            {/* GET Operation */}
            <div className="border rounded p-3">
              <h3 className="font-semibold mb-2">GET Operation - Fetch Users</h3>
              <button 
                onClick={() => fetchDatabaseData('users')}
                disabled={getLoading}
                className="mb-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
              >
                {getLoading ? 'Loading...' : 'GET /api/database?type=users'}
              </button>
              
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {users.map((user) => (
                  <div key={user.id} className="bg-gray-50 p-3 rounded text-sm">
                    <div className="font-medium">{user.name} (@{user.username})</div>
                    <div className="text-gray-600">ID: {user.id} | Email: {user.email}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* POST Operation */}
            <div className="border rounded p-3">
              <h3 className="font-semibold mb-2">POST Operation - Create User</h3>
              <button 
                onClick={() => createData('user', {
                  name: 'John Doe',
                  username: 'johndoe',
                  email: 'john@example.com',
                  phone: '123-456-7890',
                  website: 'johndoe.com',
                  address: {
                    street: '123 Main St',
                    suite: 'Apt 4',
                    city: 'New York',
                    zipcode: '10001'
                  },
                  company: {
                    name: 'John Corp',
                    catchPhrase: 'Making things happen',
                    bs: 'synergize solutions'
                  }
                })}
                disabled={postLoading}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
              >
                {postLoading ? 'Loading...' : 'POST /api/database (Create User)'}
              </button>
            </div>

            {/* PUT Operation */}
            <div className="border rounded p-3">
              <h3 className="font-semibold mb-2">PUT Operation - Update User</h3>
              <div className="mb-2">
                <input
                  type="number"
                  placeholder="User ID"
                  id="updateUserId"
                  className="mr-2 px-2 py-1 border rounded"
                  min="1"
                  max="10"
                />
                <button 
                  onClick={() => {
                    const input = document.getElementById('updateUserId') as HTMLInputElement;
                    const userId = parseInt(input.value);
                    if (userId && userId > 0) {
                      updateData('user', userId, {
                        name: 'Updated Name',
                        email: 'updated@example.com'
                      });
                    }
                  }}
                  disabled={putLoading}
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:bg-gray-400"
                >
                  {putLoading ? 'Loading...' : 'PUT /api/database (Update User)'}
                </button>
              </div>
              <div className="text-xs text-gray-600">Enter a user ID (1-10) to update</div>
            </div>

            {/* DELETE Operation */}
            <div className="border rounded p-3">
              <h3 className="font-semibold mb-2">DELETE Operation - Delete User</h3>
              <div className="mb-2">
                <input
                  type="number"
                  placeholder="User ID"
                  id="deleteUserId"
                  className="mr-2 px-2 py-1 border rounded"
                  min="1"
                  max="10"
                />
                <button 
                  onClick={() => {
                    const input = document.getElementById('deleteUserId') as HTMLInputElement;
                    const userId = parseInt(input.value);
                    if (userId && userId > 0) {
                      deleteData('user', userId);
                    }
                  }}
                  disabled={deleteLoading}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-400"
                >
                  {deleteLoading ? 'Loading...' : 'DELETE /api/database (Delete User)'}
                </button>
              </div>
              <div className="text-xs text-gray-600">Enter a user ID (1-10) to delete</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
