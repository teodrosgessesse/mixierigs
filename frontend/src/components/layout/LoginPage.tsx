'use client'
import { useState } from 'react'
import { useApp } from '@/contexts/AppContext'
import { HoloTwinLogo } from '@/components/ui/Logo'
import { DEMO_USERS } from '@/lib/data'
import { Spinner } from '@/components/ui'
import { clsx } from 'clsx'

export function LoginPage() {
  const { login } = useApp()
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  const handleDemo = async (userId: string) => {
    setLoading(true); setError('')
    try {
      await new Promise(r => setTimeout(r, 400))
      login(userId)
    } catch {
      setError('Login failed')
    } finally {
      setLoading(false)
    }
  }

  const roleColors: Record<string, string> = {
    platform_admin:  'text-brand-blue',
    customer_admin:  'text-status-ok',
    driller:         'text-status-warn',
    oim:             'text-status-info',
    hse:             'text-status-alarm',
    maintenance:     'text-ink-mid',
    viewer:          'text-ink-muted',
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8F1FA] via-[#F0F5FC] to-[#EBF2FA] flex items-center justify-center p-4">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: 'linear-gradient(rgba(16,152,208,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(16,152,208,0.07) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 w-full max-w-md">
        {/* Brand */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <HoloTwinLogo size="lg" />
          </div>
          <h1 className="font-cond font-bold text-[22px] text-ink tracking-widest uppercase">
            MIXIERIGS
          </h1>
          <p className="text-ink-muted text-[12px] mt-1 font-cond">
            AI-Powered Oil & Gas Operations Intelligence
          </p>
        </div>

        {/* Login card */}
        <div className="bg-surface-panel rounded-xl border border-border shadow-float p-8">
          <h2 className="font-cond font-bold text-[15px] text-brand-blue uppercase tracking-widest mb-5 flex items-center gap-2">
            <span className="w-4 h-0.5 bg-brand-blue" /> Sign In
          </h2>

          {error && (
            <div className="mb-4 px-3 py-2 rounded bg-status-alarm/10 border border-status-alarm/30 text-status-alarm text-[12px]">
              {error}
            </div>
          )}

          {/* Demo credentials */}
          <div className="mb-5">
            <div className="text-[10px] font-bold text-ink-muted uppercase tracking-widest mb-2">
              Demo Accounts
            </div>
            <div className="grid grid-cols-2 gap-2">
              {DEMO_USERS.map(u => (
                <button
                  key={u.id}
                  onClick={() => handleDemo(u.id)}
                  disabled={loading}
                  className="text-left p-2.5 rounded border border-border bg-surface-bg hover:border-brand-blue/50 hover:bg-brand-blue/5 transition-all shadow-panel disabled:opacity-50 group"
                >
                  <span className={clsx(
                    'block text-[9px] font-bold uppercase tracking-widest font-cond mb-0.5',
                    roleColors[u.role] ?? 'text-ink-muted'
                  )}>
                    {u.role.replace(/_/g, ' ')}
                  </span>
                  <span className="block text-[11px] font-semibold text-ink group-hover:text-brand-blue transition-colors truncate">
                    {u.name}
                  </span>
                  <span className="block text-[10px] text-ink-muted truncate">{u.email}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => handleDemo(DEMO_USERS[0].id)}
            disabled={loading}
            className="w-full py-2.5 rounded bg-brand-blue hover:bg-brand-dark text-white font-cond font-bold text-[13px] uppercase tracking-widest transition-colors shadow-card disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? <><Spinner size={14} /> Signing in…</> : 'Enter Platform →'}
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-5 text-[10px] text-ink-muted/60 font-cond">
          Powered by IntelliMedia Networks, Inc. · Confidential
        </div>
      </div>
    </div>
  )
}
