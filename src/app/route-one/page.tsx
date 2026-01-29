'use client';

import { useRouter } from 'next/navigation';
import UseStateCounter from '@/components/UseStateCounter';
import UseEffectDemo from '@/components/UseEffectDemo';
import UseEffectTimer from '@/components/TimerDemo';
import UseEffectPatterns from '@/components/UseEffectPatterns';
import Link from 'next/link';

export default function RouteOne() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                React Hooks Demo
              </h1>
              <p className="text-gray-600">
                Master useState, useEffect, and other React hooks
              </p>
            </div>
            <Link 
              href="/"
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </header>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-md p-2 mb-8 flex flex-wrap gap-2">
          <button 
            onClick={() => router.push('#counter')}
            className="px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium"
          >
            useState Counter
          </button>
          <button 
            onClick={() => router.push('#useeffect')}
            className="px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium"
          >
            useEffect Demo
          </button>
          <button 
            onClick={() => router.push('#user-management')}
            className="px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium"
          >
            User Management
          </button>
          <button 
            onClick={() => router.push('#patterns')}
            className="px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium"
          >
            useEffect Patterns
          </button>
        </div>

        {/* Hooks Components */}
        <main className="space-y-8">
          <section id="counter">
            <UseStateCounter />
          </section>
          
          <section id="useeffect">
            <UseEffectDemo />
          </section>
          
          <section id="user-management">
            <UseEffectTimer />
          </section>
          
          <section id="patterns">
            <UseEffectPatterns />
          </section>
        </main>

        {/* Footer Navigation */}
        <footer className="mt-12 bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Ready to learn Next.js Routing?</h3>
              <p className="text-sm text-gray-600">
                Explore dynamic routes, slugs, and advanced routing patterns
              </p>
            </div>
            <Link 
              href="/route-two"
              className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
            >
              Explore Routing →
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
