'use client'

import { useMemo, useState } from 'react'
import type { Startup, TeamMember } from '@/types'
import StatusBadge from '@/components/StatusBadge'
import { getInitials } from '@/lib/utils'

interface TeamTabProps {
  startup: Startup
}

type TeamFilter = 'All' | 'Active' | 'On Leave' | 'Departed'
type DepartmentFilter = 'All' | 'Leadership' | 'Engineering' | 'Design' | 'Growth' | 'Operations' | 'Product' | 'Research'

function statusToBadge(status: TeamMember['activityStatus']) {
  if (status === 'Active') return 'green'
  if (status === 'Departed') return 'red'
  return 'gray'
}

function departmentFromRole(role: string): DepartmentFilter {
  const normalized = role.toLowerCase()
  if (normalized.includes('ceo') || normalized.includes('co-founder') || normalized.includes('chief')) return 'Leadership'
  if (normalized.includes('cto') || normalized.includes('engineering') || normalized.includes('ml')) return 'Engineering'
  if (normalized.includes('design')) return 'Design'
  if (normalized.includes('growth') || normalized.includes('sales')) return 'Growth'
  if (normalized.includes('ops') || normalized.includes('operations')) return 'Operations'
  if (normalized.includes('product')) return 'Product'
  if (normalized.includes('research') || normalized.includes('science')) return 'Research'
  return 'All'
}

function getMemberAccent(member: TeamMember) {
  if (member.color === '#7c6aff') return 'border-[#7c6aff]/30 bg-[#7c6aff]/12 text-[#7c6aff]'
  if (member.color === '#22d87a') return 'border-[#22d87a]/30 bg-[#22d87a]/12 text-[#22d87a]'
  if (member.color === '#6b6880') return 'border-[#6b6880]/30 bg-[#6b6880]/12 text-[#6b6880]'
  if (member.color === '#ffb830') return 'border-[#ffb830]/30 bg-[#ffb830]/12 text-[#ffb830]'
  if (member.color === '#bf5fff') return 'border-[#bf5fff]/30 bg-[#bf5fff]/12 text-[#bf5fff]'
  if (member.color === '#ff4d6d') return 'border-[#ff4d6d]/30 bg-[#ff4d6d]/12 text-[#ff4d6d]'
  return 'border-border bg-bg-3 text-slate-900'
}

function contributionFeed(member: TeamMember) {
  const role = member.role.toLowerCase()

  if (role.includes('ceo')) {
    return ['Closed partner review with 2 enterprise prospects', 'Published weekly investor update', 'Aligned Q2 hiring priorities']
  }
  if (role.includes('cto') || role.includes('engineering')) {
    return ['Shipped reliability fixes for analytics pipeline', 'Reduced incident response time this sprint', 'Reviewed architecture for upcoming API milestone']
  }
  if (role.includes('design')) {
    return ['Finalized dashboard interaction polish', 'Ran usability review with founding team', 'Updated design system card spacing']
  }
  if (role.includes('growth') || role.includes('sales')) {
    return ['Qualified high-intent leads from pilot cohort', 'Optimized onboarding conversion funnel', 'Drafted outbound campaign for enterprise segment']
  }
  if (role.includes('product')) {
    return ['Prioritized roadmap items for next release', 'Ran cross-functional planning sync', 'Defined KPI instrumentation updates']
  }

  return ['Contributed to weekly execution sprint', 'Completed assigned roadmap deliverables', 'Provided functional updates to leadership']
}

function widthClassFromPercent(percent: number) {
  if (percent >= 80) return 'col-span-12'
  if (percent >= 70) return 'col-span-10'
  if (percent >= 60) return 'col-span-8'
  if (percent >= 50) return 'col-span-7'
  if (percent >= 40) return 'col-span-6'
  if (percent >= 30) return 'col-span-5'
  return 'col-span-4'
}

