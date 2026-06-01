// Retail Transformation Demo — Mock Data

export const scenario = {
  company: 'RetailCo',
  industry: 'Retail',
  demo: 'Retail AI Transformation',
}

export const goals = [
  { id: 1, icon: '📈', title: 'Revenue Growth', target: '+15%', value: '$120M additional revenue', color: 'emerald' },
  { id: 2, icon: '💰', title: 'Cost Reduction', target: '-10%', value: '$35M in savings', color: 'blue' },
  { id: 3, icon: '⭐', title: 'Customer Experience', target: 'NPS +20', value: 'Top-quartile CX rating', color: 'violet' },
]

export const strategicThemes = [
  {
    id: 1,
    title: 'Operational Excellence',
    description: 'Drive efficiency through AI-powered forecasting, supply chain optimization, and platform engineering.',
    color: 'blue',
    initiatives: [
      'AI Demand Forecasting',
      'Supply Chain Optimization',
      'Platform Engineering',
      'Inventory Automation',
    ],
    investment: '$18M',
    benefit: '$28M savings',
    timeline: '18 months',
  },
  {
    id: 2,
    title: 'Customer Experience',
    description: 'Personalize every touchpoint with AI-driven recommendations and an intelligent shopping assistant.',
    color: 'violet',
    initiatives: [
      'AI Personalization Engine',
      'AI Shopping Assistant',
      'Unified Customer Profile',
      'Loyalty Program Redesign',
    ],
    investment: '$15M',
    benefit: '$65M revenue uplift',
    timeline: '12 months',
  },
  {
    id: 3,
    title: 'Workforce Transformation',
    description: 'Empower store associates and managers with AI copilots and targeted reskilling programs.',
    color: 'amber',
    initiatives: [
      'Store Associate Copilot',
      'Manager AI Dashboard',
      'AI Skills Academy',
      'Workforce Reskilling Program',
    ],
    investment: '$12M',
    benefit: '$22M productivity gain',
    timeline: '24 months',
  },
]

export const externalForces = [
  { id: 1, name: 'AI Adoption Acceleration', category: 'Technology', opportunity: 9, threat: 2, urgency: 9, impact: 'High', signal: 'AI-native commerce platforms emerging' },
  { id: 2, name: 'E-commerce Growth', category: 'Market', opportunity: 8, threat: 3, urgency: 7, impact: 'High', signal: 'Online share reaching 38% of retail' },
  { id: 3, name: 'Inflation & Cost Pressure', category: 'Macroeconomic', opportunity: 1, threat: 8, urgency: 8, impact: 'High', signal: 'Operating costs up 12% YoY' },
  { id: 4, name: 'Labor Cost Increase', category: 'Workforce', opportunity: 1, threat: 7, urgency: 7, impact: 'High', signal: 'Minimum wage legislation rising' },
  { id: 5, name: 'AI-Native Competitors', category: 'Disruption', opportunity: 2, threat: 9, urgency: 8, impact: 'Critical', signal: 'Amazon AI pricing disrupting market' },
  { id: 6, name: 'Supply Chain Disruption', category: 'Geopolitical', opportunity: 2, threat: 7, urgency: 6, impact: 'High', signal: 'Tariff volatility and regional conflicts' },
  { id: 7, name: 'AI Regulation (EU AI Act)', category: 'Regulatory', opportunity: 3, threat: 5, urgency: 5, impact: 'Medium', signal: 'Compliance required by 2026' },
  { id: 8, name: 'AI Skills Shortage', category: 'Workforce', opportunity: 2, threat: 8, urgency: 7, impact: 'High', signal: 'AI talent demand exceeds supply 4:1' },
  { id: 9, name: 'Sustainability / ESG', category: 'ESG', opportunity: 5, threat: 6, urgency: 6, impact: 'Medium', signal: 'Carbon reporting mandates imminent' },
  { id: 10, name: 'Consumer Sentiment Shift', category: 'Market', opportunity: 7, threat: 4, urgency: 6, impact: 'Medium', signal: 'Value + experience expectation rising' },
]

export const capabilities = [
  { id: 1, name: 'Customer Experience', current: 2, target: 5, priority: 'Critical', domain: 'Customer' },
  { id: 2, name: 'AI & Automation', current: 1, target: 4, priority: 'Critical', domain: 'Technology' },
  { id: 3, name: 'Digital Commerce', current: 3, target: 5, priority: 'Critical', domain: 'Customer' },
  { id: 4, name: 'Data & Analytics', current: 2, target: 4, priority: 'High', domain: 'Data' },
  { id: 5, name: 'Supply Chain', current: 3, target: 4, priority: 'High', domain: 'Operations' },
  { id: 6, name: 'Inventory Management', current: 2, target: 4, priority: 'High', domain: 'Operations' },
  { id: 7, name: 'Store Operations', current: 3, target: 4, priority: 'Medium', domain: 'Operations' },
  { id: 8, name: 'Finance & Planning', current: 3, target: 4, priority: 'Medium', domain: 'Finance' },
]

export const investmentSummary = {
  npv: 89,
  irr: 34,
  payback: 2.1,
  roi: 276,
  totalInvestment: 45,
  totalSavings: 60,
  totalRevenue: 120,
}

