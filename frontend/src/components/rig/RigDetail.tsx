'use client'
import { useState } from 'react'
import { useApp } from '@/contexts/AppContext'
import { MetricCard, SectionTitle } from '@/components/ui'
import { RigTypeBadge, StatusDot } from '@/components/ui'
import { ArrowLeft } from 'lucide-react'
import { clsx } from 'clsx'

const SUBSYSTEMS = [
  'Drilling Control',
  'Well Control',
  'Safety & F&G',
  'Mud & Circulation',
  'Power & Electrical',
  'Equipment & CMMS',
  'Marine / DP',
]

export function RigDetail() {
  const { selectedRig, selectRig } = useApp()
  const [activeTab, setActiveTab] = useState(0)

  if (!selectedRig) return null

  return (
    <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
      {/* Rig header */}
      <div className="bg-surface-panel border-b border-border px-4 py-2.5 flex items-center gap-3 flex-shrink-0 shadow-panel">
        <button
          onClick={() => selectRig(null)}
          className="flex items-center gap-1.5 px-2 py-1 rounded border border-border hover:border-brand-blue/40 hover:text-brand-blue text-ink-muted text-[11px] font-semibold font-cond uppercase tracking-wide transition-colors shadow-panel"
        >
          <ArrowLeft size={12} /> Fleet
        </button>

        <div className="w-px h-6 bg-border mx-1" />

        <StatusDot color={selectedRig.dot} pulse={selectedRig.dot === 'red'} />
        <div>
          <div className="flex items-center gap-2">
            <span className="font-cond font-bold text-[16px] text-ink">{selectedRig.name}</span>
            <RigTypeBadge type={selectedRig.type} />
          </div>
          <div className="text-[10px] text-ink-muted font-cond">
            {selectedRig.area} · {selectedRig.depth} · {selectedRig.wellName ?? ''} · {selectedRig.operator ?? ''}
          </div>
        </div>

        {selectedRig.alarms > 0 && (
          <div className="ml-auto font-cond font-bold text-status-alarm text-[13px] animate-blink">
            {selectedRig.alarms} ACTIVE ALARM{selectedRig.alarms > 1 ? 'S' : ''}
          </div>
        )}
      </div>

      {/* Subsystem tabs */}
      <div className="bg-surface-panel border-b border-border px-4 flex gap-1 flex-wrap py-2 flex-shrink-0">
        {SUBSYSTEMS.map((tab, i) => {
          const show = selectedRig.type !== 'land' || !['Marine / DP'].includes(tab)
          if (!show) return null
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={clsx(
                'px-2.5 py-1 rounded text-[11px] font-semibold font-cond uppercase tracking-wide transition-colors border whitespace-nowrap',
                activeTab === i
                  ? 'bg-brand-blue/8 text-brand-blue border-brand-blue/40'
                  : 'text-ink-muted border-transparent hover:bg-surface-bg hover:text-ink'
              )}
            >
              {tab}
            </button>
          )
        })}
      </div>

      {/* Metrics + 3D panel */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Left: Data panel */}
        <div className="w-72 flex-shrink-0 overflow-y-auto border-r border-border bg-surface-bg p-3 space-y-4">
          <SectionTitle>Live Parameters</SectionTitle>
          <div className="grid grid-cols-2 gap-2">
            {(selectedRig.metrics ?? []).map((m, i) => (
              <MetricCard key={i} label={m.label} value={m.value} unit={m.unit} status={m.status} />
            ))}
          </div>

          {/* MixieAI quick actions */}
          <SectionTitle>MixieAI</SectionTitle>
          <div className="space-y-1.5">
            {[
              `Diagnose ${SUBSYSTEMS[activeTab]}`,
              'Check for anomalies',
              'Retrieve similar cases',
              'Draft shift report',
            ].map(s => (
              <button
                key={s}
                className="w-full text-left px-2.5 py-1.5 rounded border border-border bg-surface-panel hover:border-brand-blue/40 hover:bg-brand-blue/5 text-[11px] text-ink-muted hover:text-ink transition-colors font-cond"
              >
                ↗ {s}
              </button>
            ))}
          </div>
        </div>

        {/* Right: 3D canvas placeholder */}
        <div className="flex-1 flex flex-col bg-surface-bg">
          <div className="flex items-center justify-between px-3 py-2 bg-surface-panel border-b border-border">
            <span className="font-cond text-[11px] font-bold text-ink-muted uppercase tracking-widest">
              Digital Twin — {SUBSYSTEMS[activeTab]}
            </span>
            <span className="font-cond text-[10px] text-ink-muted">Babylon.js v8.56.2 · PBR</span>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <BabylonCanvas rigId={selectedRig.id} subsystem={activeTab} />
          </div>
        </div>
      </div>
    </div>
  )
}

// Lazy-loaded Babylon.js canvas
function BabylonCanvas({ rigId, subsystem }: { rigId: string; subsystem: number }) {
  return (
    <div className="w-full h-full flex items-center justify-center text-ink-muted">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-3 opacity-30">
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
            <rect x="16" y="8"  width="32" height="48" rx="3" stroke="currentColor" strokeWidth="2"/>
            <rect x="24" y="16" width="16" height="12" rx="2" fill="currentColor" opacity="0.3"/>
            <rect x="24" y="34" width="8"  height="8"  rx="1" fill="currentColor" opacity="0.3"/>
            <rect x="36" y="34" width="4"  height="8"  rx="1" fill="currentColor" opacity="0.3"/>
          </svg>
        </div>
        <div className="font-cond text-[13px] font-semibold">3D Twin Loading</div>
        <div className="text-[11px] mt-1">Rig: {rigId.toUpperCase()} · Subsystem {subsystem + 1}</div>
      </div>
    </div>
  )
}
