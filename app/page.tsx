import Link from 'next/link'
import {
  Lightbulb, Globe, BarChart3, TrendingUp, Bot,
  ArrowRight, Brain, Zap, Target, BookOpen,
} from 'lucide-react'

const metrics = [
  { label: 'Strategic Initiatives', value: '12', sub: 'across 3 themes', color: 'blue', icon: Target },
  { label: 'Capability Gaps', value: '5', sub: '3 critical · 2 high', color: 'amber', icon: BarChart3 },
  { label: 'Total Investment', value: '$45M', sub: 'over 3 years', color: 'violet', icon: TrendingUp },
  { label: 'Expected ROI', value: '276%', sub: 'NPV $89M · IRR 34%', color: 'emerald', icon: Zap },
]

const modules = [
  {
    href: '/strategy',
    icon: Lightbulb,
    title: 'Strategy Intelligence',
    description: 'AI-generated strategic themes and initiatives from your goals and external signals.',
    badge: 'Analysis Complete',
    badgeColor: 'emerald',
    step: '01',
  },
  {
    href: '/forces',
    icon: Globe,
    title: 'External Forces',
    description: '10 external signals scored for opportunity, threat, and strategic urgency.',
    badge: '3 Critical Signals',
    badgeColor: 'red',
    step: '02',
  },
  {
    href: '/capabilities',
    icon: BarChart3,
    title: 'Capabilities',
    description: 'Business capability heat map showing current maturity vs. target state.',
    badge: '5 Gaps Identified',
    badgeColor: 'amber',
    step: '03',
  },
  {
    href: '/investment',
    icon: TrendingUp,
    title: 'Investment & ROI',
    description: '3-year investment model with NPV, IRR, payback, and benefit breakdown.',
    badge: 'ROI: 276%',
    badgeColor: 'emerald',
    step: '04',
  },
  {
    href: '/advisor',
    icon: Bot,
    title: 'AI Advisor',
    description: 'Ask the Chief Strategy Officer Agent any question about your transformation.',
    badge: 'Agent Ready',
    badgeColor: 'blue',
    step: '05',
  },
]

const colorMap: Record<string, string> = {
  blue: 'bg-blue-50 text-blue-700 border-blue-200',
  amber: 'bg-amber-50 text-amber-700 border-amber-200',
  violet: 'bg-violet-50 text-violet-700 border-violet-200',
  emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  red: 'bg-red-50 text-red-700 border-red-200',
}

const iconBgMap: Record<string, string> = {
  blue: 'bg-blue-100 text-blue-600',
  amber: 'bg-amber-100 text-amber-600',
  violet: 'bg-violet-100 text-violet-600',
  emerald: 'bg-emerald-100 text-emerald-600',
}

export default function DashboardPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Digital Enterprise Brain</h1>
            <p className="text-slate-500 text-sm">Enterprise Wisdom Platform · Retail Transformation Demo</p>
          </div>
        </div>

        <div className="mt-4 p-4 bg-gradient-to-r from-blue-600 to-violet-600 rounded-xl text-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-blue-100 text-xs font-medium uppercase tracking-wider mb-1">Active Demo Scenario</p>
              <h2 className="text-lg font-semibold">RetailCo AI Transformation</h2>
              <p className="text-blue-100 text-sm mt-1">
                Increase Revenue +15% · Reduce Cost -10% · Improve Customer Experience
              </p>
            </div>
            <div className="flex items-center gap-1.5 bg-white/20 px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse"></span>
              <span className="text-xs font-medium">Live Demo</span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map((m) => {
          const Icon = m.icon
          return (
            <div key={m.label} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${iconBgMap[m.color]}`}>
                <Icon className="w-4 h-4" />
              </div>
              <p className="text-2xl font-bold text-slate-900">{m.value}</p>
              <p className="text-sm font-medium text-slate-700 mt-0.5">{m.label}</p>
              <p className="text-xs text-slate-400 mt-0.5">{m.sub}</p>
            </div>
          )
        })}
      </div>

      {/* Demo Flow */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900">Demo Walkthrough</h2>
          <span className="text-xs text-slate-400">Estimated time: 15 minutes</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((mod) => {
            const Icon = mod.icon
            return (
              <Link
                key={mod.href}
                href={mod.href}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-400">{mod.step}</span>
                    <div className="w-8 h-8 bg-slate-100 group-hover:bg-blue-50 rounded-lg flex items-center justify-center transition-colors">
                      <Icon className="w-4 h-4 text-slate-600 group-hover:text-blue-600 transition-colors" />
                    </div>
                  </div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${colorMap[mod.badgeColor]}`}>
                    {mod.badge}
                  </span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                  {mod.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">{mod.description}</p>
                <div className="flex items-center gap-1 mt-3 text-blue-600 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            )
          })}

          {/* Learning Academy card */}
          <div className="bg-slate-900 rounded-xl border border-slate-700 p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-mono text-slate-500">06</span>
              <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-slate-300" />
              </div>
            </div>
            <h3 className="font-semibold text-white mb-1">18 Platform Domains</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Full domain coverage: Strategy · Architecture · GRC · Data & AI · Operating Model · Enterprise Memory · and more.
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {['Strategy', 'Architecture', 'GRC', 'Data & AI', '+14 more'].map((t) => (
                <span key={t} className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Expected outcomes */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-900 mb-4">Expected Business Outcomes</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Strategy Development', saving: '50% faster', color: 'text-blue-600' },
            { label: 'Architecture Analysis', saving: '60% faster', color: 'text-violet-600' },
            { label: 'Transformation Planning', saving: '40% faster', color: 'text-emerald-600' },
            { label: 'Investment ROI', saving: 'Measurable', color: 'text-amber-600' },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <p className={`text-lg font-bold ${item.color}`}>{item.saving}</p>
              <p className="text-xs text-slate-500 mt-0.5">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
