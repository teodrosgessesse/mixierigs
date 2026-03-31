import { clsx } from 'clsx'
import type { StatusDot, AlertSeverity } from '@/lib/types'

// ── StatusDot ──────────────────────────────────────────────────────────────
export function StatusDot({ color, pulse }: { color: StatusDot; pulse?: boolean }) {
  const colors: Record<StatusDot, string> = {
    green: 'bg-status-ok',
    amber: 'bg-status-warn',
    red:   'bg-status-alarm',
    gray:  'bg-border-strong',
  }
  return (
    <span className={clsx(
      'inline-block w-2 h-2 rounded-full flex-shrink-0',
      colors[color],
      pulse && color === 'red' && 'animate-pulse',
    )} />
  )
}

// ── RigTypeBadge ───────────────────────────────────────────────────────────
const typeStyles = {
  floater: 'bg-rig-floater/10 text-rig-floater border border-rig-floater/30',
  jackup:  'bg-rig-jackup/10  text-rig-jackup  border border-rig-jackup/30',
  land:    'bg-rig-land/10    text-rig-land    border border-rig-land/30',
}
const typeLabels = { floater: 'Floater', jackup: 'Jack-Up', land: 'Land' }

export function RigTypeBadge({ type }: { type: 'floater' | 'jackup' | 'land' }) {
  return (
    <span className={clsx(
      'font-cond text-[10px] font-700 px-1.5 py-0.5 rounded-sm uppercase tracking-wide',
      typeStyles[type]
    )}>
      {typeLabels[type]}
    </span>
  )
}

// ── SeverityBadge ──────────────────────────────────────────────────────────
const sevStyles: Record<AlertSeverity, string> = {
  critical: 'bg-status-alarm/10 text-status-alarm border border-status-alarm/30',
  warning:  'bg-status-warn/10  text-status-warn  border border-status-warn/30',
  info:     'bg-brand-blue/10   text-brand-blue   border border-brand-blue/30',
}

export function SeverityBadge({ severity }: { severity: AlertSeverity }) {
  return (
    <span className={clsx(
      'font-cond text-[10px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wide',
      sevStyles[severity]
    )}>
      {severity}
    </span>
  )
}

// ── MetricCard ─────────────────────────────────────────────────────────────
type MetricStatus = 'ok' | 'warn' | 'alarm'
const metricValueColor: Record<MetricStatus, string> = {
  ok:    'text-ink',
  warn:  'text-status-warn',
  alarm: 'text-status-alarm',
}
const metricBorder: Record<MetricStatus, string> = {
  ok:    'border-border',
  warn:  'border-status-warn bg-status-warn/5',
  alarm: 'border-status-alarm bg-status-alarm/5',
}

export function MetricCard({
  label, value, unit, status = 'ok',
}: { label: string; value: string; unit?: string; status?: MetricStatus }) {
  return (
    <div className={clsx(
      'p-2.5 rounded border shadow-panel bg-surface-panel',
      metricBorder[status]
    )}>
      <div className="text-[10px] font-semibold text-ink-muted uppercase tracking-wide mb-1">
        {label}
      </div>
      <div className="flex items-baseline gap-1">
        <span className={clsx('font-mono text-[15px] font-bold', metricValueColor[status])}>
          {value}
        </span>
        {unit && <span className="font-cond text-[11px] text-ink-muted">{unit}</span>}
      </div>
    </div>
  )
}

// ── Spinner ────────────────────────────────────────────────────────────────
export function Spinner({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size} height={size}
      viewBox="0 0 24 24"
      className="animate-spin"
      fill="none"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25"/>
      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  )
}

// ── Card wrapper ───────────────────────────────────────────────────────────
export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={clsx('bg-surface-panel rounded-lg border border-border shadow-card', className)}>
      {children}
    </div>
  )
}

// ── Section title with divider ─────────────────────────────────────────────
export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="font-cond text-[11px] font-bold text-ink-muted uppercase tracking-widest whitespace-nowrap">
        {children}
      </span>
      <div className="flex-1 h-px bg-border" />
    </div>
  )
}
