import { externalForces } from '@/lib/data'
import { Globe, TrendingUp, TrendingDown, Zap, ArrowRight } from 'lucide-react'

const categoryColors: Record<string, string> = {
  Technology: 'bg-blue-100 text-blue-700',
  Market: 'bg-violet-100 text-violet-700',
  Macroeconomic: 'bg-amber-100 text-amber-700',
  Workforce: 'bg-orange-100 text-orange-700',
  Disruption: 'bg-red-100 text-red-700',
  Geopolitical: 'bg-slate-100 text-slate-700',
  Regulatory: 'bg-yellow-100 text-yellow-700',
  ESG: 'bg-emerald-100 text-emerald-700',
}

const impactColors: Record<string, string> = {
  Critical: 'bg-red-50 text-red-700 border-red-200',
  High: 'bg-amber-50 text-amber-700 border-amber-200',
  Medium: 'bg-slate-50 text-slate-600 border-slate-200',
}

function ScoreBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-slate-100 rounded-full h-1.5">
        <div
          className={`${color} h-1.5 rounded-full transition-all`}
          style={{ width: `${value * 10}%` }}
        />
      </div>
      <span className="text-xs font-mono text-slate-600 w-4 text-right">{value}</span>
    </div>
  )
}

export default function ForcesPage() {
  const criticalCount = externalForces.filter(f => f.impact === 'Critical').length
  const highCount = externalForces.filter(f => f.impact === 'High').length
  const topOpportunity = [...externalForces].sort((a, b) => b.opportunity - a.opportunity)[0]
  const topThreat = [...externalForces].sort((a, b) => b.threat - a.threat)[0]

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
          <span>Platform</span>
          <ArrowRight className="w-3 h-3" />
          <span className="text-slate-600 font-medium">External Forces Intelligence</span>
        </div>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Globe className="w-5 h-5 text-blue-600" />
              <h1 className="text-2xl font-bold text-slate-900">External Forces Intelligence</h1>
            </div>
            <p className="text-slate-500 text-sm">
              10 forces monitored across Macroeconomic · Industry · Technology · Regulatory · Geopolitical · Market
            </p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-2xl font-bold text-red-700">{criticalCount}</p>
          <p className="text-sm font-medium text-red-700">Critical Forces</p>
          <p className="text-xs text-red-500 mt-0.5">Require immediate response</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-2xl font-bold text-amber-700">{highCount}</p>
          <p className="text-sm font-medium text-amber-700">High Impact</p>
          <p className="text-xs text-amber-500 mt-0.5">Monitor closely</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <div className="flex items-center gap-1 mb-1">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-xs font-medium text-emerald-700">Top Opportunity</span>
          </div>
          <p className="text-sm font-semibold text-emerald-800 leading-tight">{topOpportunity.name}</p>
          <p className="text-xs text-emerald-600 mt-0.5">Score: {topOpportunity.opportunity}/10</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center gap-1 mb-1">
            <TrendingDown className="w-3.5 h-3.5 text-red-600" />
            <span className="text-xs font-medium text-red-700">Top Threat</span>
          </div>
          <p className="text-sm font-semibold text-red-800 leading-tight">{topThreat.name}</p>
          <p className="text-xs text-red-600 mt-0.5">Score: {topThreat.threat}/10</p>
        </div>
      </div>

      {/* Forces Grid */}
      <div>
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Force Scoring Matrix</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {externalForces.map((force) => (
            <div key={force.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-slate-900 text-sm">{force.name}</h3>
                  <p className="text-xs text-slate-400 mt-0.5 italic">{force.signal}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[force.category] ?? 'bg-slate-100 text-slate-600'}`}>
                    {force.category}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${impactColors[force.impact]}`}>
                    {force.impact}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-emerald-500" /> Opportunity
                    </span>
                  </div>
                  <ScoreBar value={force.opportunity} color="bg-emerald-500" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <TrendingDown className="w-3 h-3 text-red-500" /> Threat
                    </span>
                  </div>
                  <ScoreBar value={force.threat} color="bg-red-500" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Zap className="w-3 h-3 text-amber-500" /> Urgency
                    </span>
                  </div>
                  <ScoreBar value={force.urgency} color="bg-amber-500" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scoring legend */}
      <div className="mt-6 bg-slate-50 border border-slate-200 rounded-xl p-4">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Scoring Dimensions (1–10)</p>
        <div className="flex flex-wrap gap-6">
          {[
            { icon: TrendingUp, color: 'text-emerald-600', label: 'Opportunity', desc: 'Potential upside if acted upon' },
            { icon: TrendingDown, color: 'text-red-600', label: 'Threat', desc: 'Risk if not addressed' },
            { icon: Zap, color: 'text-amber-600', label: 'Urgency', desc: 'Time sensitivity of the force' },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-2">
              <s.icon className={`w-3.5 h-3.5 ${s.color}`} />
              <span className="text-xs font-medium text-slate-700">{s.label}</span>
              <span className="text-xs text-slate-400">— {s.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
