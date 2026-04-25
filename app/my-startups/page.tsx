'use client';

import { useState, useMemo } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import FilterToolbar from '@/components/FilterToolbar';
import KanbanColumn from '@/components/KanbanColumn';
import DetailPanel from '@/components/DetailPanel';
import KanbanCard, { Startup } from '@/components/KanbanCard';

// Sample startup data
const SAMPLE_STARTUPS: Startup[] = [
  {
    id: '1',
    name: 'TaskFlow',
    initials: 'TF',
    color: 'bg-purple-600',
    industry: 'SaaS',
    stage: 'Launched',
    teamSize: 8,
    lastUpdated: '2 days ago',
    description: 'A modern task management platform designed for remote teams to collaborate seamlessly and boost productivity.',
    cofounders: ['Alex Johnson', 'Sarah Chen'],
    fundingStage: 'Series A',
    milestoneProgress: 75,
  },
  {
    id: '2',
    name: 'FitTrack',
    initials: 'FT',
    color: 'bg-green-600',
    industry: 'Health',
    stage: 'Building',
    teamSize: 5,
    lastUpdated: '1 week ago',
    description: 'An AI-powered fitness tracking app that provides personalized workout plans and real-time performance feedback.',
    cofounders: ['Mike Rodriguez', 'Emily Davis'],
    fundingStage: 'Seed',
    milestoneProgress: 45,
  },
  {
    id: '3',
    name: 'PayFlow',
    initials: 'PF',
    color: 'bg-blue-600',
    industry: 'Fintech',
    stage: 'Idea',
    teamSize: 3,
    lastUpdated: '3 days ago',
    description: 'A blockchain-based payment platform for instant international transfers with zero transaction fees.',
    cofounders: ['James Chen'],
    fundingStage: 'Ideation',
    milestoneProgress: 20,
  },
  {
    id: '4',
    name: 'LearnHub',
    initials: 'LH',
    color: 'bg-orange-600',
    industry: 'EdTech',
    stage: 'Launched',
    teamSize: 12,
    lastUpdated: 'today',
    description: 'An adaptive learning platform that uses AI to personalize education for students of all ages and skill levels.',
    cofounders: ['Dr. Lisa Wong', 'Tom Anderson', 'Priya Patel'],
    fundingStage: 'Series B',
    milestoneProgress: 85,
  },
  {
    id: '5',
    name: 'EcoCart',
    initials: 'EC',
    color: 'bg-emerald-600',
    industry: 'E-commerce',
    stage: 'Scaling',
    teamSize: 25,
    lastUpdated: '4 days ago',
    description: 'A sustainable e-commerce platform connecting eco-conscious brands with environmentally aware consumers.',
    cofounders: ['Victoria Lee', 'Marcus Green'],
    fundingStage: 'Series A',
    milestoneProgress: 60,
  },
  {
    id: '6',
    name: 'Greenly',
    initials: 'GL',
    color: 'bg-emerald-600',
    industry: 'Sustainability',
    stage: 'Building',
    teamSize: 6,
    lastUpdated: '5 days ago',
    description: 'A carbon tracking and reduction tool for businesses to monitor and offset their environmental impact.',
    cofounders: ['Nina Gupta', 'David Park'],
    fundingStage: 'Seed',
    milestoneProgress: 35,
  },
  {
    id: '7',
    name: 'SecureVault',
    initials: 'SV',
    color: 'bg-red-600',
    industry: 'Fintech',
    stage: 'Launched',
    teamSize: 10,
    lastUpdated: '1 day ago',
    description: 'A decentralized password and credential management solution with military-grade encryption.',
    cofounders: ['Jack Morrison', 'Sophie Turner'],
    fundingStage: 'Series A',
    milestoneProgress: 70,
  },
  {
    id: '8',
    name: 'MediConnect',
    initials: 'MC',
    color: 'bg-pink-600',
    industry: 'Health',
    stage: 'Idea',
    teamSize: 2,
    lastUpdated: '1 week ago',
    description: 'A telemedicine platform connecting patients with specialists for remote consultations and follow-ups.',
    cofounders: ['Dr. Rajesh Kumar'],
    fundingStage: 'Ideation',
    milestoneProgress: 15,
  },
  {
    id: '9',
    name: 'CloudSync',
    initials: 'CS',
    color: 'bg-cyan-600',
    industry: 'SaaS',
    stage: 'Building',
    teamSize: 7,
    lastUpdated: '3 days ago',
    description: 'A multi-cloud data synchronization platform for enterprises managing data across different cloud providers.',
    cofounders: ['Kevin Zhang', 'Amanda Foster'],
    fundingStage: 'Seed',
    milestoneProgress: 50,
  },
  {
    id: '10',
    name: 'RetailAI',
    initials: 'RA',
    color: 'bg-indigo-600',
    industry: 'E-commerce',
    stage: 'Scaling',
    teamSize: 18,
    lastUpdated: '2 days ago',
    description: 'An AI-powered retail analytics platform that predicts customer behavior and optimizes inventory management.',
    cofounders: ['Jennifer Walsh', 'Rahul Sharma', 'Lisa Park'],
    fundingStage: 'Series A',
    milestoneProgress: 65,
  },
];

