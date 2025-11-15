'use client';
import { useState, useEffect } from 'react';

const input = "w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500";

export default function TeamForm() {
  const [name, setName] = useState('');
  const [players, setPlayers] = useState([]);
  const [allPlayers, setAllPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [msg, setMsg] = useState({ success: '', error: '' });

  useEffect(() => {
    fetch('/api/hand-cricket/players')
      .then(r => r.json())
      .then(res => setAllPlayers(res.data || []))
      .catch(err => setMsg({ success: '', error: `Failed to load players: ${err.message}` }))
      .finally(() => setFetchLoading(false));
  }, []);

  const addPlayer = () => {
    if (!selectedPlayer) return;
    const player = allPlayers.find(p => String(p.player_id) === String(selectedPlayer));
    if (!player) return;
    setPlayers([...players, { ...player, uniqueId: Date.now() + Math.random() }]);
    setSelectedPlayer('');
    setMsg({ success: '', error: '' });
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg({ success: '', error: '' });
    try {
      const res = await fetch('/api/hand-cricket/teams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, players: players.map(p => p.player_id) }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Failed');
      setMsg({ success: `Team "${name}" created!`, error: '' });
      setName('');
      setPlayers([]);
    } catch (err) {
      setMsg({ success: '', error: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Create Team</h2>
      {msg.success && <div className="mb-4 p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg">{msg.success}</div>}
      {msg.error && <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg">{msg.error}</div>}
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name *</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="e.g., Tigers" className={input} />
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Add Players</h3>
          {fetchLoading ? (
            <p className="text-gray-600 dark:text-gray-400">Loading...</p>
          ) : (
            <div className="flex gap-2 mb-4">
              <select value={selectedPlayer} onChange={(e) => setSelectedPlayer(e.target.value)} className={`flex-1 ${input}`}>
                <option value="">Select a player</option>
                {allPlayers.map((p, idx) => (
                  <option key={`player-${String(p.player_id ?? idx)}`} value={String(p.player_id)}>{p.name}</option>
                ))}
              </select>
              <button type="button" onClick={addPlayer} className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg">Add</button>
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Players ({players.length})</label>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {players.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400 text-sm">No players added yet</p>
            ) : (
              players.map((p, idx) => (
                <div key={`team-player-${p.uniqueId}`} className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <span className="text-gray-900 dark:text-white text-sm">{p.name}</span>
                  <button type="button" onClick={() => setPlayers(players.filter(x => x.uniqueId !== p.uniqueId))} className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded">Remove</button>
                </div>
              ))
            )}
          </div>
        </div>
        <button type="submit" disabled={loading} className="w-full px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed">
          {loading ? 'Creating...' : 'Create Team'}
        </button>
      </form>
    </div>
  );
}