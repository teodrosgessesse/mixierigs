'use client'
import { Bell, Menu, ChevronDown, LogOut, Settings } from 'lucide-react'
import { useState } from 'react'
import { useApp } from '@/contexts/AppContext'
import { HoloTwinMark } from '@/components/ui/Logo'
import { clsx } from 'clsx'

const NAV_TABS = [
  { id: 'fleet',   label: 'Fleet' },
  { id: 'alerts',  label: 'Alerts' },
  { id: 'reports', label: 'Reports' },
] as const

export function Topbar() {
  const { user, alerts, activeView, setView, setSidebar, sidebarOpen, logout } = useApp()
  const [menuOpen, setMenuOpen] = useState(false)
  const unacked = alerts.filter(a => !a.acknowledged).length

  return (
    <header className="h-12 bg-surface-panel border-b border-border flex items-center px-4 gap-3 flex-shrink-0 shadow-panel z-50">
      {/* Sidebar toggle */}
      <button
        onClick={() => setSidebar(!sidebarOpen)}
        className="p-1.5 rounded hover:bg-surface-bg text-ink-muted hover:text-ink transition-colors"
      >
        <Menu size={16} />
      </button>

      {/* Logo */}
      <div className="flex items-center gap-2 mr-2">
        <HoloTwinMark size={20} />
        <span className="font-cond font-bold text-[16px] text-ink tracking-tight">
          Mixie<span className="text-brand-blue">Rigs</span>
        </span>
        <span className="hidden sm:block text-ink-muted text-[11px] font-cond uppercase tracking-wider ml-1">
          · HoloTwin
        </span>
      </div>

      {/* Divider */}
      <div className="w-px h-7 bg-border mx-1" />

      {/* Nav tabs */}
      <nav className="flex gap-1">
        {NAV_TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setView(tab.id)}
            className={clsx(
              'px-3 py-1.5 rounded text-[12px] font-semibold font-cond uppercase tracking-wide transition-colors',
              activeView === tab.id
                ? 'bg-brand-blue/10 text-brand-blue border border-brand-blue/30'
                : 'text-ink-muted hover:text-ink hover:bg-surface-bg border border-transparent'
            )}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Right section */}
      <div className="ml-auto flex items-center gap-2">
        {/* Powered by IntelliMedia */}
        <span className="hidden lg:block text-[9px] text-ink-muted/50 font-cond tracking-wide">
          Powered by IntelliMedia Networks
        </span>
        <div className="w-px h-5 bg-border mx-1" />

        {/* Alert bell */}
        <button className="relative p-1.5 rounded hover:bg-surface-bg text-ink-muted hover:text-ink transition-colors">
          <Bell size={15} />
          {unacked > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-status-alarm text-white text-[9px] font-bold flex items-center justify-center animate-blink">
              {unacked}
            </span>
          )}
        </button>

        {/* Clock */}
        <span className="font-mono text-[11px] text-ink-muted hidden md:block">
          {new Date().toUTCString().slice(17, 22)} UTC
        </span>

        {/* User menu */}
        {user && (
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 px-2 py-1 rounded border border-border hover:border-brand-blue/40 hover:bg-surface-bg transition-colors"
            >
              <div className="w-6 h-6 rounded-full bg-brand-blue/20 text-brand-blue font-bold text-[10px] flex items-center justify-center">
                {user.name.charAt(0)}
              </div>
              <span className="text-[11px] font-medium text-ink hidden sm:block max-w-28 truncate">
                {user.name}
              </span>
              <ChevronDown size={12} className="text-ink-muted" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-surface-panel border border-border rounded-lg shadow-float z-50 overflow-hidden">
                <div className="px-3 py-2 border-b border-border">
                  <div className="text-[11px] font-semibold text-ink">{user.name}</div>
                  <div className="text-[10px] text-ink-muted">{user.role.replace(/_/g, ' ')}</div>
                </div>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-[12px] text-ink-muted hover:bg-surface-bg hover:text-ink transition-colors">
                  <Settings size={13} /> Settings
                </button>
                <button
                  onClick={() => { logout(); setMenuOpen(false) }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-[12px] text-status-alarm hover:bg-status-alarm/5 transition-colors"
                >
                  <LogOut size={13} /> Sign out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
