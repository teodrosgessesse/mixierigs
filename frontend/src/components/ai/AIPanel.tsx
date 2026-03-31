'use client'
import { useState, useRef, useEffect } from 'react'
import { useApp } from '@/contexts/AppContext'
import { Spinner } from '@/components/ui'
import { Send, Bot } from 'lucide-react'
import { HoloTwinMark } from '@/components/ui/Logo'
import { clsx } from 'clsx'
import type { AIMessage } from '@/lib/types'

const SUGGESTIONS = [
  'What are the current alarm conditions?',
  'Retrieve similar cases for this situation',
  'Recommend next actions',
  'Draft shift handover report',
]

export function AIPanel() {
  const { selectedRig, user } = useApp()
  const [messages, setMessages] = useState<AIMessage[]>([])
  const [input,    setInput]    = useState('')
  const [loading,  setLoading]  = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const buildContext = () => {
    const lines: string[] = ['You are MixieAI, an AI operations assistant for MixieRigs — an Oil & Gas digital twin platform by HoloTwin, LLC.']
    lines.push('You help drillers, OIMs, and engineers diagnose situations, retrieve prior cases, and recommend actions.')
    lines.push('Always be concise, accurate, and safety-first. Reference specific rig data when available.')
    if (selectedRig) {
      lines.push(`\nCurrent rig: ${selectedRig.name} (${selectedRig.type}, ${selectedRig.area})`)
      lines.push(`Status: ${selectedRig.status} · Depth: ${selectedRig.depth}`)
      if (selectedRig.alarms > 0) lines.push(`Active alarms: ${selectedRig.alarms}`)
      if (selectedRig.metrics) {
        lines.push('Live metrics: ' + selectedRig.metrics.map(m => `${m.label}: ${m.value}${m.unit ?? ''}`).join(', '))
      }
    }
    if (user) lines.push(`\nOperator: ${user.name} (${user.role.replace(/_/g,' ')})`)
    return lines.join('\n')
  }

  const send = async (override?: string) => {
    const text = override ?? input.trim()
    if (!text || loading) return
    setInput('')

    const userMsg: AIMessage = {
      id: Date.now().toString(), role: 'user', content: text,
      timestamp: new Date().toISOString(),
      context: selectedRig ? { rigId: selectedRig.id } : undefined,
    }
    setMessages(prev => [...prev, userMsg])
    setLoading(true)

    try {
      const history = [...messages, userMsg].map(m => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      }))

      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history, systemContext: buildContext() }),
      })
      const data = await res.json()
      const reply: AIMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.content ?? data.error ?? 'No response',
        timestamp: new Date().toISOString(),
      }
      setMessages(prev => [...prev, reply])
    } catch (e) {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(), role: 'assistant',
        content: 'Connection error. Please check network.',
        timestamp: new Date().toISOString(),
      }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-56 bg-surface-panel border-t-2 border-brand-dark/30 flex flex-shrink-0">
      {/* Header */}
      <div className="w-40 flex-shrink-0 border-r border-border bg-surface-bg flex flex-col">
        <div className="px-3 py-2 border-b border-border">
          <div className="flex items-center gap-1.5">
            <HoloTwinMark size={14} />
            <span className="font-cond font-bold text-[12px] text-brand-blue">MixieAI</span>
          </div>
          <div className="text-[9px] text-ink-muted mt-0.5">claude-sonnet-4-6</div>
        </div>
        {/* Suggestions */}
        <div className="flex-1 overflow-y-auto p-1.5 space-y-1">
          {SUGGESTIONS.map(s => (
            <button
              key={s}
              onClick={() => send(s)}
              disabled={loading}
              className="w-full text-left px-1.5 py-1 rounded border border-border bg-surface-panel hover:border-brand-blue/40 hover:bg-brand-blue/5 text-[9px] text-ink-muted hover:text-ink transition-colors font-cond leading-tight disabled:opacity-50"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {messages.length === 0 && (
            <div className="flex items-center gap-2 text-[11px] text-ink-muted italic p-2">
              <Bot size={13} />
              Ask MixieAI about this rig, active alarms, prior cases, or recommended actions.
            </div>
          )}
          {messages.map(msg => (
            <div key={msg.id} className={clsx('flex gap-2', msg.role === 'user' ? 'flex-row-reverse' : '')}>
              <div className={clsx(
                'w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[9px] font-bold',
                msg.role === 'user'
                  ? 'bg-ink-muted/20 text-ink-mid'
                  : 'bg-brand-blue/15 text-brand-blue'
              )}>
                {msg.role === 'user' ? 'YOU' : 'AI'}
              </div>
              <div className={clsx(
                'rounded-lg px-2.5 py-1.5 text-[11px] max-w-[80%] border shadow-panel leading-relaxed',
                msg.role === 'user'
                  ? 'bg-brand-blue/8 border-brand-blue/20 text-ink'
                  : 'bg-surface-bg border-border text-ink'
              )}>
                <div className="whitespace-pre-wrap">{msg.content}</div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-2 items-center">
              <div className="w-5 h-5 rounded-full bg-brand-blue/15 flex items-center justify-center">
                <Spinner size={10} />
              </div>
              <div className="bg-surface-bg border border-border rounded-lg px-2.5 py-1.5 flex gap-1">
                {[0,1,2].map(i => (
                  <span key={i} className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse" style={{ animationDelay: `${i*0.2}s` }} />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input row */}
        <div className="border-t border-border p-2 flex gap-2">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
            placeholder="Ask MixieAI…"
            rows={1}
            disabled={loading}
            className="flex-1 resize-none bg-surface-bg border border-border rounded px-2.5 py-1.5 text-[11px] text-ink placeholder-ink-muted focus:outline-none focus:border-brand-blue/50 shadow-[inset_0_1px_3px_rgba(15,28,46,0.05)] disabled:opacity-50"
          />
          <button
            onClick={() => send()}
            disabled={!input.trim() || loading}
            className="w-8 h-8 flex items-center justify-center rounded bg-brand-blue hover:bg-brand-dark text-white transition-colors disabled:opacity-40 shadow-panel"
          >
            {loading ? <Spinner size={12} /> : <Send size={12} />}
          </button>
        </div>
      </div>
    </div>
  )
}
