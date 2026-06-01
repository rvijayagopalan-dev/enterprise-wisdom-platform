import { strategicThemes, goals } from '@/lib/data'
import { Lightbulb, CheckCircle2, ArrowRight, Clock, DollarSign } from 'lucide-react'

const themeColors: Record<string, { bg: string; border: string; badge: string; text: string; dot: string }> = {
  blue: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    badge: 'bg-blue-100 text-blue-700',
    text: 'text-blue-700',
    dot: 'bg-blue-500',
  },
  violet: {
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    badge: 'bg-violet-100 text-violet-700',
    text: 'text-violet-700',
    dot: 'bg-violet-500',
  },
  amber: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    badge: 'bg-amber-100 text-amber-700',
    text: 'text-amber-700',
    dot: 'bg-amber-500',
  },
}

const goalColors: Record<string, string> = {
  emerald: 'bg-emerald-50 border-emerald-200 text-emerald-700',
  blue: 'bg-blue-50 border-blue-200 text-blue-700',
  violet: 'bg-violet-50 border-violet-200 text-violet-700',
}

export default function StrategyPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
          <span>Platform</span>
          <ArrowRight className="w-3 h-3" />
          <span className="text-slate-600 font-medium">Strategy Intelligence</span>
        </div>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Lightbulb className="w-5 h-5 text-blue-600" />
              <h1 className="text-2xl font-bold text-slate-900">Strategy Intelligence</h1>
            </div>
            <p className="text-slate-500 text-sm">AI-generated strategic themes and initiatives for RetailCo transformation</p>
          </div>
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-xs font-medium text-emerald-700">AI Analysis Complete</span>
          </div>
        </div>
      </div>

      {/* Goals */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Executive Goals</h2>
        <div className="grid grid-cols-3 gap-4">
          {goals.map((g) => (
            <div key={g.id} className={`border rounded-xl p-4 ${goalColors[g.color]}`}>
              <div className="text-2xl mb-2">{g.icon}</div>
              <p className="text-2xl font-bold mb-0.5">{g.target}</p>
              <p className="text-sm font-semibold">{g.title}</p>
              <p className="text-xs opacity-70 mt-1">{g.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* AI-Generated Themes */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
            AI-Generated Strategic Themes
          </h2>
          <span className="text-xs text-slate-400">Generated from goals + external forces + capability gaps</span>
        </div>

        <div className="space-y-4">
          {strategicThemes.map((theme, idx) => {
            const colors = themeColors[theme.color]
            return (
              <div key={theme.id} className={`rounded-xl border ${colors.border} overflow-hidden`}>
                <div className={`${colors.bg} p-5`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <span className={`w-6 h-6 rounded-full ${colors.dot} flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5`}>
                        {idx + 1}
                      </span>
                      <div>
                        <h3 className={`font-semibold text-slate-900 text-lg`}>{theme.title}</h3>
                        <p className="text-slate-600 text-sm mt-1 leading-relaxed">{theme.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-3 ml-9">
                    <div className="bg-white/70 rounded-lg p-3">
                      <div className="flex items-center gap-1.5 mb-1">
                        <DollarSign className="w-3.5 h-3.5 text-slate-500" />
                        <span className="text-xs text-slate-500 font-medium">Investment</span>
                      </div>
                      <p className="text-base font-bold text-slate-900">{theme.investment}</p>
                    </div>
                    <div className="bg-white/70 rounded-lg p-3">
                      <div className="flex items-center gap-1.5 mb-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-xs text-slate-500 font-medium">Benefit</span>
                      </div>
                      <p className="text-base font-bold text-emerald-700">{theme.benefit}</p>
                    </div>
                    <div className="bg-white/70 rounded-lg p-3">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        <span className="text-xs text-slate-500 font-medium">Timeline</span>
                      </div>
                      <p className="text-base font-bold text-slate-900">{theme.timeline}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white px-5 py-4 border-t border-slate-100">
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Initiatives</p>
                  <div className="flex flex-wrap gap-2">
                    {theme.initiatives.map((initiative) => (
                      <span
                        key={initiative}
                        className={`text-xs font-medium px-3 py-1 rounded-full ${colors.badge}`}
                      >
                        {initiative}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Strategic Flow */}
      <div className="bg-slate-900 rounded-xl p-6 text-white">
        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Strategy Generation Model</h3>
        <div className="flex items-center justify-between gap-2 flex-wrap">
          {[
            'External Forces',
            'Internal Goals',
            'Capability Gaps',
            'Industry Intelligence',
            'Strategy Engine',
            'Strategic Themes',
            'Initiatives',
            'Roadmap',
          ].map((step, idx) => (
            <div key={step} className="flex items-center gap-2">
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                idx === 4
                  ? 'bg-blue-600 text-white'
                  : idx >= 5
                  ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-600/30'
                  : 'bg-slate-700 text-slate-300'
              }`}>
                {step}
              </span>
              {idx < 7 && <ArrowRight className={`w-3 h-3 flex-shrink-0 ${idx === 3 ? 'text-blue-500' : 'text-slate-600'}`} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
