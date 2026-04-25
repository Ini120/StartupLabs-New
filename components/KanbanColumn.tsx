'use client';

import { Plus } from 'lucide-react';
import KanbanCard, { Startup } from './KanbanCard';

interface KanbanColumnProps {
  stage: 'Idea' | 'Building' | 'Launched' | 'Scaling';
  startups: Startup[];
  onCardClick: (startup: Startup) => void;
  onAddStartup: (stage: string) => void;
}

const stageEmojis: Record<string, string> = {
  Idea: '💡',
  Building: '🏗️',
  Launched: '🚀',
  Scaling: '📈',
};

export default function KanbanColumn({
  stage,
  startups,
  onCardClick,
  onAddStartup,
}: KanbanColumnProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-3 flex flex-col h-[calc(100vh-360px)] overflow-y-auto">
      {/* Column Header */}
      <div className="mb-3 pb-3 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">{stageEmojis[stage]}</span>
            <h3 className="font-semibold text-gray-900 text-sm">{stage}</h3>
            <span className="inline-block bg-gray-300 text-gray-700 rounded-full px-2 py-0.5 text-xs font-medium">
              {startups.length}
            </span>
          </div>
        </div>
      </div>

      {/* Cards Container */}
      <div className="space-y-2 flex-1 overflow-y-auto pb-2">
        {startups.length > 0 ? (
          startups.map((startup) => (
            <KanbanCard
              key={startup.id}
              startup={startup}
              onClick={onCardClick}
            />
          ))
        ) : (
          <div className="flex items-center justify-center h-32 text-center">
            <div>
              <p className="text-sm text-gray-500 mb-2">No startups yet</p>
              <p className="text-xs text-gray-400">Add your first startup to get started</p>
            </div>
          </div>
        )}
      </div>

      {/* Add Startup Button */}
      <button
        onClick={() => onAddStartup(stage)}
        className="mt-2 w-full py-2 px-3 bg-white rounded-lg border border-dashed border-gray-300 text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors text-sm font-medium flex items-center justify-center gap-1.5"
      >
        <Plus size={16} />
        Add Startup
      </button>
    </div>
  );
}
