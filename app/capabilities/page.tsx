import { capabilities } from '@/lib/data'
import { BarChart3, ArrowRight, AlertTriangle, CheckCircle2, Info } from 'lucide-react'

const priorityConfig: Record<string, { border: string; bg: string; badge: string; dot: string }> = {
  Critical: {
    border: 'border-red-300',
    bg: 'bg-red-50',
    badge: 'bg-red-100 text-red-700 border-red-200',
    dot: 'bg-red-500',
  },
  High: {
    border: 'border-amber-300',
    bg: 'bg-amber-50',
    badge: 'bg-amber-100 text-amber-700 border-amber-200',
    dot: 'bg-amber-500',
  },
  Medium: {
    border: 'border-slate-200',
    bg: 'bg-slate-50',
    badge: 'bg-slate-100 text-slate-600 border-slate-200',
    dot: 'bg-slate-400',
  },
}

const domainColors: Record<string, string> = {
  Customer: 'text-violet-600 bg-violet-50',
  Technology: 'text-blue-600 bg-blue-50',
  Data: 'text-cyan-600 bg-cyan-50',
  Operations: 'text-amber-600 bg-amber-50',
  Finance: 'text-emerald-600 bg-emerald-50',
}

function MaturityDots({ level, max = 5, color }: { level: number; max?: number; color: string }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <div
          key={i}
          className={`w-4 h-4 rounded-full border-2 transition-all ${
            i < level ? `${color} border-transparent` : 'bg-white border-slate-200'
          }`}
        />
      ))}
    </div>
  )
}

export default function CapabilitiesPage() {
  const critical = capabilities.filter(c => c.priority === 'Critical')
  const high = capabilities.filter(c => c.priority === 'High')
  const avgGap = (capabilities.reduce((sum, c) => sum + (c.target - c.current), 0) / capabilities.length).toFixed(1)

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
          <span>Platform</span>
          <ArrowRight className="w-3 h-3" />
          <span className="text-slate-600 font-medium">Business Architecture · Capabilities</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          <h1 className="text-2xl font-bold text-slate-900">Business Capability Assessment</h1>
        </div>
        <p className="text-slate-500 text-sm">
          Current maturity vs. target state for RetailCo's 8 core business capabilities
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center gap-1.5 mb-1">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <span className="text-xs font-medium text-red-700">Critical Gaps</span>
          </div>
          <p className="text-2xl font-bold text-red-700">{critical.length}</p>
          <p className="text-xs text-red-500 mt-0.5">Immediate investment needed</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-center gap-1.5 mb-1">
            <Info className="w-4 h-4 text-amber-600" />
            <span className="text-xs font-medium text-amber-700">High Priority</span>
          </div>
          <p className="text-2xl font-bold text-amber-700">{high.length}</p>
          <p className="text-xs text-amber-500 mt-0.5">Plan within 12 months</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center gap-1.5 mb-1">
            <BarChart3 className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-medium text-blue-700">Avg Gap</span>
          </div>
          <p className="text-2xl font-bold text-blue-700">{avgGap}</p>
          <p className="text-xs text-blue-500 mt-0.5">Levels below target (1–5 scale)</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <div className="flex items-center gap-1.5 mb-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-medium text-emerald-700">On Track</span>
          </div>
          <p className="text-2xl font-bold text-emerald-700">
            {capabilities.filter(c => c.priority === 'Medium').length}
          </p>
          <p className="text-xs text-emerald-500 mt-0.5">Capabilities at acceptable levels</p>
        </div>
      </div>

      {/* Capability Heat Map */}
      <div className="mb-6">
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Capability Heat Map</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {capabilities.map((cap) => {
            const gap = cap.target - cap.current
            const config = priorityConfig[cap.priority]
            const fillPercent = (cap.current / 5) * 100
            const targetPercent = (cap.target / 5) * 100

            return (
              <div key={cap.id} className={`rounded-xl border-2 ${config.border} bg-white p-5 shadow-sm`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${config.dot}`}></span>
                      <h3 className="font-semibold text-slate-900">{cap.name}</h3>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${domainColors[cap.domain] ?? 'bg-slate-50 text-slate-600'} border-transparent`}>
                      {cap.domain}
                    </span>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full border font-semibold ${config.badge}`}>
                    {cap.priority}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="relative mb-3">
                  <div className="bg-slate-100 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        cap.priority === 'Critical' ? 'bg-red-400' :
                        cap.priority === 'High' ? 'bg-amber-400' : 'bg-slate-400'
                      }`}
                      style={{ width: `${fillPercent}%` }}
                    />
                  </div>
                  {/* Target marker */}
                  <div
                    className="absolute top-0 h-3 w-0.5 bg-emerald-600"
                    style={{ left: `${targetPercent}%` }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-xs text-slate-400 mb-1">Current</p>
                      <MaturityDots level={cap.current} color="bg-slate-400" />
                      <p className="text-xs font-mono text-slate-600 mt-1">{cap.current}/5</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 mt-3" />
                    <div>
                      <p className="text-xs text-slate-400 mb-1">Target</p>
                      <MaturityDots level={cap.target} color="bg-emerald-500" />
                      <p className="text-xs font-mono text-emerald-600 mt-1">{cap.target}/5</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400">Gap</p>
                    <p className={`text-xl font-bold ${
                      gap >= 3 ? 'text-red-600' : gap === 2 ? 'text-amber-600' : 'text-slate-500'
                    }`}>
                      -{gap}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Legend</p>
        <div className="flex flex-wrap gap-6 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <span><strong>Critical</strong> — Gap ≥3, blocks strategic objectives</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-400"></div>
            <span><strong>High</strong> — Gap of 2, significant investment needed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-slate-400"></div>
            <span><strong>Medium</strong> — Gap of 1, manageable with incremental investment</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-0.5 h-3 bg-emerald-600"></div>
            <span>Target marker on progress bar</span>
          </div>
        </div>
      </div>
    </div>
  )
}