export default function MyStartupsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [selectedStage, setSelectedStage] = useState('All');
  const [currentView, setCurrentView] = useState<'kanban' | 'list'>('kanban');
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);

  // Filter startups based on search, industry, and stage
  const filteredStartups = useMemo(() => {
    return SAMPLE_STARTUPS.filter((startup) => {
      const matchesSearch =
        startup.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        startup.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesIndustry = selectedIndustry === 'All' || startup.industry === selectedIndustry;
      const matchesStage = selectedStage === 'All' || startup.stage === selectedStage;

      return matchesSearch && matchesIndustry && matchesStage;
    });
  }, [searchQuery, selectedIndustry, selectedStage]);

  // Group startups by stage for kanban view
  const startupsByStage = useMemo(() => {
    const stages: Record<string, Startup[]> = {
      Idea: [],
      Building: [],
      Launched: [],
      Scaling: [],
    };

    filteredStartups.forEach((startup) => {
      stages[startup.stage].push(startup);
    });

    return stages;
  }, [filteredStartups]);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Page Title and Subtitle */}
          <div className="p-4 bg-white border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">My Startups</h1>
            <p className="text-sm text-gray-600">
              Manage and track all your startup projects in one place
            </p>
          </div>

          {/* Main Content */}
          <div className="p-4">
            {/* Filter Toolbar */}
            <FilterToolbar
              onSearchChange={setSearchQuery}
              onIndustryChange={setSelectedIndustry}
              onStageChange={setSelectedStage}
              onViewChange={setCurrentView}
              currentView={currentView}
              searchQuery={searchQuery}
              selectedIndustry={selectedIndustry}
              selectedStage={selectedStage}
            />

            {/* Results count */}
            <div className="mb-3 text-sm text-gray-600">
              Showing {filteredStartups.length} {filteredStartups.length === 1 ? 'startup' : 'startups'}
            </div>

            {/* Kanban View */}
            {currentView === 'kanban' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <KanbanColumn
                  stage="Idea"
                  startups={startupsByStage.Idea}
                  onCardClick={setSelectedStartup}
                  onAddStartup={() => console.log('Add startup to Idea stage')}
                />
                <KanbanColumn
                  stage="Building"
                  startups={startupsByStage.Building}
                  onCardClick={setSelectedStartup}
                  onAddStartup={() => console.log('Add startup to Building stage')}
                />
                <KanbanColumn
                  stage="Launched"
                  startups={startupsByStage.Launched}
                  onCardClick={setSelectedStartup}
                  onAddStartup={() => console.log('Add startup to Launched stage')}
                />
                <KanbanColumn
                  stage="Scaling"
                  startups={startupsByStage.Scaling}
                  onCardClick={setSelectedStartup}
                  onAddStartup={() => console.log('Add startup to Scaling stage')}
                />
              </div>
            )}

            {/* List View */}
            {currentView === 'list' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900">
                          Industry
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900">
                          Stage
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900">
                          Team Size
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900">
                          Funding
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900">
                          Progress
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredStartups.map((startup) => (
                        <tr
                          key={startup.id}
                          onClick={() => setSelectedStartup(startup)}
                          className="hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs ${startup.color}`}
                              >
                                {startup.initials}
                              </div>
                              <span className="font-medium text-gray-900 text-sm">
                                {startup.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-700">{startup.industry}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{startup.stage}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{startup.teamSize}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{startup.fundingStage}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-2 bg-gray-200 rounded-full">
                                <div
                                  className="h-2 rounded-full bg-blue-600"
                                  style={{ width: `${startup.milestoneProgress}%` }}
                                />
                              </div>
                              <span className="text-xs font-medium text-gray-700 w-8">
                                {startup.milestoneProgress}%
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredStartups.length === 0 && (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <p className="text-gray-600 font-medium mb-1">No startups found</p>
                      <p className="text-sm text-gray-500">
                        Try adjusting your filters to see more results
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Empty state for kanban when no results */}
            {currentView === 'kanban' && filteredStartups.length === 0 && (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <p className="text-gray-600 font-medium mb-1">No startups found</p>
                  <p className="text-sm text-gray-500">
                    Try adjusting your filters to see more results
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Detail Panel */}
      <DetailPanel startup={selectedStartup} onClose={() => setSelectedStartup(null)} />
    </div>
  );
}