export default function TeamTab({ startup }: TeamTabProps) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<TeamFilter>('All')
  const [departmentFilter, setDepartmentFilter] = useState<DepartmentFilter>('All')
  const { team } = startup

  const filteredMembers = useMemo(() => {
    return team.members.filter((member) => {
      const nameMatch = member.name.toLowerCase().includes(search.trim().toLowerCase())
      const statusMatch = statusFilter === 'All' || member.activityStatus === statusFilter
      const department = departmentFromRole(member.role)
      const departmentMatch = departmentFilter === 'All' || department === departmentFilter
      return nameMatch && statusMatch && departmentMatch
    })
  }, [departmentFilter, search, statusFilter, team.members])

  return (
    <div className="grid gap-5 xl:grid-cols-[320px_1fr]">
      <aside className="space-y-4 rounded-2xl border border-border bg-card p-5">
        <div>
          <p className="font-space text-[10px] uppercase tracking-[1.2px] text-brand-muted">Team Mix</p>
          <h3 className="mt-1 font-syne text-[20px] font-extrabold text-slate-900">People Summary</h3>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <article className="rounded-xl border border-border bg-bg-3 p-3">
            <p className="font-space text-[10px] uppercase tracking-[1px] text-brand-muted">New Hires</p>
            <p className="mt-1 font-syne text-[24px] font-extrabold text-status-green">+{team.hires}</p>
          </article>
          <article className="rounded-xl border border-border bg-bg-3 p-3">
            <p className="font-space text-[10px] uppercase tracking-[1px] text-brand-muted">Departures</p>
            <p className={`mt-1 font-syne text-[24px] font-extrabold ${team.departures > 0 ? 'text-status-red' : 'text-status-green'}`}>{team.departures}</p>
          </article>
        </div>

        <article className="rounded-xl border border-border bg-bg-3 p-3">
          <div className="mb-2 flex items-center justify-between">
            <p className="font-space text-[10px] uppercase tracking-[1px] text-brand-muted">Gender Diversity</p>
            <p className="font-mono text-[10px] text-brand-muted">M {team.malePct}% · F {team.femalePct}%</p>
          </div>
          <div className="grid grid-cols-12 gap-0.5 rounded-full bg-border-2 p-0.5">
            <div className={`h-1 rounded-full bg-linear-to-r from-brand-accent to-[#6050ff] ${widthClassFromPercent(team.malePct)}`} />
            <div className={`h-1 rounded-full bg-linear-to-r from-brand-accent2 to-[#ff6db0] ${widthClassFromPercent(team.femalePct)}`} />
          </div>
        </article>
      </aside>

      <section className="space-y-4 rounded-2xl border border-border bg-card p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-space text-[10px] uppercase tracking-[1.2px] text-brand-muted">Team Profiles</p>
            <h3 className="mt-1 font-syne text-[20px] font-extrabold text-slate-900">Members & Recent Contributions</h3>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name"
              className="w-full rounded-xl border border-border bg-bg-3 px-3 py-2 font-space text-[12px] text-slate-900 outline-none transition-all duration-150 placeholder:text-brand-muted focus:border-brand-accent sm:w-44"
            />
            <select
              value={departmentFilter}
              onChange={(event) => setDepartmentFilter(event.target.value as DepartmentFilter)}
              aria-label="Filter by department"
              title="Filter by department"
              className="rounded-xl border border-border bg-bg-3 px-3 py-2 font-space text-[12px] text-slate-900 outline-none transition-all duration-150 focus:border-brand-accent"
            >
              <option>All</option>
              <option>Leadership</option>
              <option>Engineering</option>
              <option>Design</option>
              <option>Growth</option>
              <option>Operations</option>
              <option>Product</option>
              <option>Research</option>
            </select>
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value as TeamFilter)}
              aria-label="Filter by status"
              title="Filter by status"
              className="rounded-xl border border-border bg-bg-3 px-3 py-2 font-space text-[12px] text-slate-900 outline-none transition-all duration-150 focus:border-brand-accent"
            >
              <option>All</option>
              <option>Active</option>
              <option>On Leave</option>
              <option>Departed</option>
            </select>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {filteredMembers.map((member) => (
            <article key={member.name} className="rounded-2xl border border-border bg-bg-3 p-4">
              <div className="flex items-center gap-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-full border text-[13px] font-syne font-extrabold ${getMemberAccent(member)}`}>
                  {getInitials(member.name)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-syne text-[16px] font-bold text-slate-900">{member.name}</p>
                  <p className="truncate font-space text-[12px] text-brand-muted">{member.role}</p>
                </div>
                <StatusBadge status={statusToBadge(member.activityStatus)} label={member.activityStatus.toUpperCase()} />
              </div>

              <div className="mt-4 rounded-xl border border-border bg-card p-3">
                <p className="font-space text-[10px] uppercase tracking-[1px] text-brand-muted">Recent Contributions</p>
                <ul className="mt-2 space-y-1.5">
                  {contributionFeed(member).map((item) => (
                    <li key={`${member.name}-${item}`} className="font-space text-[12px] text-slate-900">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
