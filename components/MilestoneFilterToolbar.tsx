'use client';

import { useState } from 'react';
import { Search, Calendar } from 'lucide-react';

interface MilestoneFilterToolbarProps {
  onSearchChange: (query: string) => void;
  onStartupChange: (startup: string) => void;
  onStatusChange: (status: string) => void;
  onDateFromChange: (date: string) => void;
  onDateToChange: (date: string) => void;
  searchQuery: string;
  selectedStartup: string;
  selectedStatus: string;
  dateFrom: string;
  dateTo: string;
  startups: { id: string; name: string }[];
}

const statuses = ['All', 'Completed', 'In Progress', 'Pending', 'Overdue'];

export default function MilestoneFilterToolbar({
  onSearchChange,
  onStartupChange,
  onStatusChange,
  onDateFromChange,
  onDateToChange,
  searchQuery,
  selectedStartup,
  selectedStatus,
  dateFrom,
  dateTo,
  startups,
}: MilestoneFilterToolbarProps) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 mb-4">
      <div className="flex flex-col gap-3">
        {/* First Row: Search and Startup */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Search Input */}
          <div className="flex items-center bg-gray-50 rounded-lg px-3 py-2 border border-gray-200 gap-2 flex-1 min-w-[200px]">
            <Search size={16} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search milestones..."
              className="bg-transparent outline-none text-sm text-gray-900 placeholder-gray-400 flex-1"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          {/* Startup Dropdown */}
          <select
            value={selectedStartup}
            onChange={(e) => onStartupChange(e.target.value)}
            className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 hover:border-gray-300 transition-colors cursor-pointer"
          >
            <option value="All">All Startups</option>
            {startups.map((startup) => (
              <option key={startup.id} value={startup.id}>
                {startup.name}
              </option>
            ))}
          </select>
        </div>

        {/* Second Row: Status and Date Range */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Status Dropdown */}
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 hover:border-gray-300 transition-colors cursor-pointer"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status === 'All' ? 'Status: All' : `Status: ${status}`}
              </option>
            ))}
          </select>

          {/* Date Range */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-gray-50 rounded-lg px-3 py-2 border border-gray-200 gap-2">
              <Calendar size={16} className="text-gray-400" />
              <input
                type="date"
                className="bg-transparent outline-none text-sm text-gray-900 w-32"
                value={dateFrom}
                onChange={(e) => onDateFromChange(e.target.value)}
              />
            </div>
            <span className="text-gray-400 text-xs">to</span>
            <div className="flex items-center bg-gray-50 rounded-lg px-3 py-2 border border-gray-200 gap-2">
              <input
                type="date"
                className="bg-transparent outline-none text-sm text-gray-900 w-32"
                value={dateTo}
                onChange={(e) => onDateToChange(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
