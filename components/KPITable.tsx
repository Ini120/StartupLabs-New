'use client'

import type { Startup } from '@/types'
import StatusBadge from '@/components/StatusBadge'

interface KPITableProps {
  startup: Startup
}

export default function KPITable({ startup }: KPITableProps) {
  return (
    <section className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="grid grid-cols-[2fr_1fr_1fr_60px] border-b border-border bg-card-2 px-4 py-3">
        <p className="font-space text-[9px] uppercase tracking-[1px] text-brand-muted">Metric</p>
        <p className="font-space text-[9px] uppercase tracking-[1px] text-brand-muted">Current</p>
        <p className="font-space text-[9px] uppercase tracking-[1px] text-brand-muted">Target</p>
        <p className="font-space text-[9px] uppercase tracking-[1px] text-brand-muted">Status</p>
      </div>
      <div>
        {startup.kpis.map((kpi) => (
          <div
            key={kpi.name}
            className="grid grid-cols-[2fr_1fr_1fr_60px] items-center border-b border-border px-4 py-3 transition-colors duration-150 last:border-b-0 hover:bg-bg-3"
          >
            <p className="font-space text-[12px] text-slate-900">{kpi.name}</p>
            <p className="font-mono text-[12px] text-slate-900">{kpi.current}</p>
            <p className="font-mono text-[12px] text-brand-muted">{kpi.target}</p>
            <StatusBadge status={kpi.status} />
          </div>
        ))}
      </div>
    </section>
  )
}