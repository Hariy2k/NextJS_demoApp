'use client';

import UseStateCounter from '@/components/UseStateCounter';
import UseEffectDemo from '@/components/UseEffectDemo';
import UseEffectPatterns from '@/components/UseEffectPatterns';
import UseEffectUsers from '@/components/UseEffectUsers';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            React Hooks Demo
          </h1>
          <p className="text-gray-600">
            Simple demonstrations of useState and useEffect hooks
          </p>
        </header>

        <main className="space-y-8">
          <UseStateCounter />
          <UseEffectDemo />
          <UseEffectPatterns />
        </main>
      </div>
    </div>
  );
}
