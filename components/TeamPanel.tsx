'use client'

import type { Startup } from '@/types'
import StatusBadge from '@/components/StatusBadge'
import { getInitials } from '@/lib/utils'

interface TeamPanelProps {
  startup: Startup
}

function activityStatusToColor(status: string) {
  if (status === 'Active') return 'green'
  if (status === 'Departed') return 'red'
  return 'gray'
}

function getGenderBarClass(status: 'male' | 'female') {
  return status === 'male'
    ? 'bg-gradient-to-r from-brand-accent to-[#6050ff]'
    : 'bg-gradient-to-r from-brand-accent2 to-[#ff6db0]'
}

function getGenderWidthClass(percent: number) {
  if (percent === 57) return 'basis-[57%]'
  if (percent === 43) return 'basis-[43%]'
  if (percent === 72) return 'basis-[72%]'
  if (percent === 28) return 'basis-[28%]'
  if (percent === 63) return 'basis-[63%]'
  if (percent === 37) return 'basis-[37%]'
  if (percent === 48) return 'basis-[48%]'
  if (percent === 52) return 'basis-[52%]'
  if (percent === 55) return 'basis-[55%]'
  if (percent === 45) return 'basis-[45%]'
  if (percent === 44) return 'basis-[44%]'
  if (percent === 56) return 'basis-[56%]'
  return 'basis-1/2'
}

function getMemberStyle(member: Startup['team']['members'][number]) {
  if (member.color === '#7c6aff') return 'border-[#7c6aff] bg-[#7c6aff]/15 text-[#7c6aff]'
  if (member.color === '#22d87a') return 'border-[#22d87a] bg-[#22d87a]/15 text-[#22d87a]'
  if (member.color === '#6b6880') return 'border-[#6b6880] bg-[#6b6880]/15 text-[#6b6880]'
  if (member.color === '#ffb830') return 'border-[#ffb830] bg-[#ffb830]/15 text-[#ffb830]'
  if (member.color === '#bf5fff') return 'border-[#bf5fff] bg-[#bf5fff]/15 text-[#bf5fff]'
  if (member.color === '#ff4d6d') return 'border-[#ff4d6d] bg-[#ff4d6d]/15 text-[#ff4d6d]'
  return 'border-border bg-bg-3 text-slate-900'
}

export default function TeamPanel({ startup }: TeamPanelProps) {
  const { team } = startup

  return (
    <section className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center justify-between">
        <p className="font-syne text-[13px] font-bold text-slate-900">Team</p>
        <p className="font-space text-[9px] uppercase tracking-[1px] text-brand-muted">People + mix</p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-border bg-bg-3 p-3">
          <p className="font-space text-[9px] uppercase tracking-[1.2px] text-brand-muted">New Hires MoM</p>
          <p className="mt-2 font-syne text-[22px] font-extrabold text-status-green">+{team.hires}</p>
        </div>
        <div className="rounded-xl border border-border bg-bg-3 p-3">
          <p className="font-space text-[9px] uppercase tracking-[1.2px] text-brand-muted">Departures MoM</p>
          <p className={`mt-2 font-syne text-[22px] font-extrabold ${team.departures > 0 ? 'text-status-red' : 'text-status-green'}`}>{team.departures}</p>
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="font-space text-[9px] uppercase tracking-[1.2px] text-brand-muted">Gender diversity</p>
          <p className="font-mono text-[10px] text-brand-muted">M {team.malePct}% · F {team.femalePct}%</p>
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-border-2">
          <div className="flex h-full w-full">
            <div className={`${getGenderBarClass('male')} ${getGenderWidthClass(team.malePct)} flex-none`} />
            <div className={`${getGenderBarClass('female')} ${getGenderWidthClass(team.femalePct)} flex-none`} />
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {team.members.map((member) => (
          <div key={member.name} className="flex items-center gap-3 rounded-xl border border-border bg-bg-3 p-3">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-[11px] font-syne font-bold ${getMemberStyle(member)}`}
            >
              {getInitials(member.name)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-space text-[12px] text-slate-900">{member.name}</p>
              <p className="truncate font-space text-[10px] text-brand-muted">{member.role}</p>
            </div>
            <StatusBadge status={activityStatusToColor(member.activityStatus)} label={member.activityStatus.toUpperCase()} />
          </div>
        ))}
      </div>
    </section>
  )
}