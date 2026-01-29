import Link from 'next/link';

interface CategoryProductPageProps {
  params: Promise<{
    category: string;
    product: string;
  }>;
}

// Mock data for categories and products
const categoryData: { [key: string]: {
  name: string;
  products: { [key: string]: {
    name: string;
    price: string;
    description: string;
    specs: string[];
  }};
}} = {
  electronics: {
    name: 'Electronics',
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

export default async function CategoryProductPage({ params }: CategoryProductPageProps) {
  // Await the params to get the actual values
  const resolvedParams = await params;
  const category = resolvedParams.category;
  const product = resolvedParams.product;
  
  const categoryInfo = categoryData[category];
  const productInfo = categoryInfo?.products[product];
  const isValidRoute = categoryInfo && productInfo;

  // Debug logging
  console.log('Category:', category);
  console.log('Product:', product);
  console.log('Category info:', categoryInfo);
  console.log('Product info:', productInfo);
  console.log('Valid route:', isValidRoute);

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
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Nested Dynamic Routes</h1>
          <div className="bg-purple-50 p-4 rounded-lg mb-4">
            <p className="text-sm text-purple-800">
              <strong>Current Route:</strong> /route-two/{category}/{product}
            </p>
            <p className="text-sm text-purple-800">
              <strong>Category Parameter:</strong> {category}
            </p>
            <p className="text-sm text-purple-800">
              <strong>Product Parameter:</strong> {product}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">📁 File Structure:</h3>
              <pre className="text-sm bg-gray-100 p-3 rounded">
{`app/
└── route-two/
    └── [category]/
        └── [product]/
            └── page.tsx`}
              </pre>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">💻 Code:</h3>
              <pre className="text-sm bg-gray-100 p-3 rounded">
{`export default async function Page({ params }) {
  const resolvedParams = await params;
  return (
    <div>
      Category: {resolvedParams.category}<br/>
      Product: {resolvedParams.product}
    </div>
  )
}`}
              </pre>
            </div>
          </div>
        </div>

        {/* Product Display */}
        {isValidRoute ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                {categoryInfo.name}
              </span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{productInfo.name}</h2>
            <div className="text-2xl font-bold text-green-600 mb-4">{productInfo.price}</div>
            <p className="text-gray-600 mb-6">{productInfo.description}</p>
            
            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-3">Specifications:</h3>
              <ul className="space-y-2">
                {productInfo.specs.map((spec: string, index: number) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    {spec}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-4">
              <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Buy Now
              </button>
              <Link 
                href={`/route-two/${category}`}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                More {categoryInfo.name}
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center py-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
              <p className="text-gray-600 mb-6">
                The product "{product}" in category "{category}" doesn't exist.
              </p>
              <div className="bg-yellow-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-yellow-800">
                  <strong>Available combinations:</strong><br/>
                  electronics/phone, electronics/laptop, electronics/headphones<br/>
                  clothing/shirt, clothing/jeans<br/>
                  books/novel, books/textbook
                </p>
              </div>
              <Link 
                href="/route-two"
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Back to Categories
              </Link>
            </div>
          </div>
        )}

        {/* Navigation Examples */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Explore Other Routes</h3>
          
          <div className="mb-6">
            <h4 className="font-medium text-gray-700 mb-2">Categories:</h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {Object.keys(categoryData).map((catKey) => (
                <Link 
                  key={catKey}
                  href={`/route-two/${catKey}`}
                  className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                    catKey === category 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {catKey}
                </Link>
              ))}
            </div>
          </div>

          {categoryInfo && (
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Products in {categoryInfo.name}:</h4>
              <div className="flex flex-wrap gap-2">
                {Object.keys(categoryInfo.products).map((productKey) => (
                  <Link 
                    key={productKey}
                    href={`/route-two/${category}/${productKey}`}
                    className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                      productKey === product 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
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
