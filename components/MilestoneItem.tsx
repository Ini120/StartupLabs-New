'use client';

export interface Milestone {
  id: string;
  title: string;
  description: string;
  startupId: string;
  startupName: string;
  dueDate: string;
  status: 'Completed' | 'In Progress' | 'Pending' | 'Overdue';
  priority: 'High' | 'Medium' | 'Low';
  assignee: {
    name: string;
    avatar: string;
  };
  checklist: Array<{ id: string; title: string; completed: boolean }>;
  comments: Array<{
    id: string;
    author: string;
    avatar: string;
    text: string;
    timestamp: string;
  }>;
  attachments: Array<{ id: string; name: string; size: string }>;
}

interface MilestoneItemProps {
  milestone: Milestone;
  onClick: (milestone: Milestone) => void;
}

const statusColors: Record<string, { dot: string; bg: string }> = {
  Completed: { dot: 'bg-green-500', bg: 'bg-green-50' },
  'In Progress': { dot: 'bg-blue-500', bg: 'bg-blue-50' },
  Pending: { dot: 'bg-gray-400', bg: 'bg-gray-50' },
  Overdue: { dot: 'bg-red-500', bg: 'bg-red-50' },
};

const priorityColors: Record<string, string> = {
  High: 'bg-red-100 text-red-700',
  Medium: 'bg-yellow-100 text-yellow-700',
  Low: 'bg-gray-100 text-gray-700',
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function MilestoneItem({ milestone, onClick }: MilestoneItemProps) {
  const statusColor = statusColors[milestone.status];

  return (
    <div
      onClick={() => onClick(milestone)}
      className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0"
    >
      {/* Status Dot */}
      <div className={`w-3 h-3 rounded-full flex-shrink-0 ${statusColor.dot}`} />

      {/* Title and Startup */}
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm text-gray-900">{milestone.title}</h4>
        <p className="text-xs text-gray-500">{milestone.startupName}</p>
      </div>

      {/* Due Date */}
      <div className="text-xs text-gray-600 whitespace-nowrap">
        {formatDate(milestone.dueDate)}
      </div>

      {/* Assignee Avatar */}
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
        {milestone.assignee.avatar}
      </div>

      {/* Priority Badge */}
      <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 ${priorityColors[milestone.priority]}`}>
        {milestone.priority}
      </span>
    </div>
  );
}
