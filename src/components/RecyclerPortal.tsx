// src/components/RecyclerPortal.tsx
import React from 'react';
import { ShieldCheck, CheckCircle2, Factory } from 'lucide-react';
import { Language } from '../types';
import { MOCK_RECYCLERS } from '../data/initialData';

interface RecyclerPortalProps {
  language: Language;
}

export const RecyclerPortal: React.FC<RecyclerPortalProps> = ({ language }) => {
  return (
    <div className="max-w-7xl mx-auto space-y-6 py-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl font-bold text-white">Authorized Recycler Hub</h1>
          <p className="text-xs text-slate-400">Manage incoming e-waste handovers and verify cryptographically signed passes.</p>
        </div>
        <span className="px-3 py-1 text-xs font-semibold bg-emerald-950/60 text-emerald-400 border border-emerald-800 rounded-full flex items-center space-x-1.5">
          <Factory className="w-3.5 h-3.5" />
          <span>CPCB Registered</span>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MOCK_RECYCLERS.map((recycler) => (
          <div key={recycler.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-lg bg-emerald-950/60 border border-emerald-800 flex items-center justify-center text-emerald-400">
                <Factory className="w-5 h-5" />
              </div>
              <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded flex items-center space-x-1">
                <ShieldCheck className="w-3 h-3" />
                <span>Verified</span>
              </span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">{recycler.name}</h3>
              <p className="text-xs text-slate-400 mt-1">{recycler.address}</p>
              <p className="text-[10px] font-mono text-slate-500 mt-2">License: {recycler.licenseNumber}</p>
            </div>
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Distance: {recycler.distanceKm} km</span>
              <span className="font-semibold text-emerald-400">Rating: {recycler.rating} ★</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};