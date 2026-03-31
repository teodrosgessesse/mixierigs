import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MixieRigs | HoloTwin Oil & Gas Operations',
  description: 'AI-Powered Oil & Gas Digital Twin Operations Platform — HoloTwin, LLC',
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
