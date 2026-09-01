// src/components/CollectorView/CollectorView.tsx
import React, { useState } from 'react';
import { Camera, ShieldCheck, ArrowRight, History, Award, CheckCircle2 } from 'lucide-react';
import { Language, ValuationResult, HandoverPassRecord } from '../../types';
import { PhotoAndValuation } from './PhotoAndValuation';
import { HandoverPass } from './HandoverPass';
import { translations } from '../../data/translations';

interface CollectorViewProps {
  language: Language;
}

export const CollectorView: React.FC<CollectorViewProps> = ({ language }) => {
  const t = translations[language];
  const [valuationResult, setValuationResult] = useState<ValuationResult | null>(null);
  const [savedPasses, setSavedPasses] = useState<HandoverPassRecord[]>([]);
  const [activeSubTab, setActiveSubTab] = useState<'scanner' | 'ledger'>('scanner');

  const handleSavePass = (pass: HandoverPassRecord) => {
    setSavedPasses([pass, ...savedPasses]);
  };

  return (
    <div className="space-y-6">
      {/* Sub navigation for Collector */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              setActiveSubTab('scanner');
              setValuationResult(null);
            }}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition ${
              activeSubTab === 'scanner' ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {language === 'en' ? 'E-Waste Scanner & Valuation' : 'ई-वेस्ट स्कैनर और मूल्यांकन'}
          </button>
          <button
            onClick={() => setActiveSubTab('ledger')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition flex items-center space-x-1.5 ${
              activeSubTab === 'ledger' ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>{t.earningsLedger} ({savedPasses.length})</span>
          </button>
        </div>
      </div>

      {activeSubTab === 'scanner' && !valuationResult && (
        <PhotoAndValuation
          language={language}
          onProceedToPass={(result) => setValuationResult(result)}
        />
      )}

      {activeSubTab === 'scanner' && valuationResult && (
        <HandoverPass
          valuation={valuationResult}
          language={language}
          onBack={() => setValuationResult(null)}
          onSavePass={handleSavePass}
        />
      )}

      {activeSubTab === 'ledger' && (
        <div className="max-w-4xl mx-auto space-y-4">
          <h2 className="text-lg font-bold text-white">Handover & Earnings Ledger</h2>
          {savedPasses.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center space-y-3">
              <History className="w-10 h-10 text-slate-600 mx-auto" />
              <p className="text-sm font-medium text-slate-400">No handover passes generated yet.</p>
              <button
                onClick={() => setActiveSubTab('scanner')}
                className="px-4 py-2 bg-emerald-600 text-white text-xs font-medium rounded-lg hover:bg-emerald-500 transition"
              >
                Start New Scan
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {savedPasses.map((pass) => (
                <div key={pass.passId} className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-semibold text-white">{pass.itemSummary}</span>
                      <span className="px-2 py-0.5 text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded">
                        {pass.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">Recycler: {pass.recyclerName}</p>
                    <p className="text-[10px] font-mono text-slate-500">ID: {pass.passId} • {pass.timestamp}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-emerald-400">₹{pass.estimatedPayout}</p>
                    <p className="text-[10px] text-slate-500">Guaranteed Payout</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};