export const investmentByYear = [
  { year: 'Year 1', investment: 18, savings: 10, revenue: 15 },
  { year: 'Year 2', investment: 15, savings: 22, revenue: 40 },
  { year: 'Year 3', investment: 12, savings: 28, revenue: 65 },
]

export const benefitBreakdown = [
  { category: 'AI Demand Forecasting', type: 'Savings', value: 12, initiative: 'Operational Excellence' },
  { category: 'Supply Chain Optimization', type: 'Savings', value: 16, initiative: 'Operational Excellence' },
  { category: 'Workforce Productivity', type: 'Savings', value: 22, initiative: 'Workforce Transformation' },
  { category: 'AI Personalization', type: 'Revenue', value: 55, initiative: 'Customer Experience' },
  { category: 'Digital Commerce Growth', type: 'Revenue', value: 40, initiative: 'Customer Experience' },
  { category: 'AI Shopping Assistant', type: 'Revenue', value: 25, initiative: 'Customer Experience' },
]

export const aiAdvisorSuggestions = [
  'Design a Retail AI Transformation Program',
  'What are the biggest risks in this transformation?',
  'What capabilities should we invest in first?',
  'How does this compare to Amazon and Walmart?',
]

export const aiAdvisorResponses: Record<string, string> = {
  'Design a Retail AI Transformation Program':
    `Based on your goals of +15% revenue and -10% cost reduction, I recommend a 3-phase Retail AI Transformation Program:

**Phase 1 — Foundation (Months 1–6): $18M**
Deploy AI infrastructure, data platform, and demand forecasting. This builds the data foundation all other AI use cases depend on. Expected savings: $10M by end of Year 1.

**Phase 2 — Customer Intelligence (Months 7–12): $15M**
Launch AI personalization engine and shopping assistant. These are your highest-revenue initiatives — personalization alone drives $55M in incremental revenue by Year 2.

**Phase 3 — Workforce & Operations (Months 13–24): $12M**
Deploy store associate copilot and supply chain optimization. This completes the transformation and delivers the full $35M in cost savings.

**Total**: $45M investment → $180M in combined savings and revenue uplift → NPV of $89M at 34% IRR.

The critical success factor is addressing your AI & Automation capability gap (currently 1/5) in Phase 1. Without this foundation, Phases 2 and 3 cannot deliver their projected returns.`,

  'What are the biggest risks in this transformation?':
    `I've identified 4 critical risk areas for your transformation:

**1. AI Skills Gap (Risk: Critical)**
Your AI & Automation capability is currently 1/5. There is a 4:1 demand-to-supply ratio for AI talent. Mitigation: Begin AI Skills Academy in Month 1 and establish partnerships with AI vendors.

**2. Change Resistance (Risk: High)**
Store associate roles will change significantly. 68% of retail transformations fail at the workforce adoption stage. Mitigation: Launch change management program alongside technology — not after.

**3. Data Readiness (Risk: High)**
AI personalization requires clean, unified customer data. Most retailers have fragmented data across 6+ systems. Mitigation: Data foundation work must be Phase 1's first milestone.

**4. Competitive Urgency (Risk: High)**
AI-native competitors scored 9/10 on disruption threat. Amazon has a 3-year AI commerce head start. Mitigation: Accelerate Phase 2 Customer Experience initiatives — delay is the biggest risk of all.`,

  'What capabilities should we invest in first?':
    `Prioritize in this sequence, based on strategic impact and dependency analysis:

**1. Data & Analytics (Current: 2/5)**
Everything else depends on this. AI forecasting, personalization, and supply chain optimization all require a unified data foundation. Invest: $8M in Year 1.

**2. AI & Automation (Current: 1/5)**
Your lowest-maturity capability and your biggest competitive gap. Without AI infrastructure, none of the revenue-generating use cases are possible. Invest: $6M in Year 1.

**3. Digital Commerce (Current: 3/5 → Target: 5/5)**
E-commerce is growing at 38% of retail and is your highest-revenue opportunity. Closing this gap delivers $40M in incremental revenue. Invest: $10M across Years 1-2.

**4. Customer Experience (Current: 2/5 → Target: 5/5)**
The largest gap of all and tied to your primary revenue objective. This requires capabilities 1-3 to be in place first. Invest: $15M across Years 2-3.

Do not invest in Store Operations or Finance capabilities until the above four are underway — those are efficiency plays, not growth drivers.`,

  'How does this compare to Amazon and Walmart?':
    `Industry intelligence comparison for Retail AI Transformation:

**Amazon** — 3 years ahead
Amazon has deployed AI across pricing (dynamic pricing updates 2.5M times per day), fulfillment (750+ robotic fulfillment centers), and personalization (35% of revenue from AI recommendations). Their biggest advantage: unified data infrastructure built over 20 years.

**Walmart** — 18 months ahead
Walmart has invested $14B in technology over 3 years. Their AI transformation focus: supply chain optimization (saving $3B/year), store operations (automated inventory checks), and generative AI shopping assistant launched in 2024. Key differentiator: scale of physical stores plus digital integration.

**Your Position**
RetailCo is 18-36 months behind on AI capabilities. However, this is recoverable — the window hasn't closed. Your advantages: focused portfolio (no need to serve every category), faster decision-making, and the ability to adopt AI tools that Amazon and Walmart had to build themselves.

**Recommended Benchmark**
Target Walmart's 2022 capability level as your 2026 objective. That's achievable with the $45M program I've designed.`,
}
