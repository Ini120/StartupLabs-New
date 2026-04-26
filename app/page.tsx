<<<<<<< HEAD
"use client";
=======
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
import Link from 'next/link';
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
>>>>>>> d3af74e (save local changes)

import { useState } from 'react'
import type { MetricKey } from '@/types'
import { STARTUPS } from '@/data/startups'
import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'
import FinancialGrid from '@/components/FinancialGrid'
import QuarterlyChart from '@/components/QuarterlyChart'
import UsageGrid from '@/components/UsageGrid'
import MilestoneList from '@/components/MilestoneList'
import FinanceTab from '@/components/FinanceTab'
import TeamTab from '@/components/TeamTab'
import VisualizationsTab from '@/components/VisualizationsTab'
import MilestonesTab from '@/components/MilestonesTab'

type DashboardTab = 'info' | 'finance' | 'visualizations' | 'milestones' | 'team'

const TABS: Array<{ key: DashboardTab; label: string }> = [
  { key: 'info', label: 'Info' },
  { key: 'finance', label: 'Finance' },
  { key: 'visualizations', label: 'Visualizations' },
  { key: 'milestones', label: 'Milestones' },
  { key: 'team', label: 'Team' },
]

function getHealthScore(statuses: Array<'red' | 'green' | 'gray'>) {
  const total = statuses.reduce((acc, status) => {
    if (status === 'green') return acc + 1
    if (status === 'gray') return acc + 0.6
    return acc + 0.2
  }, 0)
  return Math.round((total / statuses.length) * 100)
}

function getHealthLabel(score: number) {
  if (score >= 75) return 'Strong'
  if (score >= 50) return 'Watch'
  return 'At Risk'
}

export default function Home() {
  const [activeStartup, setActiveStartup] = useState<string>('Vertex')
  const [activeMetric, setActiveMetric] = useState<MetricKey>('arr')
  const [activeTab, setActiveTab] = useState<DashboardTab>('info')

  const startup = STARTUPS[activeStartup]
  const healthScore = getHealthScore(startup.kpis.map((item) => item.status))

  const infoMetrics = [
    { label: 'ARR', value: startup.financials.arr, helper: `${startup.stage} · ${startup.sector}` },
    { label: 'Revenue Growth', value: startup.financials.mom, helper: `WoW ${startup.financials.wow} · QoQ ${startup.financials.qoq}` },
    { label: 'DAU', value: startup.usage.dau, helper: `MAU ${startup.usage.mau}` },
    { label: 'Quick Status', value: `${healthScore}/100`, helper: getHealthLabel(healthScore) },
  ]

  return (
<<<<<<< HEAD
    <div className="dashboard-shell min-h-screen bg-bg text-slate-900">
      <Sidebar activeStartup={activeStartup} setActiveStartup={setActiveStartup} />
=======
    <div className="flex h-screen bg-gray-50 overflow-hidden flex-col lg:flex-row">
      {/* Sidebar */}
      <Sidebar />
>>>>>>> d3af74e (save local changes)

      <main className="min-h-screen min-w-0 bg-bg">
        <Topbar startup={startup} />

        <div className="space-y-6 p-6">
          <section className="rounded-2xl border border-border bg-card p-2">
            <nav className="flex flex-wrap items-center gap-2">
              {TABS.map((tab, index) => {
                const active = tab.key === activeTab
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className={`rounded-xl px-4 py-2 font-space text-[12px] font-semibold transition-all duration-150 ${active ? 'bg-brand-accent text-white' : 'text-brand-muted hover:bg-bg-3 hover:text-slate-900'}`}
                  >
                    {tab.label}
                    {index < TABS.length - 1 ? <span className="ml-3 text-brand-dim">||</span> : null}
                  </button>
                )
              })}
            </nav>
          </section>

<<<<<<< HEAD
          {activeTab === 'info' ? (
            <div className="space-y-6">
              <section className="grid gap-3 lg:grid-cols-4">
                {infoMetrics.map((metric) => (
                  <article key={metric.label} className="rounded-2xl border border-border bg-card px-5 py-4">
                    <p className="font-space text-[10px] uppercase tracking-[1.2px] text-brand-muted">{metric.label}</p>
                    <p className="mt-2 font-syne text-[28px] font-extrabold tracking-tight text-slate-900">{metric.value}</p>
                    <p className="mt-1 font-space text-[11px] text-brand-muted">{metric.helper}</p>
                  </article>
=======
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
                    <Link href="/my-startups" className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                      View All
                    </Link>
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
                    <Link href="/meetings" className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                      View All
                    </Link>
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
                    <Link href="/messages" className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                      View All
                    </Link>
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
                <Link href="/lobby" className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                  View All
                </Link>
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
>>>>>>> d3af74e (save local changes)
                ))}
              </section>

              <FinancialGrid startup={startup} />
              <UsageGrid startup={startup} />
              <QuarterlyChart startup={startup} activeMetric={activeMetric} setActiveMetric={setActiveMetric} />
              <MilestoneList startup={startup} />
            </div>
          ) : null}

          {activeTab === 'finance' ? <FinanceTab startup={startup} /> : null}

          {activeTab === 'visualizations' ? (
            <VisualizationsTab
              startup={startup}
              activeMetric={activeMetric}
              setActiveMetric={setActiveMetric}
            />
          ) : null}

          {activeTab === 'milestones' ? <MilestonesTab startup={startup} /> : null}

          {activeTab === 'team' ? <TeamTab startup={startup} /> : null}

          <div className="h-6" aria-hidden>
            <div className="h-full" />
          </div>
        </div>
      </main>
    </div>
  )
}
