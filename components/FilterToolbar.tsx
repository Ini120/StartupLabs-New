'use client';

import { useState } from 'react';
import { Search, List, Grid3x3 } from 'lucide-react';

interface FilterToolbarProps {
  onSearchChange: (query: string) => void;
  onIndustryChange: (industry: string) => void;
  onStageChange: (stage: string) => void;
  onViewChange: (view: 'kanban' | 'list') => void;
  currentView: 'kanban' | 'list';
  searchQuery: string;
  selectedIndustry: string;
  selectedStage: string;
}

const industries = ['All', 'SaaS', 'Fintech', 'Health', 'E-commerce'];
const stages = ['All', 'Idea', 'Building', 'Launched', 'Scaling'];

export default function FilterToolbar({
  onSearchChange,
  onIndustryChange,
  onStageChange,
  onViewChange,
  currentView,
  searchQuery,
  selectedIndustry,
  selectedStage,
}: FilterToolbarProps) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 mb-4">
      <div className="flex items-center gap-3 flex-wrap">
        {/* Search Input */}
        <div className="flex items-center bg-gray-50 rounded-lg px-3 py-2 border border-gray-200 gap-2 flex-1 min-w-[200px]">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search startups..."
            className="bg-transparent outline-none text-sm text-gray-900 placeholder-gray-400 flex-1"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Industry Dropdown */}
        <select
          value={selectedIndustry}
          onChange={(e) => onIndustryChange(e.target.value)}
          className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 hover:border-gray-300 transition-colors cursor-pointer"
        >
          {industries.map((ind) => (
            <option key={ind} value={ind}>
              {ind === 'All' ? 'Industry: All' : `Industry: ${ind}`}
            </option>
          ))}
        </select>

        {/* Stage Dropdown */}
        <select
          value={selectedStage}
          onChange={(e) => onStageChange(e.target.value)}
          className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 hover:border-gray-300 transition-colors cursor-pointer"
        >
          {stages.map((stg) => (
            <option key={stg} value={stg}>
              {stg === 'All' ? 'Stage: All' : `Stage: ${stg}`}
            </option>
          ))}
        </select>

        {/* View Toggle - spacer and buttons */}
        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => onViewChange('kanban')}
            className={`p-2 rounded-lg transition-colors ${
              currentView === 'kanban'
                ? 'bg-blue-100 text-blue-600'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
            aria-label="Kanban view"
            title="Kanban view"
          >
            <Grid3x3 size={18} />
          </button>
          <button
            onClick={() => onViewChange('list')}
            className={`p-2 rounded-lg transition-colors ${
              currentView === 'list'
                ? 'bg-blue-100 text-blue-600'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
            aria-label="List view"
            title="List view"
          >
            <List size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
