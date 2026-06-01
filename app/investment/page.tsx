'use client'

import { investmentSummary, investmentByYear, benefitBreakdown } from '@/lib/data'
import { TrendingUp, ArrowRight, DollarSign, Clock, Percent, Zap } from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, LineChart, Line,
} from 'recharts'

const kpis = [
  {
    label: 'Net Present Value',
    value: `$${investmentSummary.npv}M`,
    sub: 'at 10% discount rate',
    icon: DollarSign,
    color: 'emerald',
  },
  {
    label: 'Internal Rate of Return',
    value: `${investmentSummary.irr}%`,
    sub: 'vs 12% hurdle rate',
    icon: Percent,
    color: 'blue',
  },
  {
    label: 'Payback Period',
    value: `${investmentSummary.payback} yrs`,
    sub: 'full investment recovery',
    icon: Clock,
    color: 'violet',
  },
  {
    label: 'Return on Investment',
    value: `${investmentSummary.roi}%`,
    sub: `$${investmentSummary.totalInvestment}M → $${investmentSummary.totalSavings + investmentSummary.totalRevenue}M`,
    icon: Zap,
    color: 'amber',
  },
]

const iconBg: Record<string, string> = {
  emerald: 'bg-emerald-100 text-emerald-700',
  blue: 'bg-blue-100 text-blue-700',
  violet: 'bg-violet-100 text-violet-700',
  amber: 'bg-amber-100 text-amber-700',
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-lg text-xs">
        <p className="font-semibold text-slate-800 mb-2">{label}</p>
        {payload.map((entry: any) => (
          <p key={entry.name} style={{ color: entry.color }} className="flex items-center justify-between gap-4">
            <span>{entry.name}</span>
            <span className="font-bold">${entry.value}M</span>
          </p>
        ))}
      </div>
    )
  }
  return null
}

const cumulativeData = investmentByYear.map((row, idx) => {
  const cumInvestment = investmentByYear.slice(0, idx + 1).reduce((s, r) => s + r.investment, 0)
  const cumReturn = investmentByYear.slice(0, idx + 1).reduce((s, r) => s + r.savings + r.revenue, 0)
  return { year: row.year, 'Cumulative Investment': cumInvestment, 'Cumulative Return': cumReturn }
})

export default function InvestmentPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
          <span>Platform</span>
          <ArrowRight className="w-3 h-3" />
          <span className="text-slate-600 font-medium">Investment & Value Realization</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <h1 className="text-2xl font-bold text-slate-900">Investment & Value Analysis</h1>
        </div>
        <p className="text-slate-500 text-sm">
          3-year financial model for RetailCo's $45M AI Transformation Program
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {kpis.map((kpi) => {
          const Icon = kpi.icon
          return (
            <div key={kpi.label} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${iconBg[kpi.color]}`}>
                <Icon className="w-4 h-4" />
              </div>
              <p className="text-2xl font-bold text-slate-900">{kpi.value}</p>
              <p className="text-sm font-medium text-slate-700 mt-0.5">{kpi.label}</p>
              <p className="text-xs text-slate-400 mt-0.5">{kpi.sub}</p>
            </div>
          )
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Year-by-Year Bar Chart */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h3 className="font-semibold text-slate-900 mb-1">Annual Investment vs Returns</h3>
          <p className="text-xs text-slate-400 mb-5">Investment · Savings · Revenue Uplift ($M)</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={investmentByYear} barCategoryGap="30%">
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="investment" name="Investment" fill="#6366f1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="savings" name="Savings" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="revenue" name="Revenue Uplift" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Cumulative Value Line Chart */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h3 className="font-semibold text-slate-900 mb-1">Cumulative Value Creation</h3>
          <p className="text-xs text-slate-400 mb-5">Investment vs. cumulative returns ($M)</p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={cumulativeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line
                type="monotone"
                dataKey="Cumulative Investment"
                stroke="#6366f1"
                strokeWidth={2}
                dot={{ fill: '#6366f1', r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="Cumulative Return"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ fill: '#10b981', r: 4 }}
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Benefit Breakdown */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="font-semibold text-slate-900">Benefit Breakdown by Initiative</h3>
          <p className="text-xs text-slate-400 mt-0.5">3-year cumulative benefits</p>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50">
              <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Benefit Category</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Strategic Theme</th>
              <th className="text-right px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Value ($M)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {benefitBreakdown.map((item, idx) => (
              <tr key={idx} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-3.5 text-sm font-medium text-slate-900">{item.category}</td>
                <td className="px-6 py-3.5">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    item.type === 'Revenue'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {item.type}
                  </span>
                </td>
                <td className="px-6 py-3.5 text-sm text-slate-600">{item.initiative}</td>
                <td className="px-6 py-3.5 text-right">
                  <span className={`text-sm font-bold ${
                    item.type === 'Revenue' ? 'text-blue-700' : 'text-emerald-700'
                  }`}>
                    ${item.value}M
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-slate-900">
              <td className="px-6 py-4 text-sm font-semibold text-white" colSpan={3}>Total Benefits (3-Year)</td>
              <td className="px-6 py-4 text-right text-sm font-bold text-white">
                ${benefitBreakdown.reduce((s, i) => s + i.value, 0)}M
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}
