import { NextRequest, NextResponse } from 'next/server'
import { RIGS } from '@/lib/data'

export async function GET(req: NextRequest) {
  try {
    // Try Django backend first if configured
    const djangoUrl = process.env.DJANGO_API_URL
    if (djangoUrl) {
      const res = await fetch(`${djangoUrl}/api/rigs/`, {
        headers: { 'Authorization': `Bearer ${process.env.DJANGO_API_KEY ?? ''}` },
        next: { revalidate: 30 },
      })
      if (res.ok) return NextResponse.json(await res.json())
    }
    // Fall back to mock data
    return NextResponse.json({ rigs: Object.values(RIGS), source: 'mock' })
  } catch {
    return NextResponse.json({ rigs: Object.values(RIGS), source: 'mock' })
  }
}
