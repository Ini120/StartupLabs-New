import { Search, Bell, Plus } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-5 py-3 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Left: Welcome Message */}
        <div>
          <h2 className="text-xl font-bold text-gray-900">Good morning, Alex</h2>
          <p className="text-xs text-gray-500 mt-0.5">Here's what's happening with your startups today.</p>
        </div>

        {/* Right: Search, Notification, New Startup */}
        <div className="flex items-center gap-3">
          {/* Search Bar */}
          <div className="hidden sm:flex items-center bg-gray-50 rounded-lg px-3 py-1.5 border border-gray-200 gap-2">
            <Search size={16} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search startups, mentors..."
              className="bg-transparent outline-none text-xs text-gray-900 placeholder-gray-400 w-40"
            />
          </div>

          {/* Notification Icon */}
          <button className="relative p-1.5 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Notifications">
            <Bell size={18} className="text-gray-600" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* New Startup Button */}
          <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg font-medium text-xs hover:bg-blue-700 transition-colors flex items-center gap-1.5">
            <Plus size={16} />
            New Startup
          </button>

          {/* Profile Avatar */}
          <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
              A
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
