'use client'

import type { Startup } from '@/types'
import MetricCard from '@/components/MetricCard'
import DeltaBadge from '@/components/DeltaBadge'
import { getBurnSeverity, getStatusColor } from '@/lib/utils'

interface FinancialGridProps {
  startup: Startup
}

function Sparkline() {
  return (
    <svg viewBox="0 0 120 36" className="h-9 w-28 shrink-0">
      <polyline
        fill="none"
        stroke="var(--brand-accent)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points="2,24 18,20 34,18 50,16 66,12 84,9 102,11 118,6"
      />
    </svg>
  )
}

function ProgressBar({ value, color }: { value: number; color: string }) {
  const widthClass =
    value >= 80 ? 'basis-[80%]' : value >= 76 ? 'basis-[76%]' : value >= 75 ? 'basis-[75%]' : value >= 65 ? 'basis-[65%]' : value >= 64 ? 'basis-[64%]' : value >= 60 ? 'basis-[60%]' : value >= 55 ? 'basis-[55%]' : value >= 50 ? 'basis-[50%]' : value >= 45 ? 'basis-[45%]' : value >= 40 ? 'basis-[40%]' : value >= 38 ? 'basis-[38%]' : value >= 35 ? 'basis-[35%]' : value >= 20 ? 'basis-[20%]' : 'basis-[15%]'
  const fillClass =
    color === 'var(--status-green)' ? 'bg-status-green' : color === 'var(--status-red)' ? 'bg-status-red' : color === 'var(--status-amber)' ? 'bg-status-amber' : 'bg-status-gray'

  return (
    <div className="flex h-1 overflow-hidden rounded-full bg-border-2">
      <div className={`h-full rounded-full flex-none ${fillClass} ${widthClass}`} />
    </div>
  )
}

export default function FinancialGrid({ startup }: FinancialGridProps) {
  const financials = startup.financials
  const worstStatus = [financials.wowStatus, financials.momStatus, financials.qoqStatus].includes('red')
    ? 'red'
    : [financials.wowStatus, financials.momStatus, financials.qoqStatus].includes('green')
      ? 'green'
      : 'gray'
  const burnSeverity = getBurnSeverity(financials.burnPct)
  const burnColor = getStatusColor(burnSeverity)

  return (
    <div className="flex flex-col gap-3">
      <MetricCard label="ARR" value={financials.arr} status={worstStatus}>
        <div className="flex items-center justify-between gap-4">
          <Sparkline />
          <div className="text-right">
            <p className="font-space text-[9px] uppercase tracking-[1.2px] text-brand-muted">Run Rate</p>
            <p className="font-mono text-[10px] text-brand-text">Quarterly</p>
          </div>
        </div>
      </MetricCard>

      <MetricCard label="Revenue Growth" value="3 deltas" status={worstStatus}>
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <span className="font-space text-[10px] text-brand-muted">WoW</span>
            <DeltaBadge value={financials.wow} status={financials.wowStatus} />
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="font-space text-[10px] text-brand-muted">MoM</span>
            <DeltaBadge value={financials.mom} status={financials.momStatus} />
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="font-space text-[10px] text-brand-muted">QoQ</span>
            <DeltaBadge value={financials.qoq} status={financials.qoqStatus} />
          </div>
        </div>
      </MetricCard>

      <MetricCard label="Gross Profit / Margin" value={financials.gp} status={financials.margin >= 70 ? 'green' : financials.margin >= 60 ? 'gray' : 'red'}>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="font-space text-[10px] text-brand-muted">Margin</p>
            <p className="font-mono text-[10px] text-slate-900">{financials.margin}%</p>
          </div>
          <ProgressBar value={financials.margin} color="var(--status-amber)" />
          <p className="font-mono text-[10px] text-brand-muted">GP: {financials.gp}</p>
        </div>
      </MetricCard>

      <MetricCard label="Burn Rate" value={financials.burn} status={burnSeverity}>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="font-space text-[10px] text-brand-muted">Burn %</p>
            <p className="font-mono text-[10px] text-slate-900">{financials.burnPct}%</p>
          </div>
          <ProgressBar value={financials.burnPct} color={burnColor} />
          <p className="font-mono text-[10px] text-brand-muted">OPEX {financials.opex}</p>
        </div>
      </MetricCard>
    </div>
  )
}