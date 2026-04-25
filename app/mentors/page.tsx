'use client';

import { useState, useMemo } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import MentorTabs from '@/components/MentorTabs';
import MentorFilterToolbar from '@/components/MentorFilterToolbar';
import MentorGridCard, { Mentor } from '@/components/MentorGridCard';
import MentorProfileModal from '@/components/MentorProfileModal';
import AddMentorModal from '@/components/AddMentorModal';
import { Plus } from 'lucide-react';

// Sample mentor data
const INITIAL_MENTORS: Mentor[] = [
  {
    id: '1',
    name: 'David Thompson',
    title: 'Growth Lead',
    company: 'Uber',
    avatar: '🚀',
    bio: 'Helped scale 15+ startups to $10M+ ARR',
    expertise: ['Growth', 'Product', 'Fundraising'],
    status: 'Available Now',
    rating: 4.9,
    reviewCount: 42,
    sessionRate: '$250/hr',
    notableStartups: ['Stripe', 'Figma', 'Notion'],
    fullBio: 'David has 15+ years of experience in growth and scaling startups. He has worked with companies from early stage to Series C and beyond. His expertise spans product strategy, go-to-market, and fundraising.',
    reviews: [
      {
        id: '1',
        author: 'Alex Chen',
        rating: 5,
        text: 'Excellent mentor! David provided actionable advice on our growth strategy.',
      },
      {
        id: '2',
        author: 'Sam Patel',
        rating: 5,
        text: 'Very responsive and helpful. Highly recommend!',
      },
    ],
    isConnected: true,
  },
  {
    id: '2',
    name: 'Sarah Wilson',
    title: 'Product Director',
    company: 'Apple',
    avatar: '💻',
    bio: 'Led product strategy for 3 major product lines',
    expertise: ['Product', 'Tech'],
    status: 'Scheduled',
    rating: 4.7,
    reviewCount: 38,
    sessionRate: '$200/hr',
    notableStartups: ['Slack', 'Dropbox'],
    fullBio: 'Sarah is an experienced product director with a track record of building world-class products. She excels at product strategy, user research, and cross-functional leadership.',
    reviews: [
      {
        id: '1',
        author: 'Jordan Lee',
        rating: 5,
        text: 'Sarah gave us a completely new perspective on our product roadmap.',
      },
      {
        id: '2',
        author: 'Maria Garcia',
        rating: 4,
        text: 'Great insights on user research and validation.',
      },
    ],
    isConnected: true,
  },
  {
    id: '3',
    name: 'Mike Rodriguez',
    title: 'Founding Partner',
    company: 'Sequoia Capital',
    avatar: '💰',
    bio: 'Deep expertise in early-stage fundraising & investor relations',
    expertise: ['Fundraising', 'Growth'],
    status: 'Busy',
    rating: 4.8,
    reviewCount: 56,
    sessionRate: '$300/hr',
    notableStartups: ['Airbnb', 'Instagram', 'WhatsApp'],
    fullBio: 'Mike is a seasoned investor and fundraising expert. He has helped hundreds of founders navigate the fundraising process and build relationships with top-tier investors.',
    reviews: [
      {
        id: '1',
        author: 'Lisa Wong',
        rating: 5,
        text: 'Mike connected us with 3 major investors. Game changer!',
      },
    ],
    isConnected: false,
  },
  {
    id: '4',
    name: 'Emily Hayes',
    title: 'Marketing Leader',
    company: 'Meta',
    avatar: '📱',
    bio: 'Built marketing from scratch for 5 startups',
    expertise: ['Marketing', 'Growth'],
    status: 'Available Now',
    rating: 4.6,
    reviewCount: 31,
    sessionRate: '$180/hr',
    notableStartups: ['Canva', 'Atlassian'],
    fullBio: 'Emily has deep experience in building marketing functions from scratch. She specializes in brand building, demand generation, and marketing strategy.',
    reviews: [
      {
        id: '1',
        author: 'Tom Anderson',
        rating: 4,
        text: 'Helped us structure our marketing team effectively.',
      },
    ],
    isConnected: false,
  },
  {
    id: '5',
    name: 'James Chen',
    title: 'CTO',
    company: 'Google',
    avatar: '🔬',
    bio: 'Expert in scalable architecture and engineering',
    expertise: ['Tech', 'Product'],
    status: 'Available Now',
    rating: 4.9,
    reviewCount: 48,
    sessionRate: '$250/hr',
    notableStartups: ['Twitch', 'Square'],
    fullBio: 'James is a technical expert with 12+ years of experience building scalable systems. He helps founders think about architecture, tech stack choices, and team building.',
    reviews: [
      {
        id: '1',
        author: 'Chris Martinez',
        rating: 5,
        text: 'James gave us the technical foundation we needed.',
      },
    ],
    isConnected: false,
  },
  {
    id: '6',
    name: 'Priya Patel',
    title: 'Corporate Lawyer',
    company: 'Cooley LLP',
    avatar: '⚖️',
    bio: 'Specialized in startup legal matters and cap tables',
    expertise: ['Legal', 'Fundraising'],
    status: 'Scheduled',
    rating: 4.8,
    reviewCount: 29,
    sessionRate: '$220/hr',
    notableStartups: ['Lyft', 'Pinterest'],
    fullBio: 'Priya is a startup specialist lawyer with deep expertise in equity, fundraising, and company formation. She helps founders understand their legal obligations.',
    reviews: [
      {
        id: '1',
        author: 'Rachel Green',
        rating: 5,
        text: 'Saved us thousands in legal fees with her guidance.',
      },
    ],
    isConnected: false,
  },
  {
    id: '7',
    name: 'Marcus Johnson',
    title: 'VP Sales',
    company: 'Salesforce',
    avatar: '📈',
    bio: 'Built enterprise sales teams from 0 to $100M ARR',
    expertise: ['Growth', 'Fundraising'],
    status: 'Offline',
    rating: 4.7,
    reviewCount: 35,
    sessionRate: '$200/hr',
    notableStartups: ['HubSpot', 'Zendesk'],
    fullBio: 'Marcus has extensive experience in building and scaling enterprise sales organizations. He helps startups develop sales strategies and build world-class sales teams.',
    reviews: [
      {
        id: '1',
        author: 'Kevin Park',
        rating: 4,
        text: 'Great guidance on sales process and metrics.',
      },
    ],
    isConnected: false,
  },
  {
    id: '8',
    name: 'Nina Gupta',
    title: 'Founder & CEO',
    company: 'GreenTech Solutions',
    avatar: '🌱',
    bio: 'Serial entrepreneur with 3 successful exits',
    expertise: ['Growth', 'Product', 'Fundraising'],
    status: 'Available Now',
    rating: 4.9,
    reviewCount: 52,
    sessionRate: '$300/hr',
    notableStartups: ['Own startups', 'Multiple boards'],
    fullBio: 'Nina is a serial entrepreneur who has founded and scaled multiple successful companies. She brings real-world experience to her mentoring.',
    reviews: [
      {
        id: '1',
        author: 'Victoria Lee',
        rating: 5,
        text: 'Nina understood our challenges because she has been there.',
      },
    ],
    isConnected: false,
  },
  {
    id: '9',
    name: 'Robert Chang',
    title: 'Head of Operations',
    company: 'Netflix',
    avatar: '🎬',
    bio: 'Expert in scaling operations and processes',
    expertise: ['Product', 'Growth'],
    status: 'Busy',
    rating: 4.5,
    reviewCount: 24,
    sessionRate: '$180/hr',
    notableStartups: ['Coursera', 'Spotify'],
    fullBio: 'Robert brings operational excellence expertise. He helps startups build scalable operations and processes as they grow.',
    reviews: [
      {
        id: '1',
        author: 'David Kim',
        rating: 4,
        text: 'Helped us think about operational efficiency.',
      },
    ],
    isConnected: false,
  },
  {
    id: '10',
    name: 'Lisa Wong',
    title: 'Design Director',
    company: 'Adobe',
    avatar: '🎨',
    bio: 'Passionate about product design and UX',
    expertise: ['Product', 'Marketing'],
    status: 'Available Now',
    rating: 4.8,
    reviewCount: 36,
    sessionRate: '$190/hr',
    notableStartups: ['Airbnb', 'Uber Eats'],
    fullBio: 'Lisa is a design expert with a deep understanding of user-centered design. She helps founders build beautiful and intuitive products.',
    reviews: [
      {
        id: '1',
        author: 'Alex Turner',
        rating: 5,
        text: 'Lisa transformed our product design approach.',
      },
    ],
    isConnected: false,
  },
  {
    id: '11',
    name: 'Thomas Anderson',
    title: 'Finance Director',
    company: 'McKinsey',
    avatar: '💹',
    bio: 'Finance strategy and fundraising preparation',
    expertise: ['Fundraising', 'Growth'],
    status: 'Scheduled',
    rating: 4.6,
    reviewCount: 28,
    sessionRate: '$210/hr',
    notableStartups: ['Scale AI', 'Airbnb'],
    fullBio: 'Thomas specializes in financial strategy for startups. He helps founders prepare for fundraising and build financial models.',
    reviews: [
      {
        id: '1',
        author: 'Monica Sharma',
        rating: 4,
        text: 'Great help with our financial projections.',
      },
    ],
    isConnected: false,
  },
  {
    id: '12',
    name: 'Jennifer Lee',
    title: 'HR Director',
    company: 'LinkedIn',
    avatar: '👥',
    bio: 'Expert in early-stage team building and culture',
    expertise: ['Growth', 'Product'],
    status: 'Available Now',
    rating: 4.7,
    reviewCount: 33,
    sessionRate: '$170/hr',
    notableStartups: ['Figma', 'Discord'],
    fullBio: 'Jennifer helps early-stage startups build strong teams and establish healthy company culture from day one.',
    reviews: [
      {
        id: '1',
        author: 'Sarah Johnson',
        rating: 5,
        text: 'Invaluable guidance on hiring and team structure.',
      },
    ],
    isConnected: false,
  },
];

