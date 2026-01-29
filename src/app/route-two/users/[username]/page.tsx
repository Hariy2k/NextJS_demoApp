import Link from 'next/link';
import UserProfileContent from './UserProfileContent';

interface UserProfilePageProps {
  params: Promise<{
    username: string;
  }>;
}

// Mock user data
const users = {
  johndoe: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Full-stack developer passionate about React and Next.js',
    avatar: '👨‍💻',
    posts: 42,
    followers: 1234,
    following: 567,
    joined: 'January 2023'
  },
  janedoe: {
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    bio: 'UI/UX designer creating beautiful web experiences',
    avatar: '👩‍🎨',
    posts: 28,
    followers: 892,
    following: 234,
    joined: 'March 2023'
  },
  mike: {
    name: 'Mike Johnson',
    email: 'mike@example.com',
    bio: 'DevOps engineer specializing in cloud infrastructure',
    avatar: '👨‍🔧',
    posts: 15,
    followers: 456,
    following: 189,
    joined: 'June 2023'
  }
};

export default async function UserProfilePage({ params }: UserProfilePageProps) {
  // Await the params to get the actual values
  const resolvedParams = await params;
  const username = resolvedParams.username;
  
  // Debug logging to check the params structure
  console.log('Resolved params:', resolvedParams);
  console.log('Username extracted:', username);
  
  const user = users[username as keyof typeof users];
  const isKnownUser = !!user;

  // Debug logging to check what's happening
  console.log('User object found:', user);
  console.log('Is known user:', isKnownUser);
  console.log('Available users:', Object.keys(users));

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <nav className="mb-8">
          <Link 
            href="/route-two"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Routing Demo
          </Link>
        </nav>

        {/* Route Info */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">User Profile Route</h1>
          <div className="bg-green-50 p-4 rounded-lg mb-4">
            <p className="text-sm text-green-800">
              <strong>Current Route:</strong> /route-two/users/{username}
            </p>
            <p className="text-sm text-green-800">
              <strong>Username Parameter:</strong> {username}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">📁 File Structure:</h3>
              <pre className="text-sm bg-gray-100 p-3 rounded">
{`app/
└── route-two/
    └── users/
        └── [username]/
            └── page.tsx`}
              </pre>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">💻 Code:</h3>
              <pre className="text-sm bg-gray-100 p-3 rounded">
{`export default function UserProfile({ params }) {
  return <div>User: {params.username}</div>
}`}
              </pre>
            </div>
          </div>
        </div>

        {/* User Profile */}
        {isKnownUser ? (
          <UserProfileContent username={username} user={user} />
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center py-8">
              <div className="text-6xl mb-4">👤</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">User Not Found</h2>
              <p className="text-gray-600 mb-6">
                The user "{username}" doesn't exist in our demo database.
              </p>
              <div className="bg-yellow-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-yellow-800">
                  <strong>Try these usernames:</strong> johndoe, janedoe, mike
                </p>
              </div>
              <Link 
                href="/route-two"
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Back to Users
              </Link>
            </div>
          </div>
        )}

        {/* Quick Navigation */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick User Navigation</h3>
          <div className="flex flex-wrap gap-2">
            {Object.keys(users).map((slug) => (
              <Link 
                key={slug}
                href={`/route-two/users/${slug}`}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  slug === username 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                @{slug}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
