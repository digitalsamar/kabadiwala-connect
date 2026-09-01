import React, { useState } from 'react';
import { Recycler, Language, MaterialCategoryInfo } from '../../types';
import { getTranslation } from '../../data/translations';
import { speechAssistant } from '../../utils/speech';
import { 
  Building2, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Truck, 
  Star, 
  Coins, 
  CheckCircle2, 
  ArrowRight,
  Filter
} from 'lucide-react';

interface RecyclerMatcherProps {
  recyclers: Recycler[];
  categories: MaterialCategoryInfo[];
  language: Language;
  onSelectRecycler?: (rec: Recycler) => void;
}

export const RecyclerMatcher: React.FC<RecyclerMatcherProps> = ({
  recyclers,
  categories,
  language,
  onSelectRecycler,
}) => {
  const t = getTranslation(language);
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'PICKUP_ONLY'>('ALL');
  const [selectedRecyclerId, setSelectedRecyclerId] = useState<string>(recyclers[0]?.id || '');

  const filteredRecyclers = recyclers.filter((r) => {
    if (selectedFilter === 'PICKUP_ONLY') return r.pickupAvailable;
    return true;
  });

  const handleRecyclerSelect = (r: Recycler) => {
    setSelectedRecyclerId(r.id);
    if (onSelectRecycler) onSelectRecycler(r);

    const msg = language === 'hi' 
      ? `${r.name} को चुना गया। यह केंद्र ${r.location.distanceKm} किमी दूर है।`
      : language === 'mr'
      ? `${r.name} निवडले. हे केंद्र ${r.location.distanceKm} किमी अंतरावर आहे.`
      : `Selected ${r.name}, located ${r.location.distanceKm} km away.`;
    speechAssistant.speak(msg, language);
  };

  return (
    <div className="space-y-5 max-w-5xl mx-auto">
      {/* Header Bar with Filter */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="font-extrabold text-lg text-stone-900 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-emerald-600" />
            <span>{t.nearbyRecyclers}</span>
          </h2>
          <p className="text-xs text-stone-500">
            {language === 'hi' 
              ? 'सभी केंद्र सरकारी E-Waste Rules 2022 के तहत CPCB/SPCB द्वारा अधिकृत हैं' 
              : language === 'mr'
              ? 'सर्व केंद्रे शासकीय नियमांनुसार अधिकृत आहेत'
              : 'All facilities are officially licensed under E-Waste Rules 2022'}
          </p>
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-xl border border-stone-200 text-xs font-semibold self-start sm:self-auto">
          <button
            onClick={() => setSelectedFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg transition ${
              selectedFilter === 'ALL'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {language === 'hi' ? 'सभी केंद्र' : language === 'mr' ? 'सर्व केंद्रे' : 'All Centers'}
          </button>
          <button
            onClick={() => setSelectedFilter('PICKUP_ONLY')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1 transition ${
              selectedFilter === 'PICKUP_ONLY'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>{t.pickup}</span>
          </button>
        </div>
      </div>

      {/* Recyclers List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRecyclers.map((r, index) => {
          const isSelected = r.id === selectedRecyclerId;
          return (
            <div
              key={r.id}
              className={`bg-white rounded-2xl border p-5 shadow-sm transition-all flex flex-col justify-between relative ${
                isSelected
                  ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50/20'
                  : 'border-stone-200 hover:border-emerald-300'
              }`}
            >
              {/* Top Rank Badge */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black flex items-center justify-center">
                    #{index + 1}
                  </span>
                  <div>
                    <h3 className="font-bold text-base text-stone-900 leading-snug">{r.name}</h3>
                    <p className="text-xs text-stone-500">{r.tradeName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-md text-xs font-bold shrink-0">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>{r.rating}</span>
                </div>
              </div>

              {/* License & Distance Details */}
              <div className="space-y-2 text-xs border-y border-stone-100 py-3 my-2">
                <div className="flex items-center justify-between">
                  <span className="text-stone-500 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    CPCB License:
                  </span>
                  <span className="font-mono text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded">
                    {r.authorizationNumber}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-stone-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    Location:
                  </span>
                  <span className="font-semibold text-stone-800">
                    {r.location.city} • <span className="text-emerald-700 font-bold">{r.location.distanceKm} km away</span>
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-stone-500 flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-stone-400" />
                    Pickup Status:
                  </span>
                  <span className={`font-bold ${r.pickupAvailable ? 'text-emerald-700' : 'text-stone-600'}`}>
                    {r.pickupAvailable ? `✅ Pickup Available (Min ${r.minPickupWeightKg}kg)` : '❌ Drop-off only'}
                  </span>
                </div>
              </div>

              {/* Rates preview for key categories */}
              <div className="mb-4">
                <p className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1.5">
                  {t.rateOffered} (Verified Buying Rates):
                </p>
                <div className="grid grid-cols-3 gap-1.5 text-center">
                  <div className="bg-stone-50 border border-stone-200 rounded-lg p-1.5">
                    <span className="text-[10px] text-stone-500 block">PCB / हरी प्लेट</span>
                    <span className="font-bold text-xs text-emerald-700">₹{r.rates.pcb || 480}/kg</span>
                  </div>
                  <div className="bg-stone-50 border border-stone-200 rounded-lg p-1.5">
                    <span className="text-[10px] text-stone-500 block">Wires / तार</span>
                    <span className="font-bold text-xs text-emerald-700">₹{r.rates.cables || 340}/kg</span>
                  </div>
                  <div className="bg-stone-50 border border-stone-200 rounded-lg p-1.5">
                    <span className="text-[10px] text-stone-500 block">Batteries / बैटरी</span>
                    <span className="font-bold text-xs text-emerald-700">₹{r.rates.batteries || 190}/kg</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-1">
                <a
                  href={`tel:${r.contactPhone}`}
                  className="bg-stone-100 hover:bg-stone-200 text-stone-800 p-2.5 rounded-xl border border-stone-300 flex items-center justify-center transition"
                  title="Call Recycler"
                >
                  <Phone className="w-4 h-4 text-stone-700" />
                </a>
                <button
                  onClick={() => handleRecyclerSelect(r)}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-stone-900 hover:bg-stone-800 text-white'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{language === 'hi' ? 'चुना गया केंद्र' : language === 'mr' ? 'निवडलेले केंद्र' : 'Selected Recycler'}</span>
                    </>
                  ) : (
                    <>
                      <span>{t.chooseRecycler}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
