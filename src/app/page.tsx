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
  ChevronUp,
  MapPin
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

// Helper function for category-specific badge styling
const getCategoryBadgeStyle = (category: string, isDark: boolean): string => {
  const styles: { [key: string]: { dark: string; light: string } } = {
    'UX Research': {
      dark: 'bg-cyan-950/45 border-cyan-800/40 text-cyan-300',
      light: 'bg-cyan-50 border-cyan-200 text-cyan-800'
    },
    'Design-to-Code': {
      dark: 'bg-blue-950/45 border-blue-900/40 text-blue-300',
      light: 'bg-blue-50 border-blue-200 text-blue-800'
    },
    'Wireframing': {
      dark: 'bg-teal-950/45 border-teal-900/40 text-teal-300',
      light: 'bg-teal-50 border-teal-200 text-teal-800'
    },
    'Prototyping': {
      dark: 'bg-indigo-950/45 border-indigo-900/40 text-indigo-300',
      light: 'bg-indigo-50 border-indigo-200 text-indigo-800'
    },
    'Visual Design': {
      dark: 'bg-purple-950/45 border-purple-900/40 text-purple-300',
      light: 'bg-purple-50 border-purple-200 text-purple-800'
    },
    'Image Generation': {
      dark: 'bg-fuchsia-950/45 border-fuchsia-900/40 text-fuchsia-300',
      light: 'bg-fuchsia-50 border-fuchsia-200 text-fuchsia-800'
    },
    'Video Generation': {
      dark: 'bg-pink-950/45 border-pink-800/40 text-pink-300',
      light: 'bg-pink-50 border-pink-200 text-pink-800'
    },
    'Product Strategy': {
      dark: 'bg-rose-950/45 border-rose-800/40 text-rose-300',
      light: 'bg-rose-50 border-rose-200 text-rose-800'
    },
    'User Testing': {
      dark: 'bg-orange-950/45 border-orange-800/40 text-orange-350',
      light: 'bg-orange-50 border-orange-200 text-orange-850'
    },
    '3D Design': {
      dark: 'bg-amber-950/45 border-amber-900/40 text-amber-300',
      light: 'bg-amber-50 border-amber-200 text-amber-800'
    },
    'Motion Design': {
      dark: 'bg-violet-950/45 border-violet-800/40 text-violet-300',
      light: 'bg-violet-50 border-violet-200 text-violet-800'
    }
  };

  const style = styles[category];
  if (!style) {
    return isDark 
      ? 'bg-[#2a2725] border-[#3b3734] text-slate-350' 
      : 'bg-slate-100 border-slate-200 text-slate-700';
  }
  return isDark ? style.dark : style.light;
};

const MONOCHROME_LOGOS = new Set([
  'framer-ai', 'v0', 'cursor', 'lovable', 'bolt', 'recraft', 'midjourney', 'runway', 
  'krea-ai', 'maze', 'dovetail', 'lottiefiles-ai', 'phind', 'replit-agent', 'pika', 
  'luma-dream-machine', 'meshy', 'tripo3d', 'copilot-workspace', 'veed-io', 'vectary', 
  'adobe-firefly', 'clipdrop', 'microsoft-designer'
]);

// Helper component to return accurate brand logo SVG images dynamically from public/logos/
const ToolLogo = ({ id, name, category }: { id: string; name: string; category: string }) => {
  const [hasError, setHasError] = useState(false);
  const letter = name.charAt(0);
  const colors: { [key: string]: string } = {
    'UX Research': 'bg-cyan-900 border border-cyan-800 text-cyan-200',
    'Design-to-Code': 'bg-blue-900 border border-blue-800 text-blue-200',
    'Wireframing': 'bg-teal-900 border border-teal-800 text-teal-200',
    'Prototyping': 'bg-indigo-900 border border-indigo-800 text-indigo-200',
    'Visual Design': 'bg-purple-900 border border-purple-800 text-purple-200',
    'Image Generation': 'bg-fuchsia-900 border border-fuchsia-800 text-fuchsia-200',
    'Video Generation': 'bg-pink-900 border border-pink-800 text-pink-200',
    'Product Strategy': 'bg-rose-900 border border-rose-800 text-rose-200',
    'User Testing': 'bg-orange-900 border border-[#3e3a37] text-orange-200',
    '3D Design': 'bg-amber-900 border border-amber-800 text-amber-200',
    'Motion Design': 'bg-violet-900 border border-violet-800 text-violet-200',
  };
  
  const colorClass = colors[category] || 'bg-[#2a2725] border border-[#3b3734] text-slate-350';
  const isMonochrome = MONOCHROME_LOGOS.has(id);

  return (
    <div className="w-6 h-6 rounded-md overflow-hidden flex items-center justify-center shrink-0 relative shadow-sm border border-slate-200/40 dark:border-slate-800/40 bg-white dark:bg-[#181615]">
      {/* Fallback initials badge (only show if image failed to load) */}
      {hasError ? (
        <div className={`absolute inset-0 flex items-center justify-center text-[11px] font-bold ${colorClass}`}>
          {letter}
        </div>
      ) : (
        <img 
          src={`/logos/${id}.svg`} 
          alt={`${name} logo`} 
          className={`absolute inset-0 w-full h-full object-cover z-10 ${isMonochrome ? 'dark:invert p-0.5' : ''}`} 
          onError={() => setHasError(true)}
        />
      )}
    </div>
  );
};

