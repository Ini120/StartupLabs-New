'use client'

import type { ReactNode } from 'react'
import type { Status } from '@/types'

interface MetricCardProps {
  label: string
  value: string
  status?: Status
  children?: ReactNode
}

export default function MetricCard({ label, value, status, children }: MetricCardProps) {
  const variantClass =
    status === 'red'
      ? 'bg-linear-to-br from-card to-status-red-bg border-status-red-border'
      : status === 'green'
        ? 'bg-linear-to-br from-card to-status-green-bg border-status-green-border'
        : status === 'gray'
          ? 'bg-linear-to-br from-card to-status-gray-bg border-status-gray-border'
          : 'bg-card border-border'

  return (
    <section className={`relative overflow-hidden rounded-xl border ${variantClass} p-4 transition-all duration-150`}>
      <div className="relative z-10 flex h-full flex-col gap-3">
        <div>
          <p className="font-space text-[9px] uppercase tracking-[1.5px] text-brand-muted">{label}</p>
          <p className="font-syne text-[22px] font-extrabold tracking-tight text-slate-900">{value}</p>
        </div>
        {children}
      </div>
    </section>
  )
}