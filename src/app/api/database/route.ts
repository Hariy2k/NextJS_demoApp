import { NextRequest, NextResponse } from 'next/server';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://demo:demo@cluster.mongodb.net/demo';
const SAMPLE_API_URL = 'https://jsonplaceholder.typicode.com';

interface User {
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
    geo: {
      lat: string;
      lng: string;
    };
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

let mockUsers: User[] = [
  {
    id: 1,
    name: 'Leanne Graham',
    email: 'Sincere@april.biz',
    username: 'Bret',
    phone: '1-770-736-8031 x56442',
    website: 'hildegard.org',
    address: {
      street: 'Kulas Light',
      suite: 'Apt. 556',
      city: 'Gwenborough',
      zipcode: '92998-3874',
      geo: { lat: '-37.3159', lng: '81.1496' }
    },
    company: {
      name: 'Romaguera-Crona',
      catchPhrase: 'Multi-layered client-server neural-net',
      bs: 'harness real-time e-markets'
    }
  },
  {
    id: 2,
    name: 'Ervin Howell',
    email: 'Shanna@melissa.tv',
    username: 'Antonette',
    phone: '010-692-6593 x09125',
    website: 'anastasia.net',
    address: {
      street: 'Victor Plains',
      suite: 'Suite 879',
      city: 'Wisokyburgh',
      zipcode: '90566-7771',
      geo: { lat: '-43.9509', lng: '-34.4618' }
    },
    company: {
      name: 'Deckow-Crist',
      catchPhrase: 'Proactive didactic contingency',
      bs: 'synergize scalable supply-chains'
    }
  }
];

let mockPosts: Post[] = [
  { id: 1, userId: 1, title: 'Sample Post 1', body: 'This is a sample post content' },
  { id: 2, userId: 2, title: 'Sample Post 2', body: 'Another sample post content' }
];

let mockTodos: Todo[] = [
  { id: 1, userId: 1, title: 'Sample Todo 1', completed: false },
  { id: 2, userId: 2, title: 'Sample Todo 2', completed: true }
];

let nextUserId = 3;
let nextPostId = 3;
let nextTodoId = 3;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'users';
    const id = searchParams.get('id');

    let data;

