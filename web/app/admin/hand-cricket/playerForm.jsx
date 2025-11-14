'use client';
import { useState } from 'react';

const input = "w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500";

export function PlayerForm({ onPlayerAdded }) {
  const [data, setData] = useState({ name: ''});
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ success: '', error: '' });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg({ success: '', error: '' });
    try {
      const res = await fetch('/api/admin/players', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, total_matches: 0, total_runs: 0, total_wickets: 0 }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Failed');
      setMsg({ success: `"${data.name}" added!`, error: '' });
      setData({ name: '', nick_name: '' });
      onPlayerAdded?.(result.data);
    } catch (err) {
      setMsg({ success: '', error: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Add New Player</h2>
      {msg.success && <div className="mb-4 p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg">{msg.success}</div>}
      {msg.error && <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg">{msg.error}</div>}
      <form onSubmit={submit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Player Name *</label>
            <input type="text" name="name" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} required placeholder="John Doe" className={input} />
          </div>
        </div>
        <button type="submit" disabled={loading} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed">
          {loading ? 'Adding...' : 'Add Player'}
        </button>
      </form>
    </div>
  );
}
