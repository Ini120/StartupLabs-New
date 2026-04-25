'use client';

import { X, Star, Calendar } from 'lucide-react';
import { Mentor } from './MentorGridCard';

interface MentorProfileModalProps {
  mentor: Mentor | null;
  onClose: () => void;
  onBookMeeting?: (mentor: Mentor) => void;
}

export default function MentorProfileModal({
  mentor,
  onClose,
  onBookMeeting,
}: MentorProfileModalProps) {
  if (!mentor) return null;

  const statusColors: Record<string, string> = {
    'Available Now': 'bg-green-100 text-green-700',
    Scheduled: 'bg-blue-100 text-blue-700',
    Busy: 'bg-yellow-100 text-yellow-700',
    Offline: 'bg-gray-100 text-gray-700',
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/20 z-40"
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg z-50 overflow-y-auto border-l border-gray-200">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="font-bold text-lg text-gray-900">{mentor.name}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4 space-y-6">
          {/* Avatar and Status */}
          <div>
            <div className="w-full h-32 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center text-6xl mb-3">
              {mentor.avatar}
            </div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-base font-bold text-gray-900">{mentor.name}</h3>
                <p className="text-sm text-gray-600">{mentor.title} @ {mentor.company}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[mentor.status]}`}>
                {mentor.status}
              </span>
            </div>
          </div>

          {/* Bio */}
          <div>
            <p className="text-xs font-semibold text-gray-600 uppercase mb-2">About</p>
            <p className="text-sm text-gray-700 leading-relaxed">{mentor.fullBio}</p>
          </div>

          {/* Expertise */}
          <div>
            <p className="text-xs font-semibold text-gray-600 uppercase mb-2">Areas of Expertise</p>
            <div className="flex flex-wrap gap-2">
              {mentor.expertise.map((exp) => (
                <span key={exp} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                  {exp}
                </span>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div>
            <p className="text-xs font-semibold text-gray-600 uppercase mb-2">Reviews</p>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < Math.floor(mentor.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="font-semibold text-gray-900">{mentor.rating.toFixed(1)}</span>
              <span className="text-gray-500">({mentor.reviewCount} reviews)</span>
            </div>
          </div>

          {/* Session Rate */}
          {mentor.sessionRate && (
            <div>
              <p className="text-xs font-semibold text-gray-600 uppercase mb-2">Session Rate</p>
              <p className="text-sm font-semibold text-gray-900">{mentor.sessionRate}</p>
            </div>
          )}

          {/* Notable Startups */}
          <div>
            <p className="text-xs font-semibold text-gray-600 uppercase mb-2">Notable Startups Mentored</p>
            <div className="space-y-1">
              {mentor.notableStartups.map((startup, idx) => (
                <p key={idx} className="text-sm text-gray-700">• {startup}</p>
              ))}
            </div>
          </div>

          {/* Availability Heatmap */}
          <div>
            <p className="text-xs font-semibold text-gray-600 uppercase mb-2">Availability (Next 2 Weeks)</p>
            <div className="grid grid-cols-7 gap-1">
              {[...Array(14)].map((_, i) => {
                const isAvailable = Math.random() > 0.4;
                const daysFromNow = Math.floor(i / 7) * 7 + (i % 7);
                const date = new Date();
                date.setDate(date.getDate() + daysFromNow);
                return (
                  <div
                    key={i}
                    title={date.toLocaleDateString()}
                    className={`w-6 h-6 rounded-sm text-xs flex items-center justify-center font-semibold text-white ${
                      isAvailable ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    {date.getDate()}
                  </div>
                );
              })}
            </div>
            <div className="flex gap-3 mt-2 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-sm bg-green-500" />
                <span className="text-gray-600">Available</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-sm bg-gray-300" />
                <span className="text-gray-600">Busy</span>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div>
            <p className="text-xs font-semibold text-gray-600 uppercase mb-2">Recent Reviews</p>
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {mentor.reviews.map((review) => (
                <div key={review.id} className="border border-gray-200 rounded-lg p-2">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-semibold text-gray-900">{review.author}</p>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={10}
                          className={i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-700">{review.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => onBookMeeting?.(mentor)}
            className="w-full py-2.5 px-4 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <Calendar size={16} />
            Book a Meeting
          </button>
        </div>
      </div>
    </>
  );
}
