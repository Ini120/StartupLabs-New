'use client'

import type { Dispatch, SetStateAction } from 'react'
import type { MetricKey, Startup } from '@/types'
import QuarterlyChart from '@/components/QuarterlyChart'

interface VisualizationsTabProps {
  startup: Startup
  activeMetric: MetricKey
  setActiveMetric: Dispatch<SetStateAction<MetricKey>>
}

function getLtvCacBase(startup: Startup) {
  const ltvCac = startup.kpis.find((kpi) => kpi.name === 'LTV:CAC')
  if (!ltvCac) return 3.2
  const numeric = Number.parseFloat(ltvCac.current.replace('x', ''))
  return Number.isFinite(numeric) ? numeric : 3.2
}

function createRatioSeries(base: number) {
  return [base - 0.9, base - 0.5, base - 0.2, base, base + 0.3, base + 0.6].map((item) => Math.max(item, 0.8))
}

function getChartPoints(series: number[]) {
  const max = Math.max(...series)
  const min = Math.min(...series)
  return series
    .map((value, index) => {
      const x = 16 + index * 56
      const normalized = (value - min) / Math.max(max - min, 0.001)
      const y = 150 - normalized * 110
      return `${x},${y}`
    })
    .join(' ')
}

const QUARTER_LABELS = ["Q1 '23", "Q2 '23", "Q3 '23", "Q4 '23", "Q1 '24", "Q2 '24"]

export default function VisualizationsTab({ startup, activeMetric, setActiveMetric }: VisualizationsTabProps) {
  const base = getLtvCacBase(startup)
  const ratioSeries = createRatioSeries(base)
  const points = getChartPoints(ratioSeries)

  return (
    <div className="space-y-6">
      <QuarterlyChart startup={startup} activeMetric={activeMetric} setActiveMetric={setActiveMetric} />

      <section className="rounded-2xl border border-border bg-card p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="font-space text-[10px] uppercase tracking-[1.2px] text-brand-muted">Unit Economics</p>
            <h3 className="mt-1 font-syne text-[18px] font-bold text-slate-900">LTV:CAC Trend</h3>
          </div>
          <p className="font-mono text-[12px] text-brand-muted">Current {base.toFixed(1)}x</p>
        </div>

        <div className="rounded-xl border border-border bg-bg-3 p-4">
          <svg viewBox="0 0 320 170" className="h-52 w-full">
            <polyline fill="none" stroke="rgba(124,106,255,0.25)" strokeWidth="18" strokeLinecap="round" points={points} />
            <polyline fill="none" stroke="#7c6aff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" points={points} />
            {ratioSeries.map((value, index) => (
              <g key={`point-${index}`}>
                <circle cx={16 + index * 56} cy={Number.parseFloat(points.split(' ')[index].split(',')[1] ?? '0')} r="4" fill="#7c6aff" />
                <text x={16 + index * 56} y="164" textAnchor="middle" className="fill-brand-muted font-space text-[8px]">
                  {QUARTER_LABELS[index]}
                </text>
                <text x={16 + index * 56} y="18" textAnchor="middle" className="fill-slate-900 font-mono text-[8px]">
                  {value.toFixed(1)}x
                </text>
              </g>
            ))}
          </svg>
        </div>
      </section>
    </div>
  )
}
