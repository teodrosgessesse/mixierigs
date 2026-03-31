'use client'
import { useApp } from '@/contexts/AppContext'
import { Topbar }          from '@/components/layout/Topbar'
import { Sidebar }         from '@/components/layout/Sidebar'
import { LoginPage }       from '@/components/layout/LoginPage'
import { FleetDashboard }  from '@/components/dashboard/FleetDashboard'
import { AlertCenter }     from '@/components/dashboard/AlertCenter'
import { RigDetail }       from '@/components/rig/RigDetail'
import { AIPanel }         from '@/components/ai/AIPanel'
import { Card }            from '@/components/ui'

export function PlatformShell() {
  const { user, selectedRig, activeView } = useApp()

  if (!user) return <LoginPage />

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-surface-bg">
      <Topbar />
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          {/* Main content area */}
          <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
            {selectedRig ? (
              <RigDetail />
            ) : activeView === 'fleet' ? (
              <FleetDashboard />
            ) : activeView === 'alerts' ? (
              <AlertCenter />
            ) : activeView === 'reports' ? (
              <ReportsPlaceholder />
            ) : null}
          </div>
          {/* MixieAI strip - always visible */}
          <AIPanel />
        </div>
      </div>
    </div>
  )
}

function ReportsPlaceholder() {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="max-w-2xl mx-auto mt-12 text-center">
        <Card className="p-10">
          <div className="text-3xl mb-4">📊</div>
          <h2 className="font-cond font-bold text-[20px] text-ink mb-2">Reports</h2>
          <p className="text-ink-muted text-[13px]">
            AI-generated shift reports, incident packs, and executive summaries.
            Coming in Phase 2.
          </p>
        </Card>
      </div>
    </div>
  )
}
