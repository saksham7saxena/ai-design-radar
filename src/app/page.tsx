"use client";

import React, { useState, useEffect } from 'react';
import { toolsData, Tool, CATEGORIES } from '@/data/toolsData';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  ExternalLink, 
  Check, 
  X, 
  Info, 
  Flame, 
  Activity, 
  Compass, 
  Sparkles,
  Zap,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

export default function RadarDashboard() {
  const [mounted, setMounted] = useState(false);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);

  // Setup mount check to prevent Recharts hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Compute Market Pulse KPIs dynamically from the mock data
  // 1. Fastest-rising tool (highest positive 7-day change)
  const fastestRising = [...toolsData].sort((a, b) => b.sevenDayChange - a.sevenDayChange)[0];
  
  // 2. Biggest momentum gain (highest overall momentum score)
  const biggestGain = toolsData[0]; // Already sorted by momentumScore desc
  
  // 3. Hottest category this week (highest average momentum score per category)
  const categoryScores = CATEGORIES.map(category => {
    const toolsInCategory = toolsData.filter(t => t.category === category);
    const avgScore = toolsInCategory.length 
      ? toolsInCategory.reduce((sum, t) => sum + t.momentumScore, 0) / toolsInCategory.length
      : 0;
    return { category, avgScore };
  });
  const hottestCategory = categoryScores.sort((a, b) => b.avgScore - a.avgScore)[0];

  // Top 5 tools for the Trend Chart
  const topFiveTools = toolsData.slice(0, 5);

  // Re-structure the 30-day history for Recharts
  const chartData = [
    { name: 'May 07' },
    { name: 'May 17' },
    { name: 'May 27' },
    { name: 'Jun 06' }
  ].map((point, index) => {
    const dataPoint: any = { name: point.name };
    topFiveTools.forEach(tool => {
      dataPoint[tool.name] = tool.momentumHistory[index]?.score ?? tool.momentumScore;
    });
    return dataPoint;
  });

  // Tools to Watch Data
  const watchTools = [
    {
      name: "Codeflow AI",
      whyTrending: "New Figma-to-code tool gaining significant mentions on X for direct React component generation.",
      source: "X mentions (+140% this week)",
      confidence: "High",
      category: "Design-to-Code"
    },
    {
      name: "UserQuery Agent",
      whyTrending: "AI usability testing agent discussed on Reddit UX research communities for autonomous script interviewing.",
      source: "Reddit UX Design Community",
      confidence: "Medium",
      category: "User Testing"
    },
    {
      name: "Critique.ai",
      whyTrending: "Design review agent mentioned in Substack newsletters for automated heuristic analysis of UI layouts.",
      source: "Design Systems Weekly Substack",
      confidence: "High",
      category: "UX Research"
    },
    {
      name: "WireframeAI Studio",
      whyTrending: "New AI wireframing tool trending on Product Hunt with quick text-to-layout conversion features.",
      source: "Product Hunt Launch #4 Product of the Day",
      confidence: "Medium",
      category: "Wireframing"
    }
  ];

  // Helper for trend badge UI
  const renderTrendBadge = (status: Tool['trendStatus']) => {
    switch (status) {
      case 'rising':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
            <TrendingUp size={12} className="text-emerald-400" />
            Rising
          </span>
        );
      case 'cooling':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/25">
            <TrendingDown size={12} className="text-rose-400" />
            Cooling
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-500/10 text-zinc-400 border border-zinc-500/25">
            <Minus size={12} className="text-zinc-400" />
            Stable
          </span>
        );
    }
  };

  // Helper for score percentage bars
  const renderScoreBar = (label: string, value: number, color: string) => {
    return (
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs font-medium">
          <span className="text-slate-400">{label}</span>
          <span className="text-slate-200">{value}%</span>
        </div>
        <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
          <div 
            className={`h-full ${color} rounded-full`}
            style={{ width: `${value}%` }}
          />
        </div>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 grid-bg py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* HERO SECTION */}
        <header className="relative border-b border-slate-800 pb-8 pt-4">
          <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-0 left-0 w-72 h-72 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-3 uppercase tracking-wider">
              <Sparkles size={12} />
              AI Design Market intelligence
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-slate-100 via-slate-300 to-slate-400 bg-clip-text text-transparent">
              AI Design Tools Radar
            </h1>
            <p className="mt-3 text-lg text-slate-400 max-w-3xl leading-relaxed">
              Track which AI design tools are gaining real momentum across launches, social buzz, search demand, and designer adoption.
            </p>
          </div>
        </header>

        {/* SECTION 1: MARKET PULSE */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Activity size={18} className="text-blue-400" />
            <h2 className="text-xl font-bold tracking-tight text-slate-200">Market Pulse</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Fastest Rising Card */}
            <div className="glass-panel hover-card rounded-xl p-6 border border-slate-800 relative overflow-hidden flex flex-col justify-between min-h-[140px]">
              <div>
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Fastest Rising</span>
                <h3 className="text-2xl font-bold text-slate-100 mt-1">{fastestRising.name}</h3>
                <p className="text-xs text-slate-400 mt-1">{fastestRising.category}</p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-slate-500">7d momentum shift</span>
                <span className="inline-flex items-center text-sm font-bold text-emerald-400">
                  +{fastestRising.sevenDayChange}%
                </span>
              </div>
            </div>

            {/* Hottest Category Card */}
            <div className="glass-panel hover-card rounded-xl p-6 border border-slate-800 relative overflow-hidden flex flex-col justify-between min-h-[140px]">
              <div>
                <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Hottest Category</span>
                <h3 className="text-2xl font-bold text-slate-100 mt-1">{hottestCategory.category}</h3>
                <p className="text-xs text-slate-400 mt-1">Leading development speed</p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-slate-500">Avg momentum score</span>
                <span className="text-sm font-bold text-blue-400">
                  {Math.round(hottestCategory.avgScore)} pts
                </span>
              </div>
            </div>

            {/* Biggest Momentum Gain */}
            <div className="glass-panel hover-card rounded-xl p-6 border border-slate-800 relative overflow-hidden flex flex-col justify-between min-h-[140px]">
              <div>
                <span className="text-xs font-semibold text-violet-400 uppercase tracking-wider">Market Leader</span>
                <h3 className="text-2xl font-bold text-slate-100 mt-1">{biggestGain.name}</h3>
                <p className="text-xs text-slate-400 mt-1">{biggestGain.category}</p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-slate-500">Peak momentum score</span>
                <span className="text-sm font-bold text-violet-400">
                  {biggestGain.momentumScore} / 100
                </span>
              </div>
            </div>

          </div>
        </section>

        {/* LEADERBOARD & DETAILS CONTAINER */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* SECTION 2: MOMENTUM LEADERBOARD (SPAN 2 COLS) */}
          <section className="lg:col-span-3 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame size={18} className="text-orange-500" />
                <h2 className="text-xl font-bold tracking-tight text-slate-200">Momentum Leaderboard</h2>
              </div>
              <span className="text-xs text-slate-400">
                Sorted by Rank (Weighted Intelligence Score)
              </span>
            </div>

            {/* Table Container with Horizontal Scroll */}
            <div className="glass-panel border border-slate-850 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[1000px]">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-900/40 text-xs font-semibold text-slate-400 tracking-wider">
                      <th className="py-3.5 px-4 text-center w-12">Rank</th>
                      <th className="py-3.5 px-4">Tool</th>
                      <th className="py-3.5 px-4">Category</th>
                      <th className="py-3.5 px-4 max-w-xs">Best For & Pricing</th>
                      <th className="py-3.5 px-4 text-center">Trend</th>
                      <th className="py-3.5 px-4 text-center">Est. Monthly Traffic</th>
                      <th className="py-3.5 px-4 text-center">User Rating</th>
                      <th className="py-3.5 px-4 text-center">Score</th>
                      <th className="py-3.5 px-4 text-center">7d Change</th>
                      <th className="py-3.5 px-4 text-center">Sub-Metrics (LNCH/SOC/SEAR/ADOP)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850">
                    {toolsData.map((tool, idx) => {
                      const rank = idx + 1;
                      return (
                        <tr 
                          key={tool.id}
                          onClick={() => setSelectedTool(tool)}
                          className="hover:bg-slate-900/40 transition cursor-pointer text-sm align-middle group"
                        >
                          {/* Rank */}
                          <td className="py-4 px-4 text-center font-mono font-bold text-slate-400 group-hover:text-blue-400">
                            #{rank}
                          </td>
                          {/* Tool Name & description */}
                          <td className="py-4 px-4">
                            <div>
                              <span className="font-bold text-slate-200 group-hover:text-white flex items-center gap-1">
                                {tool.name}
                                <ExternalLink size={12} className="text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </span>
                              <span className="block text-xs text-slate-400 mt-0.5 line-clamp-1">
                                {tool.description}
                              </span>
                            </div>
                          </td>
                          {/* Category */}
                          <td className="py-4 px-4">
                            <span className="inline-flex px-2 py-0.5 text-xs rounded bg-slate-800 text-slate-300 font-medium">
                              {tool.category}
                            </span>
                          </td>
                          {/* Best For & Pricing */}
                          <td className="py-4 px-4 max-w-xs">
                            <div className="text-xs">
                              <p className="text-slate-300 font-medium line-clamp-1">{tool.bestFor}</p>
                              <p className="text-slate-500 mt-0.5 italic">{tool.pricing}</p>
                            </div>
                          </td>
                          {/* Trend Status */}
                          <td className="py-4 px-4 text-center">
                            {renderTrendBadge(tool.trendStatus)}
                          </td>
                          {/* Est. Monthly Traffic */}
                          <td className="py-4 px-4 text-center font-mono text-xs text-slate-300">
                            {tool.monthlyVisits}
                          </td>
                          {/* User Rating */}
                          <td className="py-4 px-4 text-center font-mono text-xs text-amber-400 font-bold">
                            ★ {tool.userRating}
                          </td>
                          {/* Score */}
                          <td className="py-4 px-4 text-center">
                            <span className="inline-block px-2.5 py-1 text-xs font-bold font-mono rounded bg-blue-500/10 text-blue-300 border border-blue-500/25">
                              {tool.momentumScore}
                            </span>
                          </td>
                          {/* 7d Change */}
                          <td className="py-4 px-4 text-center font-mono font-semibold">
                            <span className={tool.sevenDayChange >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                              {tool.sevenDayChange >= 0 ? '+' : ''}{tool.sevenDayChange}%
                            </span>
                          </td>
                          {/* Sub-Metrics Mini Sparkbars */}
                          <td className="py-4 px-4">
                            <div className="flex items-center justify-center gap-3">
                              <div className="text-center">
                                <span className="block text-[9px] text-slate-500 uppercase">LNCH</span>
                                <span className="text-xs font-mono font-semibold text-slate-300">{tool.launchBuzz}</span>
                              </div>
                              <div className="text-center">
                                <span className="block text-[9px] text-slate-500 uppercase">SOC</span>
                                <span className="text-xs font-mono font-semibold text-slate-300">{tool.socialBuzz}</span>
                              </div>
                              <div className="text-center">
                                <span className="block text-[9px] text-slate-500 uppercase">SEAR</span>
                                <span className="text-xs font-mono font-semibold text-slate-300">{tool.searchInterest}</span>
                              </div>
                              <div className="text-center">
                                <span className="block text-[9px] text-slate-500 uppercase">ADOP</span>
                                <span className="text-xs font-mono font-semibold text-slate-300">{tool.designerAdoption}</span>
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

        </div>

        {/* VISUAL & TECHNICAL DETAIL GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* SECTION 4: TREND CHART (SPAN 2 COLS) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <TrendingUp size={18} className="text-violet-400" />
              <h2 className="text-xl font-bold tracking-tight text-slate-200">Top 5 Momentum Trends</h2>
            </div>
            
            <div className="glass-panel border border-slate-800 rounded-xl p-6 min-h-[350px]">
              {mounted ? (
                <div className="w-full h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={chartData}
                      margin={{ top: 10, right: 20, left: -20, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis 
                        dataKey="name" 
                        stroke="#94a3b8" 
                        fontSize={11}
                        tickLine={false}
                      />
                      <YAxis 
                        stroke="#94a3b8" 
                        fontSize={11} 
                        domain={[70, 100]}
                        tickLine={false}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#0f172a', 
                          borderColor: '#1e293b',
                          borderRadius: '8px',
                          color: '#f8fafc',
                          fontSize: '12px'
                        }} 
                      />
                      <Legend 
                        wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey={topFiveTools[0].name} 
                        stroke="#8b5cf6" 
                        strokeWidth={2.5}
                        activeDot={{ r: 6 }}
                        dot={{ r: 3 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey={topFiveTools[1].name} 
                        stroke="#3b82f6" 
                        strokeWidth={2.5}
                        dot={{ r: 3 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey={topFiveTools[2].name} 
                        stroke="#10b981" 
                        strokeWidth={2.5}
                        dot={{ r: 3 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey={topFiveTools[3].name} 
                        stroke="#f59e0b" 
                        strokeWidth={2.5}
                        dot={{ r: 3 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey={topFiveTools[4].name} 
                        stroke="#ec4899" 
                        strokeWidth={2.5}
                        dot={{ r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-slate-500">
                  Loading trend chart...
                </div>
              )}
            </div>
          </div>

          {/* SECTION 3: MOMENTUM SCORE SYSTEM */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Info size={18} className="text-blue-400" />
              <h2 className="text-xl font-bold tracking-tight text-slate-200">How Momentum is Calculated</h2>
            </div>
            
            <div className="glass-panel border border-slate-800 rounded-xl p-6 space-y-6">
              <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-800/80">
                <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wide">Dynamic Formula</span>
                <code className="block text-sm font-bold text-blue-400 mt-1.5 font-mono">
                  Score = 30% Launch + 25% Social + 20% Search + 15% Adoption + 10% Editorial
                </code>
              </div>

              <div className="space-y-4 text-xs">
                <div className="border-l-2 border-blue-500 pl-3 space-y-1">
                  <span className="font-semibold text-slate-200">Launch Buzz (30%)</span>
                  <p className="text-slate-400">Product Hunt activity, launch day posts, comment velocity, and maker interactions.</p>
                </div>
                <div className="border-l-2 border-violet-500 pl-3 space-y-1">
                  <span className="font-semibold text-slate-200">Social Buzz (25%)</span>
                  <p className="text-slate-400">Total volume and sentiment of mentions across X, Reddit, LinkedIn, and core design communities.</p>
                </div>
                <div className="border-l-2 border-emerald-500 pl-3 space-y-1">
                  <span className="font-semibold text-slate-200">Search Interest (20%)</span>
                  <p className="text-slate-400">Branded search terms and relative search engine demand spikes over rolling 30-day periods.</p>
                </div>
                <div className="border-l-2 border-amber-500 pl-3 space-y-1">
                  <span className="font-semibold text-slate-200">Designer Adoption (15%)</span>
                  <p className="text-slate-400">Usage signals detected in public templates, Figma community plugin installs, and UI kits.</p>
                </div>
                <div className="border-l-2 border-slate-400 pl-3 space-y-1">
                  <span className="font-semibold text-slate-200">Editorial Quality (10%)</span>
                  <p className="text-slate-400">Direct design system fit, performance fluidity, and efficacy in resolving actual UI friction.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* SECTION 5: EMERGING TOOLS TO WATCH */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Compass size={18} className="text-emerald-400" />
            <h2 className="text-xl font-bold tracking-tight text-slate-200">Tools to Watch</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {watchTools.map((tool, idx) => (
              <div 
                key={idx} 
                className="glass-panel border border-slate-850 rounded-xl p-5 space-y-4 relative flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <h4 className="font-bold text-slate-100">{tool.name}</h4>
                    <span className="inline-flex px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-905 text-slate-400 border border-slate-800">
                      {tool.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {tool.whyTrending}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-900 space-y-2 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Signal Source</span>
                    <span className="text-slate-300 font-medium">{tool.source}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Confidence</span>
                    <span className={`font-semibold ${tool.confidence === 'High' ? 'text-emerald-400' : 'text-blue-400'}`}>
                      {tool.confidence}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500 space-y-1">
          <p>© {new Date().getFullYear()} AI Design Tools Radar. Created for market tracking and intelligence.</p>
          <p className="text-slate-600 font-mono">Vercel Ready • Static Build • Last updated: {new Date().toISOString().split('T')[0]}</p>
        </footer>

        {/* SECTION 6: TOOL DETAIL MODAL */}
        {selectedTool && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md transition-opacity duration-300">
            <div className="glass-panel border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative p-6 md:p-8 animate-in fade-in zoom-in-95 duration-200">
              
              {/* Close Button */}
              <button 
                onClick={() => setSelectedTool(null)}
                className="absolute top-4 right-4 p-1 rounded-lg border border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition"
              >
                <X size={18} />
              </button>

              {/* Title & Metadata */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6 mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex px-2 py-0.5 text-xs rounded bg-slate-800 text-slate-300 font-medium">
                      {selectedTool.category}
                    </span>
                    <a 
                      href={selectedTool.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-blue-400 hover:underline"
                    >
                      Website
                      <ExternalLink size={10} />
                    </a>
                  </div>
                  <h3 className="text-3xl font-extrabold text-white mt-2">{selectedTool.name}</h3>
                  <p className="text-slate-400 text-xs mt-1 italic">Pricing: {selectedTool.pricing}</p>
                </div>

                <div className="flex items-center gap-4 bg-slate-900/60 border border-slate-800/80 rounded-xl p-3">
                  <div className="text-center pr-4 border-r border-slate-800">
                    <span className="block text-[10px] text-slate-500 uppercase font-mono">Radar Score</span>
                    <span className="text-3xl font-black font-mono text-blue-400">{selectedTool.momentumScore}</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-[10px] text-slate-500 uppercase font-mono">Verdict</span>
                    <span className="text-lg font-bold font-mono text-slate-200">{selectedTool.scoreOutOf10}/10</span>
                  </div>
                </div>
              </div>

              {/* Body Content */}
              <div className="space-y-6">
                
                {/* Description */}
                <div className="space-y-2">
                  <h4 className="text-sm font-bold uppercase text-slate-400 tracking-wider font-mono">Description</h4>
                  <p className="text-slate-200 text-sm leading-relaxed">{selectedTool.description}</p>
                  <p className="text-slate-400 text-xs leading-relaxed"><strong className="text-slate-300">Best for: </strong>{selectedTool.bestFor}</p>
                </div>

                {/* Real-World Tracked Signals */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-900/45 border border-slate-800 rounded-xl">
                  <div>
                    <span className="block text-[10px] text-slate-500 uppercase font-mono">Est. Monthly Traffic</span>
                    <span className="text-sm font-bold text-slate-200">{selectedTool.monthlyVisits}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-500 uppercase font-mono">Real User Rating</span>
                    <span className="text-sm font-bold text-amber-400">★ {selectedTool.userRating} / 5</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-500 uppercase font-mono">Figma Directory</span>
                    <span className="text-sm font-bold text-slate-200">{selectedTool.figmaCommunityUsers}</span>
                  </div>
                </div>

                {/* Why Trending */}
                <div className="p-4 bg-violet-500/5 border border-violet-500/20 rounded-xl space-y-2">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-violet-400 uppercase tracking-wide">
                    <Zap size={14} />
                    Trending Catalyst
                  </span>
                  <p className="text-slate-300 text-xs leading-relaxed">{selectedTool.whyTrending}</p>
                  <div className="pt-2 border-t border-violet-500/10 text-[10px] text-slate-500">
                    <strong className="text-slate-450 font-semibold">Tracked Sources: </strong>
                    {selectedTool.primaryDataSources.join(', ')}
                  </div>
                </div>

                {/* Score Breakdown Bars */}
                <div className="space-y-3">
                  <h4 className="text-sm font-bold uppercase text-slate-400 tracking-wider font-mono">Momentum Signals</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {renderScoreBar('Launch Buzz (30%)', selectedTool.launchBuzz, 'bg-blue-500')}
                    {renderScoreBar('Social Buzz (25%)', selectedTool.socialBuzz, 'bg-violet-500')}
                    {renderScoreBar('Search Interest (20%)', selectedTool.searchInterest, 'bg-emerald-500')}
                    {renderScoreBar('Designer Adoption (15%)', selectedTool.designerAdoption, 'bg-amber-500')}
                  </div>
                </div>

                {/* Pros and Cons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-900">
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase text-emerald-400 tracking-wider font-mono flex items-center gap-1.5">
                      <ShieldCheck size={14} />
                      Strengths / Pros
                    </h4>
                    <ul className="space-y-2">
                      {selectedTool.pros.map((pro, index) => (
                        <li key={index} className="flex gap-2 text-xs text-slate-300 leading-relaxed">
                          <Check size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase text-rose-400 tracking-wider font-mono flex items-center gap-1.5">
                      <AlertTriangle size={14} />
                      Friction / Cons
                    </h4>
                    <ul className="space-y-2">
                      {selectedTool.cons.map((con, index) => (
                        <li key={index} className="flex gap-2 text-xs text-slate-300 leading-relaxed">
                          <X size={14} className="text-rose-400 shrink-0 mt-0.5" />
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Alternatives & Verdict */}
                <div className="space-y-4 pt-6 border-t border-slate-900">
                  <div>
                    <h4 className="text-sm font-bold uppercase text-slate-400 tracking-wider font-mono">Alternatives to Consider</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedTool.alternatives.map((alt, index) => (
                        <span key={index} className="px-2.5 py-1 text-xs rounded-full bg-slate-900 border border-slate-800 text-slate-400 font-semibold font-mono">
                          {alt}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900/40 rounded-xl border border-slate-800/60">
                    <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wide font-mono">Editorial Verdict</h4>
                    <p className="text-slate-300 text-xs mt-1.5 leading-relaxed">{selectedTool.verdict}</p>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </main>
  );
}
