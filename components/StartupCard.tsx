import { MoreVertical } from 'lucide-react';

interface StartupCardProps {
  name: string;
  icon: React.ReactNode;
  category: string;
  status: 'New' | 'Live' | 'Growth';
  progress: number;
  color: string;
}

export default function StartupCard({ name, icon, category, status, progress, color }: StartupCardProps) {
  const statusColors = {
    'New': 'bg-purple-100 text-purple-700',
    'Live': 'bg-blue-100 text-blue-700',
    'Growth': 'bg-green-100 text-green-700',
  };

  return (
    <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
            {icon}
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">{name}</p>
            <p className="text-xs text-gray-400">{category}</p>
          </div>
        </div>
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[status]}`}>
          {status}
        </span>
      </div>

      {/* Progress */}
      <div className="mb-2">
        <div className="flex items-center justify-between mb-1">
          <p className="text-xs text-gray-600 font-medium">Progress</p>
          <p className="text-xs font-bold text-gray-900">{progress}%</p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${color}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Menu button */}
      <button className="text-gray-400 hover:text-gray-600">
        <MoreVertical size={18} />
      </button>
    </div>
  );
}
