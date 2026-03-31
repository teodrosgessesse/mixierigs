import { NextRequest, NextResponse } from 'next/server'
import { DEMO_USERS } from '@/lib/data'

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  // Demo: find user by email, any password works
  const user = DEMO_USERS.find(u => u.email === email)
  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  return NextResponse.json({ user, token: `demo_${user.id}_${Date.now()}` })
}