    switch (type) {
      case 'users':
        if (id) {
          const user = mockUsers.find(u => u.id === parseInt(id));
          if (!user) {
            return NextResponse.json(
              { error: 'User not found' },
              { status: 404 }
            );
          }
          data = user;
        } else {
          data = mockUsers;
        }
        break;
      
      case 'posts':
        if (id) {
          const post = mockPosts.find(p => p.id === parseInt(id));
          if (!post) {
            return NextResponse.json(
              { error: 'Post not found' },
              { status: 404 }
            );
          }
          data = post;
        } else {
          data = mockPosts;
        }
        break;
      
      case 'todos':
        if (id) {
          const todo = mockTodos.find(t => t.id === parseInt(id));
          if (!todo) {
            return NextResponse.json(
              { error: 'Todo not found' },
              { status: 404 }
            );
          }
          data = todo;
        } else {
          data = mockTodos;
        }
        break;
      
      case 'posts-by-user':
        const userId = searchParams.get('userId');
        if (!userId) {
          return NextResponse.json(
            { error: 'userId parameter is required for posts-by-user' },
            { status: 400 }
          );
        }
        data = mockPosts.filter(p => p.userId === parseInt(userId));
        break;
      
      case 'todos-by-user':
        const todoUserId = searchParams.get('userId');
        if (!todoUserId) {
          return NextResponse.json(
            { error: 'userId parameter is required for todos-by-user' },
            { status: 400 }
          );
        }
        data = mockTodos.filter(t => t.userId === parseInt(todoUserId));
        break;
      
      default:
        return NextResponse.json(
          { error: 'Invalid type. Use: users, posts, todos, posts-by-user, todos-by-user' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      data,
      type,
      timestamp: new Date().toISOString(),
      cached: false
    });

  } catch (error) {
    console.error('Database API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data } = body;

    if (!type || !data) {
      return NextResponse.json(
        { error: 'Both type and data are required' },
        { status: 400 }
      );
    }

    let result;

    switch (type) {
      case 'user':
        const newUser: User = {
          id: nextUserId++,
          ...data,
          address: data.address || {
            street: '',
            suite: '',
            city: '',
            zipcode: '',
            geo: { lat: '0', lng: '0' }
          },
          company: data.company || {
            name: '',
            catchPhrase: '',
            bs: ''
          }
        };
        mockUsers.push(newUser);
        result = newUser;
        break;
      
      case 'post':
        const newPost: Post = {
          id: nextPostId++,
          ...data
        };
        mockPosts.push(newPost);
        result = newPost;
        break;
      
      case 'todo':
        const newTodo: Todo = {
          id: nextTodoId++,
          ...data
        };
        mockTodos.push(newTodo);
        result = newTodo;
        break;
      
      default:
        return NextResponse.json(
          { error: 'Invalid type. Use: user, post, todo' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      data: result,
      message: `${type} created successfully`,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('POST Database API Error:', error);
    return NextResponse.json(
      { error: 'Failed to create data' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, id, data } = body;

    if (!type || !id || !data) {
      return NextResponse.json(
        { error: 'type, id, and data are required' },
        { status: 400 }
      );
    }

    let result;
    const index = parseInt(id.toString());

    switch (type) {
      case 'user':
        const userIndex = mockUsers.findIndex(u => u.id === index);
        if (userIndex === -1) {
          return NextResponse.json(
            { error: 'User not found' },
            { status: 404 }
          );
        }
        mockUsers[userIndex] = { ...mockUsers[userIndex], ...data };
        result = mockUsers[userIndex];
        break;
      
      case 'post':
        const postIndex = mockPosts.findIndex(p => p.id === index);
        if (postIndex === -1) {
          return NextResponse.json(
            { error: 'Post not found' },
            { status: 404 }
          );
        }
        mockPosts[postIndex] = { ...mockPosts[postIndex], ...data };
        result = mockPosts[postIndex];
        break;
      
      case 'todo':
        const todoIndex = mockTodos.findIndex(t => t.id === index);
        if (todoIndex === -1) {
          return NextResponse.json(
            { error: 'Todo not found' },
            { status: 404 }
          );
        }
        mockTodos[todoIndex] = { ...mockTodos[todoIndex], ...data };
        result = mockTodos[todoIndex];
        break;
      
      default:
        return NextResponse.json(
          { error: 'Invalid type. Use: user, post, todo' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      data: result,
      message: `${type} updated successfully`,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('PUT Database API Error:', error);
    return NextResponse.json(
      { error: 'Failed to update data' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const id = searchParams.get('id');

    if (!type || !id) {
      return NextResponse.json(
        { error: 'Both type and id are required' },
        { status: 400 }
      );
    }

    const index = parseInt(id.toString());
    let deletedItem;

    switch (type) {
      case 'user':
        const userIndex = mockUsers.findIndex(u => u.id === index);
        if (userIndex === -1) {
          return NextResponse.json(
            { error: 'User not found' },
            { status: 404 }
          );
        }
        deletedItem = mockUsers[userIndex];
        mockUsers.splice(userIndex, 1);
        break;
      
      case 'post':
        const postIndex = mockPosts.findIndex(p => p.id === index);
        if (postIndex === -1) {
          return NextResponse.json(
            { error: 'Post not found' },
            { status: 404 }
          );
        }
        deletedItem = mockPosts[postIndex];
        mockPosts.splice(postIndex, 1);
        break;
      
      case 'todo':
        const todoIndex = mockTodos.findIndex(t => t.id === index);
        if (todoIndex === -1) {
          return NextResponse.json(
            { error: 'Todo not found' },
            { status: 404 }
          );
        }
        deletedItem = mockTodos[todoIndex];
        mockTodos.splice(todoIndex, 1);
        break;
      
      default:
        return NextResponse.json(
          { error: 'Invalid type. Use: user, post, todo' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      data: deletedItem,
      message: `${type} with id ${id} deleted successfully`,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('DELETE Database API Error:', error);
    return NextResponse.json(
      { error: 'Failed to delete data' },
      { status: 500 }
    );
  }
}
