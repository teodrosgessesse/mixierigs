import { NextRequest, NextResponse } from 'next/server'
import { ALERTS } from '@/lib/data'

export async function GET(req: NextRequest) {
  try {
    const djangoUrl = process.env.DJANGO_API_URL
    if (djangoUrl) {
      const res = await fetch(`${djangoUrl}/api/alerts/`, {
        headers: { 'Authorization': `Bearer ${process.env.DJANGO_API_KEY ?? ''}` },
        next: { revalidate: 10 },
      })
      if (res.ok) return NextResponse.json(await res.json())
    }
    return NextResponse.json({ alerts: ALERTS, source: 'mock' })
  } catch {
    return NextResponse.json({ alerts: ALERTS, source: 'mock' })
  }
}
