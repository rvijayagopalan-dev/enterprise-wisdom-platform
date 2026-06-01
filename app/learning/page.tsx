'use client'

import { useState, useMemo } from 'react'
import {
  BookOpen, Search, ChevronDown, ChevronUp, ArrowRight,
  Layers, Cpu, Shield, Brain, Users, Zap, GraduationCap,
  CheckCircle2, Star, Code2, Bot, Filter,
} from 'lucide-react'
import { learningDomains, categories, stats, type LearningDomain } from '@/lib/learningData'

// ── Color maps ──────────────────────────────────────────────────────────────

const colorMap: Record<string, { card: string; badge: string; num: string; tag: string; dot: string }> = {
  blue:     { card: 'border-blue-200 hover:border-blue-400',   badge: 'bg-blue-100 text-blue-700',     num: 'bg-blue-600 text-white',     tag: 'bg-blue-50 text-blue-700 border-blue-200',     dot: 'bg-blue-500' },
  sky:      { card: 'border-sky-200 hover:border-sky-400',     badge: 'bg-sky-100 text-sky-700',       num: 'bg-sky-600 text-white',       tag: 'bg-sky-50 text-sky-700 border-sky-200',       dot: 'bg-sky-500' },
  violet:   { card: 'border-violet-200 hover:border-violet-400', badge: 'bg-violet-100 text-violet-700', num: 'bg-violet-600 text-white',   tag: 'bg-violet-50 text-violet-700 border-violet-200', dot: 'bg-violet-500' },
  purple:   { card: 'border-purple-200 hover:border-purple-400', badge: 'bg-purple-100 text-purple-700', num: 'bg-purple-600 text-white',   tag: 'bg-purple-50 text-purple-700 border-purple-200', dot: 'bg-purple-500' },
  indigo:   { card: 'border-indigo-200 hover:border-indigo-400', badge: 'bg-indigo-100 text-indigo-700', num: 'bg-indigo-600 text-white',   tag: 'bg-indigo-50 text-indigo-700 border-indigo-200', dot: 'bg-indigo-500' },
  cyan:     { card: 'border-cyan-200 hover:border-cyan-400',   badge: 'bg-cyan-100 text-cyan-700',     num: 'bg-cyan-600 text-white',     tag: 'bg-cyan-50 text-cyan-700 border-cyan-200',     dot: 'bg-cyan-500' },
  red:      { card: 'border-red-200 hover:border-red-400',     badge: 'bg-red-100 text-red-700',       num: 'bg-red-600 text-white',       tag: 'bg-red-50 text-red-700 border-red-200',       dot: 'bg-red-500' },
  emerald:  { card: 'border-emerald-200 hover:border-emerald-400', badge: 'bg-emerald-100 text-emerald-700', num: 'bg-emerald-600 text-white', tag: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
  amber:    { card: 'border-amber-200 hover:border-amber-400', badge: 'bg-amber-100 text-amber-700',   num: 'bg-amber-600 text-white',     tag: 'bg-amber-50 text-amber-700 border-amber-200',   dot: 'bg-amber-500' },
  orange:   { card: 'border-orange-200 hover:border-orange-400', badge: 'bg-orange-100 text-orange-700', num: 'bg-orange-600 text-white',   tag: 'bg-orange-50 text-orange-700 border-orange-200', dot: 'bg-orange-500' },
  teal:     { card: 'border-teal-200 hover:border-teal-400',   badge: 'bg-teal-100 text-teal-700',     num: 'bg-teal-600 text-white',     tag: 'bg-teal-50 text-teal-700 border-teal-200',     dot: 'bg-teal-500' },
  lime:     { card: 'border-lime-200 hover:border-lime-400',   badge: 'bg-lime-100 text-lime-700',     num: 'bg-lime-600 text-white',     tag: 'bg-lime-50 text-lime-700 border-lime-200',     dot: 'bg-lime-500' },
  pink:     { card: 'border-pink-200 hover:border-pink-400',   badge: 'bg-pink-100 text-pink-700',     num: 'bg-pink-600 text-white',     tag: 'bg-pink-50 text-pink-700 border-pink-200',     dot: 'bg-pink-500' },
  rose:     { card: 'border-rose-200 hover:border-rose-400',   badge: 'bg-rose-100 text-rose-700',     num: 'bg-rose-600 text-white',     tag: 'bg-rose-50 text-rose-700 border-rose-200',     dot: 'bg-rose-500' },
  yellow:   { card: 'border-yellow-200 hover:border-yellow-400', badge: 'bg-yellow-100 text-yellow-700', num: 'bg-yellow-600 text-white',   tag: 'bg-yellow-50 text-yellow-700 border-yellow-200', dot: 'bg-yellow-500' },
  slate:    { card: 'border-slate-200 hover:border-slate-400', badge: 'bg-slate-100 text-slate-700',   num: 'bg-slate-600 text-white',     tag: 'bg-slate-50 text-slate-700 border-slate-200',   dot: 'bg-slate-500' },
  zinc:     { card: 'border-zinc-200 hover:border-zinc-400',   badge: 'bg-zinc-100 text-zinc-700',     num: 'bg-zinc-700 text-white',     tag: 'bg-zinc-50 text-zinc-700 border-zinc-200',     dot: 'bg-zinc-600' },
  gradient: { card: 'border-blue-200 hover:border-violet-400', badge: 'bg-gradient-to-r from-blue-100 to-violet-100 text-indigo-700', num: 'bg-gradient-to-r from-blue-600 to-violet-600 text-white', tag: 'bg-indigo-50 text-indigo-700 border-indigo-200', dot: 'bg-gradient-to-r from-blue-500 to-violet-500' },
}

const difficultyConfig: Record<string, string> = {
  Foundation:    'bg-emerald-100 text-emerald-700',
  Intermediate:  'bg-blue-100 text-blue-700',
  Advanced:      'bg-violet-100 text-violet-700',
}

const categoryIcons: Record<string, React.ReactNode> = {
  'Strategy':              <Zap className="w-3.5 h-3.5" />,
  'Architecture':          <Layers className="w-3.5 h-3.5" />,
  'Data & AI':             <Cpu className="w-3.5 h-3.5" />,
  'Governance & Risk':     <Shield className="w-3.5 h-3.5" />,
  'Intelligence':          <Brain className="w-3.5 h-3.5" />,
  'Operations & People':   <Users className="w-3.5 h-3.5" />,
  'Advanced Capabilities': <Star className="w-3.5 h-3.5" />,
}

// ── Domain Card ──────────────────────────────────────────────────────────────

function DomainCard({ domain, isExpanded, onToggle }: {
  domain: LearningDomain
  isExpanded: boolean
  onToggle: () => void
}) {
  const c = colorMap[domain.color] ?? colorMap.slate

  return (
    <div className={`bg-white rounded-xl border-2 transition-all duration-200 shadow-sm ${c.card} ${isExpanded ? 'shadow-md' : ''}`}>
      {/* Card Header — always visible */}
      <button
        onClick={onToggle}
        className="w-full text-left p-5"
      >
        <div className="flex items-start gap-3">
          {/* Number badge */}
          <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${c.num}`}>
            {domain.num}
          </span>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-slate-900 text-sm leading-snug">{domain.name}</h3>
              {isExpanded
                ? <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                : <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
              }
            </div>

            <div className="flex flex-wrap items-center gap-1.5 mt-2">
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${difficultyConfig[domain.difficulty]}`}>
                {domain.difficulty}
              </span>
              <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${c.tag}`}>
                {domain.category}
              </span>
              <span className="text-xs text-slate-400">{domain.subDomains.length} sub-domains</span>
            </div>

            <p className="text-xs text-slate-500 mt-2 leading-relaxed line-clamp-2">{domain.description}</p>
          </div>
        </div>
      </button>

      {/* Expanded detail */}
      {isExpanded && (
        <div className="border-t border-slate-100 px-5 pb-5 pt-4 space-y-5">

          {/* Purpose */}
          <div className={`rounded-lg p-3 ${c.badge} bg-opacity-40`}>
            <p className="text-xs font-semibold uppercase tracking-wider opacity-70 mb-1">Purpose</p>
            <p className="text-sm leading-relaxed">{domain.purpose}</p>
          </div>

          {/* Sub-Domains */}
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" /> Sub-Domains ({domain.subDomains.length})
            </p>
            <div className="grid grid-cols-1 gap-2">
              {domain.subDomains.map((sd) => (
                <div key={sd.name} className="flex gap-2.5 p-2.5 bg-slate-50 rounded-lg">
                  <span className={`w-1.5 flex-shrink-0 rounded-full mt-1 ${c.dot}`} style={{ minHeight: '0.375rem' }} />
                  <div>
                    <p className="text-xs font-semibold text-slate-800">{sd.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{sd.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Frameworks + Tools grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" /> Frameworks
              </p>
              <div className="flex flex-wrap gap-1.5">
                {domain.frameworks.map((f) => (
                  <span key={f} className="text-xs bg-white border border-slate-200 text-slate-600 px-2 py-0.5 rounded-full">{f}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5" /> Tools & Platforms
              </p>
              <div className="flex flex-wrap gap-1.5">
                {domain.tools.map((t) => (
                  <span key={t} className="text-xs bg-slate-900 text-slate-200 px-2 py-0.5 rounded-full">{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Outputs */}
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Outputs
            </p>
            <div className="flex flex-wrap gap-1.5">
              {domain.outputs.map((o) => (
                <span key={o} className={`text-xs px-2.5 py-1 rounded-full border ${c.tag}`}>{o}</span>
              ))}
            </div>
          </div>

          {/* AI Advisor */}
          <div className="flex items-center gap-2.5 bg-slate-900 rounded-lg px-3 py-2.5">
            <Bot className="w-4 h-4 text-blue-400 flex-shrink-0" />
            <div>
              <p className="text-xs text-slate-400 font-medium">AI Advisor</p>
              <p className="text-xs text-white font-medium">{domain.aiAdvisor}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function LearningPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeDifficulty, setActiveDifficulty] = useState('All')
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [expandAll, setExpandAll] = useState(false)

  const filtered = useMemo(() => {
    return learningDomains.filter((d) => {
      const matchesCategory = activeCategory === 'All' || d.category === activeCategory
      const matchesDifficulty = activeDifficulty === 'All' || d.difficulty === activeDifficulty
      const q = search.toLowerCase()
      const matchesSearch = !q || [
        d.name, d.description, d.category, d.track,
        ...d.subDomains.map(s => s.name + ' ' + s.description),
        ...d.frameworks, ...d.tools, ...d.outputs,
      ].some(text => text.toLowerCase().includes(q))
      return matchesCategory && matchesDifficulty && matchesSearch
    })
  }, [search, activeCategory, activeDifficulty])

  const isExpanded = (id: number) => expandAll || expandedId === id
  const toggle = (id: number) => {
    if (expandAll) return
    setExpandedId(prev => prev === id ? null : id)
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
          <span>Platform</span>
          <ArrowRight className="w-3 h-3" />
          <span className="text-slate-600 font-medium">Learning Academy</span>
        </div>
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <GraduationCap className="w-5 h-5 text-blue-600" />
              <h1 className="text-2xl font-bold text-slate-900">Enterprise Wisdom Learning Academy</h1>
            </div>
            <p className="text-slate-500 text-sm">
              Deep-dive reference for all 18 EWP domains — sub-domains, frameworks, tools, and AI advisors
            </p>
          </div>
          <button
            onClick={() => { setExpandAll(v => !v); setExpandedId(null) }}
            className="flex items-center gap-2 text-sm font-medium px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-700 transition-colors"
          >
            {expandAll ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            {expandAll ? 'Collapse All' : 'Expand All'}
          </button>
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-8">
        {[
          { label: 'Domains', value: stats.domains, icon: Layers, color: 'text-blue-600' },
          { label: 'Sub-Domains', value: stats.subDomains, icon: BookOpen, color: 'text-violet-600' },
          { label: 'Frameworks', value: stats.frameworks, icon: CheckCircle2, color: 'text-emerald-600' },
          { label: 'Tools', value: stats.tools, icon: Code2, color: 'text-cyan-600' },
          { label: 'AI Advisors', value: stats.aiAdvisors, icon: Bot, color: 'text-amber-600' },
          { label: 'Learning Tracks', value: stats.tracks, icon: GraduationCap, color: 'text-pink-600' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm text-center">
            <Icon className={`w-4 h-4 mx-auto mb-1 ${color}`} />
            <p className="text-xl font-bold text-slate-900">{value}</p>
            <p className="text-xs text-slate-400">{label}</p>
          </div>
        ))}
      </div>

      {/* Search + Filters */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm mb-6 space-y-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search domains, sub-domains, frameworks, tools…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50"
          />
        </div>

        {/* Category filter */}
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Category</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat !== 'All' && categoryIcons[cat]}
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty filter */}
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <Star className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Difficulty</span>
          </div>
          <div className="flex gap-2">
            {['All', 'Foundation', 'Intermediate', 'Advanced'].map((d) => (
              <button
                key={d}
                onClick={() => setActiveDifficulty(d)}
                className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                  activeDifficulty === d
                    ? 'bg-slate-900 text-white'
                    : d === 'Foundation'   ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                    : d === 'Intermediate' ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    : d === 'Advanced'     ? 'bg-violet-100 text-violet-700 hover:bg-violet-200'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-slate-500">
          Showing <span className="font-semibold text-slate-900">{filtered.length}</span> of {learningDomains.length} domains
          {search && <span className="text-blue-600"> · "{search}"</span>}
        </p>
        {(search || activeCategory !== 'All' || activeDifficulty !== 'All') && (
          <button
            onClick={() => { setSearch(''); setActiveCategory('All'); setActiveDifficulty('All') }}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Domain Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <Search className="w-8 h-8 mx-auto mb-3 opacity-40" />
          <p className="font-medium">No domains match your search</p>
          <p className="text-sm mt-1">Try different keywords or clear the filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filtered.map((domain) => (
            <DomainCard
              key={domain.id}
              domain={domain}
              isExpanded={isExpanded(domain.id)}
              onToggle={() => toggle(domain.id)}
            />
          ))}
        </div>
      )}

      {/* Platform Evolution footer */}
      <div className="mt-10 bg-slate-900 rounded-xl p-6 text-white">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Platform Evolution</p>
        <div className="flex items-center gap-3 flex-wrap">
          {[
            { phase: 'Phase 1', label: 'Enterprise Wisdom Platform', active: true },
            { phase: 'Phase 2', label: 'Enterprise Intelligence Platform', active: false },
            { phase: 'Phase 3', label: 'Enterprise Cognitive System', active: false },
            { phase: 'Phase 4', label: 'Enterprise Decision Network', active: false },
            { phase: 'Phase 5', label: 'Autonomous Enterprise OS', active: false },
          ].map((p, i) => (
            <div key={p.phase} className="flex items-center gap-3">
              <div className={`px-3 py-1.5 rounded-lg text-xs font-medium ${p.active ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-400'}`}>
                <span className="text-slate-400 mr-1">{p.phase} ·</span> {p.label}
              </div>
              {i < 4 && <ArrowRight className="w-3 h-3 text-slate-600 flex-shrink-0" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
