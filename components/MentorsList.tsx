'use client';

import { useMentors } from '@/lib/hooks';
import { Mentor } from '@/types/database';

export function MentorsList() {
  const { mentors, loading, error } = useMentors();

  if (loading) {
    return <div className="p-4">Loading mentors...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">Error: {error}</div>;
  }

  if (!mentors || mentors.length === 0) {
    return <div className="p-4">No mentors available.</div>;
  }

  return (
    <div className="space-y-4 p-4">
      {mentors.map((mentor: Mentor) => (
        <div
          key={mentor.id}
          className="border rounded-lg p-4 shadow hover:shadow-lg transition"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-lg">{mentor.name}</h3>
              <p className="text-blue-600 text-sm">{mentor.email}</p>
            </div>
            {mentor.expertise && (
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                {mentor.expertise}
              </span>
            )}
          </div>
          {mentor.bio && (
            <p className="mt-3 text-gray-700">{mentor.bio}</p>
          )}
        </div>
      ))}
    </div>
  );
}
