'use client'
import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { User, Rig, Alert } from '@/lib/types'
import { DEMO_USERS, RIGS, ALERTS } from '@/lib/data'

interface AppState {
  user:        User | null
  selectedRig: Rig | null
  alerts:      Alert[]
  activeView:  'fleet' | 'alerts' | 'reports' | 'admin'
  sidebarOpen: boolean
  login:       (userId: string) => void
  logout:      () => void
  selectRig:   (rigId: string | null) => void
  ackAlert:    (alertId: string) => void
  setView:     (v: AppState['activeView']) => void
  setSidebar:  (open: boolean) => void
}

const AppContext = createContext<AppState | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [user,        setUser]        = useState<User | null>(null)
  const [selectedRig, setSelectedRig] = useState<Rig | null>(null)
  const [alerts,      setAlerts]      = useState<Alert[]>(ALERTS)
  const [activeView,  setActiveView]  = useState<AppState['activeView']>('fleet')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const login = useCallback((userId: string) => {
    const u = DEMO_USERS.find(u => u.id === userId)
    if (u) setUser(u)
  }, [])

  const logout = useCallback(() => {
    setUser(null); setSelectedRig(null)
  }, [])

  const selectRig = useCallback((rigId: string | null) => {
    setSelectedRig(rigId ? (RIGS[rigId] ?? null) : null)
  }, [])

  const ackAlert = useCallback((alertId: string) => {
    setAlerts(prev => prev.map(a =>
      a.id === alertId ? { ...a, acknowledged: true, ackBy: user?.name, ackTime: new Date().toISOString() } : a
    ))
  }, [user])

  return (
    <AppContext.Provider value={{
      user, selectedRig, alerts, activeView, sidebarOpen,
      login, logout, selectRig, ackAlert,
      setView: setActiveView,
      setSidebar: setSidebarOpen,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
