// src/components/CollectorView/PhotoAndValuation.tsx
import React, { useState } from 'react';
import { Camera, Upload, Scale, ArrowRight, ShieldCheck, CheckCircle2, AlertTriangle, Sparkles, Cpu } from 'lucide-react';
import { EWasteItem, Language, ValuationResult, Recycler } from '../../types';
import { INITIAL_EWASTE_ITEMS, MOCK_RECYCLERS } from '../../data/initialData';
import { translations } from '../../data/translations';

interface PhotoAndValuationProps {
  language: Language;
  onProceedToPass: (valuation: ValuationResult) => void;
}

export const PhotoAndValuation: React.FC<PhotoAndValuationProps> = ({ language, onProceedToPass }) => {
  const t = translations[language];
  const [selectedItem, setSelectedItem] = useState<EWasteItem>(INITIAL_EWASTE_ITEMS[0]);
  const [weight, setWeight] = useState<number>(1);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [selectedRecycler, setSelectedRecycler] = useState<Recycler>(MOCK_RECYCLERS[0]);
  const [step, setStep] = useState<'upload' | 'valuation' | 'recycler'>('upload');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        simulateAIAnalysis();
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateAIAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setStep('valuation');
    }, 1200);
  };

  const localTotal = selectedItem.localRate * weight;
  const fairTotal = selectedItem.fairRate * weight;
  const bonusTotal = selectedItem.recyclerBonus * weight;
  const totalPayout = fairTotal + bonusTotal;
  const carbonOffsetKg = Number((weight * 2.4).toFixed(1));

  const handleComplete = () => {
    const valuation: ValuationResult = {
      item: selectedItem,
      weightOrQuantity: weight,
      localTotal,
      fairTotal,
      bonusTotal,
      totalPayout,
      carbonOffsetKg,
      matchedRecycler: selectedRecycler
    };
    onProceedToPass(valuation);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6">
      {/* Step Indicator */}
      <div className="flex items-center justify-center space-x-4 text-xs font-medium text-slate-400">
        <span className={`px-3 py-1 rounded-full border ${step === 'upload' ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-slate-900 border-slate-800'}`}>
          1. {language === 'en' ? 'AI Inspection' : 'एआई निरीक्षण'}
        </span>
        <div className="w-8 h-px bg-slate-800" />
        <span className={`px-3 py-1 rounded-full border ${step === 'valuation' ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-slate-900 border-slate-800'}`}>
          2. {language === 'en' ? 'Transparent Valuation' : 'मूल्यांकन'}
        </span>
        <div className="w-8 h-px bg-slate-800" />
        <span className={`px-3 py-1 rounded-full border ${step === 'recycler' ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-slate-900 border-slate-800'}`}>
          3. {language === 'en' ? 'Recycler Match' : 'रिसाइकिलर मिलान'}
        </span>
      </div>

      {step === 'upload' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-xl font-bold text-white tracking-tight">{t.uploadPrompt}</h2>
            <p className="text-sm text-slate-400 max-w-lg mx-auto">{t.uploadSubtext}</p>
          </div>

          <div className="border-2 border-dashed border-slate-700 hover:border-emerald-500 rounded-xl p-8 text-center bg-slate-950/40 transition group cursor-pointer relative overflow-hidden">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="absolute inset-0 opacity-0 cursor-pointer z-10"
            />
            {imagePreview ? (
              <div className="space-y-4">
                <img src={imagePreview} alt="Uploaded e-waste" className="max-h-48 mx-auto rounded-lg object-cover border border-slate-700" />
                <p className="text-xs text-emerald-400 font-medium">Click or drop another image to replace</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-emerald-950/60 border border-emerald-800/60 rounded-full flex items-center justify-center group-hover:scale-105 transition">
                  <Camera className="w-8 h-8 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-200">Click to capture or upload photo</p>
                  <p className="text-xs text-slate-500 mt-1">Supports JPG, PNG, WEBP (Max 15MB)</p>
                </div>
              </div>
            )}
          </div>

          {isAnalyzing && (
            <div className="flex items-center justify-center space-x-3 text-emerald-400 bg-emerald-950/30 p-4 rounded-lg border border-emerald-900/50 animate-pulse">
              <Cpu className="w-5 h-5 animate-spin" />
              <span className="text-sm font-medium">AI Computer Vision analyzing material composition & grade...</span>
            </div>
          )}

          <div className="space-y-3 pt-4 border-t border-slate-800">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">{t.selectCategory}</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {INITIAL_EWASTE_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedItem(item);
                    setStep('valuation');
                  }}
                  className={`p-3 text-left rounded-lg border transition ${
                    selectedItem.id === item.id
                      ? 'bg-emerald-950/40 border-emerald-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <p className="text-xs font-semibold truncate">{language === 'en' ? item.nameEn : item.nameHi}</p>
                  <p className="text-[10px] text-slate-500 mt-1">₹{item.fairRate} / {item.unit}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {step === 'valuation' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-bold text-white">{language === 'en' ? selectedItem.nameEn : selectedItem.nameHi}</h2>
              <p className="text-xs text-slate-400 mt-0.5">{language === 'en' ? selectedItem.descriptionEn : selectedItem.descriptionHi}</p>
            </div>
            <button
              onClick={() => setStep('upload')}
              className="text-xs text-emerald-400 hover:underline font-medium"
            >
              Change Item
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-slate-950/60 p-5 rounded-xl border border-slate-800">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2">{t.enterWeight} ({selectedItem.unit})</label>
              <div className="flex items-center space-x-3">
                <input
                  type="number"
                  min="0.1"
                  step="0.5"
                  value={weight}
                  onChange={(e) => setWeight(Math.max(0.1, parseFloat(e.target.value) || 0))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white font-semibold focus:outline-none focus:border-emerald-500"
                />
                <span className="text-sm font-semibold text-slate-400">{selectedItem.unit}</span>
              </div>
            </div>

            <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Recyclable Yield:</span>
                <span className="font-semibold text-emerald-400">{selectedItem.recyclablePercentage}% Pure Materials</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Estimated Carbon Offset:</span>
                <span className="font-semibold text-emerald-400">{carbonOffsetKg} kg CO2eq</span>
              </div>
            </div>
          </div>

          {/* Transparent Valuation Breakdown Table */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">{t.fairValuationHeader}</h3>
            <div className="border border-slate-800 rounded-xl overflow-hidden">
              <div className="grid grid-cols-3 bg-slate-950 px-4 py-3 text-xs font-semibold text-slate-400 border-b border-slate-800">
                <span>{language === 'en' ? 'Metric' : 'मीट्रिक'}</span>
                <span className="text-right">{language === 'en' ? 'Rate / Unit' : 'दर / इकाई'}</span>
                <span className="text-right">{language === 'en' ? 'Total' : 'कुल'}</span>
              </div>
              <div className="divide-y divide-slate-800/60 text-xs">
                <div className="grid grid-cols-3 px-4 py-3 bg-slate-900/50">
                  <span className="text-slate-300 font-medium">{t.localRateLabel}</span>
                  <span className="text-right text-slate-400">₹{selectedItem.localRate}</span>
                  <span className="text-right text-slate-400">₹{localTotal}</span>
                </div>
                <div className="grid grid-cols-3 px-4 py-3 bg-slate-900/50">
                  <span className="text-slate-300 font-medium">{t.fairValueLabel}</span>
                  <span className="text-right text-emerald-400">₹{selectedItem.fairRate}</span>
                  <span className="text-right text-emerald-400 font-semibold">₹{fairTotal}</span>
                </div>
                <div className="grid grid-cols-3 px-4 py-3 bg-slate-900/50">
                  <span className="text-slate-300 font-medium">{t.bonusLabel}</span>
                  <span className="text-right text-emerald-400">₹{selectedItem.recyclerBonus}</span>
                  <span className="text-right text-emerald-400 font-semibold">+₹{bonusTotal}</span>
                </div>
                <div className="grid grid-cols-3 px-4 py-3 bg-emerald-950/30 border-t border-emerald-900/50 font-bold text-sm">
                  <span className="text-white">{t.totalPayout}</span>
                  <span className="text-right"></span>
                  <span className="text-right text-emerald-400">₹{totalPayout}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-slate-800">
            <button
              onClick={() => setStep('recycler')}
              className="flex items-center space-x-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg text-xs transition shadow-lg shadow-emerald-900/30"
            >
              <span>{t.findRecycler}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {step === 'recycler' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-white">Select CPCB Authorized Recycler</h2>
            <p className="text-xs text-slate-400 mt-0.5">Guaranteed safe processing & official compliance handover.</p>
          </div>

          <div className="space-y-3">
            {MOCK_RECYCLERS.map((recycler) => (
              <div
                key={recycler.id}
                onClick={() => setSelectedRecycler(recycler)}
                className={`p-4 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                  selectedRecycler.id === recycler.id
                    ? 'bg-emerald-950/40 border-emerald-500'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold text-white">{recycler.name}</span>
                    {recycler.verifiedGovtPartner && (
                      <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded flex items-center space-x-1">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Govt Certified</span>
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">{recycler.address}</p>
                  <p className="text-[10px] text-slate-500">License: {recycler.licenseNumber} • Distance: {recycler.distanceKm} km</p>
                </div>
                {selectedRecycler.id === recycler.id && (
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>

          <div className="bg-slate-950/60 p-4 rounded-lg border border-slate-800 flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300 space-y-1">
              <p className="font-semibold text-white">{t.safetyNotice}</p>
              <p className="text-slate-400">Hazardous components ({selectedItem.hazardousComponents.join(', ')}) will be neutralized following strict CPCB environmental guidelines.</p>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-slate-800">
            <button
              onClick={() => setStep('valuation')}
              className="text-xs text-slate-400 hover:text-white font-medium"
            >
              Back to Valuation
            </button>
            <button
              onClick={handleComplete}
              className="flex items-center space-x-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg text-xs transition shadow-lg shadow-emerald-900/30"
            >
              <span>{t.generatePass}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};