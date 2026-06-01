'use client'

import { useState, useRef, useEffect } from 'react'
import { aiAdvisorSuggestions, aiAdvisorResponses } from '@/lib/data'
import { Bot, Send, User, Sparkles, ArrowRight } from 'lucide-react'

interface Message {
  role: 'user' | 'advisor'
  content: string
  streaming?: boolean
}

function formatResponse(text: string) {
  const lines = text.split('\n')
  return lines.map((line, i) => {
    if (line.startsWith('**') && line.endsWith('**')) {
      return <p key={i} className="font-bold text-slate-900 mt-3 first:mt-0">{line.replace(/\*\*/g, '')}</p>
    }
    if (line.startsWith('**')) {
      const parts = line.split('**')
      return (
        <p key={i} className="mt-2">
          {parts.map((part, j) =>
            j % 2 === 1 ? <strong key={j} className="text-slate-900">{part}</strong> : part
          )}
        </p>
      )
    }
    if (line === '') return <div key={i} className="h-1" />
    return <p key={i} className="mt-1 leading-relaxed">{line}</p>
  })
}

export default function AdvisorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'advisor',
      content: 'Hello! I\'m your Chief Strategy Officer Agent. I have full context on RetailCo\'s transformation goals, external forces, capability gaps, and investment model.\n\nWhat strategic question can I help you with?',
    },
  ])
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async (text: string) => {
    if (!text.trim() || isStreaming) return

    const userMsg: Message = { role: 'user', content: text }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsStreaming(true)

    const response = aiAdvisorResponses[text] ??
      'I\'ve analyzed your question using the enterprise context, external forces intelligence, and industry benchmarks. Based on the RetailCo transformation program, I recommend prioritizing your AI & Data capabilities first — they\'re the foundation for all other strategic initiatives. Would you like me to elaborate on a specific aspect?'

    // Simulate streaming: reveal text word by word
    const words = response.split(' ')
    let streamed = ''

    setMessages(prev => [...prev, { role: 'advisor', content: '', streaming: true }])

    for (let i = 0; i < words.length; i++) {
      await new Promise(res => setTimeout(res, 18))
      streamed += (i > 0 ? ' ' : '') + words[i]
      setMessages(prev => {
        const updated = [...prev]
        updated[updated.length - 1] = { role: 'advisor', content: streamed, streaming: true }
        return updated
      })
    }

    setMessages(prev => {
      const updated = [...prev]
      updated[updated.length - 1] = { role: 'advisor', content: response, streaming: false }
      return updated
    })
    setIsStreaming(false)
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="px-8 py-5 border-b border-slate-200 bg-white flex-shrink-0">
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
          <span>Platform</span>
          <ArrowRight className="w-3 h-3" />
          <span className="text-slate-600 font-medium">AI Advisor</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-violet-600 rounded-xl flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">Chief Strategy Officer Agent</h1>
              <p className="text-xs text-slate-400">Enterprise Wisdom Platform · RetailCo Transformation</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-xs font-medium text-emerald-700">Agent Active</span>
          </div>
        </div>
      </div>

      {/* Agent Context Bar */}
      <div className="px-8 py-3 bg-blue-50 border-b border-blue-100 flex-shrink-0">
        <div className="flex items-center gap-2 flex-wrap">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span className="text-xs font-medium text-blue-700">Agent Context:</span>
          {['RetailCo Goals', 'External Forces (10)', 'Capability Gaps (5)', 'Investment Model ($45M)', 'Industry Intelligence', 'Enterprise Memory'].map(c => (
            <span key={c} className="text-xs bg-white border border-blue-200 text-blue-700 px-2 py-0.5 rounded-full">{c}</span>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'advisor' && (
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-violet-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="w-4 h-4 text-white" />
              </div>
            )}
            <div className={`max-w-2xl rounded-xl px-4 py-3 text-sm ${
              msg.role === 'user'
                ? 'bg-blue-600 text-white rounded-tr-sm'
                : 'bg-white border border-slate-200 text-slate-700 rounded-tl-sm shadow-sm'
            }`}>
              {msg.role === 'advisor' ? (
                <div className="leading-relaxed text-sm text-slate-700">
                  {formatResponse(msg.content)}
                  {msg.streaming && (
                    <span className="inline-block w-1.5 h-4 bg-blue-500 ml-0.5 cursor-blink align-middle" />
                  )}
                </div>
              ) : (
                <p>{msg.content}</p>
              )}
            </div>
            {msg.role === 'user' && (
              <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <User className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Suggested Questions */}
      {messages.length <= 2 && !isStreaming && (
        <div className="px-8 pb-4 flex-shrink-0">
          <p className="text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Suggested Questions</p>
          <div className="flex flex-wrap gap-2">
            {aiAdvisorSuggestions.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="text-xs bg-white border border-slate-200 text-slate-700 hover:border-blue-400 hover:text-blue-700 hover:bg-blue-50 px-3 py-1.5 rounded-full transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="px-8 pb-6 flex-shrink-0 border-t border-slate-100 pt-4 bg-white">
        <form
          onSubmit={(e) => { e.preventDefault(); sendMessage(input) }}
          className="flex gap-3"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask the Chief Strategy Officer Agent..."
            disabled={isStreaming}
            className="flex-1 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 bg-slate-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || isStreaming}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white px-4 py-3 rounded-xl transition-colors flex items-center gap-2 text-sm font-medium"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  )
}
