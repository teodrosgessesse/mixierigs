'use client'
import { useApp } from '@/contexts/AppContext'
import { SeverityBadge, SectionTitle } from '@/components/ui'
import { Check } from 'lucide-react'
import { clsx } from 'clsx'

const sevBorder = {
  critical: 'border-l-status-alarm bg-status-alarm/3',
  warning:  'border-l-status-warn  bg-status-warn/3',
  info:     'border-l-brand-blue   bg-brand-blue/3',
}

export function AlertCenter() {
  const { alerts, ackAlert, selectRig } = useApp()
  const active = alerts.filter(a => !a.acknowledged)
  const acked  = alerts.filter(a =>  a.acknowledged)

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-5">
      {/* Active alerts */}
      <div>
        <SectionTitle>Active Alerts — {active.length} unacknowledged</SectionTitle>
        {active.length === 0 ? (
          <div className="bg-surface-panel rounded-lg border border-border p-8 text-center text-ink-muted text-[13px]">
            ✓ No active alerts
          </div>
        ) : (
          <div className="space-y-2">
            {active.map(alert => (
              <div
                key={alert.id}
                className={clsx(
                  'bg-surface-panel rounded-lg border border-border border-l-[3px] shadow-panel flex items-center gap-3 px-3 py-2.5',
                  sevBorder[alert.severity]
                )}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <SeverityBadge severity={alert.severity} />
                    <button
                      onClick={() => selectRig(alert.rigId)}
                      className="font-cond font-bold text-[12px] text-ink-mid hover:text-brand-blue transition-colors"
                    >
                      {alert.rigName}
                    </button>
                    <span className="font-cond text-[11px] text-ink-muted">{alert.system}</span>
                  </div>
                  <div className="mt-0.5 text-[12px] text-ink">{alert.message}</div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="font-mono text-[10px] text-ink-muted">{alert.time}</span>
                  <button
                    onClick={() => ackAlert(alert.id)}
                    className="flex items-center gap-1 px-2 py-1 rounded border border-border hover:border-brand-blue hover:text-brand-blue text-ink-muted text-[10px] font-semibold font-cond uppercase tracking-wide transition-colors shadow-panel"
                  >
                    <Check size={10} /> ACK
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Acknowledged */}
      {acked.length > 0 && (
        <div>
          <SectionTitle>Acknowledged — {acked.length}</SectionTitle>
          <div className="space-y-1.5">
            {acked.map(alert => (
              <div
                key={alert.id}
                className="bg-surface-bg rounded border border-border flex items-center gap-3 px-3 py-2 opacity-60"
              >
                <Check size={12} className="text-status-ok flex-shrink-0" />
                <span className="font-cond text-[11px] text-ink-muted">{alert.rigName}</span>
                <span className="text-[11px] text-ink-muted flex-1">{alert.message}</span>
                <span className="font-mono text-[10px] text-ink-muted">{alert.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
