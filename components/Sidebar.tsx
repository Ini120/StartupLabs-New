'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
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
  { label: 'Dashboard', icon: LayoutDashboard, href: '/' },
  { label: 'My Startups', icon: Rocket, href: '/my-startups' },
  { label: 'Milestones', icon: Target, href: '/milestones' },
  { label: 'Mentors', icon: Users, href: '/mentors' },
  { label: 'Meetings', icon: Calendar, href: '/meetings' },
  { label: 'Messages', icon: MessageCircle, href: '/messages' },
  { label: 'Lobby (Explore)', icon: Compass, href: '/lobby' },
  { label: 'Calendar', icon: Clock, href: '/calendar' },
  { label: 'Resources', icon: BookOpen, href: '/resources' },
  { label: 'Analytics', icon: BarChart3, href: '/analytics' },
  { label: 'Settings', icon: Settings, href: '/settings' },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const getActiveNav = () => {
    if (pathname === '/') return 'Dashboard';
    if (pathname === '/my-startups') return 'My Startups';
    if (pathname === '/milestones') return 'Milestones';
    if (pathname === '/mentors') return 'Mentors';
    if (pathname === '/meetings') return 'Meetings';
    if (pathname === '/messages') return 'Messages';
    if (pathname === '/lobby') return 'Lobby (Explore)';
    if (pathname === '/calendar') return 'Calendar';
    if (pathname === '/resources') return 'Resources';
    if (pathname === '/analytics') return 'Analytics';
    if (pathname === '/settings') return 'Settings';
    return 'Dashboard';
  };

  const activeNav = getActiveNav();

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
                    onClick={() => {
                      router.push(item.href);
                      setIsOpen(false);
                    }}
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
