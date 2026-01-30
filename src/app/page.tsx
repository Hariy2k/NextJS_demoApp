'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Next.js Learning Hub
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Master Next.js concepts through interactive examples and demonstrations
          </p>
        </header>

        <main className="grid md:grid-cols-3 gap-8">
          {/* React Hooks Section */}
          <section className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                React Hooks
              </h2>
              <p className="text-gray-600 mb-6">
                Learn useState, useEffect, and other React hooks with interactive examples. 
                Perfect for understanding component state management and side effects.
              </p>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-sm text-gray-600">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                useState Counter Demo
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                useEffect Patterns (Once, Every Render, Dependencies)
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Window Size & API Data Examples
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                User Management with State Changes
              </div>
            </div>

            <Link 
              href="/route-one"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Explore React Hooks
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </section>

          {/* Next.js Routing Section */}
          <section className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Next.js Routing
              </h2>
              <p className="text-gray-600 mb-6">
                Master Next.js App Router with dynamic routes, slugs, nested routing, 
                and advanced routing patterns for modern web applications.
              </p>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-sm text-gray-600">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                Basic Navigation & Route Groups
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                Dynamic Routes with [slug] patterns
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                Nested Routes [category]/[product]
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                Route Parameters & Query Strings
              </div>
            </div>

            <Link 
              href="/route-two"
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
            >
              Explore Routing
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </section>

          {/* API Integration Section */}
          <section className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="mb-6">
              <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                API Integration
              </h2>
              <p className="text-gray-600 mb-6">
                Learn how to build and consume REST APIs with Next.js. 
                Practice CRUD operations, external API calls, and database connections.
              </p>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-sm text-gray-600">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                Weather API Integration (OpenWeatherMap)
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                CRUD Operations (GET, POST, PUT, DELETE)
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                Mock Database with Real-time Updates
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                Error Handling & Loading States
              </div>
            </div>

            <Link 
              href="/route-three"
              className="inline-flex items-center px-6 py-3 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors"
            >
              Explore APIs
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </section>
        </main>

        {/* Quick Navigation */}
        <section className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Navigation</h3>
          <div className="flex flex-wrap gap-3">
            <Link 
              href="/route-one"
              className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
            >
              React Hooks Demo
            </Link>
            <Link 
              href="/route-two"
              className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium"
            >
              Routing Demo
            </Link>
            <Link 
              href="/route-three"
              className="px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors text-sm font-medium"
            >
              API Integration Demo
            </Link>
            <Link 
              href="/route-two/products/laptop"
              className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm font-medium"
            >
              Example: Product Slug
            </Link>
            <Link 
              href="/route-two/electronics/phone"
              className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors text-sm font-medium"
            >
              Example: Nested Route
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
