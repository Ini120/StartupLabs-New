'use client';

import MilestoneItem, { Milestone } from './MilestoneItem';

interface MilestoneGroupProps {
  startupId: string;
  startupName: string;
  startupColor: string;
  milestones: Milestone[];
  totalMilestones: number;
  completedMilestones: number;
  onMilestoneClick: (milestone: Milestone) => void;
}

export default function MilestoneGroup({
  startupId,
  startupName,
  startupColor,
  milestones,
  totalMilestones,
  completedMilestones,
  onMilestoneClick,
}: MilestoneGroupProps) {
  const progressPercentage = totalMilestones > 0 ? (completedMilestones / totalMilestones) * 100 : 0;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-4">
      {/* Group Header */}
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {/* Startup Logo/Circle */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ${startupColor}`}
            >
              {startupName.substring(0, 2).toUpperCase()}
            </div>

            {/* Startup Info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-sm">{startupName}</h3>
              <p className="text-xs text-gray-500">
                {completedMilestones} of {totalMilestones} completed
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-24 h-2 bg-gray-200 rounded-full flex-shrink-0">
            <div
              className="h-2 rounded-full bg-blue-600 transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Milestones List */}
      <div className="divide-y divide-gray-100">
        {milestones.length > 0 ? (
          milestones.map((milestone) => (
            <MilestoneItem
              key={milestone.id}
              milestone={milestone}
              onClick={onMilestoneClick}
            />
          ))
        ) : (
          <div className="px-4 py-6 text-center">
            <p className="text-sm text-gray-500">No milestones for this startup</p>
          </div>
        )}
      </div>
    </div>
  );
}
