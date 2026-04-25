'use client';

import { useState } from 'react';
import {
  LayoutDashboard,
  Rocket,
  Target,
  Users,
  Calendar,
  MessageCircle,
  Compass,
  Clock,
  BookOpen,
  BarChart3,
  Settings,
  X,
  Menu,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'My Startups', icon: Rocket },
  { label: 'Milestones', icon: Target },
  { label: 'Mentors', icon: Users },
  { label: 'Meetings', icon: Calendar },
  { label: 'Messages', icon: MessageCircle },
  { label: 'Lobby (Explore)', icon: Compass },
  { label: 'Calendar', icon: Clock },
  { label: 'Resources', icon: BookOpen },
  { label: 'Analytics', icon: BarChart3 },
  { label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const activeNav = 'Dashboard';

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg hover:bg-gray-200 transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/20 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative top-0 left-0 h-screen w-[260px] bg-white border-r border-gray-200 flex flex-col shadow-sm transition-transform duration-300 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="px-4 py-3 border-b border-gray-200">
          <h1 className="text-lg font-bold text-gray-900">StartupLabs</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-3 overflow-y-auto">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.label}>
                  <button
                    onClick={() => setIsOpen(false)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2.5 text-sm font-medium ${
                      activeNav === item.label
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 text-xs text-gray-500">
          <p>© 2026 StartupLabs</p>
        </div>
      </aside>
    </>
  );
}
