'use client';

import { useState, memo } from 'react';
import { Search, Bell, Plus, X } from 'lucide-react';

const Header = memo(function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleNewStartup = () => {
    console.log('Creating new startup');
    // Add your logic here
  };

  const handleNotifications = () => {
    console.log('Opening notifications');
    // Add your logic here
  };

  return (
    <header className="bg-white border-b border-gray-200 px-3 sm:px-5 py-3 shadow-sm sticky top-0 z-10">
      <div className="flex items-center justify-between gap-3">
        {/* Left: Welcome Message - Hidden on very small screens */}
        <div className="hidden sm:block">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">Good morning, Alex</h2>
          <p className="text-xs text-gray-500 mt-0.5 hidden md:block">Here's what's happening with your startups today.</p>
        </div>

        {/* Center: Search Bar for small screens */}
        {showSearch && (
          <div className="sm:hidden absolute left-3 right-3 top-3 flex items-center bg-gray-50 rounded-lg px-3 py-1.5 border border-gray-200 gap-2 z-50">
            <Search size={16} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none text-sm text-gray-900 placeholder-gray-400 flex-1"
            />
            <button onClick={() => {
              setShowSearch(false);
              setSearchQuery('');
            }} className="text-gray-400 hover:text-gray-600">
              <X size={16} />
            </button>
          </div>
        )}

        {/* Right: Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 ml-auto">
          {/* Search Bar - Desktop */}
          <div className="hidden sm:flex items-center bg-gray-50 rounded-lg px-3 py-1.5 border border-gray-200 gap-2">
            <Search size={16} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search startups, mentors..."
              className="bg-transparent outline-none text-xs text-gray-900 placeholder-gray-400 w-32 lg:w-40"
            />
          </div>

          {/* Search Icon - Mobile */}
          <button 
            onClick={() => setShowSearch(true)}
            className="sm:hidden p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Search"
          >
            <Search size={18} className="text-gray-600" />
          </button>

          {/* Notification Icon */}
          <button 
            onClick={handleNotifications}
            className="relative p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Notifications"
          >
            <Bell size={18} className="text-gray-600" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* New Startup Button - Desktop */}
          <button 
            onClick={handleNewStartup}
            className="hidden sm:flex px-2 sm:px-3 py-1.5 bg-blue-600 text-white rounded-lg font-medium text-xs hover:bg-blue-700 transition-colors items-center gap-1.5"
          >
            <Plus size={16} />
            <span className="hidden md:inline">New Startup</span>
          </button>

          {/* New Startup Icon - Mobile */}
          <button 
            onClick={handleNewStartup}
            className="sm:hidden p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            aria-label="New startup"
          >
            <Plus size={18} />
          </button>

          {/* Profile Avatar */}
          <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-gray-200">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs cursor-pointer hover:shadow-md transition-shadow">
              A
            </div>
          </div>
        </div>
      </div>
    </header>
  );
});

export default Header;
