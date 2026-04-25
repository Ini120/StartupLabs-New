'use client';

import { Star } from 'lucide-react';

export interface Mentor {
  id: string;
  name: string;
  title: string;
  company: string;
  avatar: string;
  bio: string;
  expertise: string[];
  status: 'Available Now' | 'Scheduled' | 'Busy' | 'Offline';
  rating: number;
  reviewCount: number;
  sessionRate?: string;
  notableStartups: string[];
  fullBio: string;
  reviews: Array<{
    id: string;
    author: string;
    rating: number;
    text: string;
  }>;
  isConnected?: boolean;
}

interface MentorGridCardProps {
  mentor: Mentor;
  onViewProfile: (mentor: Mentor) => void;
  onBookMeeting?: (mentor: Mentor) => void;
}

const expertiseColors: Record<string, string> = {
  Growth: 'bg-blue-100 text-blue-700',
  Product: 'bg-purple-100 text-purple-700',
  Fundraising: 'bg-green-100 text-green-700',
  Tech: 'bg-orange-100 text-orange-700',
  Marketing: 'bg-pink-100 text-pink-700',
  Legal: 'bg-indigo-100 text-indigo-700',
};

const statusColors: Record<string, { dot: string; bg: string }> = {
  'Available Now': { dot: 'bg-green-500', bg: 'bg-green-50' },
  Scheduled: { dot: 'bg-blue-500', bg: 'bg-blue-50' },
  Busy: { dot: 'bg-yellow-500', bg: 'bg-yellow-50' },
  Offline: { dot: 'bg-gray-500', bg: 'bg-gray-50' },
};

export default function MentorGridCard({
  mentor,
  onViewProfile,
  onBookMeeting,
}: MentorGridCardProps) {
  const statusColor = statusColors[mentor.status];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
      {/* Header with avatar and status */}
      <div className="relative">
        {/* Avatar Banner */}
        <div className="w-full h-24 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-4xl">
          {mentor.avatar}
        </div>

        {/* Status Dot */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white bg-opacity-90 text-xs font-medium">
          <div className={`w-2 h-2 rounded-full ${statusColor.dot}`} />
          <span className="text-gray-700">{mentor.status}</span>
        </div>

        {/* Connected Badge */}
        {mentor.isConnected && (
          <div className="absolute bottom-2 left-3 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
            Connected
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-4 flex flex-col">
        {/* Name and Title */}
        <h3 className="text-base font-bold text-gray-900 mb-0.5">{mentor.name}</h3>
        <p className="text-xs text-gray-600 mb-3">{mentor.title} @ {mentor.company}</p>

        {/* Expertise Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {mentor.expertise.slice(0, 3).map((exp) => (
            <span
              key={exp}
              className={`px-2 py-1 rounded-full text-xs font-medium ${expertiseColors[exp] || 'bg-gray-100 text-gray-700'}`}
            >
              {exp}
            </span>
          ))}
          {mentor.expertise.length > 3 && (
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
              +{mentor.expertise.length - 3}
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className={i < Math.floor(mentor.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="text-xs font-semibold text-gray-900">{mentor.rating.toFixed(1)}</span>
          <span className="text-xs text-gray-500">({mentor.reviewCount})</span>
        </div>

        {/* Bio */}
        <p className="text-xs text-gray-600 mb-4 line-clamp-2 flex-1">{mentor.bio}</p>

        {/* CTAs */}
        <div className="flex gap-2">
          <button
            onClick={() => onViewProfile(mentor)}
            className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium text-xs hover:bg-gray-50 transition-colors"
          >
            View Profile
          </button>
          <button
            onClick={() => onBookMeeting?.(mentor)}
            className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg font-medium text-xs hover:bg-blue-700 transition-colors"
          >
            Book Meeting
          </button>
        </div>
      </div>
    </div>
  );
}
