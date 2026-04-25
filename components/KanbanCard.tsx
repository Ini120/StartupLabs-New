'use client';

import { MoreVertical } from 'lucide-react';

export interface Startup {
  id: string;
  name: string;
  initials: string;
  color: string;
  industry: string;
  stage: 'Idea' | 'Building' | 'Launched' | 'Scaling';
  teamSize: number;
  lastUpdated: string;
  description: string;
  cofounders: string[];
  fundingStage: string;
  milestoneProgress: number;
}

interface KanbanCardProps {
  startup: Startup;
  onClick: (startup: Startup) => void;
}

const industryColors: Record<string, string> = {
  SaaS: 'bg-blue-100 text-blue-700',
  Fintech: 'bg-green-100 text-green-700',
  Health: 'bg-red-100 text-red-700',
  'E-commerce': 'bg-purple-100 text-purple-700',
  AI: 'bg-orange-100 text-orange-700',
  EdTech: 'bg-indigo-100 text-indigo-700',
  Sustainability: 'bg-emerald-100 text-emerald-700',
};

export default function KanbanCard({ startup, onClick }: KanbanCardProps) {
  const bgColor = startup.color;
  const industryColor = industryColors[startup.industry] || 'bg-gray-100 text-gray-700';

  return (
    <div
      onClick={() => onClick(startup)}
      className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all cursor-pointer"
    >
      {/* Header with initials circle and name */}
      <div className="flex items-start gap-2.5 mb-2.5">
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ${bgColor}`}
        >
          {startup.initials}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm text-gray-900 truncate">{startup.name}</h4>
          <p className="text-xs text-gray-500 truncate">{startup.teamSize} team members</p>
        </div>
      </div>

      {/* Industry tag */}
      <div className="mb-2.5">
        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${industryColor}`}>
          {startup.industry}
        </span>
      </div>

      {/* Last updated */}
      <p className="text-xs text-gray-500 mb-2.5">Updated {startup.lastUpdated}</p>

      {/* Menu button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Options"
      >
        <MoreVertical size={16} />
      </button>
    </div>
  );
}
