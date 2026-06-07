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
  
  // Theme toggle state
  const [isDark, setIsDark] = useState(false);
  
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
          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
            isDark 
              ? 'bg-emerald-950/30 text-emerald-400 border-emerald-800' 
              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
          }`}>
            <TrendingUp size={12} />
            Rising
          </span>
        );
      case 'cooling':
        return (
          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
            isDark 
              ? 'bg-rose-950/30 text-rose-400 border-rose-800' 
              : 'bg-rose-50 text-rose-700 border-rose-200'
          }`}>
            <TrendingDown size={12} />
            Cooling
          </span>
        );
      default:
        return (
          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
            isDark 
              ? 'bg-slate-800 text-slate-300 border-slate-700' 
              : 'bg-slate-50 text-slate-600 border-slate-200'
          }`}>
            <Minus size={12} />
            Stable
          </span>
        );
    }
  };

  // Helper for score percentage bars
  const renderScoreBar = (label: string, value: number, colorClass: string, darkColorClass: string) => {
    return (
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs font-medium">
          <span className={`font-mono uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{label}</span>
          <span className={`font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{value}%</span>
        </div>
        <div className={`h-2 w-full rounded-full overflow-hidden border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
          <div 
            className={`h-full rounded-full ${isDark ? darkColorClass : colorClass}`}
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
    <main className={`min-h-screen font-sans transition-colors duration-200 ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-white text-[#181d26]'}`}>
      
      {/* Pinned Top Navigation Bar */}
      <nav className={`sticky top-0 z-40 w-full backdrop-blur border-b shadow-sm py-4 px-4 sm:px-6 lg:px-8 transition-colors ${isDark ? 'bg-slate-950/95 border-slate-800' : 'bg-white/95 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-9 h-9 rounded-lg border flex items-center justify-center shadow-sm transition-colors ${isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-[#aa2d00]'}`}>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
                <circle cx="12" cy="12" r="2" fill="currentColor" />
                <path d="M12 3v9l4 4" />
              </svg>
            </div>
            <span className={`font-display font-bold text-lg tracking-tight ${isDark ? 'text-slate-100' : 'text-[#181d26]'}`}>AI Design Radar</span>
          </div>
          <div className={`hidden md:flex items-center gap-8 text-sm font-semibold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            <a href="#market-pulse" className={`transition ${isDark ? 'hover:text-white' : 'hover:text-[#1b61c9]'}`}>Market Pulse</a>
            <a href="#leaderboard" className={`transition ${isDark ? 'hover:text-white' : 'hover:text-[#1b61c9]'}`}>Leaderboard</a>
            <a href="#trends" className={`transition ${isDark ? 'hover:text-white' : 'hover:text-[#1b61c9]'}`}>Trends</a>
            <a href="#scoring" className={`transition ${isDark ? 'hover:text-white' : 'hover:text-[#1b61c9]'}`}>Methodology</a>
            <a href="#watchlist" className={`transition ${isDark ? 'hover:text-white' : 'hover:text-[#1b61c9]'}`}>Watchlist</a>
          </div>
          
          {/* Dark Mode Toggle Button */}
          <div>
            <button 
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-lg border transition shadow-sm ${
                isDark 
                  ? 'bg-slate-900 border-slate-800 text-amber-400 hover:text-amber-300 hover:bg-slate-800' 
                  : 'bg-white border-slate-200 text-slate-600 hover:text-slate-950 hover:bg-slate-50'
              }`}
              aria-label="Toggle Dark Mode"
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        
        {/* HERO SECTION */}
        <header className={`relative border-b pb-10 pt-4 transition-colors ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
          <div>
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border mb-4 uppercase tracking-wider transition-colors ${isDark ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-slate-100 border-slate-200 text-[#181d26]'}`}>
              <Sparkles size={12} className={isDark ? 'text-slate-400' : 'text-slate-600'} />
              AI Design Market Intelligence
            </div>
            <h1 className={`text-4xl md:text-5xl font-display tracking-tight leading-tight transition-colors ${isDark ? 'text-slate-100' : 'text-[#181d26]'}`}>
              AI Design Tools Radar
            </h1>
            <p className={`mt-3 text-lg max-w-3xl leading-relaxed font-body transition-colors ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Track which standalone AI design tools are gaining real momentum across launches, social buzz, search demand, and designer adoption.
            </p>
          </div>
        </header>

        {/* SECTION 1: MARKET PULSE */}
        <section id="market-pulse" className="scroll-mt-20 space-y-4">
          <div className="flex items-center gap-2">
            <Activity size={18} className="text-[#aa2d00]" />
            <h2 className={`text-xl font-display font-semibold transition-colors ${isDark ? 'text-slate-100' : 'text-[#181d26]'}`}>Market Pulse</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Fastest Rising Card - Coral Signature */}
            <div className="bg-[#aa2d00] text-white rounded-lg p-6 flex flex-col justify-between min-h-[160px] shadow-sm">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-orange-200">Fastest Rising</span>
                <h3 className="text-2xl font-display font-medium mt-2">{fastestRising.name}</h3>
                <p className="text-xs text-orange-100/90 mt-1">{fastestRising.category}</p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-orange-800/30 pt-3">
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
              <div className="mt-6 flex items-center justify-between border-t border-emerald-800/30 pt-3">
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
                <span className="text-xs text-slate-400">Peak momentum score</span>
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
              <h2 className={`text-xl font-display font-semibold transition-colors ${isDark ? 'text-slate-100' : 'text-[#181d26]'}`}>Momentum Leaderboard</h2>
            </div>
            
            {/* Search Input Box */}
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search tools..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`border rounded-sm pl-9 pr-4 py-2 text-xs w-72 placeholder-slate-400 focus:outline-none transition-colors ${
                  isDark 
                    ? 'bg-slate-900 border-slate-800 text-slate-200 focus:border-blue-500' 
                    : 'bg-white border-slate-200 text-[#181d26] focus:border-[#1b61c9]'
                }`}
              />
            </div>
          </div>

          {/* Category Filter Rail/Tabs */}
          <div className={`flex items-center gap-2 overflow-x-auto pb-2 border-b scrollbar-none transition-colors ${isDark ? 'border-slate-800/80' : 'border-slate-100'}`}>
            {uniqueCategories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 text-xs font-semibold transition-colors shrink-0 ${
                  selectedCategory === category 
                    ? (isDark ? 'bg-slate-100 text-slate-950 rounded-lg' : 'bg-[#181d26] text-white rounded-lg')
                    : isDark 
                      ? 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800 rounded-lg'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200 rounded-lg'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Table Container - Clean White & Hairline Dividers */}
          <div className={`border rounded-lg overflow-hidden shadow-sm transition-colors ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className={`border-b text-xs font-semibold tracking-wider transition-colors ${isDark ? 'border-slate-800 bg-slate-900 text-slate-400' : 'border-slate-200 bg-slate-50 text-slate-600'}`}>
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
                <tbody className={`divide-y ${isDark ? 'divide-slate-800' : 'divide-slate-200'}`}>
                  {filteredTools.map((tool, idx) => {
                    // Find actual rank inside the base sorted dataset
                    const originalRank = toolsData.findIndex(t => t.id === tool.id) + 1;
                    return (
                      <tr 
                        key={tool.id}
                        onClick={() => setSelectedTool(tool)}
                        className={`transition-colors cursor-pointer text-sm align-middle group ${isDark ? 'border-slate-800 hover:bg-slate-800/40' : 'border-slate-200 hover:bg-slate-50'}`}
                      >
                        {/* Rank */}
                        <td className={`py-4 px-4 text-center font-mono font-bold group-hover:text-[#1b61c9] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          #{originalRank}
                        </td>
                        {/* Tool Name & Description */}
                        <td className="py-4 px-4">
                          <div>
                            <span className={`font-bold transition-colors flex items-center gap-1 ${isDark ? 'text-slate-200 group-hover:text-blue-400' : 'text-[#181d26] group-hover:text-[#1b61c9]'}`}>
                              {tool.name}
                              <ExternalLink size={12} className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </span>
                            <span className={`block text-xs mt-0.5 line-clamp-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                              {tool.description}
                            </span>
                          </div>
                        </td>
                        {/* Category */}
                        <td className="py-4 px-4">
                          <span className={`inline-flex px-2.5 py-0.5 text-xs rounded-sm border font-medium transition-colors ${
                            isDark 
                              ? 'bg-slate-800 border-slate-700 text-slate-300' 
                              : 'bg-slate-100 border-slate-200 text-slate-700'
                          }`}>
                            {tool.category}
                          </span>
                        </td>
                        {/* Est. Monthly Traffic */}
                        <td className={`py-4 px-4 text-center font-mono text-xs font-medium transition-colors ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                          {tool.monthlyVisits}
                        </td>
                        
                        {/* User Rating cell with rating source tooltip */}
                        <td className="py-4 px-4 text-center">
                          <span className={`tooltip-trigger font-mono text-xs font-bold ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
                            ★ {tool.userRating}
                            <span className="tooltip-content font-sans font-normal text-white">
                              Source: {tool.ratingSources}
                            </span>
                          </span>
                        </td>
 
                        {/* Score & 7d Shift merged */}
                        <td className="py-4 px-4 text-center">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold font-mono rounded border transition-colors ${
                            isDark 
                              ? 'bg-slate-800 border-slate-700 text-slate-200' 
                              : 'bg-slate-100 border-slate-200 text-slate-800'
                          }`}>
                            {tool.momentumScore}
                            <span className={`text-[10px] font-semibold ${
                              tool.sevenDayChange >= 0 
                                ? (isDark ? 'text-emerald-300' : 'text-emerald-700') 
                                : (isDark ? 'text-rose-300' : 'text-rose-700')
                            }`}>
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
                      <td colSpan={7} className="py-8 text-center text-slate-400 text-sm">
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
              <h2 className={`text-xl font-display font-semibold transition-colors ${isDark ? 'text-slate-100' : 'text-[#181d26]'}`}>Top 5 Momentum Trends</h2>
            </div>
            
            <div className={`border rounded-lg p-6 min-h-[350px] transition-colors ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              {mounted ? (
                <div className="w-full h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={chartData}
                      margin={{ top: 10, right: 20, left: -20, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "rgba(255,255,255,0.05)" : "#e2e8f0"} />
                      <XAxis 
                        dataKey="name" 
                        stroke={isDark ? "#94a3b8" : "#64748b"} 
                        fontSize={11}
                        tickLine={false}
                      />
                      <YAxis 
                        stroke={isDark ? "#94a3b8" : "#64748b"} 
                        fontSize={11} 
                        domain={[65, 100]}
                        tickLine={false}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: isDark ? '#0f172a' : '#ffffff', 
                          borderColor: isDark ? '#1e293b' : '#dddddd',
                          borderRadius: '6px',
                          color: isDark ? '#f8fafc' : '#181d26',
                          fontSize: '12px'
                        }} 
                      />
                      <Legend 
                        wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey={topFiveTools[0].name} 
                        stroke={isDark ? "#fcab79" : "#aa2d00"} /* Coral / Peach */
                        strokeWidth={2.5}
                        activeDot={{ r: 6 }}
                        dot={{ r: 3 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey={topFiveTools[1].name} 
                        stroke={isDark ? "#458fff" : "#1b61c9"} /* Link Blue / Info Border */
                        strokeWidth={2.5}
                        dot={{ r: 3 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey={topFiveTools[2].name} 
                        stroke={isDark ? "#a8d8c4" : "#0a2e0e"} /* Forest Green / Mint */
                        strokeWidth={2.5}
                        dot={{ r: 3 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey={topFiveTools[3].name} 
                        stroke={isDark ? "#f4d35e" : "#d9a441"} /* Mustard Yellow / Yellow */
                        strokeWidth={2.5}
                        dot={{ r: 3 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey={topFiveTools[4].name} 
                        stroke={isDark ? "#ffffff" : "#181d26"} /* Primary Ink / White */
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

          {/* SECTION 3: MOMENTUM SCORE SYSTEM */}
          <div id="scoring" className="space-y-4 scroll-mt-20">
            <div className="flex items-center gap-2">
              <Info size={18} className="text-[#1b61c9]" />
              <h2 className={`text-xl font-display font-semibold transition-colors ${isDark ? 'text-slate-100' : 'text-[#181d26]'}`}>Score Methodology</h2>
            </div>
            
            <div className={`border rounded-lg p-6 space-y-6 transition-colors ${isDark ? 'bg-[#f5e9d4]/10 border-[#e0d4be]/30 text-slate-300' : 'bg-[#f5e9d4] border-[#e0d4be] text-[#181d26]'}`}>
              <div className={`p-4 rounded-md border transition-colors ${isDark ? 'bg-slate-950/50 border-[#e0d4be]/20' : 'bg-white/70 border-[#e0d4be]'}`}>
                <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Dynamic Formula</span>
                <code className={`block text-sm font-bold mt-1.5 font-mono ${isDark ? 'text-[#fcab79]' : 'text-[#aa2d00]'}`}>
                  30% LNCH + 25% SOC + 20% SEAR + 15% ADOP + 10% QUAL
                </code>
              </div>

              <div className="space-y-4 text-xs">
                <div className={`border-l-2 pl-3 space-y-1 ${isDark ? 'border-[#fcab79]' : 'border-[#aa2d00]'}`}>
                  <span className={`font-bold font-display ${isDark ? 'text-[#fcab79]' : 'text-[#aa2d00]'}`}>Launch Buzz (30%)</span>
                  <p className={isDark ? 'text-slate-300 font-body' : 'text-slate-700 font-body'}>Product Hunt upvotes, comment velocity, and maker responses.</p>
                </div>
                <div className={`border-l-2 pl-3 space-y-1 ${isDark ? 'border-[#458fff]' : 'border-[#1b61c9]'}`}>
                  <span className={`font-bold font-display ${isDark ? 'text-[#458fff]' : 'text-[#1b61c9]'}`}>Social Buzz (25%)</span>
                  <p className={isDark ? 'text-slate-300 font-body' : 'text-slate-700 font-body'}>X threads, Reddit mentions, and designer community sentiment volume.</p>
                </div>
                <div className={`border-l-2 pl-3 space-y-1 ${isDark ? 'border-[#a8d8c4]' : 'border-[#0a2e0e]'}`}>
                  <span className={`font-bold font-display ${isDark ? 'text-[#a8d8c4]' : 'text-[#0a2e0e]'}`}>Search Interest (20%)</span>
                  <p className={isDark ? 'text-slate-300 font-body' : 'text-slate-700 font-body'}>Branded search term velocity and relative search demand curves.</p>
                </div>
                <div className={`border-l-2 pl-3 space-y-1 ${isDark ? 'border-[#f4d35e]' : 'border-[#d9a441]'}`}>
                  <span className={`font-bold font-display ${isDark ? 'text-[#f4d35e]' : 'text-[#d9a441]'}`}>Designer Adoption (15%)</span>
                  <p className={isDark ? 'text-slate-300 font-body' : 'text-slate-700 font-body'}>Figma Community template imports and plugin installation spikes.</p>
                </div>
                <div className={`border-l-2 pl-3 space-y-1 ${isDark ? 'border-slate-500' : 'border-slate-600'}`}>
                  <span className={`font-bold font-display ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Editorial Quality (10%)</span>
                  <p className={isDark ? 'text-slate-300 font-body' : 'text-slate-700 font-body'}>Usability fluidity, workflow efficiency, and core UI design problem fit.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* SECTION 5: WATCHLIST */}
        <section id="watchlist" className="scroll-mt-20 space-y-4">
          <div className="flex items-center gap-2">
            <Compass size={18} className="text-[#0a2e0e]" />
            <h2 className={`text-xl font-display font-semibold transition-colors ${isDark ? 'text-slate-100' : 'text-[#181d26]'}`}>Tools to Watch</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {watchTools.map((tool, idx) => (
              <div 
                key={idx} 
                className={`rounded-lg p-5 border shadow-sm relative flex flex-col justify-between min-h-[180px] transition-colors ${
                  isDark 
                    ? 'bg-slate-900 border-slate-800' 
                    : tool.bgColor
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <h4 className={`font-bold transition-colors ${isDark ? 'text-slate-100' : 'text-[#181d26]'}`}>{tool.name}</h4>
                    <span className={`inline-flex px-2 py-0.5 rounded-sm text-[10px] font-semibold border ${
                      isDark ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-white/80 text-slate-700 border-slate-200'
                    }`}>
                      {tool.category}
                    </span>
                  </div>
                  <p className={`text-xs leading-relaxed font-body ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {tool.whyTrending}
                  </p>
                </div>
                <div className={`pt-4 border-t space-y-1.5 text-[11px] ${isDark ? 'border-slate-800/80' : 'border-slate-200/50'}`}>
                  <div className="flex justify-between">
                    <span className={`font-mono ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>SIGNAL</span>
                    <span className={isDark ? 'text-slate-300' : 'text-slate-800 font-semibold'}>{tool.source}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`font-mono ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>CONFIDENCE</span>
                    <span className={`font-bold ${isDark ? 'text-emerald-400' : tool.textColor}`}>
                      {tool.confidence}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className={`pt-10 border-t text-center text-xs text-slate-500 transition-colors ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
          <p>© {new Date().getFullYear()} AI Design Tools Radar. Created for market tracking and intelligence.</p>
        </footer>

        {/* SECTION 6: TOOL DETAIL MODAL */}
        {selectedTool && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300">
            <div className={`border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative p-6 md:p-8 animate-in fade-in zoom-in-95 duration-150 transition-colors ${
              isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-[#181d26]'
            }`}>
              
              {/* Close Button */}
              <button 
                onClick={() => setSelectedTool(null)}
                className={`absolute top-4 right-4 p-1.5 rounded-lg border transition ${
                  isDark 
                    ? 'border-slate-800 bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white' 
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-800'
                }`}
              >
                <X size={18} />
              </button>

              {/* Title & Metadata */}
              <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6 mb-6 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex px-2.5 py-0.5 text-xs rounded-sm border font-medium ${
                      isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}>
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
                  <h3 className={`text-3xl font-display font-medium mt-2 ${isDark ? 'text-slate-100' : 'text-[#181d26]'}`}>{selectedTool.name}</h3>
                  <p className={`text-xs mt-1 italic ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Pricing: {selectedTool.pricing}</p>
                </div>

                <div className={`flex items-center gap-4 border rounded-lg p-3 ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <div className={`text-center pr-4 border-r ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                    <span className={`block text-[9px] uppercase font-mono ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Radar Score</span>
                    <span className={`text-3xl font-black font-mono ${isDark ? 'text-[#fcab79]' : 'text-[#aa2d00]'}`}>{selectedTool.momentumScore}</span>
                  </div>
                  <div className="text-center">
                    <span className={`block text-[9px] uppercase font-mono ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Rating</span>
                    <span className={`text-lg font-bold font-mono ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>{selectedTool.scoreOutOf10}/10</span>
                  </div>
                </div>
              </div>

              {/* Body Content */}
              <div className="space-y-6">
                
                {/* Description */}
                <div className="space-y-2">
                  <h4 className={`text-xs font-bold uppercase tracking-wider font-mono ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Description</h4>
                  <p className={`text-sm leading-relaxed font-body ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>{selectedTool.description}</p>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}><strong className={`font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Best for: </strong>{selectedTool.bestFor}</p>
                </div>

                {/* Real-World Tracked Signals */}
                <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg transition-colors ${
                  isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div>
                    <span className={`block text-[9px] uppercase font-mono ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Est. Monthly Traffic</span>
                    <span className={`text-sm font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{selectedTool.monthlyVisits}</span>
                  </div>
                  <div>
                    <span className={`block text-[9px] uppercase font-mono ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Real User Rating</span>
                    <span className={`text-sm font-bold ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>★ {selectedTool.userRating} / 5</span>
                  </div>
                  <div>
                    <span className={`block text-[9px] uppercase font-mono ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Figma Directory</span>
                    <span className={`text-sm font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{selectedTool.figmaCommunityUsers}</span>
                  </div>
                </div>

                {/* Why Trending */}
                <div className={`p-4 border rounded-lg space-y-2 ${
                  isDark ? 'bg-amber-500/5 border-amber-500/15' : 'bg-amber-500/5 border-amber-500/20'
                }`}>
                  <span className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
                    <Zap size={14} />
                    Trending Catalyst
                  </span>
                  <p className={`text-xs leading-relaxed font-body ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>{selectedTool.whyTrending}</p>
                  <div className={`pt-2 border-t text-[10px] ${isDark ? 'text-slate-400 border-slate-800/80' : 'text-slate-600 border-amber-500/10'}`}>
                    <strong className={`font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Tracked Sources: </strong>
                    {selectedTool.primaryDataSources.join(', ')}
                  </div>
                </div>

                {/* Score Breakdown Bars */}
                <div className="space-y-3">
                  <h4 className={`text-xs font-bold uppercase tracking-wider font-mono ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Momentum Signals</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {renderScoreBar('Launch Buzz (30%)', selectedTool.launchBuzz, 'bg-[#aa2d00]', 'bg-[#fcab79]')}
                    {renderScoreBar('Social Buzz (25%)', selectedTool.socialBuzz, 'bg-[#1b61c9]', 'bg-[#458fff]')}
                    {renderScoreBar('Search Interest (20%)', selectedTool.searchInterest, 'bg-[#0a2e0e]', 'bg-[#a8d8c4]')}
                    {renderScoreBar('Designer Adoption (15%)', selectedTool.designerAdoption, 'bg-[#d9a441]', 'bg-[#f4d35e]')}
                  </div>
                </div>

                {/* Pros and Cons */}
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                  <div className="space-y-3">
                    <h4 className={`text-xs font-bold uppercase tracking-wider font-mono flex items-center gap-1.5 ${isDark ? 'text-[#a8d8c4]' : 'text-[#0a2e0e]'}`}>
                      <ShieldCheck size={14} />
                      Strengths / Pros
                    </h4>
                    <ul className="space-y-2">
                      {selectedTool.pros.map((pro, index) => (
                        <li key={index} className={`flex gap-2 text-xs leading-relaxed font-body ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                          <Check size={14} className={`shrink-0 mt-0.5 ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`} />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className={`text-xs font-bold uppercase tracking-wider font-mono flex items-center gap-1.5 ${isDark ? 'text-rose-400' : 'text-[#aa2d00]'}`}>
                      <AlertTriangle size={14} />
                      Friction / Cons
                    </h4>
                    <ul className="space-y-2">
                      {selectedTool.cons.map((con, index) => (
                        <li key={index} className={`flex gap-2 text-xs leading-relaxed font-body ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                          <X size={14} className={`shrink-0 mt-0.5 ${isDark ? 'text-rose-400' : 'text-rose-700'}`} />
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Alternatives & Verdict */}
                <div className={`space-y-4 pt-6 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                  <div>
                    <h4 className={`text-xs font-bold uppercase tracking-wider font-mono ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Alternatives to Consider</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedTool.alternatives.map((alt, index) => (
                        <span key={index} className={`px-2.5 py-1 text-xs rounded-sm border font-semibold font-mono ${
                          isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-600'
                        }`}>
                          {alt}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className={`p-4 rounded-lg border ${
                    isDark 
                      ? 'bg-slate-950/40 border-slate-800' 
                      : 'bg-[#f5e9d4]/40 border-[#e0d4be]/60'
                  }`}>
                    <h4 className={`text-xs font-bold uppercase tracking-wide font-mono ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Editorial Verdict</h4>
                    <p className={`text-xs mt-1.5 leading-relaxed font-body ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{selectedTool.verdict}</p>
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