const CITY_CAM_MAPPING: { 
  [key: string]: { 
    timezone: string; 
    ytId?: string; 
    unsplashIds: string[];
    country: string;
  } 
} = {
  'Amsterdam, Netherlands': {
    timezone: 'Europe/Amsterdam',
    ytId: '5donI8sdUhM',
    unsplashIds: ['1513694203232-719a280e022f', '1494587416117-f102a2ac0a8d', '1524047902892-a13a04657da6'],
    country: 'Netherlands'
  },
  'Athens, Greece': {
    timezone: 'Europe/Athens',
    ytId: 'rUes9SGHEz8',
    unsplashIds: ['1503152394-c571994fd383', '1515488042361-404e9253a570', '1551882547-ff40c63fe5fa'],
    country: 'Greece'
  },
  'Atlanta, GA': {
    timezone: 'America/New_York',
    ytId: 'wYDbM3n-4Bo',
    unsplashIds: ['1575908539614-ff89490f4a78', '1543872084-c7bd3822856f', '1526848146743-4e8992e1efc3'],
    country: 'USA'
  },
  'Bengaluru, India': {
    timezone: 'Asia/Kolkata',
    ytId: '_YltHpZ1MrI',
    unsplashIds: ['1596176530529-78163a4f7af2', '1576487248805-cf45f6bcd290', '1605276374104-dee2a0ed3cd6'],
    country: 'India'
  },
  'Berlin, Germany': {
    timezone: 'Europe/Berlin',
    ytId: 'W7Xi8wejyJQ',
    unsplashIds: ['1599946347371-68eb71b16afc', '1560969184-10fe8719e047', '1527004013197-933c4bb611b3'],
    country: 'Germany'
  },
  'Chennai, India': {
    timezone: 'Asia/Kolkata',
    ytId: 'f43q0qi25VU',
    unsplashIds: ['1582510003544-4d00b7f74220', '1585806297371-c05297305290', '1616588589676-62b3bd4ff6d2'],
    country: 'India'
  },
  'Columbus, OH': {
    timezone: 'America/New_York',
    ytId: 'dBk8JbWaYdE',
    unsplashIds: ['1549241477-f273063fc7d1', '1612479532822-77c8e9b62649', '1569336415962-a4bd9f69cd83'],
    country: 'USA'
  },
  'Copenhagen, Denmark': {
    timezone: 'Europe/Copenhagen',
    ytId: 'BPkUywi4uHk',
    unsplashIds: ['1513622470522-26c3c8a854bc', '1561542320-9a18cd340469', '1501622233866-a51362223386'],
    country: 'Denmark'
  },
  'London, United Kingdom': {
    timezone: 'Europe/London',
    ytId: 'afnrbt7OxTM',
    unsplashIds: ['1513635269975-59663e0ac1ad', '1529655683826-095745903d3a', '1486406146926-c627a92ad1ab'],
    country: 'United Kingdom'
  },
  'New Delhi, India': {
    timezone: 'Asia/Kolkata',
    ytId: 'XUahhgM5IXk',
    unsplashIds: ['1587474260584-136574528ed5', '1598305377380-6e69e8a26f92', '1622547748225-3fc4abd2cca0'],
    country: 'India'
  },
  'New York City, NY': {
    timezone: 'America/New_York',
    ytId: 'mfPDLNdoiEw',
    unsplashIds: ['1496442226666-8d4d0e62e6e9', '1490644306279-052028e3b5e4', '1522083165195-3427832965d3'],
    country: 'USA'
  },
  'Paris, France': {
    timezone: 'Europe/Paris',
    ytId: '_iZ-vMCeH9U',
    unsplashIds: ['1502602898657-3e91760cbb34', '1499856871958-5b9647a640d0', '1508050913630-b99b9225d122'],
    country: 'France'
  },
  'Redmond, WA': {
    timezone: 'America/Los_Angeles',
    ytId: 'skLdm2I9UHM',
    unsplashIds: ['1508433363872-970924c69028', '1605379399642-870262d3d051', '1470071459604-3b5ec3a7fe05'],
    country: 'USA'
  },
  'Redwood City, CA': {
    timezone: 'America/Los_Angeles',
    ytId: 'Sgcq2Rqgxdo',
    unsplashIds: ['1554482504-20b127ff2823', '1492562080023-ab3db95bfbce', '1506157786151-b8491531f063'],
    country: 'USA'
  },
  'San Francisco, CA': {
    timezone: 'America/Los_Angeles',
    ytId: 'mKo2QHfWlgE',
    unsplashIds: ['1501594907352-04cda38ebc29', '1506012787146-f92b2d7d6d96', '1470229722913-7c0e2dbbafd3'],
    country: 'USA'
  },
  'San Jose, CA': {
    timezone: 'America/Los_Angeles',
    ytId: '-gp7tEmvXvE',
    unsplashIds: ['1605647540924-852290f6b0d5', '1618005182384-a83a8bd57fbe', '1533282960533-51328aa49826'],
    country: 'USA'
  },
  'Singapore': {
    timezone: 'Asia/Singapore',
    ytId: 'R2Yk6UmXxMM',
    unsplashIds: ['1525625293386-3f8f99389edd', '1568992688005-53574a5dbd83', '1509060464153-44667554f970'],
    country: 'Singapore'
  },
  'Stockholm, Sweden': {
    timezone: 'Europe/Stockholm',
    ytId: 'CBn8CSzf4e0',
    unsplashIds: ['1508849789987-4e5333c12b78', '1548678816-7d1a58064970', '1520106212299-d99c443e4568'],
    country: 'Sweden'
  },
  'Sydney, Australia': {
    timezone: 'Australia/Sydney',
    ytId: 'UHGhj5aPX5M',
    unsplashIds: ['1506973035872-a4ec16b8e8d9', '1524820197278-540916411e2d', '1549488344-1f9b8d2bd1f3'],
    country: 'Australia'
  },
  'Toronto, Canada': {
    timezone: 'America/Toronto',
    ytId: 'NS1_JEPJjHA',
    unsplashIds: ['1507608869274-d3177c8bb4c7', '1477959858617-67f85cf4f1df', '1517935703635-2717357c21b1'],
    country: 'Canada'
  }
};

