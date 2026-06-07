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
  AlertTriangle,
  Search,
  ChevronDown,
  ChevronUp
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
  
  // Interactive sorting, search, and filtering states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortField, setSortField] = useState<string>('momentumScore');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Setup mount check to prevent Recharts hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Compute Market Pulse KPIs dynamically from the standalone data
  const fastestRising = [...toolsData].sort((a, b) => b.sevenDayChange - a.sevenDayChange)[0];
  const biggestGain = toolsData[0]; // Already sorted by momentumScore desc
  
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

  // Re-structure the history for Recharts and override the final data point with the exact calculated score
  const chartData = [
    { name: 'May 07' },
    { name: 'May 17' },
    { name: 'May 27' },
    { name: 'Jun 06' }
  ].map((point, index) => {
    const dataPoint: any = { name: point.name };
    topFiveTools.forEach(tool => {
      if (index === 3) {
        dataPoint[tool.name] = tool.momentumScore;
      } else {
        dataPoint[tool.name] = tool.momentumHistory[index]?.score ?? tool.momentumScore;
      }
    });
    return dataPoint;
  });

  // Standalone watchlist signals
  const watchTools = [
    {
      name: "Codeflow AI",
      whyTrending: "New Figma-to-code tool gaining significant mentions on X for direct React component generation.",
      source: "X mentions (+140% this week)",
      confidence: "High",
      category: "Design-to-Code",
      bgColor: "bg-[#fcab79]/15 border-[#fcab79]/30", // Peach
      textColor: "text-[#aa2d00]"
    },
    {
      name: "UserQuery Agent",
      whyTrending: "AI usability testing agent discussed on Reddit UX research communities for autonomous script interviewing.",
      source: "Reddit UX Design Community",
      confidence: "Medium",
      category: "User Testing",
      bgColor: "bg-[#a8d8c4]/20 border-[#a8d8c4]/40", // Mint
      textColor: "text-[#0a2e0e]"
    },
    {
      name: "Critique.ai",
      whyTrending: "Design review agent mentioned in Substack newsletters for automated heuristic analysis of UI layouts.",
      source: "Design Systems Weekly Substack",
      confidence: "High",
      category: "UX Research",
      bgColor: "bg-[#f4d35e]/15 border-[#f4d35e]/30", // Yellow
      textColor: "text-[#b28704]"
    },
    {
      name: "WireframeAI Studio",
      whyTrending: "New AI wireframing tool trending on Product Hunt with quick text-to-layout conversion features.",
      source: "Product Hunt Launch #4 Product of the Day",
      confidence: "Medium",
      category: "Wireframing",
      bgColor: "bg-[#f5e9d4]/70 border-[#e0e2e6]", // Cream
      textColor: "text-[#333840]"
    }
  ];

  // Helper for trend badge UI
  const renderTrendBadge = (status: Tool['trendStatus']) => {
    switch (status) {
      case 'rising':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <TrendingUp size={12} />
            Rising
          </span>
        );
      case 'cooling':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-250">
            <TrendingDown size={12} />
            Cooling
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-50 text-slate-600 border border-slate-200">
            <Minus size={12} />
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
          <span className="text-slate-600 font-mono uppercase tracking-wider">{label}</span>
          <span className="text-slate-900 font-bold">{value}%</span>
        </div>
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200">
          <div 
            className={`h-full ${color} rounded-full`}
            style={{ width: `${value}%` }}
          />
        </div>
      </div>
    );
  };

  // Helper to parse visits magnitude strings (e.g. "9.4M", "620K") into numbers for correct sorting
  const parseVisits = (visits: string): number => {
    const clean = visits.toLowerCase().replace(/[^0-9.]/g, '');
    const value = parseFloat(clean);
    if (visits.toLowerCase().includes('m')) {
      return value * 1000000;
    }
    if (visits.toLowerCase().includes('k')) {
      return value * 1000;
    }
    return value;
  };

  // Handle clickable column header sorting
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc'); // Default to descending
    }
  };

  const renderSortArrow = (field: string) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? (
      <ChevronUp size={14} className="inline text-[#1b61c9] ml-0.5" />
    ) : (
      <ChevronDown size={14} className="inline text-[#1b61c9] ml-0.5" />
    );
  };

  // Filter and Sort the data array based on states
  const filteredTools = toolsData
    .filter(tool => {
      const matchesSearch = 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.bestFor.toLowerCase().includes(searchQuery.toLowerCase());
        
      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      let aVal: any = a[sortField as keyof Tool];
      let bVal: any = b[sortField as keyof Tool];

      if (sortField === 'monthlyVisits') {
        aVal = parseVisits(a.monthlyVisits);
        bVal = parseVisits(b.monthlyVisits);
      }

      if (typeof aVal === 'string') {
        return sortDirection === 'asc' 
          ? aVal.localeCompare(bVal) 
          : bVal.localeCompare(aVal);
      } else {
        return sortDirection === 'asc' 
          ? (aVal as number) - (bVal as number) 
          : (bVal as number) - (aVal as number);
      }
    });

  const uniqueCategories = ['All', ...CATEGORIES];

  return (
    <main className="min-h-screen bg-white text-[#181d26] font-sans">
      
      {/* Pinned Top Navigation Bar - Airtable Nav Dialect */}
      <nav className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-[#aa2d00] shadow-sm">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
                <circle cx="12" cy="12" r="2" fill="currentColor" />
                <path d="M12 3v9l4 4" />
              </svg>
            </div>
            <span className="font-display font-bold text-lg text-[#181d26] tracking-tight">AI Design Radar</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#market-pulse" className="hover:text-[#1b61c9] transition">Market Pulse</a>
            <a href="#leaderboard" className="hover:text-[#1b61c9] transition">Leaderboard</a>
            <a href="#trends" className="hover:text-[#1b61c9] transition">Trends</a>
            <a href="#scoring" className="hover:text-[#1b61c9] transition">Methodology</a>
            <a href="#watchlist" className="hover:text-[#1b61c9] transition">Watchlist</a>
          </div>
          <div>
            <a 
              href="https://github.com/saksham7saxena/ai-design-radar" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-white text-[#181d26] border border-slate-200 rounded-lg hover:bg-slate-50 transition shadow-sm"
            >
              GitHub
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        
        {/* HERO SECTION */}
        <header className="relative border-b border-slate-200 pb-10 pt-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-[#181d26] border border-slate-200 mb-4 uppercase tracking-wider">
              <Sparkles size={12} className="text-slate-600" />
              AI Design Market Intelligence
            </div>
            <h1 className="text-4xl md:text-5xl font-display text-[#181d26] tracking-tight leading-tight">
              AI Design Tools Radar
            </h1>
            <p className="mt-3 text-lg text-slate-600 max-w-3xl leading-relaxed font-body">
              Track which **standalone** AI design tools are gaining real momentum across launches, social buzz, search demand, and designer adoption.
            </p>
          </div>
        </header>

        {/* SECTION 1: MARKET PULSE */}
        <section id="market-pulse" className="scroll-mt-20 space-y-4">
          <div className="flex items-center gap-2">
            <Activity size={18} className="text-[#aa2d00]" />
            <h2 className="text-xl font-display font-semibold text-[#181d26]">Market Pulse</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Fastest Rising Card - Coral Signature */}
            <div className="bg-[#aa2d00] text-white rounded-lg p-6 flex flex-col justify-between min-h-[160px] shadow-sm">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-orange-200">Fastest Rising</span>
                <h3 className="text-2xl font-display font-medium mt-2">{fastestRising.name}</h3>
                <p className="text-xs text-orange-100/90 mt-1">{fastestRising.category}</p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-orange-850/30 pt-3">
                <span className="text-xs text-orange-100/80">7d momentum shift</span>
                <span className="text-lg font-bold text-white">
                  +{fastestRising.sevenDayChange}%
                </span>
              </div>
            </div>

            {/* Hottest Category Card - Forest Signature */}
            <div className="bg-[#0a2e0e] text-white rounded-lg p-6 flex flex-col justify-between min-h-[160px] shadow-sm">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200">Hottest Category</span>
                <h3 className="text-2xl font-display font-medium mt-2">{hottestCategory.category}</h3>
                <p className="text-xs text-emerald-100/90 mt-1">Leading development speed</p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-emerald-850/30 pt-3">
                <span className="text-xs text-emerald-100/80">Avg momentum score</span>
                <span className="text-lg font-bold text-white">
                  {Math.round(hottestCategory.avgScore)} pts
                </span>
              </div>
            </div>

            {/* Biggest Momentum Gain - Ink Primary */}
            <div className="bg-[#181d26] text-white rounded-lg p-6 flex flex-col justify-between min-h-[160px] shadow-sm">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">Market Leader</span>
                <h3 className="text-2xl font-display font-medium mt-2">{biggestGain.name}</h3>
                <p className="text-xs text-slate-400 mt-1">{biggestGain.category}</p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-slate-800 pt-3">
                <span className="text-xs text-slate-450">Peak momentum score</span>
                <span className="text-lg font-bold text-white">
                  {biggestGain.momentumScore} / 100
                </span>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 2: MOMENTUM LEADERBOARD */}
        <section id="leaderboard" className="scroll-mt-20 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Flame size={18} className="text-[#aa2d00]" />
              <h2 className="text-xl font-display font-semibold text-[#181d26]">Momentum Leaderboard</h2>
            </div>
            
            {/* Search Input Box */}
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search standalone tools..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white border border-slate-200 rounded-sm pl-9 pr-4 py-2 text-xs w-72 placeholder-slate-400 focus:outline-none focus:border-[#1b61c9] transition-colors"
              />
            </div>
          </div>

          {/* Category Filter Rail/Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-100 scrollbar-none">
            {uniqueCategories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 text-xs font-semibold transition-colors shrink-0 ${
                  selectedCategory === category 
                    ? 'bg-[#181d26] text-white rounded-lg' 
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200 rounded-lg'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Table Container - Clean White & Hairline Dividers */}
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-500 tracking-wider">
                    <th className="py-4 px-4 text-center w-12 cursor-pointer select-none" onClick={() => handleSort('momentumScore')}>
                      Rank
                    </th>
                    <th className="py-4 px-4 cursor-pointer select-none" onClick={() => handleSort('name')}>
                      Tool {renderSortArrow('name')}
                    </th>
                    <th className="py-4 px-4 cursor-pointer select-none" onClick={() => handleSort('category')}>
                      Category {renderSortArrow('category')}
                    </th>
                    <th className="py-4 px-4 text-center cursor-pointer select-none" onClick={() => handleSort('monthlyVisits')}>
                      Est. Monthly Traffic {renderSortArrow('monthlyVisits')}
                    </th>
                    
                    {/* User Rating Header with Tooltip on Hover */}
                    <th className="py-4 px-4 text-center cursor-pointer select-none" onClick={() => handleSort('userRating')}>
                      <span className="tooltip-trigger inline-flex items-center gap-1">
                        User Rating
                        <Info size={12} className="text-slate-400" />
                        {renderSortArrow('userRating')}
                        <span className="tooltip-content font-sans normal-case tracking-normal font-normal">
                          Weighted G2, Product Hunt, and Capterra reviews
                        </span>
                      </span>
                    </th>
                    
                    <th className="py-4 px-4 text-center cursor-pointer select-none" onClick={() => handleSort('momentumScore')}>
                      Score & 7d Shift {renderSortArrow('momentumScore')}
                    </th>
                    <th className="py-4 px-4 text-center cursor-pointer select-none" onClick={() => handleSort('trendStatus')}>
                      Trend
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredTools.map((tool, idx) => {
                    // Find actual rank inside the base sorted dataset
                    const originalRank = toolsData.findIndex(t => t.id === tool.id) + 1;
                    return (
                      <tr 
                        key={tool.id}
                        onClick={() => setSelectedTool(tool)}
                        className="hover-tr cursor-pointer text-sm align-middle group"
                      >
                        {/* Rank */}
                        <td className="py-4 px-4 text-center font-mono font-bold text-slate-400 group-hover:text-[#1b61c9]">
                          #{originalRank}
                        </td>
                        {/* Tool Name & Description */}
                        <td className="py-4 px-4">
                          <div>
                            <span className="font-bold text-[#181d26] group-hover:text-[#1b61c9] flex items-center gap-1 transition-colors">
                              {tool.name}
                              <ExternalLink size={12} className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </span>
                            <span className="block text-xs text-slate-500 mt-0.5 line-clamp-1">
                              {tool.description}
                            </span>
                          </div>
                        </td>
                        {/* Category */}
                        <td className="py-4 px-4">
                          <span className="inline-flex px-2.5 py-0.5 text-xs rounded-sm bg-slate-100 text-slate-700 border border-slate-200 font-medium">
                            {tool.category}
                          </span>
                        </td>
                        {/* Est. Monthly Traffic */}
                        <td className="py-4 px-4 text-center font-mono text-xs text-slate-700 font-medium">
                          {tool.monthlyVisits}
                        </td>
                        
                        {/* User Rating cell with rating source tooltip */}
                        <td className="py-4 px-4 text-center">
                          <span className="tooltip-trigger font-mono text-xs text-amber-600 font-bold">
                            ★ {tool.userRating}
                            <span className="tooltip-content font-sans font-normal text-white">
                              Source: {tool.ratingSources}
                            </span>
                          </span>
                        </td>

                        {/* Score & 7d Shift merged */}
                        <td className="py-4 px-4 text-center">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold font-mono rounded bg-slate-100 text-slate-800 border border-slate-200">
                            {tool.momentumScore}
                            <span className={`text-[10px] font-semibold ${tool.sevenDayChange >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                              ({tool.sevenDayChange >= 0 ? '+' : ''}{tool.sevenDayChange}%)
                            </span>
                          </span>
                        </td>

                        {/* Trend Status */}
                        <td className="py-4 px-4 text-center">
                          {renderTrendBadge(tool.trendStatus)}
                        </td>
                      </tr>
                    );
                  })}
                  {filteredTools.length === 0 && (
                    <tr>
                      <td colSpan={10} className="py-8 text-center text-slate-400 text-sm">
                        No tools found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* DETAILS, CHART & FORMULA GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* SECTION 4: TREND CHART */}
          <div id="trends" className="lg:col-span-2 space-y-4 scroll-mt-20">
            <div className="flex items-center gap-2">
              <TrendingUp size={18} className="text-[#1b61c9]" />
              <h2 className="text-xl font-display font-semibold text-[#181d26]">Top 5 Momentum Trends</h2>
            </div>
            
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 min-h-[350px]">
              {mounted ? (
                <div className="w-full h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={chartData}
                      margin={{ top: 10, right: 20, left: -20, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis 
                        dataKey="name" 
                        stroke="#64748b" 
                        fontSize={11}
                        tickLine={false}
                      />
                      <YAxis 
                        stroke="#64748b" 
                        fontSize={11} 
                        domain={[65, 100]}
                        tickLine={false}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#ffffff', 
                          borderColor: '#dddddd',
                          borderRadius: '6px',
                          color: '#181d26',
                          fontSize: '12px'
                        }} 
                      />
                      <Legend 
                        wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
                      />
                      {/* Using Airtable Brand Colors in the line series */}
                      <Line 
                        type="monotone" 
                        dataKey={topFiveTools[0].name} 
                        stroke="#aa2d00" /* Coral */
                        strokeWidth={2.5}
                        activeDot={{ r: 6 }}
                        dot={{ r: 3 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey={topFiveTools[1].name} 
                        stroke="#1b61c9" /* Link Blue */
                        strokeWidth={2.5}
                        dot={{ r: 3 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey={topFiveTools[2].name} 
                        stroke="#0a2e0e" /* Forest Green */
                        strokeWidth={2.5}
                        dot={{ r: 3 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey={topFiveTools[3].name} 
                        stroke="#d9a441" /* Mustard Yellow */
                        strokeWidth={2.5}
                        dot={{ r: 3 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey={topFiveTools[4].name} 
                        stroke="#181d26" /* Primary Ink */
                        strokeWidth={2.5}
                        dot={{ r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-slate-400">
                  Loading trend chart...
                </div>
              )}
            </div>
          </div>

          {/* SECTION 3: MOMENTUM SCORE SYSTEM - Styled as a Cream Callout Card */}
          <div id="scoring" className="space-y-4 scroll-mt-20">
            <div className="flex items-center gap-2">
              <Info size={18} className="text-[#1b61c9]" />
              <h2 className="text-xl font-display font-semibold text-[#181d26]">Score Methodology</h2>
            </div>
            
            <div className="bg-[#f5e9d4] border border-[#e0d4be] rounded-lg p-6 space-y-6 text-[#181d26]">
              <div className="p-4 bg-white/70 rounded-md border border-[#e0d4be]">
                <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Dynamic Formula</span>
                <code className="block text-sm font-bold text-[#aa2d00] mt-1.5 font-mono">
                  30% LNCH + 25% SOC + 20% SEAR + 15% ADOP + 10% QUAL
                </code>
              </div>

              <div className="space-y-4 text-xs">
                <div className="border-l-2 border-[#aa2d00] pl-3 space-y-1">
                  <span className="font-bold text-[#aa2d00] font-display">Launch Buzz (30%)</span>
                  <p className="text-slate-700 font-body">Product Hunt upvotes, comment velocity, and maker responses.</p>
                </div>
                <div className="border-l-2 border-[#1b61c9] pl-3 space-y-1">
                  <span className="font-bold text-[#1b61c9] font-display">Social Buzz (25%)</span>
                  <p className="text-slate-700 font-body">X threads, Reddit mentions, and designer community sentiment volume.</p>
                </div>
                <div className="border-l-2 border-[#0a2e0e] pl-3 space-y-1">
                  <span className="font-bold text-[#0a2e0e] font-display font-display">Search Interest (20%)</span>
                  <p className="text-slate-700 font-body">Branded search term velocity and relative search demand curves.</p>
                </div>
                <div className="border-l-2 border-[#d9a441] pl-3 space-y-1">
                  <span className="font-bold text-[#d9a441] font-display">Designer Adoption (15%)</span>
                  <p className="text-slate-700 font-body">Figma Community template imports and plugin installation spikes.</p>
                </div>
                <div className="border-l-2 border-slate-600 pl-3 space-y-1">
                  <span className="font-bold text-slate-700 font-display">Editorial Quality (10%)</span>
                  <p className="text-slate-700 font-body font-body font-body font-body">Usability fluidity, workflow efficiency, and core UI design problem fit.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* SECTION 5: EMERGING TOOLS TO WATCH - Styled as Airtable Demo Grids */}
        <section id="watchlist" className="scroll-mt-20 space-y-4">
          <div className="flex items-center gap-2">
            <Compass size={18} className="text-[#0a2e0e]" />
            <h2 className="text-xl font-display font-semibold text-[#181d26]">Tools to Watch</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {watchTools.map((tool, idx) => (
              <div 
                key={idx} 
                className={`rounded-lg p-5 border shadow-sm relative flex flex-col justify-between min-h-[180px] ${tool.bgColor}`}
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <h4 className="font-bold text-[#181d26]">{tool.name}</h4>
                    <span className="inline-flex px-2 py-0.5 rounded-sm text-[10px] font-semibold bg-white/80 text-slate-700 border border-slate-200">
                      {tool.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-body">
                    {tool.whyTrending}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-200/50 space-y-1.5 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-mono">SIGNAL</span>
                    <span className="text-slate-800 font-semibold">{tool.source}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-mono">CONFIDENCE</span>
                    <span className={`font-bold ${tool.textColor}`}>
                      {tool.confidence}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="pt-10 border-t border-slate-200 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} AI Design Tools Radar. Created for market tracking and intelligence.</p>
        </footer>

        {/* SECTION 6: TOOL DETAIL MODAL - Refactored as clean print-magazine layout */}
        {selectedTool && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300">
            <div className="bg-white border border-slate-200 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative p-6 md:p-8 animate-in fade-in zoom-in-95 duration-150 text-[#181d26]">
              
              {/* Close Button */}
              <button 
                onClick={() => setSelectedTool(null)}
                className="absolute top-4 right-4 p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition"
              >
                <X size={18} />
              </button>

              {/* Title & Metadata */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6 mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex px-2.5 py-0.5 text-xs rounded-sm bg-slate-100 text-slate-700 border border-slate-200 font-medium">
                      {selectedTool.category}
                    </span>
                    <a 
                      href={selectedTool.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-[#1b61c9] hover:underline"
                    >
                      Website
                      <ExternalLink size={10} />
                    </a>
                  </div>
                  <h3 className="text-3xl font-display font-medium text-[#181d26] mt-2">{selectedTool.name}</h3>
                  <p className="text-slate-500 text-xs mt-1 italic">Pricing: {selectedTool.pricing}</p>
                </div>

                <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-lg p-3">
                  <div className="text-center pr-4 border-r border-slate-250">
                    <span className="block text-[9px] text-slate-500 uppercase font-mono">Radar Score</span>
                    <span className="text-3xl font-black font-mono text-[#aa2d00]">{selectedTool.momentumScore}</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-[9px] text-slate-500 uppercase font-mono">Rating</span>
                    <span className="text-lg font-bold font-mono text-slate-800">{selectedTool.scoreOutOf10}/10</span>
                  </div>
                </div>
              </div>

              {/* Body Content */}
              <div className="space-y-6">
                
                {/* Description */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider font-mono">Description</h4>
                  <p className="text-slate-800 text-sm leading-relaxed font-body">{selectedTool.description}</p>
                  <p className="text-slate-500 text-xs leading-relaxed"><strong className="text-slate-700 font-semibold">Best for: </strong>{selectedTool.bestFor}</p>
                </div>

                {/* Real-World Tracked Signals */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-50 border border-slate-200 rounded-lg">
                  <div>
                    <span className="block text-[9px] text-slate-500 uppercase font-mono">Est. Monthly Traffic</span>
                    <span className="text-sm font-bold text-slate-800">{selectedTool.monthlyVisits}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] text-slate-500 uppercase font-mono">Real User Rating</span>
                    <span className="text-sm font-bold text-amber-600">★ {selectedTool.userRating} / 5</span>
                  </div>
                  <div>
                    <span className="block text-[9px] text-slate-500 uppercase font-mono">Figma Directory</span>
                    <span className="text-sm font-bold text-slate-800">{selectedTool.figmaCommunityUsers}</span>
                  </div>
                </div>

                {/* Why Trending */}
                <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-lg space-y-2">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-amber-700 uppercase tracking-wide">
                    <Zap size={14} />
                    Trending Catalyst
                  </span>
                  <p className="text-slate-800 text-xs leading-relaxed font-body">{selectedTool.whyTrending}</p>
                  <div className="pt-2 border-t border-amber-500/10 text-[10px] text-slate-500">
                    <strong className="text-slate-650 font-semibold">Tracked Sources: </strong>
                    {selectedTool.primaryDataSources.join(', ')}
                  </div>
                </div>

                {/* Score Breakdown Bars */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider font-mono">Momentum Signals</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {renderScoreBar('Launch Buzz (30%)', selectedTool.launchBuzz, 'bg-[#aa2d00]')}
                    {renderScoreBar('Social Buzz (25%)', selectedTool.socialBuzz, 'bg-[#1b61c9]')}
                    {renderScoreBar('Search Interest (20%)', selectedTool.searchInterest, 'bg-[#0a2e0e]')}
                    {renderScoreBar('Designer Adoption (15%)', selectedTool.designerAdoption, 'bg-[#d9a441]')}
                  </div>
                </div>

                {/* Pros and Cons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200">
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase text-[#0a2e0e] tracking-wider font-mono flex items-center gap-1.5">
                      <ShieldCheck size={14} />
                      Strengths / Pros
                    </h4>
                    <ul className="space-y-2">
                      {selectedTool.pros.map((pro, index) => (
                        <li key={index} className="flex gap-2 text-xs text-slate-750 leading-relaxed font-body">
                          <Check size={14} className="text-emerald-700 shrink-0 mt-0.5" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase text-[#aa2d00] tracking-wider font-mono flex items-center gap-1.5">
                      <AlertTriangle size={14} />
                      Friction / Cons
                    </h4>
                    <ul className="space-y-2">
                      {selectedTool.cons.map((con, index) => (
                        <li key={index} className="flex gap-2 text-xs text-slate-750 leading-relaxed font-body">
                          <X size={14} className="text-rose-700 shrink-0 mt-0.5" />
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Alternatives & Verdict */}
                <div className="space-y-4 pt-6 border-t border-slate-200">
                  <div>
                    <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider font-mono">Alternatives to Consider</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedTool.alternatives.map((alt, index) => (
                        <span key={index} className="px-2.5 py-1 text-xs rounded-sm bg-slate-50 border border-slate-200 text-slate-600 font-semibold font-mono">
                          {alt}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-[#f5e9d4]/40 rounded-lg border border-[#e0d4be]/60">
                    <h4 className="text-xs font-bold uppercase text-slate-600 tracking-wide font-mono">Editorial Verdict</h4>
                    <p className="text-slate-750 text-xs mt-1.5 leading-relaxed font-body">{selectedTool.verdict}</p>
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