export default function MentorsPage() {
  const [activeTab, setActiveTab] = useState<'my-mentors' | 'discover'>('discover');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState('All');
  const [selectedAvailability, setSelectedAvailability] = useState('All');
  const [selectedRating, setSelectedRating] = useState('All');
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);

  const [mentors, setMentors] = useState<Mentor[]>(INITIAL_MENTORS);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Get my mentors
  const myMentors = mentors.filter((m) => m.isConnected);

  // Filter mentors based on active tab and filters
  const filteredMentors = useMemo(() => {
    const mentorsToFilter = activeTab === 'my-mentors' ? myMentors : mentors;

    return mentorsToFilter.filter((mentor) => {
      const matchesSearch =
        mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.expertise.some((exp) => exp.toLowerCase().includes(searchQuery.toLowerCase())) ||
        mentor.bio.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesExpertise =
        selectedExpertise === 'All' || mentor.expertise.includes(selectedExpertise);

      const matchesAvailability =
        selectedAvailability === 'All' || mentor.status === selectedAvailability;

      const ratingThreshold =
        selectedRating === 'All'
          ? true
          : selectedRating === '4★+'
            ? mentor.rating >= 4.0
            : selectedRating === '3★+'
              ? mentor.rating >= 3.0
              : true;

      return matchesSearch && matchesExpertise && matchesAvailability && ratingThreshold;
    });
  }, [activeTab, searchQuery, selectedExpertise, selectedAvailability, selectedRating, myMentors]);

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
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Mentors</h1>
            <p className="text-sm text-gray-600">
              Connect with expert mentors to accelerate your growth
            </p>
          </div>

          {/* Tabs */}
          <MentorTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            myMentorsCount={myMentors.length}
          />

          {/* Main Content */}
          <div className="p-4">
            {/* Filter Toolbar */}
            <MentorFilterToolbar
              onSearchChange={setSearchQuery}
              onExpertiseChange={setSelectedExpertise}
              onAvailabilityChange={setSelectedAvailability}
              onRatingChange={setSelectedRating}
              searchQuery={searchQuery}
              selectedExpertise={selectedExpertise}
              selectedAvailability={selectedAvailability}
              selectedRating={selectedRating}
            />

            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-600">
                Showing {filteredMentors.length} {filteredMentors.length === 1 ? 'mentor' : 'mentors'}
              </div>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors"
              >
                <Plus size={16} />
                Add Mentor
              </button>
            </div>

            {/* Empty State for My Mentors */}
            {activeTab === 'my-mentors' && filteredMentors.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">No mentors yet</h3>
                <p className="text-gray-600 mb-6 text-center max-w-sm">
                  You haven't connected with any mentors yet. Browse available mentors and book your first session!
                </p>
                <button
                  onClick={() => setActiveTab('discover')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors"
                >
                  Browse Mentors
                </button>
              </div>
            )}

            {/* Mentor Grid */}
            {filteredMentors.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredMentors.map((mentor) => (
                  <MentorGridCard
                    key={mentor.id}
                    mentor={mentor}
                    onViewProfile={setSelectedMentor}
                    onBookMeeting={() => console.log(`Book meeting with ${mentor.name}`)}
                  />
                ))}
              </div>
            )}

            {/* Empty state for filters */}
            {filteredMentors.length === 0 && activeTab === 'discover' && (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <p className="text-gray-600 font-medium mb-1">No mentors found</p>
                  <p className="text-sm text-gray-500">
                    Try adjusting your filters to find the right mentor
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Profile Modal */}
      <MentorProfileModal
        mentor={selectedMentor}
        onClose={() => setSelectedMentor(null)}
        onBookMeeting={() => console.log(`Book meeting with ${selectedMentor?.name}`)}
      />

      {/* Add Mentor Modal */}
      <AddMentorModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={(newMentor) => {
          setMentors([...mentors, newMentor]);
        }}
      />
    </div>
  );
}
