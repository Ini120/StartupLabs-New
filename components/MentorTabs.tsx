'use client';

interface MentorTabsProps {
  activeTab: 'my-mentors' | 'discover';
  onTabChange: (tab: 'my-mentors' | 'discover') => void;
  myMentorsCount: number;
}

export default function MentorTabs({
  activeTab,
  onTabChange,
  myMentorsCount,
}: MentorTabsProps) {
  return (
    <div className="flex gap-8 border-b border-gray-200 px-4 py-4 bg-white">
      <button
        onClick={() => onTabChange('my-mentors')}
        className={`pb-3 border-b-2 transition-colors text-sm font-medium ${
          activeTab === 'my-mentors'
            ? 'border-blue-600 text-blue-600'
            : 'border-transparent text-gray-600 hover:text-gray-900'
        }`}
      >
        My Mentors
        {myMentorsCount > 0 && (
          <span className="ml-2 inline-block bg-blue-100 text-blue-700 rounded-full px-2 py-0.5 text-xs">
            {myMentorsCount}
          </span>
        )}
      </button>
      <button
        onClick={() => onTabChange('discover')}
        className={`pb-3 border-b-2 transition-colors text-sm font-medium ${
          activeTab === 'discover'
            ? 'border-blue-600 text-blue-600'
            : 'border-transparent text-gray-600 hover:text-gray-900'
        }`}
      >
        Discover
      </button>
    </div>
  );
}
