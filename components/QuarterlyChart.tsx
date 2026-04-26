'use client'

import { useMemo } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  type ChartOptions,
  type TooltipItem,
  type ScriptableContext,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import type { MetricKey, Startup } from '@/types'
import { getMetricAccent, hexToRgba, getMetricLabel } from '@/lib/utils'

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Filler)

interface QuarterlyChartProps {
  startup: Startup
  activeMetric: MetricKey
  setActiveMetric: Dispatch<SetStateAction<MetricKey>>
}

const QUARTERS = ["Q1 '23", "Q2 '23", "Q3 '23", "Q4 '23", "Q1 '24", "Q2 '24"]
const METRICS: MetricKey[] = ['arr', 'revenue', 'dau', 'burn', 'churn']

export default function QuarterlyChart({ startup, activeMetric, setActiveMetric }: QuarterlyChartProps) {
  const accent = getMetricAccent(activeMetric)

  const data = useMemo(() => {
    const values = startup.chartData[activeMetric]

    return {
      labels: QUARTERS,
      datasets: [
        {
          label: getMetricLabel(activeMetric),
          data: values,
          borderColor: accent,
          borderWidth: 2,
          pointRadius: 2,
          pointHoverRadius: 4,
          pointBackgroundColor: accent,
          pointBorderColor: accent,
          tension: 0.38,
          fill: true,
          backgroundColor: (context: ScriptableContext<'line'>) => {
            const chart = context.chart
            const { ctx, chartArea } = chart
            if (!chartArea) return hexToRgba(accent, 0.27)

            const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
            gradient.addColorStop(0, hexToRgba(accent, 0.27))
            gradient.addColorStop(1, hexToRgba(accent, 0))
            return gradient
          },
        },
      ],
    }
  }, [accent, activeMetric, startup.chartData])

  const options = useMemo<ChartOptions<'line'>>(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: '#1e1e2a',
          borderColor: 'rgba(255,255,255,0.13)',
          borderWidth: 1,
          titleColor: '#f0eeff',
          bodyColor: '#ffffff',
          displayColors: false,
          padding: 12,
          callbacks: {
            label: (context: TooltipItem<'line'>) => `${getMetricLabel(activeMetric)}: ${context.formattedValue}`,
          },
        },
      },
      scales: {
        x: {
          grid: {
            color: 'rgba(255,255,255,0.05)',
            drawBorder: false,
          },
          ticks: {
            color: '#8885aa',
            font: {
              family: 'Space Grotesk',
              size: 11,
            },
          },
        },
        y: {
          grid: {
            color: 'rgba(255,255,255,0.05)',
            drawBorder: false,
          },
          ticks: {
            color: '#8885aa',
            font: {
              family: 'Space Grotesk',
              size: 11,
            },
          },
        },
      },
    }),
    [activeMetric]
  )

  return (
    <section className="rounded-xl border border-border bg-card p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-syne text-[13px] font-bold text-slate-900">Quarterly Trend</p>
          <p className="mt-1 font-space text-[9px] uppercase tracking-[1px] text-brand-muted">Chart.js powered portfolio view</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {METRICS.map((metric) => {
            const active = metric === activeMetric
            return (
              <button
                key={metric}
                type="button"
                onClick={() => setActiveMetric(metric)}
                className={`rounded-full px-3 py-1.5 font-space text-[10px] font-medium transition-all duration-150 ${active ? 'bg-brand-accent text-white' : 'text-brand-muted hover:bg-bg-3'}`}
              >
                {getMetricLabel(metric)}
              </button>
            )
          })}
        </div>
      </div>

      <div className="mt-4 h-80">
        <Line data={data} options={options} />
      </div>
    </section>
  )
}