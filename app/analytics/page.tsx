'use client';

import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import StatCard from '@/components/StatCard';
import { BarChart3, CheckCircle2, Clock3, TrendingUp } from 'lucide-react';
import { SetStateAction } from 'react';

const KPI_ITEMS = [
  {
    title: 'Total Startups',
    value: 12,
    description: '+2 this month',
    icon: <BarChart3 size={20} className="text-blue-600" />,
  },
  {
    title: 'Milestones Completed',
    value: 48,
    description: '83% completion rate',
    icon: <CheckCircle2 size={20} className="text-green-600" />,
  },
  {
    title: 'In Progress',
    value: 21,
    description: 'Across 8 startups',
    icon: <Clock3 size={20} className="text-amber-600" />,
  },
  {
    title: 'Avg Progress Score',
    value: '76%',
    description: '+6% vs last month',
    icon: <TrendingUp size={20} className="text-blue-600" />,
  },
];

const progressSeries = [42, 48, 53, 60, 67, 73, 79, 84];
const progressLabels = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'];

const milestoneBars = [
  { month: 'Nov', count: 6 },
  { month: 'Dec', count: 8 },
  { month: 'Jan', count: 9 },
  { month: 'Feb', count: 12 },
  { month: 'Mar', count: 10 },
  { month: 'Apr', count: 14 },
];

const statusDistribution = [
  { label: 'Completed', value: 48, stroke: 'stroke-green-500' },
  { label: 'In Progress', value: 21, stroke: 'stroke-blue-500' },
  { label: 'Pending', value: 12, stroke: 'stroke-amber-500' },
  { label: 'Overdue', value: 7, stroke: 'stroke-red-500' },
];

const heatmapWeeks = [
  [1, 2, 0, 3, 2, 1, 4],
  [2, 1, 1, 2, 3, 0, 2],
  [3, 2, 2, 1, 2, 1, 3],
  [0, 1, 2, 3, 4, 2, 1],
  [1, 2, 3, 2, 1, 0, 2],
  [2, 3, 2, 1, 2, 3, 1],
  [1, 0, 1, 2, 3, 2, 2],
  [3, 2, 1, 0, 1, 2, 4],
  [2, 1, 2, 3, 2, 1, 0],
  [1, 2, 3, 2, 1, 2, 3],
  [0, 1, 2, 3, 2, 1, 2],
  [2, 3, 1, 2, 3, 2, 1],
];

const topStartups = [
  { name: 'TaskFlow', stage: 'Scaling', milestones: '12 / 14', progress: 92, status: 'On Track' },
  { name: 'FitTrack', stage: 'Launched', milestones: '9 / 12', progress: 78, status: 'In Progress' },
  { name: 'LearnHub', stage: 'Building', milestones: '7 / 11', progress: 64, status: 'Watch' },
  { name: 'Greenly', stage: 'Launched', milestones: '10 / 13', progress: 81, status: 'On Track' },
  { name: 'CloudSync', stage: 'Building', milestones: '6 / 10', progress: 59, status: 'At Risk' },
];

function getBarHeightClass(count: number): string {
  if (count >= 14) return 'h-40';
  if (count >= 12) return 'h-36';
  if (count >= 10) return 'h-30';
  if (count >= 9) return 'h-28';
  if (count >= 8) return 'h-24';
  if (count >= 7) return 'h-20';
  return 'h-16';
}

function getHeatColor(level: number): string {
  if (level === 0) return 'bg-gray-100';
  if (level === 1) return 'bg-blue-100';
  if (level === 2) return 'bg-blue-300';
  if (level === 3) return 'bg-blue-500';
  return 'bg-blue-700';
}

function getProgressWidthClass(progress: number): string {
  if (progress >= 90) return 'w-[90%]';
  if (progress >= 80) return 'w-[80%]';
  if (progress >= 70) return 'w-[70%]';
  if (progress >= 60) return 'w-[60%]';
  return 'w-[50%]';
}

function getStatusClass(status: string): string {
  if (status === 'On Track') return 'bg-green-100 text-green-700';
  if (status === 'In Progress') return 'bg-blue-100 text-blue-700';
  if (status === 'Watch') return 'bg-amber-100 text-amber-700';
  return 'bg-red-100 text-red-700';
}

