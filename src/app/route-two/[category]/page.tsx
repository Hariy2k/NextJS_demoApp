import Link from 'next/link';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

// Mock data for categories and products
const categoryData = {
  electronics: {
    name: 'Electronics',
    description: 'Latest electronic devices and gadgets',
    products: {
      phone: {
        name: 'Smartphone Pro Max',
        price: '$1,199',
        description: 'Latest flagship smartphone with advanced features',
        specs: ['6.7" OLED Display', '256GB Storage', '5G', 'Triple Camera']
      },
      laptop: {
        name: 'UltraBook Pro',
        price: '$1,799',
        description: 'Premium ultrabook for professionals',
        specs: ['14" 4K Display', '32GB RAM', '1TB SSD', 'Intel i9']
      },
      headphones: {
        name: 'Wireless Headphones',
        price: '$299',
        description: 'Noise-cancelling premium headphones',
        specs: ['Active Noise Cancellation', '40hr Battery', 'Bluetooth 5.0', 'Hi-Res Audio']
      }
    }
  },
  clothing: {
    name: 'Clothing',
    description: 'Fashionable and comfortable clothing items',
    products: {
      shirt: {
        name: 'Premium Cotton Shirt',
        price: '$59',
        description: 'Comfortable and stylish dress shirt',
        specs: ['100% Cotton', 'Machine Washable', 'Multiple Colors', 'Classic Fit']
      },
      jeans: {
        name: 'Denim Jeans',
        price: '$89',
        description: 'Classic fit denim jeans',
        specs: ['Stretch Denim', 'Slim Fit', 'Durable', 'Classic Blue']
      }
    }
  },
  books: {
    name: 'Books',
    description: 'Educational and entertainment books',
    products: {
      novel: {
        name: 'Bestseller Novel',
        price: '$24.99',
        description: 'Gripping story that will keep you hooked',
        specs: ['400 Pages', 'Hardcover', 'Award Winner', 'Bestseller']
      },
      textbook: {
        name: 'Programming Guide',
        price: '$49.99',
        description: 'Comprehensive guide to modern programming',
        specs: ['600 Pages', 'Digital Version Included', 'Exercises', 'Code Examples']
      }
    }
  }
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  // Await the params to get the actual values
  const resolvedParams = await params;
  const category = resolvedParams.category;
  
  const categoryInfo = categoryData[category as keyof typeof categoryData];
  const isValidCategory = !!categoryInfo;

  // Debug logging
  console.log('Category:', category);
  console.log('Category info:', categoryInfo);
  console.log('Valid category:', isValidCategory);

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
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Category Route</h1>
          <div className="bg-purple-50 p-4 rounded-lg mb-4">
            <p className="text-sm text-purple-800">
              <strong>Current Route:</strong> /route-two/{category}
            </p>
            <p className="text-sm text-purple-800">
              <strong>Category Parameter:</strong> {category}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">📁 File Structure:</h3>
              <pre className="text-sm bg-gray-100 p-3 rounded">
{`app/
└── route-two/
    └── [category]/
        ├── page.tsx              # /route-two/[category]
        └── [product]/
            └── page.tsx          # /route-two/[category]/[product]`}
              </pre>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">💻 Code:</h3>
              <pre className="text-sm bg-gray-100 p-3 rounded">
{`export default async function CategoryPage({ params }) {
  const resolvedParams = await params;
  const category = resolvedParams.category;
  return <div>Category: {category}</div>
}`}
              </pre>
            </div>
          </div>
        </div>

        {/* Category Display */}
        {isValidCategory ? (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{categoryInfo.name}</h2>
              <p className="text-gray-600">{categoryInfo.description}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Products in {categoryInfo.name} ({Object.keys(categoryInfo.products).length})
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(categoryInfo.products).map(([productKey, product]) => (
                  <Link 
                    key={productKey}
                    href={`/route-two/${category}/${productKey}`}
                    className="block bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                  >
                    <h4 className="font-semibold text-gray-800 mb-2">{product.name}</h4>
                    <p className="text-green-600 font-medium mb-2">{product.price}</p>
                    <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                    <div className="text-sm text-blue-600 font-medium">
                      View Details →
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="text-center">
              <Link 
                href="/route-two"
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Browse All Categories
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="text-center py-8">
              <div className="text-6xl mb-4">📂</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Category Not Found</h2>
              <p className="text-gray-600 mb-6">
                The category "{category}" doesn't exist in our demo database.
              </p>
              <div className="bg-yellow-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-yellow-800">
                  <strong>Available categories:</strong> electronics, clothing, books
                </p>
              </div>
              <Link 
                href="/route-two"
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Back to All Categories
              </Link>
            </div>
          </div>
        )}

        {/* Navigation Examples */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Explore Categories</h3>
          <div className="flex flex-wrap gap-2">
            {Object.keys(categoryData).map((catKey) => (
              <Link 
                key={catKey}
                href={`/route-two/${catKey}`}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  catKey === category 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {catKey}
              </Link>
            ))}
          </div>
          
          {isValidCategory && (
            <div className="mt-6">
              <h4 className="font-medium text-gray-700 mb-2">Products in {categoryInfo.name}:</h4>
              <div className="flex flex-wrap gap-2">
                {Object.keys(categoryInfo.products).map((productKey) => (
                  <Link 
                    key={productKey}
                    href={`/route-two/${category}/${productKey}`}
                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm"
                  >
                    {productKey}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
