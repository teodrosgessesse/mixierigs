'use client'
import { useApp } from '@/contexts/AppContext'
import { StatusDot, RigTypeBadge } from '@/components/ui'
import { RIGS, CUSTOMERS } from '@/lib/data'
import { clsx } from 'clsx'

export function Sidebar() {
  const { user, selectedRig, selectRig, sidebarOpen } = useApp()

  if (!sidebarOpen) return null

  // Filter rigs by customer
  const visibleRigs = Object.values(RIGS).filter(r =>
    !user || user.role === 'platform_admin' || CUSTOMERS[user.customerId]?.rigs.includes(r.id)
  )

  // Group by area
  const areas = Array.from(new Set(visibleRigs.map(r => r.area)))

  return (
    <aside className="w-48 bg-surface-panel border-r border-border flex flex-col flex-shrink-0 shadow-[1px_0_6px_rgba(15,28,46,0.06)] overflow-y-auto">
      {/* Customer badge */}
      {user && (
        <div className="px-3 py-2.5 border-b border-border bg-surface-bg">
          <div className="text-[9px] font-bold text-ink-muted uppercase tracking-widest mb-0.5">Tenant</div>
          <div className="font-cond font-bold text-[13px] text-ink truncate">
            {user.role === 'platform_admin' ? 'All Customers' : user.customerName}
          </div>
        </div>
      )}

      {/* Rig list */}
      <div className="flex-1 py-2">
        {areas.map(area => {
          const areaRigs = visibleRigs.filter(r => r.area === area)
          return (
            <div key={area} className="mb-1">
              <div className="px-3 py-1">
                <span className="font-cond text-[9px] font-bold text-ink-muted uppercase tracking-widest">
                  {area}
                </span>
              </div>
              {areaRigs.map(rig => (
                <button
                  key={rig.id}
                  onClick={() => selectRig(selectedRig?.id === rig.id ? null : rig.id)}
                  className={clsx(
                    'w-full text-left px-3 py-2 transition-colors border-l-2',
                    selectedRig?.id === rig.id
                      ? 'bg-brand-blue/7 border-l-brand-blue'
                      : 'border-l-transparent hover:bg-surface-bg'
                  )}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className={clsx(
                      'font-cond font-bold text-[12px] truncate',
                      selectedRig?.id === rig.id ? 'text-brand-blue' : 'text-ink'
                    )}>
                      {rig.name}
                    </span>
                    <StatusDot color={rig.dot} pulse={rig.dot === 'red'} />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <RigTypeBadge type={rig.type} />
                    {rig.alarms > 0 && (
                      <span className="font-cond text-[9px] font-bold text-status-alarm">
                        {rig.alarms}▲
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-ink-muted mt-0.5 truncate font-mono">
                    {rig.depth}
                  </div>
                </button>
              ))}
            </div>
          )
        })}
      </div>

      {/* Statusbar */}
      <div className="px-3 py-2 border-t border-border bg-surface-bg">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-status-ok" />
          <span className="font-cond text-[9px] text-ink-muted">
            {visibleRigs.length} rigs · {visibleRigs.filter(r => r.dot === 'green').length} nominal
          </span>
        </div>
      </div>
    </aside>
  )
}
