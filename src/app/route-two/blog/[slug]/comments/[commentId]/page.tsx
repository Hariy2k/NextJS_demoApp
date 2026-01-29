import Link from 'next/link';

interface BlogCommentPageProps {
  params: Promise<{
    slug: string;
    commentId: string;
  }>;
}

// Mock blog posts and comments data
const blogPosts = {
  'nextjs-tutorial': {
    title: 'Complete Next.js Tutorial',
    author: 'John Doe',
    date: '2024-01-15',
    content: 'Learn everything about Next.js from basics to advanced concepts.',
    comments: {
      '1': {
        author: 'Alice Smith',
        date: '2024-01-16',
        content: 'Great tutorial! Very helpful for beginners.',
        likes: 24
      },
      '2': {
        author: 'Bob Johnson',
        date: '2024-01-17',
        content: 'The examples are clear and easy to follow.',
        likes: 18
      },
      '3': {
        author: 'Carol White',
        date: '2024-01-18',
        content: 'Can you add more advanced topics?',
        likes: 12
      }
    }
  },
  'react-hooks': {
    title: 'Understanding React Hooks',
    author: 'Jane Doe',
    date: '2024-01-10',
    content: 'Deep dive into useState, useEffect, and custom hooks.',
    comments: {
      '1': {
        author: 'David Brown',
        date: '2024-01-11',
        content: 'Best explanation of hooks I have read!',
        likes: 45
      },
      '2': {
        author: 'Emma Davis',
        date: '2024-01-12',
        content: 'The custom hooks section is amazing.',
        likes: 32
      }
    }
  },
  'typescript-guide': {
    title: 'TypeScript for Beginners',
    author: 'Mike Johnson',
    date: '2024-01-05',
    content: 'Learn TypeScript from scratch with practical examples.',
    comments: {
      '1': {
        author: 'Frank Wilson',
        date: '2024-01-06',
        content: 'Perfect introduction to TypeScript!',
        likes: 28
      },
      '2': {
        author: 'Grace Lee',
        date: '2024-01-07',
        content: 'The type system explanation is very clear.',
        likes: 19
      },
      '3': {
        author: 'Henry Taylor',
        date: '2024-01-08',
        content: 'More advanced examples would be great.',
        likes: 15
      },
      '4': {
        author: 'Iris Martinez',
        date: '2024-01-09',
        content: 'Helped me understand generics better.',
        likes: 22
      }
    }
  }
};

export default async function BlogCommentPage({ params }: BlogCommentPageProps) {
  // Await the params to get the actual values
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const commentId = resolvedParams.commentId;
  
  const blogPost = blogPosts[slug as keyof typeof blogPosts];
  const comment = blogPost?.comments[commentId as keyof typeof blogPost.comments];
  const isValidRoute = blogPost && comment;

  // Debug logging
  console.log('Slug:', slug);
  console.log('Comment ID:', commentId);
  console.log('Blog post:', blogPost);
  console.log('Comment:', comment);
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
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Deeply Nested Dynamic Routes</h1>
          <div className="bg-orange-50 p-4 rounded-lg mb-4">
            <p className="text-sm text-orange-800">
              <strong>Current Route:</strong> /route-two/blog/{slug}/comments/{commentId}
            </p>
            <p className="text-sm text-orange-800">
              <strong>Blog Slug Parameter:</strong> {slug}
            </p>
            <p className="text-sm text-orange-800">
              <strong>Comment ID Parameter:</strong> {commentId}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">📁 File Structure:</h3>
              <pre className="text-sm bg-gray-100 p-3 rounded">
{`app/
└── route-two/
    └── blog/
        └── [slug]/
            └── comments/
                └── [commentId]/
                    └── page.tsx`}
              </pre>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">💻 Code:</h3>
              <pre className="text-sm bg-gray-100 p-3 rounded">
{`export default function CommentPage({ params }) {
  return (
    <div>
      Blog: {params.slug}<br/>
      Comment: {params.commentId}
    </div>
  )
}`}
              </pre>
            </div>
          </div>
        </div>

        {/* Comment Display */}
        {isValidRoute ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            {/* Blog Post Context */}
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <h2 className="text-xl font-semibold text-blue-800 mb-2">Blog Post</h2>
              <h3 className="text-lg font-medium text-blue-700 mb-1">{blogPost.title}</h3>
              <p className="text-sm text-blue-600">
                By {blogPost.author} • {blogPost.date}
              </p>
            </div>

            {/* Comment */}
            <div className="border-l-4 border-orange-400 pl-4">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Comment #{commentId}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-orange-600">❤️ {comment.likes}</span>
                  </div>
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  <strong>{comment.author}</strong> • {comment.date}
                </div>
                <p className="text-gray-700 text-lg">{comment.content}</p>
              </div>

              <div className="flex gap-3">
                <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm">
                  ❤️ Like
                </button>
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm">
                  💬 Reply
                </button>
                <Link 
                  href={`/route-two/blog/${slug}`}
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                >
                  📄 View All Comments
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center py-8">
              <div className="text-6xl mb-4">💬</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Comment Not Found</h2>
              <p className="text-gray-600 mb-6">
                Comment #{commentId} for blog post "{slug}" doesn't exist.
              </p>
              <div className="bg-yellow-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-yellow-800">
                  <strong>Available combinations:</strong><br/>
                  nextjs-tutorial/comments/1, nextjs-tutorial/comments/2, nextjs-tutorial/comments/3<br/>
                  react-hooks/comments/1, react-hooks/comments/2<br/>
                  typescript-guide/comments/1, typescript-guide/comments/2, typescript-guide/comments/3, typescript-guide/comments/4
                </p>
              </div>
              <Link 
                href="/route-two"
                className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                Back to Blog Demo
              </Link>
            </div>
          </div>
        )}

        {/* Navigation Examples */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Explore Blog Routes</h3>
          
          <div className="mb-6">
            <h4 className="font-medium text-gray-700 mb-2">Blog Posts:</h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {Object.keys(blogPosts).map((slugKey) => (
                <Link 
                  key={slugKey}
                  href={`/route-two/blog/${slugKey}`}
                  className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                    slugKey === slug 
                      ? 'bg-orange-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {slugKey}
                </Link>
              ))}
            </div>
          </div>

          {blogPost && (
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Comments in this post:</h4>
              <div className="flex flex-wrap gap-2">
                {Object.keys(blogPost.comments).map((commentIdKey) => (
                  <Link 
                    key={commentIdKey}
                    href={`/route-two/blog/${slug}/comments/${commentIdKey}`}
                    className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                      commentIdKey === commentId 
                        ? 'bg-orange-600 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    #{commentIdKey}
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
