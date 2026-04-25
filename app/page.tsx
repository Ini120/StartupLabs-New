import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import StatCard from '@/components/StatCard';
import ProfileCard from '@/components/ProfileCard';
import ProgressChart from '@/components/ProgressChart';
import MilestoneChart from '@/components/MilestoneChart';
import StartupCard from '@/components/StartupCard';
import MentorCard from '@/components/MentorCard';
import MeetingCard from '@/components/MeetingCard';
import MessageCard from '@/components/MessageCard';
import {
  Rocket,
  ListTodo,
  CheckCircle,
  TrendingUp,
  CheckSquare,
  Activity,
  BookOpen,
  Sprout,
  Zap,
  Activity as ActivityIcon,
  Coins,
  Award,
} from 'lucide-react';

const stats = [
  { title: 'Total Startups', value: 12, icon: <Rocket size={24} className="text-blue-600" />, description: '+2 this month' },
  { title: 'Active Milestones', value: 28, icon: <ListTodo size={24} className="text-purple-600" />, description: '+5 this week' },
  { title: 'Completed Milestones', value: 16, icon: <CheckCircle size={24} className="text-green-600" />, description: '80% success rate' },
  { title: 'Productivity Score', value: '78%', icon: <TrendingUp size={24} className="text-orange-600" />, description: 'On track' },
];

const myStartups: Array<{ name: string; icon: React.ReactNode; category: string; status: 'New' | 'Live' | 'Growth'; progress: number; color: string }> = [
  { name: 'TaskFlow', icon: <CheckSquare size={20} className="text-purple-600" />, category: 'Task Management', status: 'Live', progress: 75, color: 'bg-purple-500' },
  { name: 'FitTrack', icon: <Activity size={20} className="text-green-600" />, category: 'Fitness Tracking', status: 'Live', progress: 45, color: 'bg-green-500' },
  { name: 'LearnHub', icon: <BookOpen size={20} className="text-orange-600" />, category: 'EdTech', status: 'Growth', progress: 60, color: 'bg-orange-500' },
  { name: 'Greenly', icon: <Sprout size={20} className="text-emerald-600" />, category: 'Sustainability', status: 'Live', progress: 30, color: 'bg-emerald-500' },
];

const meetings = [
  { title: 'Mentor Meeting', with: 'David Thompson', time: 'Tomorrow', date: '11:00 AM', avatar: 'D' },
  { title: 'Product Strategy Call', with: 'Sarah Wilson', time: 'Fri, 06 Mar', date: '02:00 PM', avatar: 'S' },
];

const messages = [
  { name: 'David Thompson', message: "Hey Alex, how's the progress on...", time: '10:30 AM', avatar: 'D', unread: true },
  { name: 'Sarah Wilson', message: 'Can you share the product roadmap?', time: 'Yesterday', avatar: 'S', unread: false },
  { name: 'James Carter', message: "Let's catch up this week.", time: 'Yesterday', avatar: 'J', unread: false },
];

const lobbyStartups = [
  { name: 'InnoVerse', icon: <Zap size={20} className="text-yellow-600" />, progress: 82, category: 'AI Assistant Platform' },
  { name: 'Healthify', icon: <ActivityIcon size={20} className="text-red-600" />, progress: 72, category: 'Health & Fitness' },
  { name: 'CryptoX', icon: <Coins size={20} className="text-orange-600" />, progress: 58, category: 'Crypto Trading App' },
  { name: 'SkillUp', icon: <Award size={20} className="text-blue-600" />, progress: 60, category: 'Learning Platform' },
];

export default function Home() {
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
          {/* Top Stats Grid */}
          <div className="p-4 bg-white border-b border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {stats.map((stat) => (
                <StatCard
                  key={stat.title}
                  title={stat.title}
                  value={stat.value}
                  icon={stat.icon}
                  description={stat.description}
                />
              ))}
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="p-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Left Column - Profile */}
              <div className="lg:col-span-2 space-y-4">
                <ProfileCard />
              </div>

              {/* Middle Column - Charts and Startups */}
              <div className="lg:col-span-5 space-y-4">
                {/* Charts Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ProgressChart />
                  <MilestoneChart />
                </div>

                {/* My Startups Section */}
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-base font-bold text-gray-900">My Startups</h3>
                    <a href="#" className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                      View All
                    </a>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {myStartups.map((startup) => (
                      <StartupCard
                        key={startup.name}
                        name={startup.name}
                        icon={startup.icon}
                        category={startup.category}
                        status={startup.status}
                        progress={startup.progress}
                        color={startup.color}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Mentor, Meetings, Messages */}
              <div className="lg:col-span-5 space-y-4">
                {/* Mentor Card */}
                <MentorCard
                  name="David Thompson"
                  role="Growth Mentor"
                  status="Available"
                  bio="Helping founders scale their product and grow revenue."
                  avatar="🚀"
                />

                {/* Upcoming Meetings */}
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-base font-bold text-gray-900">Upcoming Meetings</h3>
                    <a href="#" className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                      View All
                    </a>
                  </div>
                  {meetings.map((meeting, idx) => (
                    <MeetingCard
                      key={idx}
                      title={meeting.title}
                      with={meeting.with}
                      time={meeting.time}
                      date={meeting.date}
                      avatar={meeting.avatar}
                    />
                  ))}
                </div>

                {/* Messages */}
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-base font-bold text-gray-900">Messages</h3>
                    <a href="#" className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                      View All
                    </a>
                  </div>
                  <div className="space-y-0.5">
                    {messages.map((message, idx) => (
                      <MessageCard
                        key={idx}
                        name={message.name}
                        message={message.message}
                        time={message.time}
                        avatar={message.avatar}
                        unread={message.unread}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Section - Top Startups in Lobby */}
            <div className="mt-4 bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-gray-900">Top Startups in Lobby</h3>
                <a href="#" className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                  View All
                </a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {lobbyStartups.map((startup) => (
                  <div key={startup.name} className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-sm">
                        {startup.icon}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-xs">{startup.name}</p>
                        <p className="text-xs text-gray-500">{startup.category}</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="h-1.5 rounded-full bg-blue-500 transition-all duration-300"
                        style={{ width: `${startup.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-1 text-right">{startup.progress}%</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
