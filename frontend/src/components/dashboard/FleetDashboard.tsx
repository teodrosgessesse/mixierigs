'use client'
import { useApp } from '@/contexts/AppContext'
import { RIGS, CUSTOMERS, FLEET_KPIS } from '@/lib/data'
import { StatusDot, RigTypeBadge, SectionTitle } from '@/components/ui'
import { clsx } from 'clsx'

const kpiColors = {
  blue:  'border-t-brand-blue  text-brand-blue',
  green: 'border-t-status-ok   text-status-ok',
  amber: 'border-t-status-warn text-status-warn',
  red:   'border-t-status-alarm text-status-alarm',
}

export function FleetDashboard() {
  const { user, selectRig } = useApp()

  const rigs = Object.values(RIGS).filter(r =>
    !user || user.role === 'platform_admin' || CUSTOMERS[user.customerId]?.rigs.includes(r.id)
  )
  const alarmRigs  = rigs.filter(r => r.dot === 'red')
  const warnRigs   = rigs.filter(r => r.dot === 'amber')

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-5">
      {/* KPI Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {FLEET_KPIS.map((kpi, i) => (
          <div key={i} className={clsx(
            'bg-surface-panel rounded-lg border border-border border-t-2 shadow-card p-3',
            kpiColors[kpi.color]
          )}>
            <div className="text-[10px] font-semibold text-ink-muted uppercase tracking-widest mb-1">
              {kpi.label}
            </div>
            <div className={clsx('font-cond text-2xl font-bold', kpiColors[kpi.color].split(' ')[1])}>
              {kpi.value}
            </div>
            <div className="text-[10px] text-ink-muted mt-0.5">{kpi.sub}</div>
          </div>
        ))}
      </div>

      {/* Priority alerts row */}
      {(alarmRigs.length > 0 || warnRigs.length > 0) && (
        <div>
          <SectionTitle>Rigs Requiring Attention</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[...alarmRigs, ...warnRigs].map(rig => (
              <RigCard key={rig.id} rig={rig} onClick={() => selectRig(rig.id)} />
            ))}
          </div>
        </div>
      )}

      {/* All rigs */}
      <div>
        <SectionTitle>
          {user?.role === 'platform_admin' ? 'All Fleet Rigs' : 'Your Rigs'} — {rigs.length} total
        </SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {rigs.map(rig => (
            <RigCard key={rig.id} rig={rig} onClick={() => selectRig(rig.id)} />
          ))}
        </div>
      </div>
    </div>
  )
}

function RigCard({ rig, onClick }: { rig: (typeof RIGS)[string]; onClick: () => void }) {
  const borderColor = {
    green: 'hover:border-status-ok/50',
    amber: 'border-status-warn/50 hover:border-status-warn',
    red:   'border-status-alarm/60 hover:border-status-alarm',
    gray:  'hover:border-border-strong',
  }[rig.dot]

  return (
    <button
      onClick={onClick}
      className={clsx(
        'bg-surface-panel rounded-lg border border-border shadow-card text-left transition-all hover:shadow-float',
        borderColor
      )}
    >
      {/* Header */}
      <div className={clsx(
        'px-3 py-2 rounded-t-lg border-b border-border flex items-center justify-between',
        rig.dot === 'red' ? 'bg-status-alarm/5' : rig.dot === 'amber' ? 'bg-status-warn/5' : 'bg-surface-bg'
      )}>
        <div className="flex items-center gap-2">
          <StatusDot color={rig.dot} pulse={rig.dot === 'red'} />
          <span className="font-cond font-bold text-[15px] text-ink">{rig.name}</span>
        </div>
        <RigTypeBadge type={rig.type} />
      </div>

      {/* Body */}
      <div className="px-3 py-2.5 space-y-1.5">
        <div className="flex justify-between text-[11px]">
          <span className="text-ink-muted">Area</span>
          <span className="font-semibold text-ink">{rig.area}</span>
        </div>
        <div className="flex justify-between text-[11px]">
          <span className="text-ink-muted">Depth</span>
          <span className="font-mono font-semibold text-ink">{rig.depth}</span>
        </div>
        <div className="flex justify-between text-[11px]">
          <span className="text-ink-muted">Status</span>
          <span className={clsx(
            'font-cond font-bold text-[11px] uppercase tracking-wide',
            rig.dot === 'green' ? 'text-status-ok' : rig.dot === 'red' ? 'text-status-alarm' : 'text-status-warn'
          )}>{rig.status}</span>
        </div>
        {rig.alarms > 0 && (
          <div className="mt-1 pt-1.5 border-t border-border flex items-center justify-between">
            <span className="text-[10px] text-ink-muted">Active alarms</span>
            <span className="font-cond font-bold text-status-alarm text-[13px] animate-blink">
              {rig.alarms} ▲
            </span>
          </div>
        )}
      </div>
    </button>
  )
}
