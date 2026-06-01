'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import {
  LayoutDashboard,
  Lightbulb,
  Globe,
  BarChart3,
  TrendingUp,
  Bot,
  Brain,
  ChevronRight,
} from 'lucide-react'

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/strategy', label: 'Strategy Intelligence', icon: Lightbulb },
  { href: '/forces', label: 'External Forces', icon: Globe },
  { href: '/capabilities', label: 'Capabilities', icon: BarChart3 },
  { href: '/investment', label: 'Investment & ROI', icon: TrendingUp },
  { href: '/advisor', label: 'AI Advisor', icon: Bot },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 flex-shrink-0 bg-slate-900 flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-slate-700/50">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm leading-tight">Digital Enterprise</p>
            <p className="text-blue-400 font-semibold text-sm leading-tight">Brain</p>
          </div>
        </div>
        <p className="text-slate-500 text-xs mt-2 pl-11">Enterprise Wisdom Platform</p>
      </div>

      {/* Demo Context */}
      <div className="mx-3 mt-4 mb-2 px-3 py-2.5 bg-slate-800 rounded-lg border border-slate-700">
        <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">Demo Scenario</p>
        <p className="text-white text-sm font-medium">RetailCo Transformation</p>
        <div className="flex items-center gap-1.5 mt-1.5">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
          <p className="text-emerald-400 text-xs">Live Demo Active</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group',
                active
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              )}
            >
              <Icon className={clsx('w-4 h-4 flex-shrink-0', active ? 'text-white' : 'text-slate-500 group-hover:text-slate-300')} />
              <span className="flex-1">{label}</span>
              {active && <ChevronRight className="w-3 h-3 opacity-60" />}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-slate-700/50">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-violet-600 rounded-full flex items-center justify-center text-xs font-bold text-white">
            EW
          </div>
          <div>
            <p className="text-slate-300 text-xs font-medium">EWP v1.0</p>
            <p className="text-slate-500 text-xs">MVP Demo</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
