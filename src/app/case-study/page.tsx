"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, ShieldCheck, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

export default function CaseStudyPage() {
  const [isDark, setIsDark] = useState(false);

  return (
    <main className={`min-h-screen font-sans transition-colors duration-200 ${isDark ? 'bg-[#0f0e0d] text-slate-100' : 'bg-white text-[#181d26]'}`}>
      {/* Top Header Navigation */}
      <nav className={`sticky top-0 z-40 w-full backdrop-blur border-b shadow-sm py-4 px-4 sm:px-6 lg:px-8 transition-colors ${isDark ? 'bg-[#0f0e0d]/95 border-[#2a2725]' : 'bg-white/95 border-slate-200'}`}>
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className={`inline-flex items-center gap-2 text-sm font-semibold transition ${isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-[#181d26]'}`}>
            <ArrowLeft size={16} /> Back to AI Design Radar
          </Link>

          <div className="flex items-center gap-4">
            <a 
              href="/designing-longitudinal-weight-loss-care.md" 
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 text-xs font-mono font-semibold px-3 py-1.5 rounded-lg border transition ${isDark ? 'bg-[#181615] border-[#2a2725] text-slate-300 hover:text-white' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'}`}
            >
              <FileText size={14} /> View Raw Markdown <ExternalLink size={12} />
            </a>

            <button 
              onClick={() => setIsDark(!isDark)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition ${isDark ? 'bg-[#181615] border-[#2a2725] text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'}`}
            >
              {isDark ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>
        </div>
      </nav>

      {/* Case Study Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10">
        
        {/* Header Block */}
        <header className="space-y-4 border-b border-slate-200 dark:border-[#2a2725] pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <ShieldCheck size={14} /> Product Design Case Study
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            DESIGNING LONGITUDINAL WEIGHT-LOSS CARE
          </h1>
          <p className={`text-lg leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Building Amazon One Medical’s cash-pay GLP-1 experience on top of a telehealth model designed for one-off care.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-xs font-medium">
            <div className={`p-3 rounded-lg border ${isDark ? 'bg-[#181615] border-[#2a2725]' : 'bg-slate-50 border-slate-200'}`}>
              <div className="font-mono uppercase text-slate-400">Organization</div>
              <div className="font-bold text-sm mt-1">Amazon Health Services · One Medical</div>
            </div>
            <div className={`p-3 rounded-lg border ${isDark ? 'bg-[#181615] border-[#2a2725]' : 'bg-slate-50 border-slate-200'}`}>
              <div className="font-mono uppercase text-slate-400">Role</div>
              <div className="font-bold text-sm mt-1">Sole Product Designer</div>
            </div>
            <div className={`p-3 rounded-lg border ${isDark ? 'bg-[#181615] border-[#2a2725]' : 'bg-slate-50 border-slate-200'}`}>
              <div className="font-mono uppercase text-slate-400">Duration</div>
              <div className="font-bold text-sm mt-1">~1 Year (~6–7 mos core)</div>
            </div>
            <div className={`p-3 rounded-lg border ${isDark ? 'bg-[#181615] border-[#2a2725]' : 'bg-slate-50 border-slate-200'}`}>
              <div className="font-mono uppercase text-slate-400">Themes</div>
              <div className="font-bold text-sm mt-1">0→1, Systems, Healthcare</div>
            </div>
          </div>
        </header>

        {/* Executive Summary */}
        <section className={`p-6 rounded-xl border space-y-4 ${isDark ? 'bg-[#181615] border-[#2a2725]' : 'bg-amber-50/50 border-amber-200/60'}`}>
          <h2 className="text-xl font-bold tracking-tight text-amber-700 dark:text-amber-400">EXECUTIVE SUMMARY</h2>
          <p className="leading-relaxed">
            Amazon One Medical’s Pay-per-visit product was originally designed around episodic healthcare: a customer has a condition like pink eye or a UTI, completes an intake, sees a provider, gets a treatment plan, and leaves.
          </p>
          <p className="leading-relaxed font-semibold">
            Weight-loss treatment challenged that model. GLP-1 care can span months. A patient may need clinical eligibility screening, lab work, medication selection, dose changes, pharmacy fulfillment, follow-up visits, side-effect management, prescription renewals, and reminders at different points in the journey.
          </p>
          <div className="p-4 rounded-lg bg-white dark:bg-[#0f0e0d] border border-slate-200 dark:border-[#2a2725]">
            <span className="font-bold">The central product decision:</span> Introduce a <strong>Case</strong> — a persistent layer connecting visits, labs, treatment plans, messaging, prescriptions, and follow-ups into a single treatment journey.
          </div>
        </section>

        {/* Section 1 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold border-b pb-2 border-slate-200 dark:border-[#2a2725]">1. THE OPPORTUNITY: FROM EPISODIC TO LONGITUDINAL CARE</h2>
          <p className="leading-relaxed">
            Amazon One Medical offered two fundamentally different models of care. Traditional One Medical supported ongoing primary care. Pay-per-visit, on the other hand, had been optimized for occasional, one-off conditions such as acne, pink eye, sinus infections, or UTIs.
          </p>
          <p className="leading-relaxed">
            At the same time, weight loss—and particularly GLP-1 medication—was becoming one of the largest emerging areas in healthcare. Not every patient wanted to navigate an insurance-based pathway due to prior authorizations and varying coverage.
          </p>
          <blockquote className="p-4 border-l-4 border-[#ff5c35] bg-slate-50 dark:bg-[#181615] italic font-medium">
            “Could Pay-per-visit support ongoing treatment while preserving the simplicity and transparency of a cash-pay product?”
          </blockquote>
        </section>

        {/* Section 2 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold border-b pb-2 border-slate-200 dark:border-[#2a2725]">2. WHY THIS WASN'T JUST ANOTHER CONDITION</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className={`p-4 rounded-lg border ${isDark ? 'bg-[#181615] border-[#2a2725]' : 'bg-red-50/50 border-red-200'}`}>
              <h3 className="font-bold text-red-700 dark:text-red-400 mb-2">Episodic Care (Old Model)</h3>
              <p className="font-mono text-xs">Condition → Visit → Treatment plan → Follow-up → Done</p>
            </div>
            <div className={`p-4 rounded-lg border ${isDark ? 'bg-[#181615] border-[#2a2725]' : 'bg-emerald-50/50 border-emerald-200'}`}>
              <h3 className="font-bold text-emerald-700 dark:text-emerald-400 mb-2">Weight-Loss Care (New Model)</h3>
              <p className="font-mono text-xs">Eligibility → Labs → Visit → Medication → Fulfillment → Monitoring → Follow-up → Dose Changes → Renewal → Repeat</p>
            </div>
          </div>
          <ul className="list-disc list-inside space-y-2 leading-relaxed">
            <li><strong>The unit of care was no longer a visit:</strong> Follow-ups depend directly on prior prescriptions, labs, side effects, and dosage.</li>
            <li><strong>Eligibility affected the journey itself:</strong> Contraindications, BMI, medications, and pregnancy status shaped the product flow dynamically.</li>
            <li><strong>Care happened outside One Medical:</strong> Integration across Labcorp for testing and Amazon Pharmacy for fulfillment.</li>
            <li><strong>Customers had to come back:</strong> Timely reminders, notifications, and resumable states became integral care components.</li>
          </ul>
        </section>

        {/* Section 5 - Introducing the Case */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold border-b pb-2 border-slate-200 dark:border-[#2a2725]">5. A KEY PRODUCT DECISION: INTRODUCING THE CASE</h2>
          <p className="leading-relaxed">
            I evaluated three structural options:
          </p>
          <div className="space-y-3">
            <div className={`p-4 rounded-lg border ${isDark ? 'bg-[#181615] border-[#2a2725]' : 'bg-slate-50 border-slate-200'}`}>
              <span className="font-bold">Option A: Keep every visit independent</span> — Fastest to build, but created fragmented patient experiences.
            </div>
            <div className={`p-4 rounded-lg border ${isDark ? 'bg-[#181615] border-[#2a2725]' : 'bg-slate-50 border-slate-200'}`}>
              <span className="font-bold">Option B: Build a new subscription/program product</span> — Supported ongoing care but required massive infrastructure shifts.
            </div>
            <div className={`p-4 rounded-lg border border-emerald-500/50 ${isDark ? 'bg-emerald-950/20' : 'bg-emerald-50/50'}`}>
              <span className="font-bold text-emerald-700 dark:text-emerald-400">Option C (Selected): Introduce a Case above existing visits</span> — Added continuity while preserving existing visit and payment infrastructure.
            </div>
          </div>
        </section>

        {/* Section 8 & 9 - Research & Validation */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold border-b pb-2 border-slate-200 dark:border-[#2a2725]">8 & 9. USER RESEARCH & VALIDATION</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className={`p-4 rounded-xl border text-center ${isDark ? 'bg-[#181615] border-[#2a2725]' : 'bg-slate-50 border-slate-200'}`}>
              <div className="text-3xl font-extrabold text-emerald-600">6 / 6</div>
              <div className="text-xs font-semibold mt-1">Understood Program Structure</div>
            </div>
            <div className={`p-4 rounded-xl border text-center ${isDark ? 'bg-[#181615] border-[#2a2725]' : 'bg-slate-50 border-slate-200'}`}>
              <div className="text-3xl font-extrabold text-amber-600">5 / 6</div>
              <div className="text-xs font-semibold mt-1">Needed Total-Cost Transparency</div>
            </div>
            <div className={`p-4 rounded-xl border text-center ${isDark ? 'bg-[#181615] border-[#2a2725]' : 'bg-slate-50 border-slate-200'}`}>
              <div className="text-3xl font-extrabold text-blue-600">4 / 6</div>
              <div className="text-xs font-semibold mt-1">Wanted Clinical Context Beyond Price</div>
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <section className={`p-6 rounded-xl border space-y-4 ${isDark ? 'bg-[#181615] border-[#2a2725]' : 'bg-slate-50 border-slate-200'}`}>
          <h2 className="text-xl font-bold">WHAT THIS PROJECT TAUGHT ME</h2>
          <p className="leading-relaxed">
            The hardest part was taking a business model designed for a transaction and asking: <em>What needs to become true for this product to support a relationship?</em>
          </p>
          <p className="leading-relaxed font-semibold text-[#ff5c35]">
            Complex underneath, obvious to the customer.
          </p>
        </section>

        <footer className="pt-8 border-t border-slate-200 dark:border-[#2a2725] text-center">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-sm text-[#ff5c35] hover:underline">
            <ArrowLeft size={16} /> Return to AI Design Radar
          </Link>
        </footer>

      </article>
    </main>
  );
}
