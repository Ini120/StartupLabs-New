'use client'

import type { Startup } from '@/types'
import MetricCard from '@/components/MetricCard'
import DeltaBadge from '@/components/DeltaBadge'
import { getStatusColor } from '@/lib/utils'

interface UsageGridProps {
  startup: Startup
}

function ProgressBar({ value, color }: { value: number; color: string }) {
  const rounded = Math.round(value)
  const widthClass =
    rounded >= 100 ? 'basis-[100%]' : rounded >= 96 ? 'basis-[96%]' : rounded >= 90 ? 'basis-[90%]' : rounded >= 80 ? 'basis-[80%]' : rounded >= 77 ? 'basis-[77%]' : rounded >= 76 ? 'basis-[76%]' : rounded >= 66 ? 'basis-[66%]' : rounded >= 62 ? 'basis-[62%]' : rounded >= 58 ? 'basis-[58%]' : rounded >= 57 ? 'basis-[57%]' : rounded >= 50 ? 'basis-[50%]' : 'basis-[45%]'
  const fillClass =
    color === 'var(--status-green)' ? 'bg-status-green' : color === 'var(--status-red)' ? 'bg-status-red' : color === 'var(--status-gray)' ? 'bg-status-gray' : 'bg-status-amber'

  return (
    <div className="flex h-1 overflow-hidden rounded-full bg-border-2">
      <div className={`h-full rounded-full flex-none ${fillClass} ${widthClass}`} />
    </div>
  )
}

export default function UsageGrid({ startup }: UsageGridProps) {
  const usage = startup.usage
  const activationProgress = (usage.activationValue / usage.activationTarget) * 100

  return (
    <div className="flex flex-col gap-3">
      <MetricCard label="DAU" value={usage.dau} status={usage.dauStatus}>
        <DeltaBadge value={usage.dauDelta} status={usage.dauStatus} />
      </MetricCard>
      <MetricCard label="MAU" value={usage.mau} status={usage.mauStatus}>
        <DeltaBadge value={usage.mauDelta} status={usage.mauStatus} />
      </MetricCard>
      <MetricCard label="ARPU" value={usage.arpu} status={usage.arpuStatus}>
        <DeltaBadge value={usage.arpuDelta} status={usage.arpuStatus} />
      </MetricCard>
      <MetricCard label="Activation Rate" value={usage.activation} status={usage.activationStatus}>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <DeltaBadge value={usage.activationDelta} status={usage.activationStatus} />
            <p className="font-mono text-[10px] text-brand-muted">Target {usage.activationTarget}%</p>
          </div>
          <ProgressBar value={activationProgress} color={getStatusColor(usage.activationStatus)} />
        </div>
      </MetricCard>
    </div>
  )
}