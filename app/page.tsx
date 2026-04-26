"use client";

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
    <div className="dashboard-shell min-h-screen bg-bg text-slate-900">
      <Sidebar activeStartup={activeStartup} setActiveStartup={setActiveStartup} />

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

          {activeTab === 'info' ? (
            <div className="space-y-6">
              <section className="grid gap-3 lg:grid-cols-4">
                {infoMetrics.map((metric) => (
                  <article key={metric.label} className="rounded-2xl border border-border bg-card px-5 py-4">
                    <p className="font-space text-[10px] uppercase tracking-[1.2px] text-brand-muted">{metric.label}</p>
                    <p className="mt-2 font-syne text-[28px] font-extrabold tracking-tight text-slate-900">{metric.value}</p>
                    <p className="mt-1 font-space text-[11px] text-brand-muted">{metric.helper}</p>
                  </article>
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
