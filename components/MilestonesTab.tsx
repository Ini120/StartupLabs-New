'use client'

import type { Startup } from '@/types'
import StatusBadge from '@/components/StatusBadge'
import { getInitials } from '@/lib/utils'

interface MilestonesTabProps {
  startup: Startup
}

function progressClass(status: string) {
  const normalized = status.toLowerCase()
  if (normalized.includes('completed')) return 'col-span-12 bg-status-green'
  if (normalized.includes('on track')) return 'col-span-9 bg-status-green'
  if (normalized.includes('in progress')) return 'col-span-7 bg-status-amber'
  if (normalized.includes('stalled')) return 'col-span-4 bg-status-red'
  return 'col-span-5 bg-status-red'
}

export default function MilestonesTab({ startup }: MilestonesTabProps) {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 lg:grid-cols-2">
        {startup.milestones.map((milestone, index) => {
          const owner = startup.team.members[index % startup.team.members.length]
          return (
            <article key={milestone.title} className="rounded-2xl border border-border bg-card p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-syne text-[15px] font-bold text-slate-900">{milestone.title}</p>
                  <p className="mt-1 font-space text-[11px] text-brand-muted">{milestone.category} · Due {milestone.due}</p>
                </div>
                <StatusBadge status={milestone.status} label={milestone.trackingStatus.toUpperCase()} />
              </div>

              <div className="mt-3 grid grid-cols-12 gap-0.5 rounded-full bg-border-2 p-0.5">
                <div className={`h-1 rounded-full ${progressClass(milestone.trackingStatus)}`} />
              </div>

              <div className="mt-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-bg-3 font-syne text-[10px] font-bold text-slate-900">
                  {getInitials(owner.name)}
                </div>
                <div>
                  <p className="font-space text-[11px] text-slate-900">{owner.name}</p>
                  <p className="font-space text-[10px] text-brand-muted">Owner</p>
                </div>
              </div>
            </article>
          )
        })}
      </section>

      <section className="rounded-2xl border border-border bg-card p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-syne text-[16px] font-bold text-slate-900">Timeline View</h3>
          <p className="font-space text-[10px] uppercase tracking-[1px] text-brand-muted">Horizontal roadmap</p>
        </div>

        <div className="overflow-x-auto">
          <div className="flex min-w-230 gap-4 pb-2">
            {startup.milestones.map((milestone) => (
              <div key={`timeline-${milestone.title}`} className="w-56 rounded-xl border border-border bg-bg-3 p-3">
                <p className="font-space text-[10px] uppercase tracking-[1px] text-brand-muted">{milestone.due}</p>
                <p className="mt-1 font-syne text-[13px] font-bold text-slate-900">{milestone.title}</p>
                <p className="mt-1 font-space text-[11px] text-brand-muted">{milestone.category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
