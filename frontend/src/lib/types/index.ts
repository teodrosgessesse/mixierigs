// ── Rig Types ──────────────────────────────────────────────────────────────
export type RigType = 'floater' | 'jackup' | 'land'
export type RigStatus = 'DRILLING' | 'STANDBY' | 'MAINTENANCE' | 'OFFLINE'
export type StatusDot = 'green' | 'amber' | 'red' | 'gray'

export interface Metric {
  label: string
  value: string
  unit?: string
  status: 'ok' | 'warn' | 'alarm'
}

export interface Rig {
  id: string
  name: string
  type: RigType
  area: string
  status: RigStatus
  alarms: number
  depth: string
  dot: StatusDot
  customer: string
  metrics?: Metric[]
  subsystems?: string[]
  wellName?: string
  operator?: string
  lat?: number
  lng?: number
}

// ── Alert Types ────────────────────────────────────────────────────────────
export type AlertSeverity = 'critical' | 'warning' | 'info'

export interface Alert {
  id: string
  rigId: string
  rigName: string
  severity: AlertSeverity
  system: string
  message: string
  time: string
  ackBy?: string
  ackTime?: string
  acknowledged: boolean
}

// ── Customer / Tenant Types ────────────────────────────────────────────────
export type CustomerPlan = 'Enterprise' | 'Professional' | 'Standard'

export interface Customer {
  id: string
  name: string
  code: string
  plan: CustomerPlan
  rigs: string[]
  users: number
  color: string
}

// ── User / Auth Types ──────────────────────────────────────────────────────
export type UserRole =
  | 'platform_admin'
  | 'customer_admin'
  | 'driller'
  | 'oim'
  | 'hse'
  | 'maintenance'
  | 'viewer'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  customerId: string
  customerName: string
  avatar?: string
}

// ── AI Types ───────────────────────────────────────────────────────────────
export interface AIMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: string
  context?: {
    rigId?: string
    subsystem?: string
    component?: string
  }
}

export interface AISuggestion {
  id: string
  text: string
  category: 'diagnosis' | 'action' | 'query'
}

// ── Fleet KPI Types ────────────────────────────────────────────────────────
export interface FleetKPI {
  label: string
  value: string
  sub: string
  color: 'blue' | 'green' | 'amber' | 'red'
}

// ── API Response Types ─────────────────────────────────────────────────────
export interface APIResponse<T> {
  data: T
  success: boolean
  error?: string
}
