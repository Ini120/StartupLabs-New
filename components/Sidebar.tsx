'use client'

import { useMemo, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { ChevronLeft, ChevronRight, Search } from 'lucide-react'
import { STARTUPS } from '@/data/startups'
import DeltaBadge from '@/components/DeltaBadge'

type StartupKey = keyof typeof STARTUPS

interface SidebarProps {
  activeStartup: StartupKey
  setActiveStartup: Dispatch<SetStateAction<StartupKey>>
  collapsed: boolean
  setCollapsed: Dispatch<SetStateAction<boolean>>
}

const startups = Object.values(STARTUPS)

function getDotClass(status: string) {
  if (status === 'green') return 'bg-status-green shadow-[0_0_6px_rgba(34,216,122,0.5)]'
  if (status === 'red') return 'bg-status-red shadow-[0_0_6px_rgba(255,77,109,0.5)]'
  return 'bg-status-gray shadow-[0_0_6px_rgba(107,104,128,0.5)]'
}

export default function Sidebar({ activeStartup, setActiveStartup, collapsed, setCollapsed }: SidebarProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredStartups = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()
    if (!query) return startups

    return startups.filter((startup) => {
      return (
        startup.name.toLowerCase().includes(query) ||
        startup.description.toLowerCase().includes(query) ||
        startup.sector.toLowerCase().includes(query) ||
        startup.stage.toLowerCase().includes(query)
      )
    })
  }, [searchTerm])

  return (
    <aside className={`hidden w-full border-b border-border bg-bg-2 md:fixed md:inset-y-0 md:left-0 md:flex md:border-b-0 md:border-r md:border-border md:transition-[width] md:duration-200 ${collapsed ? 'md:w-24' : 'md:w-63'}`}>
      <div className="flex h-full flex-col">
        <div className="border-b border-border p-4">
          <div className={`flex items-start gap-3 ${collapsed ? 'justify-center' : 'justify-between'}`}>
            <div className={`flex min-w-0 items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-brand-accent to-brand-accent2">
                <div className="h-4 w-4 rounded-[5px] border border-white/20 bg-white/15" />
              </div>
              {!collapsed ? (
                <div className="min-w-0">
                  <p className="font-syne text-[18px] font-extrabold tracking-tight text-slate-900">Founders Pulse</p>
                  <p className="font-space text-[9px] uppercase tracking-[2px] text-brand-muted">YC · GROWTH PORTFOLIO</p>
                </div>
              ) : null}
            </div>
            <button
              type="button"
              onClick={() => setCollapsed((value) => !value)}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-card text-brand-muted transition-colors duration-150 hover:bg-bg-3 hover:text-slate-900"
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
          </div>

          {!collapsed ? (
            <label className="mt-4 flex items-center gap-3 rounded-2xl border border-border bg-white px-3 py-2 shadow-[0_1px_0_rgba(15,23,42,0.02)]">
              <Search size={16} className="shrink-0 text-brand-dim" />
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search startups"
                className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-brand-dim"
              />
            </label>
          ) : null}
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          <div className="space-y-2">
            {filteredStartups.map((startup) => {
              const active = startup.name === activeStartup
              return (
                <button
                  key={startup.name}
                  type="button"
                  onClick={() => setActiveStartup(startup.name as StartupKey)}
                  className={`w-full rounded-2xl border-l-2 p-3 text-left transition-all duration-150 ${active ? 'border-brand-accent bg-bg-3' : 'border-transparent bg-transparent hover:bg-bg-3'}`}
                >
                  <div className={`flex items-start gap-3 ${collapsed ? 'justify-center' : ''}`}>
                    <span className={`mt-1 h-2.5 w-2.5 rounded-full ${getDotClass(startup.status)}`} />
                    <div className="min-w-0 flex-1">
                      <div className={`flex items-center gap-2 ${collapsed ? 'justify-center' : 'justify-between'}`}>
                        <div className="min-w-0">
                          <p className={`truncate font-syne text-[13px] font-bold text-slate-900 ${collapsed ? 'text-center' : ''}`}>{startup.name}</p>
                          {!collapsed ? <p className="truncate font-space text-[10px] text-brand-muted">{startup.sector}</p> : null}
                        </div>
                        {!collapsed ? <DeltaBadge value={startup.financials.mom} status={startup.financials.momStatus} /> : null}
                      </div>
                      {!collapsed ? <p className="mt-2 font-mono text-[10px] text-brand-muted">{startup.stage}</p> : null}
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