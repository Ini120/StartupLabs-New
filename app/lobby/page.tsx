'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, Zap, TrendingUp, Users } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import StatCard from '@/components/StatCard';

interface LobbyStartup {
  id: string;
  name: string;
  icon: string;
  category: string;
  progress: number;
  description: string;
  team: number;
  status: 'Hot' | 'Growing' | 'Emerging';
}

const LOBBY_STARTUPS: LobbyStartup[] = [
  {
    id: '1',
    name: 'InnoVerse',
    icon: '⚡',
    category: 'AI Assistant Platform',
    progress: 82,
    description: 'Next-gen AI that understands context and adapts to your needs',
    team: 12,
    status: 'Hot',
  },
  {
    id: '2',
    name: 'Healthify',
    icon: '❤️',
    category: 'Health & Fitness',
    progress: 72,
    description: 'Personalized fitness tracking with AI coaching',
    team: 8,
    status: 'Hot',
  },
  {
    id: '3',
    name: 'CryptoX',
    icon: '💰',
    category: 'Crypto Trading App',
    progress: 58,
    description: 'Advanced trading platform for crypto enthusiasts',
    team: 6,
    status: 'Growing',
  },
  {
    id: '4',
    name: 'SkillUp',
    icon: '🎓',
    category: 'Learning Platform',
    progress: 60,
    description: 'Interactive courses with real-world project experience',
    team: 10,
    status: 'Growing',
  },
  {
    id: '5',
    name: 'GreenFactory',
    icon: '🌱',
    category: 'Sustainability',
    progress: 45,
    description: 'Carbon-neutral manufacturing platform',
    team: 7,
    status: 'Emerging',
  },
  {
    id: '6',
    name: 'MindFlow',
    icon: '🧠',
    category: 'Wellness',
    progress: 50,
    description: 'Mental health platform with community support',
    team: 5,
    status: 'Emerging',
  },
];

export default function LobbyPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [connectedStartups, setConnectedStartups] = useState<string[]>([]);

  const filters = ['All', 'Hot', 'Growing', 'Emerging'];

  const filteredStartups = useMemo(() => {
    return LOBBY_STARTUPS.filter((startup) => {
      const matchesSearch =
        startup.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        startup.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        startup.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter =
        selectedFilter === 'All' || startup.status === selectedFilter;
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, selectedFilter]);

  const toggleConnect = (id: string) => {
    setConnectedStartups((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden flex-col lg:flex-row">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <div className="flex-1 overflow-y-auto">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 lg:px-6 py-8 lg:py-12">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-2xl lg:text-4xl font-bold mb-2">
                Explore Startups in the Lobby
              </h1>
              <p className="text-blue-100 text-sm lg:text-base mb-6">
                Connect with innovative startups and get involved in projects
                that matter
              </p>

              {/* Search Bar */}
              <div className="relative max-w-2xl">
                <Search className="absolute left-3 top-3 text-blue-200" size={20} />
                <input
                  type="text"
                  placeholder="Search startups, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-6xl mx-auto px-4 lg:px-6 py-6 lg:py-8">
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2 mb-6 lg:mb-8">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg font-medium text-xs lg:text-sm transition-colors ${
                    selectedFilter === filter
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-400'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Startups Grid */}
            {filteredStartups.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {filteredStartups.map((startup) => (
                  <div
                    key={startup.id}
                    className="bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all p-4 lg:p-5"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-3xl">{startup.icon}</div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          startup.status === 'Hot'
                            ? 'bg-red-100 text-red-700'
                            : startup.status === 'Growing'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {startup.status}
                      </span>
                    </div>

                    {/* Title & Category */}
                    <h3 className="font-bold text-lg mb-1">{startup.name}</h3>
                    <p className="text-xs lg:text-sm text-gray-500 mb-2">
                      {startup.category}
                    </p>

                    {/* Description */}
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {startup.description}
                    </p>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-xs font-medium text-gray-700">
                          Progress
                        </span>
                        <span className="text-xs font-bold text-blue-600">
                          {startup.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${startup.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Team Size */}
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                      <div className="flex items-center gap-1 text-gray-600">
                        <Users size={16} />
                        <span className="text-xs">{startup.team} members</span>
                      </div>
                    </div>

                    {/* Connect Button */}
                    <button
                      onClick={() => toggleConnect(startup.id)}
                      className={`w-full py-2 rounded-lg font-medium text-sm transition-colors ${
                        connectedStartups.includes(startup.id)
                          ? 'bg-green-100 text-green-700 border border-green-300 hover:bg-green-50'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {connectedStartups.includes(startup.id)
                        ? '✓ Connected'
                        : 'Connect'}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-2">
                  No startups found matching your search.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedFilter('All');
                  }}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
