import Link from 'next/link';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Mock product data
const products = {
  laptop: {
    name: 'Premium Laptop',
    price: '$1,299',
    description: 'High-performance laptop with 16GB RAM and 512GB SSD',
    features: ['Intel Core i7', '16GB RAM', '512GB SSD', '15.6" Display']
  },
  phone: {
    name: 'Smartphone Pro',
    price: '$899',
    description: 'Latest smartphone with advanced camera system',
    features: ['6.1" Display', '128GB Storage', '5G Enabled', 'Wireless Charging']
  },
  tablet: {
    name: 'Tablet Plus',
    price: '$599',
    description: 'Versatile tablet for work and entertainment',
    features: ['10.9" Display', '64GB Storage', 'Apple Pencil Support', 'All-Day Battery']
  }
};

export default async function ProductPage({ params }: ProductPageProps) {
  // Await the params to get the actual values
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const product = products[slug as keyof typeof products];
  const isKnownProduct = !!product;
  const isEmptySlug = !slug || slug.trim() === '';

  // Debug logging to check what's happening
  console.log('Slug:', slug);
  console.log('Product:', product);
  console.log('Is known product:', isKnownProduct);
  console.log('Available products:', Object.keys(products));

  // Handle empty slug case
  if (isEmptySlug) {
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

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center py-8">
              <div className="text-6xl mb-4">📦</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">No Product Specified</h2>
              <p className="text-gray-600 mb-6">
                Please select a product from the available options below.
              </p>
              
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-blue-800 mb-3">
                  <strong>Available Products:</strong>
                </p>
                <div className="flex justify-center gap-2">
                  {Object.keys(products).map((productSlug) => (
                    <Link 
                      key={productSlug}
                      href={`/route-two/products/${productSlug}`}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      {productSlug}
                    </Link>
                  ))}
                </div>
              </div>
              
              <Link 
                href="/route-two"
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Back to All Examples
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Dynamic Slug Route</h1>
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="text-sm text-blue-800">
              <strong>Current Route:</strong> /route-two/products/{slug}
            </p>
            <p className="text-sm text-blue-800">
              <strong>Slug Parameter:</strong> {slug}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">📁 File Structure:</h3>
              <pre className="text-sm bg-gray-100 p-3 rounded">
{`app/
└── route-two/
    └── products/
        └── [slug]/
            └── page.tsx`}
              </pre>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">💻 Code:</h3>
              <pre className="text-sm bg-gray-100 p-3 rounded">
{`export default function ProductPage({ params }) {
  return <div>Slug: {params.slug}</div>
}`}
              </pre>
            </div>
          </div>
        </div>

        {/* Product Display */}
        {isKnownProduct ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h2>
            <div className="text-2xl font-bold text-green-600 mb-4">{product.price}</div>
            <p className="text-gray-600 mb-6">{product.description}</p>
            
            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-3">Key Features:</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-4">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Add to Cart
              </button>
              <Link 
                href="/route-two"
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Browse More Products
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center py-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
              <p className="text-gray-600 mb-6">
                The product "{slug}" doesn't exist in our demo database.
              </p>
              <div className="bg-yellow-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-yellow-800">
                  <strong>Try these products:</strong> laptop, phone, tablet
                </p>
              </div>
              <Link 
                href="/route-two"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Back to Products
              </Link>
            </div>
          </div>
        )}

        {/* Additional Examples */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Try Other Product Slugs</h3>
          <div className="flex flex-wrap gap-2">
            {Object.keys(products).map((slugKey) => (
              <Link 
                key={slugKey}
                href={`/route-two/products/${slugKey}`}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  slugKey === slug 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {slugKey}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
