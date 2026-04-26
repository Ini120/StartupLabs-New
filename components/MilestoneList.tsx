'use client'

import type { Startup } from '@/types'
import StatusBadge from '@/components/StatusBadge'

interface MilestoneListProps {
  startup: Startup
}

export default function MilestoneList({ startup }: MilestoneListProps) {
  return (
    <section className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border bg-card-2 px-4 py-3">
        <p className="font-syne text-[13px] font-bold text-slate-900">Milestones</p>
        <p className="font-space text-[9px] uppercase tracking-[1px] text-brand-muted">Current quarter</p>
      </div>
      <div>
        {startup.milestones.map((milestone) => (
          <div
            key={milestone.title}
            className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-border px-4 py-3 transition-colors duration-150 last:border-b-0 hover:bg-bg-3"
          >
            <div className="flex min-w-0 items-start gap-3">
              <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-[7px] border text-[12px] ${milestone.status === 'red' ? 'border-status-red-border bg-status-red-bg text-status-red' : milestone.status === 'green' ? 'border-status-green-border bg-status-green-bg text-status-green' : 'border-status-gray-border bg-status-gray-bg text-status-gray'}`}>
                {milestone.icon}
              </div>
              <div className="min-w-0">
                <p className="truncate font-space text-[12px] text-slate-900">{milestone.title}</p>
                <p className="mt-0.5 font-space text-[10px] text-brand-muted">
                  {milestone.category} · {milestone.trackingStatus}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <p className="font-mono text-[10px] text-brand-muted">{milestone.due}</p>
              <StatusBadge status={milestone.status} label={milestone.trackingStatus.toUpperCase()} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}