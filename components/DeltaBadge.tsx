'use client'

import type { Status } from '@/types'
import { formatDelta } from '@/lib/utils'

interface DeltaBadgeProps {
  value: string
  status: Status
}

export default function DeltaBadge({ value, status }: DeltaBadgeProps) {
  const statusClass =
    status === 'red'
      ? 'border-status-red-border bg-status-red-bg text-status-red'
      : status === 'green'
        ? 'border-status-green-border bg-status-green-bg text-status-green'
        : 'border-status-gray-border bg-status-gray-bg text-status-gray'

  return (
    <span className={`inline-flex items-center rounded-[5px] border px-[5px] py-[2px] font-mono text-[10px] font-medium leading-none ${statusClass}`}>
      {formatDelta(value)}
    </span>
  )
}