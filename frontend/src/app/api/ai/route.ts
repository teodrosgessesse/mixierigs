import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

export async function POST(req: NextRequest) {
  try {
    const { messages, systemContext } = await req.json()

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type':         'application/json',
        'x-api-key':            process.env.ANTHROPIC_API_KEY ?? '',
        'anthropic-version':    '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model:      'claude-sonnet-4-6',
        max_tokens: 1024,
        system:     systemContext ?? 'You are MixieAI, an Oil & Gas operations assistant for HoloTwin MixieRigs.',
        messages:   messages ?? [],
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      return NextResponse.json({ error: `API error: ${response.status}` }, { status: 500 })
    }

    const data = await response.json()
    const content = data.content?.[0]?.text ?? 'No response from AI.'
    return NextResponse.json({ content })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Unknown error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
