'use client'

import type { Startup } from '@/types'

interface TopbarProps {
  startup: Startup
}

export default function Topbar({ startup }: TopbarProps) {
  return (
    <div className="sticky top-0 z-20 border-b border-border bg-bg-2/95 backdrop-blur-sm">
      <div className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <h1 className="font-syne text-[20px] font-extrabold tracking-tight text-slate-900">{startup.name}</h1>
          <p className="mt-1 font-space text-[11px] text-brand-muted">{startup.description} · {startup.sector} · {startup.stage}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-full border border-border px-4 py-2 font-space text-[11px] font-medium text-slate-900 transition-all duration-150 hover:bg-bg-3"
          >
            ← Portfolio
          </button>
          <button
            type="button"
            className="rounded-full bg-linear-to-r from-brand-accent to-brand-accent2 px-4 py-2 font-space text-[11px] font-semibold text-white transition-all duration-150 hover:opacity-95"
          >
            ⚡ Generate Report
          </button>
        </div>
      </div>
    </div>
  )
}