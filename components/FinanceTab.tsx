'use client'

import { useMemo, useState } from 'react'
import type { Startup } from '@/types'
import DeltaBadge from '@/components/DeltaBadge'

interface FinanceTabProps {
  startup: Startup
}

type RateMode = 'quarterly' | 'monthly'

function parseCurrency(value: string) {
  return Number.parseFloat(value.replace(/[$,]/g, '')) || 0
}

function formatMoney(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

function trendIcon(delta: string) {
  if (delta.startsWith('+')) return '↑'
  if (delta.startsWith('-')) return '↓'
  return '→'
}

function widthClassFromPercent(percent: number) {
  if (percent >= 95) return 'col-span-12'
  if (percent >= 85) return 'col-span-11'
  if (percent >= 75) return 'col-span-10'
  if (percent >= 66) return 'col-span-8'
  if (percent >= 58) return 'col-span-7'
  if (percent >= 50) return 'col-span-6'
  if (percent >= 42) return 'col-span-5'
  if (percent >= 34) return 'col-span-4'
  if (percent >= 26) return 'col-span-3'
  if (percent >= 18) return 'col-span-2'
  return 'col-span-1'
}

function severityClass(percent: number) {
  if (percent > 40) return 'bg-status-red'
  if (percent < 25) return 'bg-status-green'
  return 'bg-status-amber'
}

export default function FinanceTab({ startup }: FinanceTabProps) {
  const [rateMode, setRateMode] = useState<RateMode>('quarterly')
  const { financials } = startup

  const arr = parseCurrency(financials.arr)
  const burn = parseCurrency(financials.burn)
  const opex = parseCurrency(financials.opex)

  const runRates = useMemo(() => {
    if (rateMode === 'monthly') {
      return {
        arr: formatMoney(arr / 12),
        burn: formatMoney(burn),
        opex: formatMoney(opex / 12),
      }
    }

    return {
      arr: formatMoney(arr / 4),
      burn: formatMoney(burn * 3),
      opex: formatMoney(opex / 4),
    }
  }, [arr, burn, opex, rateMode])

  return (
    <div className="space-y-6">
      <section className="grid gap-4 xl:grid-cols-3">
        <article className="rounded-2xl border border-border bg-card p-5">
          <p className="font-space text-[10px] uppercase tracking-[1.3px] text-brand-muted">Gross Profit</p>
          <p className="mt-2 font-syne text-[30px] font-extrabold tracking-tight text-slate-900">{financials.gp}</p>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-space text-[11px] text-brand-muted">Margin</span>
              <span className="font-mono text-[11px] text-slate-900">{financials.margin}%</span>
            </div>
            <div className="grid grid-cols-12 gap-0.5 rounded-full bg-border-2 p-0.5">
              <div className={`h-1 rounded-full bg-status-amber ${widthClassFromPercent(financials.margin)}`} />
            </div>
          </div>
        </article>

        <article className="rounded-2xl border border-border bg-card p-5">
          <p className="font-space text-[10px] uppercase tracking-[1.3px] text-brand-muted">Burn Rate</p>
          <p className="mt-2 font-syne text-[30px] font-extrabold tracking-tight text-slate-900">{financials.burn}</p>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-space text-[11px] text-brand-muted">Burn Percent</span>
              <span className="font-mono text-[11px] text-slate-900">{financials.burnPct}%</span>
            </div>
            <div className="grid grid-cols-12 gap-0.5 rounded-full bg-border-2 p-0.5">
              <div className={`h-1 rounded-full ${severityClass(financials.burnPct)} ${widthClassFromPercent(financials.burnPct)}`} />
            </div>
          </div>
        </article>

        <article className="rounded-2xl border border-border bg-card p-5">
          <p className="font-space text-[10px] uppercase tracking-[1.3px] text-brand-muted">Operating Expenses</p>
          <p className="mt-2 font-syne text-[30px] font-extrabold tracking-tight text-slate-900">{financials.opex}</p>
          <p className="mt-4 font-space text-[11px] text-brand-muted">Expense runway and burn control baseline for board reporting.</p>
        </article>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <article className="rounded-2xl border border-border bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-syne text-[16px] font-bold text-slate-900">Delta Breakdown</h3>
            <p className="font-space text-[10px] uppercase tracking-[1.2px] text-brand-muted">WoW · MoM · QoQ</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-xl border border-border bg-bg-3 px-4 py-3">
              <div>
                <p className="font-space text-[10px] uppercase tracking-[1px] text-brand-muted">Week over Week</p>
                <p className="mt-1 font-mono text-[12px] text-slate-900">{trendIcon(financials.wow)} {financials.wow}</p>
              </div>
              <DeltaBadge value={financials.wow} status={financials.wowStatus} />
            </div>

            <div className="flex items-center justify-between rounded-xl border border-border bg-bg-3 px-4 py-3">
              <div>
                <p className="font-space text-[10px] uppercase tracking-[1px] text-brand-muted">Month over Month</p>
                <p className="mt-1 font-mono text-[12px] text-slate-900">{trendIcon(financials.mom)} {financials.mom}</p>
              </div>
              <DeltaBadge value={financials.mom} status={financials.momStatus} />
            </div>

            <div className="flex items-center justify-between rounded-xl border border-border bg-bg-3 px-4 py-3">
              <div>
                <p className="font-space text-[10px] uppercase tracking-[1px] text-brand-muted">Quarter over Quarter</p>
                <p className="mt-1 font-mono text-[12px] text-slate-900">{trendIcon(financials.qoq)} {financials.qoq}</p>
              </div>
              <DeltaBadge value={financials.qoq} status={financials.qoqStatus} />
            </div>
          </div>
        </article>

        <article className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-syne text-[16px] font-bold text-slate-900">Run Rate</h3>
            <div className="rounded-xl border border-border bg-bg-3 p-1">
              <button
                type="button"
                onClick={() => setRateMode('quarterly')}
                className={`rounded-lg px-3 py-1.5 font-space text-[10px] font-semibold transition-all duration-150 ${rateMode === 'quarterly' ? 'bg-brand-accent text-white' : 'text-brand-muted hover:bg-card'}`}
              >
                Quarterly
              </button>
              <button
                type="button"
                onClick={() => setRateMode('monthly')}
                className={`rounded-lg px-3 py-1.5 font-space text-[10px] font-semibold transition-all duration-150 ${rateMode === 'monthly' ? 'bg-brand-accent text-white' : 'text-brand-muted hover:bg-card'}`}
              >
                Monthly
              </button>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <div className="rounded-xl border border-border bg-bg-3 p-3">
              <p className="font-space text-[10px] uppercase tracking-[1px] text-brand-muted">Revenue Run Rate</p>
              <p className="mt-1 font-mono text-[14px] font-medium text-slate-900">{runRates.arr}</p>
            </div>
            <div className="rounded-xl border border-border bg-bg-3 p-3">
              <p className="font-space text-[10px] uppercase tracking-[1px] text-brand-muted">Burn Projection</p>
              <p className="mt-1 font-mono text-[14px] font-medium text-slate-900">{runRates.burn}</p>
            </div>
            <div className="rounded-xl border border-border bg-bg-3 p-3">
              <p className="font-space text-[10px] uppercase tracking-[1px] text-brand-muted">OPEX Plan</p>
              <p className="mt-1 font-mono text-[14px] font-medium text-slate-900">{runRates.opex}</p>
            </div>
          </div>
        </article>
      </section>
    </div>
  )
}
