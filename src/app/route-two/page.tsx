
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RouteTwo() {
  const router = useRouter();

  const examples = [
    {
      title: "Dynamic Slug Routes",
      description: "Single parameter routes like /products/[slug]",
      path: "/route-two/products/laptop",
      color: "blue"
    },
    {
      title: "Nested Dynamic Routes", 
      description: "Multiple parameters like /category/[category]/product/[id]",
      path: "/route-two/electronics/phone",
      color: "purple"
    },
    {
      title: "User Profile Routes",
      description: "User-specific routes like /users/[username]",
      path: "/route-two/users/johndoe",
      color: "green"
    },
    {
      title: "Blog Post Routes",
      description: "Content routes like /blog/[slug]/comments/[commentId]",
      path: "/route-two/blog/nextjs-tutorial/comments/123",
      color: "orange"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Next.js Routing Demo
              </h1>
              <p className="text-gray-600">
                Master dynamic routes, slugs, and advanced routing patterns
              </p>
            </div>
            <div className="flex gap-2">
              <Link 
                href="/route-one"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                ← React Hooks
              </Link>
              <Link 
                href="/"
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                ← Home
              </Link>
            </div>
          </div>
        </header>

        {/* Introduction */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Understanding Next.js App Router</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">📁 File-Based Routing</h3>
              <p className="text-gray-600 text-sm">
                Next.js uses the file system to define routes. Each folder in the app directory becomes a route.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">🔄 Dynamic Routes</h3>
              <p className="text-gray-600 text-sm">
                Use brackets [param] to create dynamic routes that match any value.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">📊 Route Parameters</h3>
              <p className="text-gray-600 text-sm">
                Access route parameters using the params prop in your page components.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">🔗 Navigation</h3>
              <p className="text-gray-600 text-sm">
                Use Link component for client-side navigation or useRouter for programmatic navigation.
              </p>
            </div>
          </div>
        </section>

        {/* Route Examples */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Route Examples</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {examples.map((example, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className={`w-12 h-12 bg-${example.color}-100 rounded-lg flex items-center justify-center mb-4`}>
                  <svg className={`w-6 h-6 text-${example.color}-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{example.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{example.description}</p>
                <div className="flex items-center justify-between">
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded">{example.path}</code>
                  <Link 
                    href={example.path}
                    className={`px-4 py-2 bg-${example.color}-600 text-white rounded-lg hover:bg-${example.color}-700 transition-colors text-sm`}
                  >
                    Try It →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Query Parameters Demo */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">🔍 Query Parameters</h2>
          <div className="bg-yellow-50 p-4 rounded-lg mb-4">
            <p className="text-sm text-yellow-800 mb-2">
              <strong>What are Query Parameters?</strong>
            </p>
            <p className="text-sm text-yellow-600">
              Query parameters are key-value pairs added to URLs after a "?" to filter, sort, or customize content. 
              They're accessed using the useSearchParams hook in client components.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">📁 URL Structure:</h3>
              <pre className="text-sm bg-gray-100 p-3 rounded">
{`/route-two/users/[username]?key=value&another=value`}
              </pre>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">💻 Code Example:</h3>
              <pre className="text-sm bg-gray-100 p-3 rounded">
{`'use client';
import { useSearchParams } from 'next/navigation';

function Component() {
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter');
  const sort = searchParams.get('sort');
}`}
              </pre>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold text-gray-700 mb-3">🎯 Try These Query Parameter Examples:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium text-gray-600">User Profile with Query Params:</h4>
                <div className="space-y-1">
                  <a href="/route-two/users/johndoe?filter=posts&view=grid" className="block text-blue-600 hover:text-blue-800 text-sm">
                    /route-two/users/johndoe?filter=posts&view=grid
                  </a>
                  <a href="/route-two/users/johndoe?sort=newest&tab=activity" className="block text-blue-600 hover:text-blue-800 text-sm">
                    /route-two/users/johndoe?sort=newest&tab=activity
                  </a>
                  <a href="/route-two/users/johndoe?view=list&filter=all" className="block text-blue-600 hover:text-blue-800 text-sm">
                    /route-two/users/johndoe?view=list&filter=all
                  </a>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-gray-600">Common Query Parameters:</h4>
                <div className="text-sm text-gray-600">
                  <p><strong>filter:</strong> posts, comments, all</p>
                  <p><strong>sort:</strong> newest, oldest, popular</p>
                  <p><strong>view:</strong> grid, list, card</p>
                  <p><strong>tab:</strong> activity, posts, followers</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Available Options */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Try These Available Options</h2>
          
          <div className="space-y-6">
            {/* Products */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">📦 Products (Single Slug)</h3>
              <div className="flex flex-wrap gap-2">
                <Link href="/route-two/products/laptop" className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                  laptop
                </Link>
                <Link href="/route-two/products/phone" className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                  phone
                </Link>
                <Link href="/route-two/products/tablet" className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                  tablet
                </Link>
              </div>
            </div>

            {/* Category + Product */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">🏷️ Categories + Products (Nested)</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                <Link href="/route-two/electronics/phone" className="px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  electronics/phone
                </Link>
                <Link href="/route-two/electronics/laptop" className="px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  electronics/laptop
                </Link>
                <Link href="/route-two/electronics/headphones" className="px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  electronics/headphones
                </Link>
                <Link href="/route-two/clothing/shirt" className="px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  clothing/shirt
                </Link>
                <Link href="/route-two/clothing/jeans" className="px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  clothing/jeans
                </Link>
                <Link href="/route-two/books/novel" className="px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  books/novel
                </Link>
                <Link href="/route-two/books/textbook" className="px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  books/textbook
                </Link>
              </div>
            </div>

            {/* Users */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">👤 Users (Profiles)</h3>
              <div className="flex flex-wrap gap-2">
                <Link href="/route-two/users/johndoe" className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                  @johndoe
                </Link>
                <Link href="/route-two/users/janedoe" className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                  @janedoe
                </Link>
                <Link href="/route-two/users/mike" className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                  @mike
                </Link>
              </div>
            </div>

            {/* Blog Comments */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">💬 Blog Comments (Deeply Nested)</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                <Link href="/route-two/blog/nextjs-tutorial/comments/1" className="px-3 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors text-sm">
                  nextjs-tutorial/#1
                </Link>
                <Link href="/route-two/blog/nextjs-tutorial/comments/2" className="px-3 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors text-sm">
                  nextjs-tutorial/#2
                </Link>
                <Link href="/route-two/blog/nextjs-tutorial/comments/3" className="px-3 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors text-sm">
                  nextjs-tutorial/#3
                </Link>
                <Link href="/route-two/blog/react-hooks/comments/1" className="px-3 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors text-sm">
                  react-hooks/#1
                </Link>
                <Link href="/route-two/blog/react-hooks/comments/2" className="px-3 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors text-sm">
                  react-hooks/#2
                </Link>
                <Link href="/route-two/blog/typescript-guide/comments/1" className="px-3 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors text-sm">
                  typescript-guide/#1
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Code Examples */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Route Structure Examples</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-700 mb-2">📁 App Directory Structure:</h4>
              <pre className="text-sm text-gray-600 font-mono">
{`app/
├── route-two/
│   ├── page.tsx              # /route-two
│   ├── products/
│   │   └── [slug]/
│   │       └── page.tsx      # /route-two/products/[slug]
│   ├── [category]/
│   │   └── [product]/
│   │       └── page.tsx      # /route-two/[category]/[product]
│   ├── users/
│   │   └── [username]/
│   │       └── page.tsx      # /route-two/users/[username]
│   └── blog/
│       └── [slug]/
│           └── comments/
│               └── [commentId]/
│                   └── page.tsx  # /route-two/blog/[slug]/comments/[commentId]`}
              </pre>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-700 mb-2">💻 Accessing Route Parameters:</h4>
              <pre className="text-sm text-gray-600 font-mono">
{`// Single parameter
export default function ProductPage({ params }: { params: { slug: string } }) {
  return <div>Product: {params.slug}</div>
}

// Multiple parameters  
export default function CategoryProductPage({ params }: { 
  params: { category: string; product: string } 
}) {
  return (
    <div>
      Category: {params.category}<br/>
      Product: {params.product}
    </div>
  )
}`}
              </pre>
            </div>
          </div>
        </section>

        {/* Interactive Demo */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Try Custom Routes</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Slug:</label>
              <input 
                type="text" 
                placeholder="laptop"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    const value = (e.target as HTMLInputElement).value;
                    if (value) router.push(`/route-two/products/${value}`);
                  }
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username:</label>
              <input 
                type="text" 
                placeholder="johndoe"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    const value = (e.target as HTMLInputElement).value;
                    if (value) router.push(`/route-two/users/${value}`);
                  }
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Blog Post:</label>
              <input 
                type="text" 
                placeholder="nextjs-tutorial"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    const value = (e.target as HTMLInputElement).value;
                    if (value) router.push(`/route-two/blog/${value}/comments/1`);
                  }
                }}
              />
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-4">Type and press Enter to navigate to custom routes</p>
        </section>
      </div>
    </div>
  );
}
