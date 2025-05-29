'use client';

import { useRouter } from 'next/navigation';

export const Navigation = () => {
  const router = useRouter();

  const onNavigate = () => router.push('/');
  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">🍳</span>
            </div>
            <h1 className="text-xl font-bold text-gray-800">Recipe Finder</h1>
          </div>
          <button onClick={onNavigate} className="text-gray-600 hover:text-orange-500 transition-colors duration-200">
            Home
          </button>
        </div>
      </div>
    </nav>
  );
};
