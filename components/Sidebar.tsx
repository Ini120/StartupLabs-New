'use client'

import type { Dispatch, SetStateAction } from 'react'
import { STARTUPS } from '@/data/startups'
import DeltaBadge from '@/components/DeltaBadge'

interface SidebarProps {
  activeStartup: string
  setActiveStartup: Dispatch<SetStateAction<string>>
}

const startups = Object.values(STARTUPS)

function getDotClass(status: string) {
  if (status === 'green') return 'bg-status-green shadow-[0_0_6px_rgba(34,216,122,0.5)]'
  if (status === 'red') return 'bg-status-red shadow-[0_0_6px_rgba(255,77,109,0.5)]'
  return 'bg-status-gray shadow-[0_0_6px_rgba(107,104,128,0.5)]'
}

export default function Sidebar({ activeStartup, setActiveStartup }: SidebarProps) {
  return (
    <aside className="w-full border-b border-border bg-bg-2 md:fixed md:inset-y-0 md:left-0 md:w-63 md:border-b-0 md:border-r md:border-border">
      <div className="flex h-full flex-col">
        <div className="border-b border-border p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-brand-accent to-brand-accent2">
              <div className="h-4 w-4 rounded-[5px] border border-white/20 bg-white/15" />
            </div>
            <div>
              <p className="font-syne text-[18px] font-extrabold tracking-tight text-slate-900">Founders Pulse</p>
              <p className="font-space text-[9px] uppercase tracking-[2px] text-brand-muted">YC · GROWTH PORTFOLIO</p>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-border bg-card p-4">
            <p className="font-space text-[9px] uppercase tracking-[1.5px] text-brand-muted">Total ARR</p>
            <p className="mt-2 font-syne text-[20px] font-extrabold tracking-tight text-slate-900">$83,991,371</p>
            <p className="mt-1 font-mono text-[10px] font-medium text-status-green">+4.7% MoM</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          <div className="mb-3 flex items-center justify-between px-2">
            <p className="font-syne text-[13px] font-bold text-slate-900">Portfolio</p>
            <p className="font-space text-[9px] uppercase tracking-[1.5px] text-brand-muted">7 companies</p>
          </div>
          <div className="space-y-2">
            {startups.map((startup) => {
              const active = startup.name === activeStartup
              return (
                <button
                  key={startup.name}
                  type="button"
                  onClick={() => setActiveStartup(startup.name)}
                  className={`w-full rounded-xl border-l-2 p-3 text-left transition-all duration-150 ${active ? 'border-brand-accent bg-bg-3' : 'border-transparent bg-transparent hover:bg-bg-3'}`}
                >
                  <div className="flex items-start gap-3">
                    <span className={`mt-1 h-2.5 w-2.5 rounded-full ${getDotClass(startup.status)}`} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <p className="truncate font-syne text-[13px] font-bold text-slate-900">{startup.name}</p>
                          <p className="truncate font-space text-[10px] text-brand-muted">{startup.sector}</p>
                        </div>
                        <DeltaBadge value={startup.financials.mom} status={startup.financials.momStatus} />
                      </div>
                      <p className="mt-2 font-mono text-[10px] text-brand-muted">{startup.stage}</p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </aside>
  )
}