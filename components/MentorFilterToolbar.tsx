'use client';

import { Search } from 'lucide-react';

interface MentorFilterToolbarProps {
  onSearchChange: (query: string) => void;
  onExpertiseChange: (expertise: string) => void;
  onAvailabilityChange: (availability: string) => void;
  onRatingChange: (rating: string) => void;
  searchQuery: string;
  selectedExpertise: string;
  selectedAvailability: string;
  selectedRating: string;
}

const expertiseOptions = ['All', 'Growth', 'Product', 'Fundraising', 'Tech', 'Marketing', 'Legal'];
const availabilityOptions = ['All', 'Available Now', 'Scheduled', 'Busy'];
const ratingOptions = ['All', '4★+', '3★+'];

export default function MentorFilterToolbar({
  onSearchChange,
  onExpertiseChange,
  onAvailabilityChange,
  onRatingChange,
  searchQuery,
  selectedExpertise,
  selectedAvailability,
  selectedRating,
}: MentorFilterToolbarProps) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 mb-4">
      <div className="flex items-center gap-3 flex-wrap">
        {/* Search Input */}
        <div className="flex items-center bg-gray-50 rounded-lg px-3 py-2 border border-gray-200 gap-2 flex-1 min-w-[200px]">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search mentors by name or expertise..."
            className="bg-transparent outline-none text-sm text-gray-900 placeholder-gray-400 flex-1"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Expertise Dropdown */}
        <select
          value={selectedExpertise}
          onChange={(e) => onExpertiseChange(e.target.value)}
          className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 hover:border-gray-300 transition-colors cursor-pointer"
        >
          {expertiseOptions.map((exp) => (
            <option key={exp} value={exp}>
              {exp === 'All' ? 'Expertise: All' : `Expertise: ${exp}`}
            </option>
          ))}
        </select>

        {/* Availability Dropdown */}
        <select
          value={selectedAvailability}
          onChange={(e) => onAvailabilityChange(e.target.value)}
          className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 hover:border-gray-300 transition-colors cursor-pointer"
        >
          {availabilityOptions.map((avail) => (
            <option key={avail} value={avail}>
              {avail === 'All' ? 'Availability: All' : `Availability: ${avail}`}
            </option>
          ))}
        </select>

        {/* Rating Dropdown */}
        <select
          value={selectedRating}
          onChange={(e) => onRatingChange(e.target.value)}
          className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 hover:border-gray-300 transition-colors cursor-pointer"
        >
          {ratingOptions.map((rating) => (
            <option key={rating} value={rating}>
              {rating === 'All' ? 'Rating: All' : `Rating: ${rating}`}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
