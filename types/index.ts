export type Status = 'red' | 'green' | 'gray'

export interface FinancialData {
  arr: string
  gp: string
  margin: number
  burn: string
  burnPct: number
  opex: string
  wow: string
  wowStatus: Status
  mom: string
  momStatus: Status
  qoq: string
  qoqStatus: Status
}

export interface UsageData {
  dau: string
  dauDelta: string
  dauStatus: Status
  mau: string
  mauDelta: string
  mauStatus: Status
  arpu: string
  arpuDelta: string
  arpuStatus: Status
  activation: string
  activationDelta: string
  activationStatus: Status
  activationTarget: number
  activationValue: number
}

export interface ChartData {
  arr: number[]
  revenue: number[]
  dau: number[]
  burn: number[]
  churn: number[]
}

export interface KPI {
  name: string
  current: string
  target: string
  status: Status
}

export interface Milestone {
  icon: string
  status: Status
  title: string
  category: string
  trackingStatus: string
  due: string
}

export interface TeamMember {
  name: string
  role: string
  activityStatus: 'Active' | 'On Leave' | 'Departed'
  color: string
  bg: string
}

export interface TeamData {
  hires: number
  departures: number
  malePct: number
  femalePct: number
  members: TeamMember[]
}

export interface Startup {
  name: string
  description: string
  sector: string
  stage: string
  status: Status
  financials: FinancialData
  usage: UsageData
  chartData: ChartData
  kpis: KPI[]
  milestones: Milestone[]
  team: TeamData
}

export type MetricKey = keyof ChartData