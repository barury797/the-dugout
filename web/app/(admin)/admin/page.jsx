'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (response.ok) {
        router.push('/auth/login');
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center p-6">
      <div className="w-full max-w-4xl flex flex-col gap-6 items-start">
        <div className="w-full flex items-center justify-between">
          <section className="flex-1">
            <h1 className="text-3xl font-semibold mb-4 text-gray-900 dark:text-white">Admin Dashboard</h1>
            <p className="text-gray-700 dark:text-gray-300 mb-2">Welcome to the admin dashboard. Here you can manage game settings, view player statistics, and oversee ongoing matches.</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">This area is reserved for administrators only.</p>
          </section>
          <button
            onClick={handleLogout}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Logging Out...' : 'Logout'}
          </button>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-left font-medium">
            <a href="/admin/hand-cricket" className="block">Hand Cricket Admin</a>
          </button>
          <div className="px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg font-medium">Coming Soon</div>
        </div>
      </div>
    </main>
  );
}