export default function RadarDashboard() {
  const [mounted, setMounted] = useState(false);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  
  const modalYtId = selectedTool?.hqLocation ? CITY_CAM_MAPPING[selectedTool.hqLocation]?.ytId : undefined;
  const modalLocationLink = modalYtId ? `https://www.youtube.com/watch?v=${modalYtId}` : selectedTool?.mapsLink;

  // City Cam Hover state
  const [hoveredLocation, setHoveredLocation] = useState<{
    city: string;
    timezone: string;
    ytId?: string;
    unsplashUrl: string;
    x: number;
    y: number;
  } | null>(null);

  const getLocalTime = (timezone: string) => {
    try {
      return new Intl.DateTimeFormat('en-US', {
        timeStyle: 'short',
        timeZone: timezone
      }).format(new Date());
    } catch (e) {
      return new Date().toLocaleTimeString('en-US', { timeStyle: 'short' });
    }
  };

  const handleMouseEnterLocation = (e: React.MouseEvent<HTMLAnchorElement>, location: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const data = CITY_CAM_MAPPING[location];
    if (data) {
      const randomIdx = Math.floor(Math.random() * data.unsplashIds.length);
      const unsplashId = data.unsplashIds[randomIdx];
      const unsplashUrl = `https://images.unsplash.com/photo-${unsplashId}?w=300&h=180&fit=crop&q=80`;
      
      setHoveredLocation({
        city: location,
        timezone: data.timezone,
        ytId: data.ytId,
        unsplashUrl,
        x: rect.left + rect.width / 2,
        y: rect.top - 8
      });
    }
  };

  // Theme toggle state
  const [isDark, setIsDark] = useState(false); // Default to light mode
  
  // Interactive sorting, search, and filtering states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTrend, setSelectedTrend] = useState<string>('All');
  const [selectedPricing, setSelectedPricing] = useState<string>('All');
  const [sortField, setSortField] = useState<string>('momentumScore');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [visibleCount, setVisibleCount] = useState(10);

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

  // Re-structure the history for Recharts
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
      textColor: "text-[#aa2d00]",
      website: "https://codeflow.ai"
    },
    {
      name: "UserQuery Agent",
      whyTrending: "AI usability testing agent discussed on Reddit UX research communities for autonomous script interviewing.",
      source: "Reddit UX Design Community",
      confidence: "Medium",
      category: "User Testing",
      bgColor: "bg-[#a8d8c4]/20 border-[#a8d8c4]/40", // Mint
      textColor: "text-[#0a2e0e]",
      website: "https://userquery.com"
    },
    {
      name: "Critique.ai",
      whyTrending: "Design review agent mentioned in Substack newsletters for automated heuristic analysis of UI layouts.",
      source: "Design Systems Weekly Substack",
      confidence: "High",
      category: "UX Research",
      bgColor: "bg-[#f4d35e]/15 border-[#f4d35e]/30", // Yellow
      textColor: "text-[#b28704]",
      website: "https://critique.ai"
    },
    {
      name: "WireframeAI Studio",
      whyTrending: "New AI wireframing tool trending on Product Hunt with quick text-to-layout conversion features.",
      source: "Product Hunt Launch #4 Product of the Day",
      confidence: "Medium",
      category: "Wireframing",
      bgColor: "bg-[#f5e9d4]/70 border-[#e0e2e6]", // Cream
      textColor: "text-[#333840]",
      website: "https://wireframe.ai"
    }
  ];

  // Helper for trend badge UI
  const renderTrendBadge = (status: Tool['trendStatus']) => {
    switch (status) {
      case 'rising':
        return (
          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
            isDark 
              ? 'bg-emerald-950/30 text-emerald-400 border-emerald-800/60' 
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
              ? 'bg-rose-950/30 text-rose-400 border-rose-800/60' 
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
              ? 'bg-[#2a2725] text-slate-300 border-[#3b3734]' 
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
          <span className={`font-mono uppercase tracking-wider ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{label}</span>
          <span className={`font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{value}%</span>
        </div>
        <div className={`h-2 w-full rounded-full overflow-hidden border ${isDark ? 'bg-[#0f0e0d] border-[#2a2725]' : 'bg-slate-100 border-slate-200'}`}>
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

  // Helper to parse launch date strings (e.g. "Jun 2023", "Oct 2024") into timestamps for sorting
  const parseLaunchDate = (dateStr: string): number => {
    if (!dateStr) return 0;
    const parts = dateStr.split(' ');
    const monthNames: { [key: string]: number } = {
      Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
      Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
    };
    const month = monthNames[parts[0]] ?? 0;
    const year = parseInt(parts[1]) || 0;
    return new Date(year, month).getTime();
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
      <ChevronUp size={14} className="inline text-[#ff5c35] ml-0.5" />
    ) : (
      <ChevronDown size={14} className="inline text-[#ff5c35] ml-0.5" />
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
      const matchesTrend = selectedTrend === 'All' || tool.trendStatus === selectedTrend.toLowerCase();
      
      const matchesPricing = selectedPricing === 'All' ||
        (selectedPricing === 'Free' && tool.pricing.toLowerCase().startsWith('free')) ||
        (selectedPricing === 'Freemium' && tool.pricing.toLowerCase().includes('freemium')) ||
        (selectedPricing === 'Paid' && !tool.pricing.toLowerCase().includes('free') && !tool.pricing.toLowerCase().includes('freemium'));
      
      return matchesSearch && matchesCategory && matchesTrend && matchesPricing;
    })
    .sort((a, b) => {
      let aVal: any = a[sortField as keyof Tool];
      let bVal: any = b[sortField as keyof Tool];

      if (sortField === 'monthlyVisits') {
        aVal = parseVisits(a.monthlyVisits);
        bVal = parseVisits(b.monthlyVisits);
      }

      if (sortField === 'launchDate') {
        aVal = parseLaunchDate(a.launchDate);
        bVal = parseLaunchDate(b.launchDate);
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

  const displayedTools = filteredTools.slice(0, visibleCount);
  const uniqueCategories = ['All', ...CATEGORIES];

  return (
    <main className={`min-h-screen font-sans transition-colors duration-200 ${isDark ? 'bg-[#0f0e0d] text-slate-100' : 'bg-white text-[#181d26]'}`}>
      
      {/* Pinned Top Navigation Bar */}
      <nav className={`sticky top-0 z-40 w-full backdrop-blur border-b shadow-sm py-4 px-4 sm:px-6 lg:px-8 transition-colors ${isDark ? 'bg-[#0f0e0d]/95 border-[#2a2725]' : 'bg-white/95 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-9 h-9 rounded-lg border flex items-center justify-center shadow-sm transition-colors ${isDark ? 'bg-[#181615] border-[#2a2725] text-slate-100' : 'bg-slate-50 border-slate-200 text-[#aa2d00]'}`}>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {/* Concentric rings */}
                <circle cx="12" cy="12" r="9" className="opacity-25" />
                <circle cx="12" cy="12" r="6" strokeDasharray="2 2" className="opacity-40" />
                <circle cx="12" cy="12" r="3" className="opacity-60" />
                {/* Radar Sweep */}
                <g className="animate-[spin_4s_linear_infinite]" style={{ transformOrigin: '12px 12px' }}>
                  <line x1="12" y1="12" x2="12" y2="3" stroke={isDark ? '#ff5c35' : 'currentColor'} strokeWidth="1.5" className="opacity-90" />
                  <circle cx="12" cy="3" r="1" fill={isDark ? '#ff5c35' : 'currentColor'} className="animate-ping" />
                </g>
              </svg>
            </div>
            <span className={`font-display font-bold text-lg tracking-tight ${isDark ? 'text-slate-100' : 'text-[#181d26]'}`}>AI Design Radar</span>
          </div>
          <div className={`hidden md:flex items-center gap-8 text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            <a href="#market-pulse" className={`transition ${isDark ? 'hover:text-white' : 'hover:text-[#1b61c9]'}`}>Market Pulse</a>
            <a href="#leaderboard" className={`transition ${isDark ? 'hover:text-white' : 'hover:text-[#1b61c9]'}`}>Leaderboard</a>
            <a href="#trends" className={`transition ${isDark ? 'hover:text-white' : 'hover:text-[#1b61c9]'}`}>Trends</a>
            <a href="#watchlist" className={`transition ${isDark ? 'hover:text-white' : 'hover:text-[#1b61c9]'}`}>Watchlist</a>
            <a href="#scoring" className={`transition ${isDark ? 'hover:text-white' : 'hover:text-[#1b61c9]'}`}>Methodology</a>
          </div>
          
          {/* Dark Mode Toggle Button */}
          <div>
            <button 
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-lg border transition shadow-sm cursor-pointer ${
                isDark 
                  ? 'bg-[#181615] border-[#2a2725] text-amber-400 hover:text-amber-300 hover:bg-[#252220]' 
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
        <header className={`relative border-b pb-10 pt-4 transition-colors ${isDark ? 'border-[#2a2725]' : 'border-slate-200'}`}>
          <div>
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border mb-4 uppercase tracking-wider transition-colors ${isDark ? 'bg-[#181615] border-[#2a2725] text-slate-200' : 'bg-slate-100 border-slate-200 text-[#181d26]'}`}>
              <Sparkles size={12} className={isDark ? 'text-slate-300' : 'text-slate-700'} />
              AI Design Market Intelligence
            </div>
            <h1 className={`text-4xl md:text-5xl font-display tracking-tight leading-tight transition-colors ${isDark ? 'text-slate-100' : 'text-[#181d26]'}`}>
              AI Design Tools Radar
            </h1>
            <p className={`mt-3 text-lg max-w-3xl leading-relaxed font-body transition-colors ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Track which standalone AI design tools are gaining real momentum across launches, social buzz, search demand, and designer adoption.
            </p>
          </div>
        </header>

        {/* SECTION 1: MARKET PULSE */}
        <section id="market-pulse" className="scroll-mt-20 space-y-4">
          <div className="flex items-center gap-2">
            <Activity size={18} className="text-[#ff5c35]" />
            <h2 className={`text-xl font-display font-semibold transition-colors ${isDark ? 'text-slate-100' : 'text-[#181d26]'}`}>Market Pulse</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Fastest Rising Card - Soothing orange shade */}
            <div className="bg-[#e05a36] text-white rounded-lg p-6 flex flex-col justify-between min-h-[160px] shadow-sm">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-orange-100">Fastest Rising</span>
                <h3 className="text-2xl font-display font-medium mt-2">{fastestRising.name}</h3>
                <p className="text-xs text-orange-100/90 mt-1">{fastestRising.category}</p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-orange-400/30 pt-3">
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
                <p className="text-xs text-slate-300 mt-1">{biggestGain.category}</p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-slate-800 pt-3">
                <span className="text-xs text-slate-300">Peak momentum score</span>
                <span className="text-lg font-bold text-white">
                  {biggestGain.momentumScore} / 100
                </span>
              </div>
            </div>

          </div>
        </section>

        {/* ONE-LINE METHODOLOGY BANNER (TRUST BEFORE DATA) */}
        <div className={`text-xs py-3 px-4 rounded border text-center transition-colors font-medium tracking-wide shadow-sm ${
          isDark 
            ? 'bg-[#181615] border-[#2a2725] text-slate-300' 
            : 'bg-orange-50/50 border-orange-200/50 text-slate-700'
        }`}>
          <span className={`font-bold uppercase tracking-wider mr-2 ${isDark ? 'text-[#ff5c35]' : 'text-[#aa2d00]'}`}>Methodology:</span>
          Scored across 5 signals: Launch Buzz (30%), Social Buzz (25%), Search Interest (20%), Designer Adoption (15%), and Editorial Quality (10%)
        </div>

        {/* SECTION 2: MOMENTUM LEADERBOARD */}
        <section id="leaderboard" className="scroll-mt-20 space-y-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Flame size={18} className="text-[#ff5c35]" />
                <h2 className={`text-xl font-display font-semibold transition-colors ${isDark ? 'text-slate-100' : 'text-[#181d26]'}`}>Momentum Leaderboard</h2>
              </div>
              
              {/* Search & Advanced Filters */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Search Input */}
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search tools..." 
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setVisibleCount(10);
                    }}
                    className={`border rounded-sm pl-9 pr-4 py-1.5 text-xs w-48 sm:w-56 placeholder-slate-400 focus:outline-none transition-colors ${
                      isDark 
                        ? 'bg-[#181615] border-[#2a2725] text-slate-200 focus:border-[#ff5c35]' 
                        : 'bg-white border-slate-200 text-[#181d26] focus:border-[#1b61c9]'
                    }`}
                  />
                </div>

                {/* Trend Filter */}
                <div className="relative">
                  <select
                    value={selectedTrend}
                    onChange={(e) => {
                      setSelectedTrend(e.target.value);
                      setVisibleCount(10);
                    }}
                    className={`appearance-none border rounded-sm pl-3 pr-8 py-1.5 text-xs focus:outline-none cursor-pointer transition-colors ${
                      isDark 
                        ? 'bg-[#181615] border-[#2a2725] text-slate-200 focus:border-[#ff5c35]' 
                        : 'bg-white border-slate-200 text-[#181d26] focus:border-[#1b61c9]'
                    }`}
                  >
                    <option value="All">All Trends</option>
                    <option value="Rising">Rising</option>
                    <option value="Stable">Stable</option>
                    <option value="Cooling">Cooling</option>
                  </select>
                  <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>

                {/* Pricing Filter */}
                <div className="relative">
                  <select
                    value={selectedPricing}
                    onChange={(e) => {
                      setSelectedPricing(e.target.value);
                      setVisibleCount(10);
                    }}
                    className={`appearance-none border rounded-sm pl-3 pr-8 py-1.5 text-xs focus:outline-none cursor-pointer transition-colors ${
                      isDark 
                        ? 'bg-[#181615] border-[#2a2725] text-slate-200 focus:border-[#ff5c35]' 
                        : 'bg-white border-slate-200 text-[#181d26] focus:border-[#1b61c9]'
                    }`}
                  >
                    <option value="All">All Pricing</option>
                    <option value="Free">Free</option>
                    <option value="Freemium">Freemium</option>
                    <option value="Paid">Paid</option>
                  </select>
                  <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>

                {/* Clear Filters Button */}
                {(searchQuery !== '' || selectedCategory !== 'All' || selectedTrend !== 'All' || selectedPricing !== 'All') && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                      setSelectedTrend('All');
                      setSelectedPricing('All');
                      setVisibleCount(10);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-sm border transition-colors ${
                      isDark 
                        ? 'bg-[#181615] border-[#2a2725] text-slate-200 hover:bg-[#252220] hover:text-white' 
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-[#aa2d00]'
                    }`}
                  >
                    <X size={12} />
                    Clear Filters
                  </button>
                )}
              </div>
            </div>

            {/* Matching Count */}
            <div className="flex items-center justify-between text-xs transition-colors">
              <span className={isDark ? 'text-slate-300' : 'text-slate-600'}>
                Showing <strong className={isDark ? 'text-slate-100' : 'text-slate-800'}>{filteredTools.length}</strong> of <strong className={isDark ? 'text-slate-100' : 'text-slate-800'}>{toolsData.length}</strong> tools
              </span>
            </div>
          </div>

          {/* Category Filter Rail/Tabs */}
          <div className={`flex items-center gap-2 overflow-x-auto pb-2 border-b scrollbar-none transition-colors ${isDark ? 'border-[#2a2725]/80' : 'border-slate-100'}`}>
            {uniqueCategories.map(category => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setVisibleCount(10);
                }}
                className={`px-3 py-1.5 text-xs font-semibold transition-colors shrink-0 ${
                  selectedCategory === category 
                    ? (isDark ? 'bg-slate-100 text-slate-950 rounded-lg' : 'bg-[#181d26] text-white rounded-lg')
                    : isDark 
                      ? 'bg-[#181615] text-slate-450 hover:bg-[#252220] border border-[#2a2725] rounded-lg'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200 rounded-lg'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Table Container - Clean White & Hairline Dividers */}
          <div className={`border rounded-lg overflow-hidden shadow-sm transition-colors ${isDark ? 'bg-[#181615] border-[#2a2725]' : 'bg-white border-slate-200'}`}>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className={`border-b text-xs font-semibold tracking-wider transition-colors ${isDark ? 'border-[#2a2725] bg-[#181615] text-slate-300' : 'border-slate-200 bg-slate-50 text-slate-700'}`}>
                    <th className="py-4 px-4 text-center w-12 cursor-pointer select-none" onClick={() => handleSort('momentumScore')}>
                      Rank
                    </th>
                    <th className="py-4 px-4 cursor-pointer select-none" onClick={() => handleSort('name')}>
                      Tool {renderSortArrow('name')}
                    </th>
                    <th className="py-4 px-4 text-center cursor-pointer select-none" onClick={() => handleSort('launchDate')}>
                      Launch Date {renderSortArrow('launchDate')}
                    </th>
                    <th className="py-4 px-4 text-center cursor-pointer select-none" onClick={() => handleSort('hqLocation')}>
                      Location {renderSortArrow('hqLocation')}
                    </th>
                    <th className="py-4 px-4 text-center select-none">
                      Enterprise Clients
                    </th>
                    <th className="py-4 px-4 text-center cursor-pointer select-none" onClick={() => handleSort('monthlyVisits')}>
                      Est. Monthly Traffic {renderSortArrow('monthlyVisits')}
                    </th>
                    <th className="py-4 px-4 text-center cursor-pointer select-none" onClick={() => handleSort('momentumScore')}>
                      Score & 7d Shift {renderSortArrow('momentumScore')}
                    </th>
                    <th className="py-4 px-4 text-center cursor-pointer select-none" onClick={() => handleSort('trendStatus')}>
                      Trend
                    </th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? 'divide-[#2a2725]' : 'divide-slate-200'}`}>
                  {displayedTools.map((tool, idx) => {
                    // Find actual rank inside the base sorted dataset
                    const originalRank = toolsData.findIndex(t => t.id === tool.id) + 1;
                    const ytId = tool.hqLocation ? CITY_CAM_MAPPING[tool.hqLocation]?.ytId : undefined;
                    const locationLink = ytId ? `https://www.youtube.com/watch?v=${ytId}` : tool.mapsLink;
                    return (
                      <tr 
                        key={tool.id}
                        onClick={() => setSelectedTool(tool)}
                        className={`transition-colors cursor-pointer text-sm align-middle group ${isDark ? 'border-[#2a2725] hover:bg-[#2a2725]/40' : 'border-slate-200 hover:bg-slate-50'}`}
                      >
                        {/* Rank */}
                        <td className={`py-4 px-4 text-center font-mono font-bold group-hover:text-[#ff5c35] ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                          #{originalRank}
                        </td>
                        {/* Tool Name, Logo, Category & Description */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <ToolLogo id={tool.id} name={tool.name} category={tool.category} />
                            <div className="flex flex-col sm:flex-row sm:items-center gap-x-2 gap-y-0.5">
                              <span className={`font-bold transition-colors flex items-center gap-1 ${isDark ? 'text-slate-100 group-hover:text-[#ff5c35]' : 'text-[#181d26] group-hover:text-[#aa2d00]'}`}>
                                {tool.name}
                                <ExternalLink size={12} className={`opacity-0 group-hover:opacity-100 transition-opacity ${isDark ? 'text-slate-300' : 'text-slate-500'}`} />
                              </span>
                              <span className={`inline-flex px-1.5 py-0.5 rounded-sm border text-[10px] font-semibold transition-colors leading-none shrink-0 ${getCategoryBadgeStyle(tool.category, isDark)}`}>
                                {tool.category}
                              </span>
                            </div>
                          </div>
                          <span className={`block text-xs mt-1 line-clamp-1 pl-9 ${isDark ? 'text-slate-300' : 'text-slate-650'}`}>
                            {tool.description}
                          </span>
                        </td>
                        {/* Launch Date */}
                        <td className={`py-4 px-4 text-center font-mono text-xs transition-colors ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                          {tool.launchDate}
                        </td>
                        {/* HQ Location with Live Cam link and Cam Hover */}
                        <td className="py-4 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                          <a 
                            href={locationLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            onMouseEnter={(e) => handleMouseEnterLocation(e, tool.hqLocation || '')}
                            onMouseLeave={() => setHoveredLocation(null)}
                            className={`inline-flex items-center gap-1 text-xs hover:underline ${isDark ? 'text-sky-400' : 'text-[#1b61c9]'}`}
                          >
                            <MapPin size={10} className="shrink-0" />
                            {tool.hqLocation}
                            <ExternalLink size={8} />
                          </a>
                        </td>
                        {/* Enterprise Clients */}
                        <td className="py-4 px-4 text-center max-w-[220px]">
                          <div className="flex flex-wrap gap-1 justify-center">
                            {tool.enterpriseClients?.map((client, idx) => (
                              <span 
                                key={idx}
                                className={`inline-flex px-1.5 py-0.5 rounded-sm border text-[10px] font-semibold transition-colors leading-none shrink-0 ${
                                  isDark 
                                    ? 'bg-slate-900/50 border-slate-800/60 text-slate-350' 
                                    : 'bg-slate-100 border-slate-200 text-slate-700'
                                }`}
                              >
                                {client}
                              </span>
                            ))}
                          </div>
                        </td>
                        {/* Est. Monthly Traffic */}
                        <td className={`py-4 px-4 text-center font-mono text-xs font-medium transition-colors ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                          {tool.monthlyVisits}
                        </td>
                        
                        {/* Score & 7d Shift merged */}
                        <td className="py-4 px-4 text-center">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold font-mono rounded border transition-colors ${
                            isDark 
                              ? 'bg-[#2a2725] border-[#3b3734] text-slate-200' 
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
                  {displayedTools.length === 0 && (
                    <tr>
                      <td colSpan={7} className={`py-8 text-center text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                        No tools found matching your filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Show All / Show Less Toggle Button (Progressive Disclosure) */}
            {filteredTools.length > 10 && (
              <div className={`p-4 border-t flex justify-center transition-colors ${isDark ? 'border-[#2a2725] bg-[#181615]/50' : 'border-slate-200 bg-slate-50/50'}`}>
                <button
                  onClick={() => {
                    if (visibleCount === 10) {
                      setVisibleCount(filteredTools.length > 25 ? 25 : filteredTools.length);
                    } else if (visibleCount === 25) {
                      setVisibleCount(filteredTools.length);
                    } else {
                      setVisibleCount(10);
                    }
                  }}
                  className={`px-4 py-2 text-xs font-semibold rounded-sm border transition-colors shadow-sm cursor-pointer ${
                    isDark 
                      ? 'bg-[#181615] border-[#2a2725] text-slate-200 hover:bg-[#221f1d] hover:text-white' 
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-[#aa2d00]'
                  }`}
                >
                  {visibleCount === 10 
                    ? (filteredTools.length > 25 ? 'Show Top 25 Tools' : `Show All ${filteredTools.length} Tools`) 
                    : (visibleCount === 25 && filteredTools.length > 25 ? `Show All ${filteredTools.length} Tools` : 'Show Less')}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* SECTION 4: TREND CHART */}
        <section id="trends" className="scroll-mt-20 space-y-4">
          <div className="flex items-center gap-2">
            <TrendingUp size={18} className="text-[#ff5c35]" />
            <h2 className={`text-xl font-display font-semibold transition-colors ${isDark ? 'text-slate-100' : 'text-[#181d26]'}`}>Top 5 Momentum Trends</h2>
          </div>
          
          <div className={`border rounded-lg p-6 min-h-[350px] transition-colors ${isDark ? 'bg-[#181615] border-[#2a2725]' : 'bg-slate-50 border-slate-200'}`}>
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
                      stroke={isDark ? "#a8a29e" : "#64748b"} 
                      fontSize={11}
                      tickLine={false}
                    />
                    <YAxis 
                      stroke={isDark ? "#a8a29e" : "#64748b"} 
                      fontSize={11} 
                      domain={[65, 100]}
                      tickLine={false}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: isDark ? '#181615' : '#ffffff', 
                        borderColor: isDark ? '#2a2725' : '#dddddd',
                        borderRadius: '6px',
                        color: isDark ? '#f5f4f0' : '#181d26',
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
                      stroke={isDark ? "#458fff" : "#1b61c9"} /* Link Blue */
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
                      stroke={isDark ? "#f4d35e" : "#d9a441"} /* Mustard Yellow */
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
              <div className={`h-[300px] flex items-center justify-center ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Loading trend chart...
              </div>
            )}
          </div>
        </section>

        {/* SECTION 5: WATCHLIST (Emerging Tools Closer) */}
        <section id="watchlist" className="scroll-mt-20 space-y-4">
          <div className="flex items-center gap-2">
            <Compass size={18} className="text-[#0a2e0e]" />
            <h2 className={`text-xl font-display font-semibold transition-colors ${isDark ? 'text-slate-100' : 'text-[#181d26]'}`}>Tools to Watch</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {watchTools.map((tool, idx) => (
              <a 
                href={tool.website} 
                target="_blank" 
                rel="noopener noreferrer"
                key={idx} 
                className={`rounded-lg p-5 border shadow-sm relative flex flex-col justify-between min-h-[180px] transition-all hover:-translate-y-0.5 hover:shadow-md cursor-pointer ${
                  isDark 
                    ? 'bg-[#181615] border-[#2a2725] hover:border-[#ff5c35]/40 text-slate-100' 
                    : `${tool.bgColor} hover:border-slate-350`
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <h4 className={`font-bold transition-colors ${isDark ? 'text-slate-100' : 'text-[#181d26]'} flex items-center gap-1`}>
                      {tool.name}
                      <ExternalLink size={10} className="opacity-50 group-hover:opacity-100" />
                    </h4>
                    <span className={`inline-flex px-2 py-0.5 rounded-sm text-[10px] font-semibold border ${
                      isDark ? 'bg-[#0f0e0d] border-[#2a2725] text-slate-200' : 'bg-white/80 text-slate-800 border-slate-200'
                    }`}>
                      {tool.category}
                    </span>
                  </div>
                  <p className={`text-xs leading-relaxed font-body ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                    {tool.whyTrending}
                  </p>
                </div>
                <div className={`pt-4 border-t space-y-1.5 text-[11px] ${isDark ? 'border-[#2a2725]/80' : 'border-slate-200/50'}`}>
                  <div className="flex justify-between">
                    <span className={`font-mono ${isDark ? 'text-slate-305' : 'text-slate-700'}`}>SIGNAL</span>
                    <span className={isDark ? 'text-slate-100' : 'text-slate-900 font-semibold'}>{tool.source}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`font-mono ${isDark ? 'text-slate-305' : 'text-slate-700'}`}>CONFIDENCE</span>
                    <span className={`font-bold ${
                      isDark 
                        ? (tool.confidence === 'High' ? 'text-emerald-400' : 'text-amber-400')
                        : (tool.confidence === 'High' ? 'text-emerald-700' : 'text-amber-700')
                    }`}>
                      {tool.confidence}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* SECTION 3: MOMENTUM SCORE SYSTEM */}
        <section id="scoring" className="space-y-4 scroll-mt-20">
          <div className="flex items-center gap-2">
            <Info size={18} className="text-[#ff5c35]" />
            <h2 className={`text-xl font-display font-semibold transition-colors ${isDark ? 'text-slate-100' : 'text-[#181d26]'}`}>Full Methodology Breakdown</h2>
          </div>
          
          <div className={`border rounded-lg p-6 transition-colors ${isDark ? 'bg-[#181615] border-[#2a2725] text-slate-300' : 'bg-[#f5e9d4] border-[#e0d4be] text-[#181d26]'}`}>
            <div className={`p-4 rounded-md border mb-6 transition-colors ${isDark ? 'bg-[#0f0e0d]/50 border-[#2a2725]' : 'bg-white/70 border-[#e0d4be]'}`}>
              <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Dynamic Formula</span>
              <code className={`block text-sm font-bold mt-1.5 font-mono ${isDark ? 'text-[#ff5c35]' : 'text-[#aa2d00]'}`}>
                30% LNCH + 25% SOC + 20% SEAR + 15% ADOP + 10% QUAL
              </code>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-xs">
              <div className={`border-l-2 pl-3 space-y-1 ${isDark ? 'border-[#ff5c35]' : 'border-[#aa2d00]'}`}>
                <span className={`font-bold font-display ${isDark ? 'text-[#ff5c35]' : 'text-[#aa2d00]'}`}>Launch Buzz (30%)</span>
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
        </section>

        {/* FOOTER */}
        <footer className={`pt-10 border-t text-center text-xs text-slate-500 transition-colors ${isDark ? 'border-[#2a2725]' : 'border-slate-200'}`}>
          <p>© {new Date().getFullYear()} AI Design Tools Radar. Created for market tracking and intelligence.</p>
        </footer>

        {/* Location Cam Hover Popover Overlay */}
        {hoveredLocation && (
          <div 
            className="fixed z-50 pointer-events-none transition-all duration-250 animate-in fade-in slide-in-from-bottom-2 duration-150"
            style={{ 
              left: hoveredLocation.x, 
              top: hoveredLocation.y,
              transform: 'translate(-50%, -100%)'
            }}
          >
            <div className={`w-[560px] rounded-lg overflow-hidden border shadow-xl transition-colors ${
              isDark ? 'bg-[#181615]/95 border-[#2a2725] text-slate-100' : 'bg-white/95 border-slate-200 text-[#181d26]'
            }`}>
              {/* Header */}
              <div className={`px-4 py-3 border-b flex items-center justify-between text-sm transition-colors ${
                isDark ? 'border-[#2a2725] bg-[#0f0e0d]/50' : 'border-slate-100 bg-slate-50'
              }`}>
                <div className="flex flex-col">
                  <span className="font-bold font-display text-sm">{hoveredLocation.city}</span>
                  <span className={`text-xs font-mono mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Local Time: {getLocalTime(hoveredLocation.timezone)}
                  </span>
                </div>
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase tracking-wider ${
                  hoveredLocation.ytId 
                    ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
                    : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${hoveredLocation.ytId ? 'bg-red-500 animate-ping' : 'bg-blue-500'}`} />
                  {hoveredLocation.ytId ? 'LIVE CAM' : 'STILL VIEW'}
                </span>
              </div>

              {/* Content (Media Container) */}
              <div className="relative aspect-video w-full overflow-hidden bg-slate-950 flex items-center justify-center">
                {hoveredLocation.ytId ? (
                  <>
                    {/* Underlay Unsplash image for instant load before iframe is ready */}
                    <img 
                      src={hoveredLocation.unsplashUrl} 
                      alt="City view placeholder" 
                      className="absolute inset-0 w-full h-full object-cover opacity-40 blur-xs"
                    />
                    <iframe 
                      src={`https://www.youtube.com/embed/${hoveredLocation.ytId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${hoveredLocation.ytId}&start=15&modestbranding=1&iv_load_policy=3&rel=0&showinfo=0&disablekb=1`}
                      title="City cam feed"
                      className="absolute inset-0 w-full h-full border-0 pointer-events-none scale-110"
                      allow="autoplay; encrypted-media"
                    />
                  </>
                ) : (
                  <img 
                    src={hoveredLocation.unsplashUrl} 
                    alt="City view capture" 
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 6: TOOL DETAIL MODAL */}
        {selectedTool && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300">
            <div className={`border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative p-6 md:p-8 animate-in fade-in zoom-in-95 duration-150 transition-colors ${
              isDark ? 'bg-[#181615] border-[#2a2725] text-slate-100' : 'bg-white border-slate-200 text-[#181d26]'
            }`}>
              
              {/* Close Button */}
              <button 
                onClick={() => setSelectedTool(null)}
                className={`absolute top-4 right-4 p-1.5 rounded-lg border transition cursor-pointer ${
                  isDark 
                    ? 'border-[#2a2725] bg-[#0f0e0d] hover:bg-[#2a2725] text-slate-400 hover:text-white' 
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-800'
                }`}
              >
                <X size={18} />
              </button>

              {/* Title & Metadata */}
              <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6 mb-6 ${isDark ? 'border-[#2a2725]' : 'border-slate-200'}`}>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex px-2.5 py-0.5 text-xs rounded-sm border font-medium ${getCategoryBadgeStyle(selectedTool.category, isDark)}`}>
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
                  <div className="flex items-center gap-3 mt-1.5 text-xs">
                    <span className={`italic ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Pricing: {selectedTool.pricing}</span>
                    <span className={isDark ? 'text-slate-700' : 'text-slate-300'}>•</span>
                    <span className={isDark ? 'text-slate-300' : 'text-slate-600'}><strong className="font-semibold">Launched:</strong> {selectedTool.launchDate}</span>
                  </div>
                </div>

                <div className={`flex items-center gap-4 border rounded-lg p-3 ${isDark ? 'bg-[#0f0e0d] border-[#2a2725]' : 'bg-slate-50 border-slate-200'}`}>
                  <div className={`text-center pr-4 border-r ${isDark ? 'border-[#2a2725]' : 'border-slate-200'}`}>
                    <span className={`block text-[9px] uppercase font-mono ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Radar Score</span>
                    <span className={`text-3xl font-black font-mono ${isDark ? 'text-[#ff5c35]' : 'text-[#aa2d00]'}`}>{selectedTool.momentumScore}</span>
                  </div>
                  <div className="text-center">
                    <span className={`block text-[9px] uppercase font-mono ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Rating</span>
                    <span className={`text-lg font-bold font-mono ${isDark ? 'text-slate-200' : 'text-slate-600'}`}>{selectedTool.scoreOutOf10}/10</span>
                  </div>
                </div>
              </div>

              {/* Body Content */}
              <div className="space-y-6">
                
                {/* Description */}
                <div className="space-y-2">
                  <h4 className={`text-xs font-bold uppercase tracking-wider font-mono ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Description</h4>
                  <p className={`text-sm leading-relaxed font-body ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{selectedTool.description}</p>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-650'}`}><strong className={`font-semibold ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>Best for: </strong>{selectedTool.bestFor}</p>
                  {selectedTool.enterpriseClients && selectedTool.enterpriseClients.length > 0 && (
                    <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-650'}`}>
                      <strong className={`font-semibold ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>Biggest Clients: </strong>
                      {selectedTool.enterpriseClients.join(', ')}
                    </p>
                  )}
                </div>

                {/* Real-World Tracked Signals */}
                <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg transition-colors ${
                  isDark ? 'bg-[#0f0e0d] border-[#2a2725]' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div>
                    <span className={`block text-[9px] uppercase font-mono ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Est. Monthly Traffic</span>
                    <span className={`text-sm font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{selectedTool.monthlyVisits}</span>
                  </div>
                  <div>
                    <span className={`block text-[9px] uppercase font-mono ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Real User Rating</span>
                    <span className={`text-sm font-bold ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>★ {selectedTool.userRating} / 5</span>
                  </div>
                  <div>
                    <span className={`block text-[9px] uppercase font-mono ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Founded Location</span>
                    <a 
                      href={modalLocationLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block text-xs font-bold text-[#1b61c9] hover:underline"
                    >
                      {selectedTool.hqLocation}
                    </a>
                  </div>
                  <div>
                    <span className={`block text-[9px] uppercase font-mono ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Figma Directory</span>
                    <span className={`text-sm font-bold ${isDark ? 'text-slate-200' : 'text-slate-850'}`}>{selectedTool.figmaCommunityUsers}</span>
                  </div>
                </div>

                {/* Why Trending */}
                <div className={`p-4 border rounded-lg space-y-2 ${
                  isDark ? 'bg-amber-500/5 border-[#2a2725]' : 'bg-amber-500/5 border-amber-500/20'
                }`}>
                  <span className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
                    <Zap size={14} />
                    Trending Catalyst
                  </span>
                  <p className={`text-xs leading-relaxed font-body ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{selectedTool.whyTrending}</p>
                  <div className={`pt-3 border-t flex flex-wrap items-center gap-1.5 text-[10px] ${isDark ? 'border-[#2a2725]/80' : 'border-amber-500/10'}`}>
                    <strong className={`font-semibold shrink-0 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Tracked Sources:</strong>
                    {selectedTool.primaryDataSources.map((src, i) => (
                      <span 
                        key={i} 
                        className={`inline-flex px-2 py-0.5 rounded-sm border font-semibold font-mono text-[9px] ${
                          isDark 
                            ? 'bg-slate-900 border-[#2a2725] text-blue-400' 
                            : 'bg-white border-slate-200 text-[#1b61c9]'
                        }`}
                      >
                        {src}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Score Breakdown Bars */}
                <div className="space-y-3">
                  <h4 className={`text-xs font-bold uppercase tracking-wider font-mono ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Momentum Signals</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {renderScoreBar('Launch Buzz (30%)', selectedTool.launchBuzz, 'bg-[#aa2d00]', 'bg-[#fcab79]')}
                    {renderScoreBar('Social Buzz (25%)', selectedTool.socialBuzz, 'bg-[#1b61c9]', 'bg-[#458fff]')}
                    {renderScoreBar('Search Interest (20%)', selectedTool.searchInterest, 'bg-[#0a2e0e]', 'bg-[#a8d8c4]')}
                    {renderScoreBar('Designer Adoption (15%)', selectedTool.designerAdoption, 'bg-[#d9a441]', 'bg-[#f4d35e]')}
                  </div>
                </div>

                {/* Pros and Cons */}
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t ${isDark ? 'border-[#2a2725]' : 'border-slate-200'}`}>
                  <div className="space-y-3">
                    <h4 className={`text-xs font-bold uppercase tracking-wider font-mono flex items-center gap-1.5 ${isDark ? 'text-[#a8d8c4]' : 'text-[#0a2e0e]'}`}>
                      <ShieldCheck size={14} />
                      Strengths / Pros
                    </h4>
                    <ul className="space-y-2">
                      {selectedTool.pros.map((pro, index) => (
                        <li key={index} className={`flex gap-2 text-xs leading-relaxed font-body ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
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
                        <li key={index} className={`flex gap-2 text-xs leading-relaxed font-body ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                          <X size={14} className={`shrink-0 mt-0.5 ${isDark ? 'text-rose-400' : 'text-rose-700'}`} />
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Alternatives & Verdict */}
                <div className={`space-y-4 pt-6 border-t ${isDark ? 'border-[#2a2725]' : 'border-slate-200'}`}>
                  <div>
                    <h4 className={`text-xs font-bold uppercase tracking-wider font-mono ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Alternatives to Consider</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedTool.alternatives.map((alt, index) => (
                        <span key={index} className={`px-2.5 py-1 text-xs rounded-sm border font-semibold font-mono ${
                          isDark ? 'bg-slate-800 border-[#2a2725] text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-600'
                        }`}>
                          {alt}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className={`p-4 rounded-lg border ${
                    isDark 
                      ? 'bg-slate-950/40 border-[#2a2725]' 
                      : 'bg-[#f5e9d4]/40 border-[#e0d4be]/60'
                  }`}>
                    <h4 className={`text-xs font-bold uppercase tracking-wide font-mono ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Editorial Verdict</h4>
                    <p className={`text-xs mt-1.5 leading-relaxed font-body ${isDark ? 'text-slate-200' : 'text-slate-850'}`}>{selectedTool.verdict}</p>
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
