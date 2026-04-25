'use client';

import { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import StatCard from '@/components/StatCard';
import MilestoneFilterToolbar from '@/components/MilestoneFilterToolbar';
import MilestoneGroup from '@/components/MilestoneGroup';
import MilestoneDetailPanel from '@/components/MilestoneDetailPanel';
import AddMilestoneModal from '@/components/AddMilestoneModal';
import { Milestone } from '@/components/MilestoneItem';
import {
  CheckCircle,
  Clock,
  AlertCircle,
  ListTodo,
} from 'lucide-react';

// Sample startup data
const SAMPLE_STARTUPS = [
  { id: '1', name: 'TaskFlow', color: 'bg-purple-600' },
  { id: '2', name: 'FitTrack', color: 'bg-green-600' },
  { id: '3', name: 'PayFlow', color: 'bg-blue-600' },
  { id: '4', name: 'LearnHub', color: 'bg-orange-600' },
  { id: '5', name: 'EcoCart', color: 'bg-emerald-600' },
];

// Team members for assignment
const TEAM_MEMBERS = [
  { id: '1', name: 'Alex Johnson', avatar: 'A' },
  { id: '2', name: 'Sarah Chen', avatar: 'S' },
  { id: '3', name: 'Mike Rodriguez', avatar: 'M' },
  { id: '4', name: 'Emily Davis', avatar: 'E' },
  { id: '5', name: 'James Carter', avatar: 'J' },
];

// Sample milestone data
const SAMPLE_MILESTONES: Milestone[] = [
  {
    id: '1',
    title: 'User Authentication System',
    description: 'Implement OAuth2 authentication with Google and GitHub providers',
    startupId: '1',
    startupName: 'TaskFlow',
    dueDate: '2026-05-15',
    status: 'In Progress',
    priority: 'High',
    assignee: { name: 'Alex Johnson', avatar: 'A' },
    checklist: [
      { id: '1', title: 'Setup OAuth2 providers', completed: true },
      { id: '2', title: 'Create login UI', completed: true },
      { id: '3', title: 'Implement token management', completed: false },
      { id: '4', title: 'Add logout functionality', completed: false },
    ],
    comments: [
      {
        id: '1',
        author: 'Sarah Chen',
        avatar: 'S',
        text: 'Great progress! Let me know when the token management is ready.',
        timestamp: '2 days ago',
      },
    ],
    attachments: [
      { id: '1', name: 'oauth2-implementation.pdf', size: '2.4 MB' },
    ],
  },
  {
    id: '2',
    title: 'Database Schema Design',
    description: 'Design and implement the core database schema for task management',
    startupId: '1',
    startupName: 'TaskFlow',
    dueDate: '2026-04-30',
    status: 'Completed',
    priority: 'High',
    assignee: { name: 'Mike Rodriguez', avatar: 'M' },
    checklist: [
      { id: '1', title: 'Define entity relationships', completed: true },
      { id: '2', title: 'Create migration scripts', completed: true },
      { id: '3', title: 'Write indexes', completed: true },
    ],
    comments: [
      {
        id: '1',
        author: 'Alex Johnson',
        avatar: 'A',
        text: 'Excellent work! The schema is optimized and ready for production.',
        timestamp: '1 week ago',
      },
    ],
    attachments: [],
  },
  {
    id: '3',
    title: 'Mobile App Development',
    description: 'Develop iOS and Android apps for fitness tracking',
    startupId: '2',
    startupName: 'FitTrack',
    dueDate: '2026-06-30',
    status: 'In Progress',
    priority: 'Medium',
    assignee: { name: 'Emily Davis', avatar: 'E' },
    checklist: [
      { id: '1', title: 'Setup project structure', completed: true },
      { id: '2', title: 'Implement basic UI', completed: true },
      { id: '3', title: 'Add fitness tracking sensors', completed: false },
      { id: '4', title: 'Create backend API', completed: false },
    ],
    comments: [],
    attachments: [],
  },
  {
    id: '4',
    title: 'Payment Gateway Integration',
    description: 'Integrate Stripe for payment processing',
    startupId: '3',
    startupName: 'PayFlow',
    dueDate: '2026-04-20',
    status: 'Overdue',
    priority: 'High',
    assignee: { name: 'James Carter', avatar: 'J' },
    checklist: [
      { id: '1', title: 'Setup Stripe account', completed: true },
      { id: '2', title: 'Create payment form', completed: false },
      { id: '3', title: 'Implement webhooks', completed: false },
    ],
    comments: [
      {
        id: '1',
        author: 'Mike Rodriguez',
        avatar: 'M',
        text: 'This is urgent. Can we prioritize this?',
        timestamp: '3 days ago',
      },
    ],
    attachments: [
      { id: '1', name: 'stripe-integration-guide.pdf', size: '1.2 MB' },
    ],
  },
  {
    id: '5',
    title: 'Course Curriculum Design',
    description: 'Create comprehensive course materials for AI and Machine Learning',
    startupId: '4',
    startupName: 'LearnHub',
    dueDate: '2026-07-31',
    status: 'Pending',
    priority: 'Medium',
    assignee: { name: 'Sarah Chen', avatar: 'S' },
    checklist: [
      { id: '1', title: 'Outline course structure', completed: false },
      { id: '2', title: 'Write module content', completed: false },
      { id: '3', title: 'Create video scripts', completed: false },
    ],
    comments: [],
    attachments: [],
  },
  {
    id: '6',
    title: 'Sustainable Packaging Solution',
    description: 'Develop eco-friendly packaging for all products',
    startupId: '5',
    startupName: 'EcoCart',
    dueDate: '2026-05-30',
    status: 'In Progress',
    priority: 'High',
    assignee: { name: 'Alex Johnson', avatar: 'A' },
    checklist: [
      { id: '1', title: 'Research materials', completed: true },
      { id: '2', title: 'Get supplier quotes', completed: true },
      { id: '3', title: 'Design packaging', completed: false },
      { id: '4', title: 'Test durability', completed: false },
    ],
    comments: [],
    attachments: [
      { id: '1', name: 'packaging-designs.zip', size: '5.8 MB' },
    ],
  },
  {
    id: '7',
    title: 'Analytics Dashboard',
    description: 'Build comprehensive analytics dashboard for business metrics',
    startupId: '1',
    startupName: 'TaskFlow',
    dueDate: '2026-05-20',
    status: 'Pending',
    priority: 'Low',
    assignee: { name: 'Emily Davis', avatar: 'E' },
    checklist: [
      { id: '1', title: 'Design dashboard wireframes', completed: false },
      { id: '2', title: 'Connect data sources', completed: false },
    ],
    comments: [],
    attachments: [],
  },
  {
    id: '8',
    title: 'User Testing & Feedback',
    description: 'Conduct user testing sessions and gather feedback',
    startupId: '2',
    startupName: 'FitTrack',
    dueDate: '2026-05-10',
    status: 'Completed',
    priority: 'Medium',
    assignee: { name: 'James Carter', avatar: 'J' },
    checklist: [
      { id: '1', title: 'Recruit test users', completed: true },
      { id: '2', title: 'Conduct sessions', completed: true },
      { id: '3', title: 'Analyze feedback', completed: true },
    ],
    comments: [],
    attachments: [
      { id: '1', name: 'user-testing-report.pdf', size: '3.2 MB' },
    ],
  },
  {
    id: '9',
    title: 'Security Audit',
    description: 'Perform comprehensive security audit and fix vulnerabilities',
    startupId: '3',
    startupName: 'PayFlow',
    dueDate: '2026-05-25',
    status: 'In Progress',
    priority: 'High',
    assignee: { name: 'Mike Rodriguez', avatar: 'M' },
    checklist: [
      { id: '1', title: 'Scan for vulnerabilities', completed: true },
      { id: '2', title: 'Review code security', completed: false },
      { id: '3', title: 'Implement fixes', completed: false },
      { id: '4', title: 'Verify compliance', completed: false },
    ],
    comments: [],
    attachments: [],
  },
  {
    id: '10',
    title: 'Partnership Agreements',
    description: 'Finalize partnership agreements with key stakeholders',
    startupId: '4',
    startupName: 'LearnHub',
    dueDate: '2026-06-15',
    status: 'Pending',
    priority: 'Medium',
    assignee: { name: 'Sarah Chen', avatar: 'S' },
    checklist: [
      { id: '1', title: 'Draft agreements', completed: false },
      { id: '2', title: 'Get legal review', completed: false },
      { id: '3', title: 'Sign with partners', completed: false },
    ],
    comments: [],
    attachments: [],
  },
];

export default function MilestonesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStartup, setSelectedStartup] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Filter milestones based on all criteria
  const filteredMilestones = useMemo(() => {
    return SAMPLE_MILESTONES.filter((milestone) => {
      const matchesSearch =
        milestone.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        milestone.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStartup = selectedStartup === 'All' || milestone.startupId === selectedStartup;
      const matchesStatus = selectedStatus === 'All' || milestone.status === selectedStatus;
      const matchesDateFrom = !dateFrom || new Date(milestone.dueDate) >= new Date(dateFrom);
      const matchesDateTo = !dateTo || new Date(milestone.dueDate) <= new Date(dateTo);

      return matchesSearch && matchesStartup && matchesStatus && matchesDateFrom && matchesDateTo;
    });
  }, [searchQuery, selectedStartup, selectedStatus, dateFrom, dateTo]);

  // Group milestones by startup
  const milestonesByStartup = useMemo(() => {
    const grouped: Record<
      string,
      {
        name: string;
        color: string;
        milestones: Milestone[];
        total: number;
        completed: number;
      }
    > = {};

    // Initialize groups for all startups
    SAMPLE_STARTUPS.forEach((startup) => {
      grouped[startup.id] = {
        name: startup.name,
        color: startup.color,
        milestones: [],
        total: 0,
        completed: 0,
      };
    });

    // Count total and completed milestones per startup
    SAMPLE_MILESTONES.forEach((milestone) => {
      if (grouped[milestone.startupId]) {
        grouped[milestone.startupId].total++;
        if (milestone.status === 'Completed') {
          grouped[milestone.startupId].completed++;
        }
      }
    });

    // Add filtered milestones to groups
    filteredMilestones.forEach((milestone) => {
      grouped[milestone.startupId].milestones.push(milestone);
    });

    return grouped;
  }, [filteredMilestones]);

  // Calculate stats
  const stats = useMemo(() => {
    const total = SAMPLE_MILESTONES.length;
    const completed = SAMPLE_MILESTONES.filter((m) => m.status === 'Completed').length;
    const inProgress = SAMPLE_MILESTONES.filter((m) => m.status === 'In Progress').length;
    const overdue = SAMPLE_MILESTONES.filter((m) => m.status === 'Overdue').length;

    return { total, completed, inProgress, overdue };
  }, []);

  const handleAddMilestone = (data: any) => {
    // Here you would add the milestone to your data source
    console.log('New milestone:', data);
    setIsAddModalOpen(false);
  };

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
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">Milestones</h1>
                <p className="text-sm text-gray-600">
                  Track goals across all your startups
                </p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors flex items-center gap-1.5"
              >
                <Plus size={16} />
                Add Milestone
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-4">
            {/* Summary Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
              <StatCard
                title="Total Milestones"
                value={stats.total}
                icon={<ListTodo size={24} className="text-purple-600" />}
              />
              <StatCard
                title="Completed"
                value={stats.completed}
                icon={<CheckCircle size={24} className="text-green-600" />}
                description={`${stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}% complete`}
              />
              <StatCard
                title="In Progress"
                value={stats.inProgress}
                icon={<Clock size={24} className="text-blue-600" />}
              />
              <StatCard
                title="Overdue"
                value={stats.overdue}
                icon={<AlertCircle size={24} className="text-red-600" />}
              />
            </div>

            {/* Filter Toolbar */}
            <MilestoneFilterToolbar
              onSearchChange={setSearchQuery}
              onStartupChange={setSelectedStartup}
              onStatusChange={setSelectedStatus}
              onDateFromChange={setDateFrom}
              onDateToChange={setDateTo}
              searchQuery={searchQuery}
              selectedStartup={selectedStartup}
              selectedStatus={selectedStatus}
              dateFrom={dateFrom}
              dateTo={dateTo}
              startups={SAMPLE_STARTUPS}
            />

            {/* Results count */}
            <div className="mb-3 text-sm text-gray-600">
              Showing {filteredMilestones.length} {filteredMilestones.length === 1 ? 'milestone' : 'milestones'}
            </div>

            {/* Milestone Groups */}
            <div className="space-y-4">
              {Object.entries(milestonesByStartup).map(([startupId, group]) => (
                group.total > 0 && (
                  <MilestoneGroup
                    key={startupId}
                    startupId={startupId}
                    startupName={group.name}
                    startupColor={group.color}
                    milestones={group.milestones}
                    totalMilestones={group.total}
                    completedMilestones={group.completed}
                    onMilestoneClick={setSelectedMilestone}
                  />
                )
              ))}
            </div>

            {/* Empty State */}
            {filteredMilestones.length === 0 && (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <p className="text-gray-600 font-medium mb-1">No milestones found</p>
                  <p className="text-sm text-gray-500">
                    Try adjusting your filters or create a new milestone to get started
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Detail Panel */}
      <MilestoneDetailPanel
        milestone={selectedMilestone}
        onClose={() => setSelectedMilestone(null)}
      />

      {/* Add Milestone Modal */}
      <AddMilestoneModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddMilestone}
        startups={SAMPLE_STARTUPS}
        teamMembers={TEAM_MEMBERS}
      />
    </div>
  );
}
