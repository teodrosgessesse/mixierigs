import { AppProvider } from '@/contexts/AppContext'
import { PlatformShell } from '@/components/layout/PlatformShell'

export default function Home() {
  return (
    <AppProvider>
      <PlatformShell />
    </AppProvider>
  )
}
