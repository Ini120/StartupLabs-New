import { Calendar } from 'lucide-react';

interface MentorCardProps {
  name: string;
  role: string;
  status: 'Available' | 'Busy' | 'Offline';
  bio: string;
  avatar: string;
}

export default function MentorCard({ name, role, status, bio, avatar }: MentorCardProps) {
  const statusColor = {
    'Available': 'bg-green-100 text-green-700',
    'Busy': 'bg-yellow-100 text-yellow-700',
    'Offline': 'bg-gray-100 text-gray-700',
  };

  const statusDot = {
    'Available': 'bg-green-500',
    'Busy': 'bg-yellow-500',
    'Offline': 'bg-gray-500',
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-base font-bold text-gray-900">{name}</h3>
          <p className="text-xs text-gray-500">{role}</p>
        </div>
        <div className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor[status]}`}>
          <div className={`w-2 h-2 rounded-full ${statusDot[status]}`} />
          {status}
        </div>
      </div>

      {/* Avatar */}
      <div className="mb-3">
        <div className="w-full h-24 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center text-4xl">
          {avatar}
        </div>
      </div>

      {/* Bio */}
      <p className="text-xs text-gray-600 mb-3">{bio}</p>

      {/* Book Meeting Button */}
      <button className="w-full px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg font-medium text-xs hover:bg-blue-100 transition-colors flex items-center justify-center gap-1.5">
        <Calendar size={14} />
        Book a Meeting
      </button>
    </div>
  );
}
