'use client';

import { X, Eye, Edit2, Archive } from 'lucide-react';
import { Startup } from './KanbanCard';

interface DetailPanelProps {
  startup: Startup | null;
  onClose: () => void;
}

export default function DetailPanel({ startup, onClose }: DetailPanelProps) {
  if (!startup) return null;

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
          <h2 className="font-bold text-lg text-gray-900">{startup.name}</h2>
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
          {/* Status Badge */}
          <div>
            <p className="text-xs font-semibold text-gray-600 uppercase mb-2">Stage</p>
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              {startup.stage}
            </span>
          </div>

          {/* Description */}
          <div>
            <p className="text-xs font-semibold text-gray-600 uppercase mb-2">Description</p>
            <p className="text-sm text-gray-700 leading-relaxed">{startup.description}</p>
          </div>

          {/* Co-founders */}
          <div>
            <p className="text-xs font-semibold text-gray-600 uppercase mb-2">Co-founders</p>
            <div className="space-y-2">
              {startup.cofounders.map((founder, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-700">
                    {founder.charAt(0)}
                  </div>
                  <span className="text-sm text-gray-700">{founder}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Funding Stage */}
          <div>
            <p className="text-xs font-semibold text-gray-600 uppercase mb-2">Funding Stage</p>
            <p className="text-sm text-gray-700">{startup.fundingStage}</p>
          </div>

          {/* Milestones Progress */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-gray-600 uppercase">Milestone Progress</p>
              <p className="text-sm font-bold text-gray-900">{startup.milestoneProgress}%</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="h-2 rounded-full bg-blue-600 transition-all duration-300"
                style={{ width: `${startup.milestoneProgress}%` }}
              />
            </div>
          </div>

          {/* Team Size */}
          <div>
            <p className="text-xs font-semibold text-gray-600 uppercase mb-2">Team Size</p>
            <p className="text-sm text-gray-700">{startup.teamSize} members</p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2 pt-4 border-t border-gray-200">
            <button className="w-full flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors">
              <Eye size={16} />
              View Details
            </button>
            <button className="w-full flex items-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-900 rounded-lg font-medium text-sm hover:bg-gray-200 transition-colors">
              <Edit2 size={16} />
              Edit Startup
            </button>
            <button className="w-full flex items-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-900 rounded-lg font-medium text-sm hover:bg-gray-200 transition-colors">
              <Archive size={16} />
              Archive
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
