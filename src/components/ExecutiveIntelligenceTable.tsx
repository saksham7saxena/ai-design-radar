"use client";

import React, { useState } from 'react';
import { industryInsightsReport, IndustryInsight } from '@/data/industryInsightsData';
import { 
  Building2, 
  Quote, 
  Search, 
  ExternalLink, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  X,
  Layers,
  Compass,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';

interface ExecutiveIntelligenceTableProps {
  isDark: boolean;
}

export const ExecutiveIntelligenceTable: React.FC<ExecutiveIntelligenceTableProps> = ({ isDark }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [visibleCount, setVisibleCount] = useState<number>(5);
  const [expandedRowIndex, setExpandedRowIndex] = useState<number | null>(null);

  // Extract unique companies
  const companies = ['All', ...Array.from(new Set(industryInsightsReport.results.map(r => r.company.split('/')[0].trim())))];

  // Helper for company badge styles
  const getCompanyBadgeStyle = (companyStr: string) => {
    const main = companyStr.split('/')[0].trim();
    switch (main) {
      case 'OpenAI':
        return isDark ? 'bg-emerald-950/60 border-emerald-800/60 text-emerald-300' : 'bg-emerald-50 border-emerald-200 text-emerald-800';
      case 'Anthropic':
        return isDark ? 'bg-amber-950/60 border-amber-800/60 text-amber-300' : 'bg-amber-50 border-amber-200 text-amber-800';
      case 'Figma':
        return isDark ? 'bg-purple-950/60 border-purple-800/60 text-purple-300' : 'bg-purple-50 border-purple-200 text-purple-800';
      case 'Google':
        return isDark ? 'bg-blue-950/60 border-blue-800/60 text-blue-300' : 'bg-blue-50 border-blue-200 text-blue-800';
      case 'Microsoft':
        return isDark ? 'bg-cyan-950/60 border-cyan-800/60 text-cyan-300' : 'bg-cyan-50 border-cyan-200 text-cyan-800';
      case 'Vercel':
        return isDark ? 'bg-slate-800/80 border-slate-700 text-slate-200' : 'bg-slate-100 border-slate-300 text-slate-800';
      case 'Adobe':
        return isDark ? 'bg-rose-950/60 border-rose-800/60 text-rose-300' : 'bg-rose-50 border-rose-200 text-rose-800';
      case 'Cursor':
        return isDark ? 'bg-indigo-950/60 border-indigo-800/60 text-indigo-300' : 'bg-indigo-50 border-indigo-200 text-indigo-800';
      case 'Meta':
        return isDark ? 'bg-sky-950/60 border-sky-800/60 text-sky-300' : 'bg-sky-50 border-sky-200 text-sky-800';
      default:
        return isDark ? 'bg-[#2a2725] border-[#3b3734] text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700';
    }
  };

  // Filter insights
  const filteredInsights = industryInsightsReport.results.filter(item => {
    const matchesSearch = 
      item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.speaker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.exactPassage.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.designArea.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.meaningForDesigners.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCompany = selectedCompany === 'All' || item.company.includes(selectedCompany);
    
    const matchesType = selectedType === 'All' || 
      (selectedType === 'Capability' && item.type.toLowerCase().includes('capability')) ||
      (selectedType === 'Prediction' && item.type.toLowerCase().includes('prediction'));

    return matchesSearch && matchesCompany && matchesType;
  });

  const displayedInsights = filteredInsights.slice(0, visibleCount);

  return (
    <section id="executive-intelligence" className="scroll-mt-20 space-y-6">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border mb-2 transition-colors ${
            isDark ? 'bg-amber-950/40 border-amber-800/50 text-amber-300' : 'bg-amber-50 border-amber-200 text-amber-800'
          }`}>
            <Sparkles size={13} />
            2026 Executive Research Report
          </div>
          <h2 className={`text-xl font-display font-semibold transition-colors flex items-center gap-2 ${
            isDark ? 'text-slate-100' : 'text-[#181d26]'
          }`}>
            <Building2 size={20} className="text-[#ff5c35]" />
            Executive Intelligence: The Future of Product Design
          </h2>
          <p className={`text-xs mt-1 transition-colors max-w-3xl ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Substantive statements from leaders at OpenAI, Anthropic, Meta, Google, Microsoft, Figma, Adobe, Vercel, & Cursor on automation, agentic UI, and designer value.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search */}
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search statements..." 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(5);
              }}
              className={`border rounded-md pl-9 pr-4 py-1.5 text-xs w-44 sm:w-52 placeholder-slate-400 focus:outline-none transition-colors ${
                isDark 
                  ? 'bg-[#181615] border-[#2a2725] text-slate-200 focus:border-[#ff5c35]' 
                  : 'bg-white border-slate-200 text-[#181d26] focus:border-[#1b61c9]'
              }`}
            />
          </div>

          {/* Company Dropdown */}
          <div className="relative">
            <select
              value={selectedCompany}
              onChange={(e) => {
                setSelectedCompany(e.target.value);
                setVisibleCount(5);
              }}
              className={`appearance-none border rounded-md pl-3 pr-8 py-1.5 text-xs focus:outline-none cursor-pointer transition-colors ${
                isDark 
                  ? 'bg-[#181615] border-[#2a2725] text-slate-200 focus:border-[#ff5c35]' 
                  : 'bg-white border-slate-200 text-[#181d26] focus:border-[#1b61c9]'
              }`}
            >
              <option value="All">All Leaders & Orgs</option>
              {companies.filter(c => c !== 'All').map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          {/* Type Dropdown */}
          <div className="relative">
            <select
              value={selectedType}
              onChange={(e) => {
                setSelectedType(e.target.value);
                setVisibleCount(5);
              }}
              className={`appearance-none border rounded-md pl-3 pr-8 py-1.5 text-xs focus:outline-none cursor-pointer transition-colors ${
                isDark 
                  ? 'bg-[#181615] border-[#2a2725] text-slate-200 focus:border-[#ff5c35]' 
                  : 'bg-white border-slate-200 text-[#181d26] focus:border-[#1b61c9]'
              }`}
            >
              <option value="All">All Types</option>
              <option value="Capability">Current Capability</option>
              <option value="Prediction">Prediction</option>
            </select>
            <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          {/* Reset Filters Button */}
          {(searchQuery !== '' || selectedCompany !== 'All' || selectedType !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCompany('All');
                setSelectedType('All');
                setVisibleCount(5);
              }}
              className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-md border transition-colors ${
                isDark 
                  ? 'bg-[#181615] border-[#2a2725] text-slate-300 hover:bg-[#252220]' 
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <X size={12} />
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Synthesis Callout Banner */}
      <div className={`p-4 rounded-xl border transition-colors shadow-sm ${
        isDark 
          ? 'bg-gradient-to-r from-[#181615] via-[#1f1c1a] to-[#181615] border-[#2a2725]' 
          : 'bg-gradient-to-r from-amber-50/60 via-orange-50/40 to-slate-50 border-amber-200/80'
      }`}>
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${
            isDark ? 'bg-[#ff5c35]/15 text-[#ff5c35]' : 'bg-orange-100 text-[#aa2d00]'
          }`}>
            <Compass size={18} />
          </div>
          <div>
            <h4 className={`text-xs font-bold uppercase tracking-wider ${
              isDark ? 'text-amber-300' : 'text-[#aa2d00]'
            }`}>
              2026 Key Consensus Synthesis
            </h4>
            <p className={`text-xs md:text-sm mt-1 leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              {industryInsightsReport.summary}
            </p>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className={`border rounded-xl overflow-hidden shadow-sm transition-colors ${
        isDark ? 'bg-[#181615] border-[#2a2725]' : 'bg-white border-slate-200'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[850px]">
            <thead>
              <tr className={`border-b text-xs font-semibold tracking-wider transition-colors ${
                isDark ? 'border-[#2a2725] bg-[#181615] text-slate-300' : 'border-slate-200 bg-slate-50 text-slate-700'
              }`}>
                <th className="py-3.5 px-4 w-36">Company & Date</th>
                <th className="py-3.5 px-4 w-48">Speaker & Source</th>
                <th className="py-3.5 px-4">Executive Statement & Passage</th>
                <th className="py-3.5 px-4 w-64">Strategic Meaning for Designers</th>
                <th className="py-3.5 px-4 text-center w-28">Type</th>
              </tr>
            </thead>
            <tbody className={`divide-y text-xs align-top ${
              isDark ? 'divide-[#2a2725]' : 'divide-slate-200'
            }`}>
              {displayedInsights.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400">
                    No matching statements found for your filter criteria.
                  </td>
                </tr>
              ) : (
                displayedInsights.map((item, idx) => {
                  const isExpanded = expandedRowIndex === idx;
                  const isPrediction = item.type.toLowerCase().includes('prediction');

                  return (
                    <tr 
                      key={idx}
                      className={`transition-colors ${
                        isDark ? 'hover:bg-[#2a2725]/30' : 'hover:bg-slate-50/80'
                      }`}
                    >
                      {/* Company & Date */}
                      <td className="py-3.5 px-4">
                        <div className="space-y-1.5">
                          <span className={`inline-flex px-2 py-0.5 rounded-md border text-[11px] font-bold ${getCompanyBadgeStyle(item.company)}`}>
                            {item.company}
                          </span>
                          <div className={`font-mono text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                            {item.date}
                          </div>
                        </div>
                      </td>

                      {/* Speaker & Source URL */}
                      <td className="py-3.5 px-4">
                        <div className="space-y-1">
                          <div className={`font-semibold text-xs ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                            {item.speaker}
                          </div>
                          <a 
                            href={item.sourceUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-1 text-[11px] font-medium transition-colors hover:underline ${
                              isDark ? 'text-[#ff5c35] hover:text-[#ff7856]' : 'text-[#1b61c9] hover:text-[#0f4bb5]'
                            }`}
                          >
                            Source Link
                            <ExternalLink size={10} />
                          </a>
                        </div>
                      </td>

                      {/* Exact Passage & Focus Area */}
                      <td className="py-3.5 px-4 space-y-2">
                        <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold border ${
                          isDark ? 'bg-[#2a2725] border-[#3b3734] text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                        }`}>
                          <Layers size={10} className="text-[#ff5c35]" />
                          {item.designArea}
                        </div>
                        <blockquote className={`italic border-l-2 pl-3 py-0.5 text-xs leading-relaxed ${
                          isDark ? 'border-[#ff5c35]/50 text-slate-200' : 'border-slate-300 text-slate-800'
                        }`}>
                          {item.exactPassage}
                        </blockquote>
                      </td>

                      {/* Strategic Meaning for Product Designers */}
                      <td className={`py-3.5 px-4 text-xs leading-relaxed ${
                        isDark ? 'text-slate-300' : 'text-slate-650'
                      }`}>
                        {item.meaningForDesigners}
                      </td>

                      {/* Type Badge */}
                      <td className="py-3.5 px-4 text-center">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                          isPrediction 
                            ? (isDark ? 'bg-purple-950/40 border-purple-800/60 text-purple-300' : 'bg-purple-50 border-purple-200 text-purple-800')
                            : (isDark ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300' : 'bg-emerald-50 border-emerald-200 text-emerald-800')
                        }`}>
                          {isPrediction ? <HelpCircle size={10} /> : <CheckCircle2 size={10} />}
                          {isPrediction ? 'Prediction' : 'Capability'}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer / Expansion Controls */}
        <div className={`py-3 px-4 border-t flex items-center justify-between transition-colors ${
          isDark ? 'border-[#2a2725] bg-[#181615]' : 'border-slate-200 bg-slate-50/50'
        }`}>
          <span className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Showing <strong className={isDark ? 'text-slate-200' : 'text-slate-800'}>{displayedInsights.length}</strong> of <strong className={isDark ? 'text-slate-200' : 'text-slate-800'}>{filteredInsights.length}</strong> statements
          </span>

          {filteredInsights.length > 5 && (
            <button
              onClick={() => {
                if (visibleCount >= filteredInsights.length) {
                  setVisibleCount(5);
                } else {
                  setVisibleCount(filteredInsights.length);
                }
              }}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md border transition-colors cursor-pointer ${
                isDark 
                  ? 'bg-[#252220] border-[#3b3734] text-slate-200 hover:bg-[#2e2a28]' 
                  : 'bg-white border-slate-200 text-[#181d26] hover:bg-slate-100'
              }`}
            >
              {visibleCount >= filteredInsights.length ? (
                <>
                  Show Less <ChevronUp size={14} />
                </>
              ) : (
                <>
                  View All {filteredInsights.length} Statements <ChevronDown size={14} />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
