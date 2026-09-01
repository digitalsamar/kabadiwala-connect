// src/components/CollectorView/HandoverPass.tsx
import React from 'react';
import { ShieldCheck, QrCode, Printer, CheckCircle, ArrowLeft } from 'lucide-react';
import { ValuationResult, Language, HandoverPassRecord } from '../../types';
import { translations } from '../../data/translations';

interface HandoverPassProps {
  valuation: ValuationResult;
  language: Language;
  onBack: () => void;
  onSavePass: (pass: HandoverPassRecord) => void;
}

export const HandoverPass: React.FC<HandoverPassProps> = ({ valuation, language, onBack, onSavePass }) => {
  const t = translations[language];
  const passId = `KBC-PASS-${Math.floor(100000 + Math.random() * 900000)}`;
  const securityHash = `0x7f83b...${Math.floor(1000 + Math.random() * 9000)}`;
  const timestamp = new Date().toLocaleString();

  const handleSaveAndPrint = () => {
    const record: HandoverPassRecord = {
      passId,
      timestamp,
      itemSummary: `${valuation.item.nameEn} (${valuation.weightOrQuantity} ${valuation.item.unit})`,
      quantity: valuation.weightOrQuantity,
      estimatedPayout: valuation.totalPayout,
      recyclerName: valuation.matchedRecycler?.name || 'Authorized Recycler',
      status: 'Pending Handover',
      securityHash
    };
    onSavePass(record);
    window.print();
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-6">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center space-x-1 text-xs text-slate-400 hover:text-white font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.backToHome}</span>
        </button>
        <span className="px-3 py-1 text-xs font-semibold bg-emerald-950/60 text-emerald-400 border border-emerald-800 rounded-full flex items-center space-x-1.5">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Govt Verified Handover Pass</span>
        </span>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between border-b border-slate-800 pb-5">
          <div>
            <h2 className="text-xl font-bold text-white">{t.appTitle}</h2>
            <p className="text-xs text-slate-400 mt-0.5">Secure E-Waste Transfer & Traceability Pass</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-mono text-emerald-400">{passId}</p>
            <p className="text-[10px] text-slate-500">{timestamp}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-950/60 p-5 rounded-xl border border-slate-800">
          <div className="space-y-3">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-500">Item Details</p>
              <p className="text-sm font-semibold text-white mt-0.5">{language === 'en' ? valuation.item.nameEn : valuation.item.nameHi}</p>
              <p className="text-xs text-slate-400">Quantity: {valuation.weightOrQuantity} {valuation.item.unit}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-500">Guaranteed Payout</p>
              <p className="text-lg font-bold text-emerald-400 mt-0.5">₹{valuation.totalPayout}</p>
            </div>
          </div>

          <div className="space-y-3 border-t sm:border-t-0 sm:border-l border-slate-800 pt-4 sm:pt-0 sm:pl-6">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-500">Assigned Recycler</p>
              <p className="text-sm font-semibold text-white mt-0.5">{valuation.matchedRecycler?.name}</p>
              <p className="text-xs text-slate-400">{valuation.matchedRecycler?.address}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-500">Carbon Offset</p>
              <p className="text-xs font-semibold text-emerald-400 mt-0.5">{valuation.carbonOffsetKg} kg CO2eq avoided</p>
            </div>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4 sm:space-y-0">
          <div className="space-y-2 text-center sm:text-left">
            <div className="flex items-center space-x-1.5 text-xs font-semibold text-emerald-400 justify-center sm:justify-start">
              <CheckCircle className="w-4 h-4" />
              <span>Cryptographically Secured</span>
            </div>
            <p className="text-xs text-slate-400 max-w-xs">{t.scanQrNotice}</p>
            <p className="text-[10px] font-mono text-slate-500">Hash: {securityHash}</p>
          </div>

          <div className="w-28 h-28 bg-white p-2 rounded-lg flex items-center justify-center shadow-md">
            <QrCode className="w-full h-full text-slate-950" />
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t border-slate-800">
          <button
            onClick={handleSaveAndPrint}
            className="flex items-center space-x-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg text-xs transition shadow-lg shadow-emerald-900/30"
          >
            <Printer className="w-4 h-4" />
            <span>{t.printPass}</span>
          </button>
        </div>
      </div>
    </div>
  );
};