export default function AnalyticsPage() {
  const points = progressSeries
    .map((value, index) => {
      const x = (index / (progressSeries.length - 1)) * 100;
      const y = 100 - value;
      return `${x},${y}`;
    })
    .join(' ');

  const totalStatus = statusDistribution.reduce((sum, item) => sum + item.value, 0);
  const radius = 35;
  const circumference = 2 * Math.PI * radius;

  let cumulative = 0;
  const donutSegments = statusDistribution.map((item) => {
    const segmentLength = (item.value / totalStatus) * circumference;
    const segment = {
      ...item,
      dasharray: `${segmentLength} ${circumference}`,
      dashoffset: -cumulative,
    };
    cumulative += segmentLength;
    return segment;
  });

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar activeStartup={'Vertex'} setActiveStartup={function (value: SetStateAction<'Vertex' | 'Voxel' | 'Pulse.ai' | 'Kinetik' | 'Nomad' | 'Orbis' | 'Synth'>): void {
        throw new Error('Function not implemented.');
      } } collapsed={false} setCollapsed={function (value: SetStateAction<boolean>): void {
        throw new Error('Function not implemented.');
      } } />

      <main className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 bg-white border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Analytics</h1>
            <p className="text-sm text-gray-600">Understand startup performance trends and milestone momentum in one dashboard.</p>
          </div>

          <div className="p-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
              {KPI_ITEMS.map((kpi) => (
                <StatCard
                  key={kpi.title}
                  title={kpi.title}
                  value={kpi.value}
                  description={kpi.description}
                  icon={kpi.icon}
                />
              ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
              <section className="xl:col-span-7 bg-white rounded-lg border border-gray-100 shadow-sm p-4">
                <h2 className="text-base font-bold text-gray-900 mb-3">Startup Progress Over Time</h2>
                <div className="h-56 border border-gray-100 rounded-lg p-3">
                  <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none" role="img" aria-label="Progress line chart">
                    {[20, 40, 60, 80].map((y) => (
                      <line key={y} x1="0" y1={y} x2="100" y2={y} className="stroke-gray-200" strokeWidth="0.4" />
                    ))}
                    <polyline
                      points={points}
                      fill="none"
                      className="stroke-blue-500"
                      strokeWidth="2"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                    {progressSeries.map((value, index) => {
                      const x = (index / (progressSeries.length - 1)) * 100;
                      const y = 100 - value;
                      return <circle key={progressLabels[index]} cx={x} cy={y} r="1.8" className="fill-blue-600" />;
                    })}
                  </svg>
                </div>
                <div className="grid grid-cols-8 mt-2 text-xs text-gray-500">
                  {progressLabels.map((label) => (
                    <span key={label} className="text-center">{label}</span>
                  ))}
                </div>
              </section>

              <section className="xl:col-span-5 bg-white rounded-lg border border-gray-100 shadow-sm p-4">
                <h2 className="text-base font-bold text-gray-900 mb-3">Milestones by Month</h2>
                <div className="h-56 flex items-end justify-between gap-2">
                  {milestoneBars.map((item) => (
                    <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
                      <div className="h-44 w-full bg-gray-100 rounded-lg flex items-end p-1">
                        <div className={`w-full rounded-md bg-blue-500 ${getBarHeightClass(item.count)}`} />
                      </div>
                      <p className="text-xs text-gray-600">{item.month}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
              <section className="xl:col-span-4 bg-white rounded-lg border border-gray-100 shadow-sm p-4">
                <h2 className="text-base font-bold text-gray-900 mb-3">Status Distribution</h2>
                <div className="flex items-center gap-4">
                  <svg viewBox="0 0 100 100" className="w-36 h-36" role="img" aria-label="Milestone status donut chart">
                    <g transform="rotate(-90 50 50)">
                      {donutSegments.map((segment) => (
                        <circle
                          key={segment.label}
                          cx="50"
                          cy="50"
                          r={radius}
                          fill="none"
                          className={segment.stroke}
                          strokeWidth="10"
                          strokeDasharray={segment.dasharray}
                          strokeDashoffset={segment.dashoffset}
                        />
                      ))}
                    </g>
                  </svg>

                  <div className="space-y-2">
                    {statusDistribution.map((item) => (
                      <div key={item.label} className="flex items-center gap-2 text-xs text-gray-700">
                        <span className={`w-2.5 h-2.5 rounded-full ${
                          item.label === 'Completed'
                            ? 'bg-green-500'
                            : item.label === 'In Progress'
                              ? 'bg-blue-500'
                              : item.label === 'Pending'
                                ? 'bg-amber-500'
                                : 'bg-red-500'
                        }`} />
                        <span>{item.label}</span>
                        <span className="text-gray-500">({item.value})</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className="xl:col-span-8 bg-white rounded-lg border border-gray-100 shadow-sm p-4">
                <h2 className="text-base font-bold text-gray-900 mb-3">Activity Heatmap</h2>
                <div className="overflow-x-auto">
                  <div className="inline-flex gap-1">
                    {heatmapWeeks.map((week, weekIndex) => (
                      <div key={`week-${weekIndex}`} className="grid grid-rows-7 gap-1">
                        {week.map((level, dayIndex) => (
                          <div
                            key={`${weekIndex}-${dayIndex}`}
                            className={`w-3 h-3 rounded-sm ${getHeatColor(level)}`}
                            title={`Activity level: ${level}`}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-3">
                  <span>Low</span>
                  <span className="w-3 h-3 rounded-sm bg-gray-100" />
                  <span className="w-3 h-3 rounded-sm bg-blue-100" />
                  <span className="w-3 h-3 rounded-sm bg-blue-300" />
                  <span className="w-3 h-3 rounded-sm bg-blue-500" />
                  <span className="w-3 h-3 rounded-sm bg-blue-700" />
                  <span>High</span>
                </div>
              </section>
            </div>

            <section className="bg-white rounded-lg border border-gray-100 shadow-sm p-4">
              <h2 className="text-base font-bold text-gray-900 mb-3">Top Startups</h2>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px]">
                  <thead>
                    <tr className="text-left text-xs text-gray-500 border-b border-gray-200">
                      <th className="py-2 pr-3 font-medium">Startup</th>
                      <th className="py-2 pr-3 font-medium">Stage</th>
                      <th className="py-2 pr-3 font-medium">Milestones</th>
                      <th className="py-2 pr-3 font-medium">Progress</th>
                      <th className="py-2 pr-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topStartups.map((startup) => (
                      <tr key={startup.name} className="border-b border-gray-100 last:border-0">
                        <td className="py-3 pr-3 text-sm font-semibold text-gray-900">{startup.name}</td>
                        <td className="py-3 pr-3 text-sm text-gray-600">{startup.stage}</td>
                        <td className="py-3 pr-3 text-sm text-gray-600">{startup.milestones}</td>
                        <td className="py-3 pr-3">
                          <div className="w-32 h-2 rounded-full bg-gray-200">
                            <div className={`h-2 rounded-full bg-blue-500 ${getProgressWidthClass(startup.progress)}`} />
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{startup.progress}%</p>
                        </td>
                        <td className="py-3 pr-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(startup.status)}`}>
                            {startup.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
