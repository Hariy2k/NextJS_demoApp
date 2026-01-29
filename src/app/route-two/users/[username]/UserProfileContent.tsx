'use client';

import { useSearchParams } from 'next/navigation';

interface UserProfileContentProps {
  username: string;
  user: any;
}

export default function UserProfileContent({ username, user }: UserProfileContentProps) {
  const searchParams = useSearchParams();
  
  // Get query parameters
  const filter = searchParams.get('filter');
  const sort = searchParams.get('sort');
  const view = searchParams.get('view');
  const tab = searchParams.get('tab');
  
  // Collect all query parameters
  const allParams: { [key: string]: string } = {};
  searchParams.forEach((value, key) => {
    allParams[key] = value;
  });

  return (
    <>
      {/* Query Parameters Section */}
      <div className="bg-blue-50 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-blue-800 mb-3">🔍 Query Parameters</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-blue-700 mb-2">Individual Parameters:</h4>
            <div className="text-sm text-blue-600 space-y-1">
              <p><strong>filter:</strong> {filter || 'not set'}</p>
              <p><strong>sort:</strong> {sort || 'not set'}</p>
              <p><strong>view:</strong> {view || 'not set'}</p>
              <p><strong>tab:</strong> {tab || 'not set'}</p>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-blue-700 mb-2">All Parameters:</h4>
            <div className="text-sm text-blue-600">
              {Object.keys(allParams).length > 0 ? (
                <pre className="bg-blue-100 p-2 rounded">
                  {JSON.stringify(allParams, null, 2)}
                </pre>
              ) : (
                <p className="italic">No query parameters set</p>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-3 text-sm text-blue-700">
          <p><strong>Try these URLs:</strong></p>
          <div className="flex flex-wrap gap-2 mt-2">
            <a href={`/route-two/users/${username}?filter=posts&view=grid`} className="text-blue-600 hover:underline">
              ?filter=posts&view=grid
            </a>
            <a href={`/route-two/users/${username}?sort=newest&tab=activity`} className="text-blue-600 hover:underline">
              ?sort=newest&tab=activity
            </a>
            <a href={`/route-two/users/${username}?view=list&filter=all`} className="text-blue-600 hover:underline">
              ?view=list&filter=all
            </a>
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-start gap-6 mb-6">
          <div className="text-6xl">{user.avatar}</div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{user.name}</h2>
            <p className="text-gray-600 mb-2">@{username}</p>
            <p className="text-gray-700 mb-4">{user.bio}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        {/* Dynamic Content Based on Query Params */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-3">Content View</h3>
          {view === 'grid' ? (
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-800">{user.posts}</div>
                <div className="text-sm text-gray-600">Posts</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-800">{user.followers.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Followers</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-800">{user.following}</div>
                <div className="text-sm text-gray-600">Following</div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="font-medium">Posts</span>
                <span className="text-xl font-bold">{user.posts}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="font-medium">Followers</span>
                <span className="text-xl font-bold">{user.followers.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="font-medium">Following</span>
                <span className="text-xl font-bold">{user.following}</span>
              </div>
            </div>
          )}
        </div>

        {/* Tab Content Based on Query Param */}
        {tab && (
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-3">Active Tab: {tab}</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              {tab === 'activity' && <p>Showing user activity and recent actions...</p>}
              {tab === 'posts' && <p>Showing all posts by {user.name}...</p>}
              {tab === 'followers' && <p>Showing {user.followers.toLocaleString()} followers...</p>}
              {tab === 'following' && <p>Showing {user.following} users that {user.name} follows...</p>}
            </div>
          </div>
        )}

        {/* Filter Information */}
        {filter && (
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-3">Filter Applied: {filter}</h3>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p>Content is filtered to show only: <strong>{filter}</strong></p>
            </div>
          </div>
        )}

        {/* Sort Information */}
        {sort && (
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-3">Sort Order: {sort}</h3>
            <div className="bg-green-50 p-4 rounded-lg">
              <p>Content is sorted by: <strong>{sort}</strong></p>
            </div>
          </div>
        )}

        {/* Additional Info */}
        <div className="border-t pt-4">
          <p className="text-sm text-gray-600">
            <strong>Joined:</strong> {user.joined}
          </p>
        </div>

        <div className="flex gap-4 mt-6">
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Follow
          </button>
          <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
            Message
          </button>
        </div>
      </div>
    </>
  );
}
