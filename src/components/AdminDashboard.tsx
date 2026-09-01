// src/components/AdminDashboard.tsx
import React from 'react';
import { ShieldCheck, TrendingUp, Users, Leaf, Globe } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface AdminDashboardProps {
  language: Language;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ language }) => {
  const t = translations[language];

  return (
    <div className="max-w-7xl mx-auto space-y-8 py-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl font-bold text-white">Govt & CPCB Admin Portal</h1>
          <p className="text-xs text-slate-400">Real-time state e-waste circular economy metrics & traceability compliance</p>
        </div>
        <span className="px-3 py-1 text-xs font-semibold bg-emerald-950/60 text-emerald-400 border border-emerald-800 rounded-full flex items-center space-x-1.5">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Live Telemetry</span>
        </span>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">{t.totalDiverted}</span>
            <Leaf className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold text-white">48,290 kg</p>
          <p className="text-xs text-emerald-400 font-medium">+18.4% from last month</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">{t.activeCollectors}</span>
            <Users className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold text-white">1,420</p>
          <p className="text-xs text-emerald-400 font-medium">Kabadiwalas & Citizens</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">{t.co2Saved}</span>
            <Globe className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold text-white">115.8 Tons</p>
          <p className="text-xs text-emerald-400 font-medium">Certified carbon offset</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">{t.complianceRate}</span>
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold text-white">99.4%</p>
          <p className="text-xs text-emerald-400 font-medium">CPCB Audit Ready</p>
        </div>
      </div>
    </div>
  );
};