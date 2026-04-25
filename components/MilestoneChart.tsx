export default function MilestoneChart() {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (12 / 20) * circumference;

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
      <h3 className="text-base font-bold text-gray-900 mb-4">Milestone Overview</h3>
      
      {/* Circular Progress */}
      <div className="flex flex-col items-center justify-center mb-4">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="8"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="transition-all duration-500"
            />
          </svg>
          
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-lg font-bold text-gray-900">12 / 20</p>
            <p className="text-xs text-gray-500">Milestones</p>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-3 gap-2 text-center mt-3">
        <div>
          <div className="inline-block w-3 h-3 bg-blue-500 rounded-full mb-1" />
          <p className="text-xs font-medium text-gray-900">Completed</p>
          <p className="text-xs text-gray-500">12 (60%)</p>
        </div>
        <div>
          <div className="inline-block w-3 h-3 bg-orange-400 rounded-full mb-1" />
          <p className="text-xs font-medium text-gray-900">In Progress</p>
          <p className="text-xs text-gray-500">6 (30%)</p>
        </div>
        <div>
          <div className="inline-block w-3 h-3 bg-gray-300 rounded-full mb-1" />
          <p className="text-xs font-medium text-gray-900">Pending</p>
          <p className="text-xs text-gray-500">2 (10%)</p>
        </div>
      </div>
    </div>
  );
}
