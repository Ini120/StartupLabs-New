'use client'

import type { Status } from '@/types'
import { getStatusLabel } from '@/lib/utils'

interface StatusBadgeProps {
  status: Status
  label?: string
}

export default function StatusBadge({ status, label }: StatusBadgeProps) {
  const statusClass =
    status === 'red'
      ? 'border-status-red-border bg-status-red-bg text-status-red'
      : status === 'green'
        ? 'border-status-green-border bg-status-green-bg text-status-green'
        : 'border-status-gray-border bg-status-gray-bg text-status-gray'

  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-[3px] text-[10px] font-medium tracking-[0.14em] uppercase ${statusClass}`}>
      {label ?? getStatusLabel(status)}
    </span>
  )
}