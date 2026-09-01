// src/components/UnitEconomicsView.tsx
import React from 'react';
import { ShieldCheck, TrendingUp, DollarSign } from 'lucide-react';
import { Language } from '../types';

interface UnitEconomicsViewProps {
  language: Language;
}

export const UnitEconomicsView: React.FC<UnitEconomicsViewProps> = ({ language }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 py-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl font-bold text-white">Unit Economics & Financial Sustainability</h1>
          <p className="text-xs text-slate-400">SIH Jury Presentation Model: How Kabadiwala Connect ensures fair margins for all stakeholders.</p>
        </div>
        <span className="px-3 py-1 text-xs font-semibold bg-emerald-950/60 text-emerald-400 border border-emerald-800 rounded-full">
          SIH 2026 Model
        </span>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
            <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Informal Scrap Rate</p>
            <p className="text-2xl font-bold text-white">₹45 - ₹350</p>
            <p className="text-xs text-slate-500">Low baseline paid by middlemen without safety protocols.</p>
          </div>
          <div className="bg-emerald-950/30 p-5 rounded-xl border border-emerald-900/50 space-y-2">
            <p className="text-xs text-emerald-400 uppercase tracking-wider font-medium">Kabadiwala Connect Fair Value</p>
            <p className="text-2xl font-bold text-emerald-400">₹85 - ₹550</p>
            <p className="text-xs text-slate-400">Direct matching with CPCB recyclers eliminating middlemen.</p>
          </div>
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
            <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Govt Green Incentive</p>
            <p className="text-2xl font-bold text-white">+15-20%</p>
            <p className="text-xs text-slate-500">Subsidized carbon credit monetization & ESG compliance funds.</p>
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t border-slate-800">
          <h3 className="text-sm font-bold text-white">Revenue Streams & Ecosystem Viability</h3>
          <ul className="list-disc pl-5 space-y-2 text-xs text-slate-300">
            <li><strong className="text-white">B2B Recycler SaaS Fee:</strong> Small percentage from authorized recyclers for certified feedstock acquisition.</li>
            <li><strong className="text-white">Extended Producer Responsibility (EPR) Credits:</strong> Helping electronics manufacturers meet statutory recycling quotas.</li>
            <li><strong className="text-white">Carbon Offset Trading:</strong> Monetizing verified greenhouse gas emission reductions on international carbon markets.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};