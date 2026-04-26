'use client';

import { useStartups } from '@/lib/hooks';
import { Startup } from '@/types/database';

export function StartupsGrid() {
  const { startups, loading, error } = useStartups();

  if (loading) {
    return <div className="p-4">Loading startups...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">Error: {error}</div>;
  }

  if (!startups || startups.length === 0) {
    return <div className="p-4">No startups found.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {startups.map((startup: Startup) => (
        <div
          key={startup.id}
          className="border rounded-lg p-4 shadow hover:shadow-lg transition"
        >
          <h3 className="font-bold text-lg mb-2">{startup.name}</h3>
          <p className="text-gray-600 mb-3">{startup.description}</p>
          <small className="text-gray-500">
            Created: {new Date(startup.created_at).toLocaleDateString()}
          </small>
        </div>
      ))}
    </div>
  );
}
