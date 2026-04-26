import type { MetricKey, Status } from '@/types'

const STATUS_META: Record<Status, { label: string; color: string; bg: string; border: string }> = {
  red: {
    label: 'UNDER',
    color: 'var(--status-red)',
    bg: 'var(--status-red-bg)',
    border: 'var(--status-red-border)',
  },
  green: {
    label: 'EXCEL',
    color: 'var(--status-green)',
    bg: 'var(--status-green-bg)',
    border: 'var(--status-green-border)',
  },
  gray: {
    label: 'STALE',
    color: 'var(--status-gray)',
    bg: 'var(--status-gray-bg)',
    border: 'var(--status-gray-border)',
  },
}

export function getStatusMeta(status: Status) {
  return STATUS_META[status]
}

export function getStatusColor(status: Status) {
  return STATUS_META[status].color
}

export function getStatusLabel(status: Status) {
  return STATUS_META[status].label
}

export function getStatusBg(status: Status) {
  return STATUS_META[status].bg
}

export function getStatusBorder(status: Status) {
  return STATUS_META[status].border
}

export function getMetricLabel(metric: MetricKey) {
  const labels: Record<MetricKey, string> = {
    arr: 'ARR',
    revenue: 'Revenue Growth',
    dau: 'DAU',
    burn: 'Burn Rate',
    churn: 'Churn',
  }

  return labels[metric]
}

export function formatCurrency(value: number, digits = 0) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(value)
}

export function formatCompact(value: number) {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value)
}

export function formatPercent(value: number, digits = 1) {
  return `${value.toFixed(digits)}%`
}

export function formatDelta(value: string) {
  return value.startsWith('+') || value.startsWith('-') ? value : `+${value}`
}

export function getBurnSeverity(burnPct: number): Status {
  if (burnPct < 25) return 'green'
  if (burnPct > 40) return 'red'
  return 'gray'
}

export function hexToRgba(hex: string, alpha: number) {
  const normalized = hex.replace('#', '')
  const value = normalized.length === 3
    ? normalized.split('').map((part) => part + part).join('')
    : normalized
  const intValue = Number.parseInt(value, 16)
  const r = (intValue >> 16) & 255
  const g = (intValue >> 8) & 255
  const b = intValue & 255
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

export function getMetricAccent(metric: MetricKey) {
  const colors: Record<MetricKey, string> = {
    arr: '#7c6aff',
    revenue: '#22d87a',
    dau: '#ffb830',
    burn: '#ff4d6d',
    churn: '#bf5fff',
  }

  return colors[metric]
}

export function getProgressColor(status: Status) {
  return getStatusColor(status)
}