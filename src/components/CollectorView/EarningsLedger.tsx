import React from 'react';
import { LotRecord, CollectorProfile, Language } from '../../types';
import { getTranslation } from '../../data/translations';
import { speechAssistant } from '../../utils/speech';
import { 
  Coins, 
  Wallet, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Scale, 
  Volume2, 
  ShieldCheck, 
  ArrowUpRight,
  Zap
} from 'lucide-react';

interface EarningsLedgerProps {
  lots: LotRecord[];
  profile: CollectorProfile;
  language: Language;
}

export const EarningsLedger: React.FC<EarningsLedgerProps> = ({
  lots,
  profile,
  language,
}) => {
  const t = getTranslation(language);

  // Totals calculations
  let totalUpliftEarned = 0;
  lots.forEach((l) => {
    if (l.status === 'COMPLETED') {
      totalUpliftEarned += l.priceUplift;
    }
  });

  const speakSummary = () => {
    let text = '';
    if (language === 'hi') {
      text = `रमेश भाई, आपकी अब तक की कुल कमाई ₹${profile.totalEarnings.toLocaleString('en-IN')} है। कबाड़ीवाला कनेक्ट से आपको ₹${totalUpliftEarned.toLocaleString('en-IN')} का सीधा अतिरिक्त फायदा हुआ है। आपने ${profile.totalWeightDivertedKg} किलो ई-कचरा सुरक्षित रिसायकल करवाया है।`;
    } else if (language === 'mr') {
      text = `रमेश भाऊ, तुमची एकूण कमाई ₹${profile.totalEarnings.toLocaleString('en-IN')} झाली आहे. कबाडीवाला कनेक्टमुळे तुम्हाला ₹${totalUpliftEarned.toLocaleString('en-IN')} चा जास्तीचा नफा मिळाला आहे.`;
    } else {
      text = `Collector summary: Total earnings realized is ₹${profile.totalEarnings.toLocaleString('en-IN')}, with ₹${totalUpliftEarned.toLocaleString('en-IN')} extra profit earned above informal scrap rates. ${profile.totalWeightDivertedKg} kilograms of e-waste safely diverted.`;
    }
    speechAssistant.speak(text, language);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Profile & Summary Card */}
      <div className="bg-gradient-to-br from-emerald-950 via-stone-900 to-teal-950 text-white rounded-3xl p-6 shadow-xl border border-emerald-600/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-800/60 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-stone-950 font-extrabold text-xl flex items-center justify-center shadow-lg">
              ₹
            </div>
            <div>
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block">
                {language === 'hi' ? 'कलेक्टर खाता' : language === 'mr' ? 'कलेक्टर नोंदवही' : 'Collector Ledger'}
              </span>
              <h2 className="text-xl font-extrabold font-display text-white">{profile.name}</h2>
              <p className="text-xs text-stone-300 font-mono">{profile.phone} • {profile.operatingCity}</p>
            </div>
          </div>

          <button
            onClick={speakSummary}
            className="bg-emerald-500 hover:bg-emerald-400 text-stone-950 px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-md transition transform active:scale-95 self-start sm:self-auto"
          >
            <Volume2 className="w-4 h-4" />
            <span>{language === 'hi' ? 'कमाई का हिसाब सुनो' : language === 'mr' ? 'हिशोब ऐका' : 'Listen Earnings'}</span>
          </button>
        </div>

        {/* 4 Key Stat Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-5">
          <div className="bg-stone-900/80 rounded-2xl p-4 border border-stone-800">
            <span className="text-xs text-stone-400 block mb-1">{t.totalEarned}</span>
            <div className="text-2xl sm:text-3xl font-extrabold font-display text-emerald-400">
              ₹{profile.totalEarnings.toLocaleString('en-IN')}
            </div>
            <span className="text-[10px] text-emerald-300/80 font-medium block mt-1">
              ✅ 100% Guaranteed Payout
            </span>
          </div>

          <div className="bg-stone-900/80 rounded-2xl p-4 border border-stone-800">
            <span className="text-xs text-stone-400 block mb-1">कबाड़ी भाव से अतिरिक्त मुनाफा</span>
            <div className="text-2xl sm:text-3xl font-extrabold font-display text-emerald-300 flex items-center gap-1">
              <TrendingUp className="w-5 h-5 text-emerald-400 inline" />
              +₹{totalUpliftEarned.toLocaleString('en-IN')}
            </div>
            <span className="text-[10px] text-emerald-300 font-medium block mt-1">
              🚀 Direct Wallet Uplift
            </span>
          </div>

          <div className="bg-stone-900/80 rounded-2xl p-4 border border-stone-800">
            <span className="text-xs text-stone-400 block mb-1">{t.eWasteDiverted}</span>
            <div className="text-2xl sm:text-3xl font-extrabold font-display text-stone-100">
              {profile.totalWeightDivertedKg} <span className="text-base font-normal text-stone-400">kg</span>
            </div>
            <span className="text-[10px] text-stone-400 font-medium block mt-1">
              🛡️ No toxic backyard burning
            </span>
          </div>

          <div className="bg-stone-900/80 rounded-2xl p-4 border border-stone-800">
            <span className="text-xs text-stone-400 block mb-1">{t.pendingPayment}</span>
            <div className="text-2xl sm:text-3xl font-extrabold font-display text-amber-400">
              ₹{profile.pendingDues.toLocaleString('en-IN')}
            </div>
            <span className="text-[10px] text-amber-300 font-medium block mt-1">
              ⏳ Awaiting recycler weight match
            </span>
          </div>
        </div>
      </div>

      {/* Critical Minerals Recovered Impact Box */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-teal-600" />
            <h3 className="font-extrabold text-base text-stone-900">
              {language === 'hi' ? 'पर्यावरण व रणनीतिक धातु योगदान (Critical Minerals)' : language === 'mr' ? 'पर्यावरण व मौल्यवान धातू योगदान' : 'Critical Minerals Recovered via Formal Smelting'}
            </h3>
          </div>
          <span className="text-xs bg-teal-50 text-teal-800 font-bold px-2 py-0.5 rounded-full border border-teal-200">
            JNARDDC Circular Index
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-1">
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 text-center">
            <span className="text-xs text-stone-500 block font-medium">तांबा (Copper)</span>
            <span className="text-lg font-bold text-stone-900">{profile.criticalMineralsRecovered.copperKg} kg</span>
          </div>

          <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 text-center">
            <span className="text-xs text-stone-500 block font-medium">लिथियम (Lithium)</span>
            <span className="text-lg font-bold text-stone-900">{profile.criticalMineralsRecovered.lithiumGrams} g</span>
          </div>

          <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 text-center">
            <span className="text-xs text-stone-500 block font-medium">कोबाल्ट (Cobalt)</span>
            <span className="text-lg font-bold text-stone-900">{profile.criticalMineralsRecovered.cobaltGrams} g</span>
          </div>

          <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 text-center">
            <span className="text-xs text-stone-500 block font-medium">सोना (Gold Eq.)</span>
            <span className="text-lg font-bold text-amber-600">{profile.criticalMineralsRecovered.goldGrams} g</span>
          </div>

          <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 text-center">
            <span className="text-xs text-stone-500 block font-medium">नियोडिमियम (Nd)</span>
            <span className="text-lg font-bold text-stone-900">{profile.criticalMineralsRecovered.neodymiumGrams} g</span>
          </div>
        </div>
      </div>

      {/* Transaction History Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-stone-200 flex items-center justify-between">
          <h3 className="font-extrabold text-base text-stone-900 flex items-center gap-2">
            <Wallet className="w-5 h-5 text-emerald-600" />
            <span>{t.history}</span>
          </h3>
          <span className="text-xs font-semibold text-stone-500">
            {lots.length} {language === 'hi' ? 'कुल लेनदेन' : language === 'mr' ? 'व्यवहार' : 'transactions'}
          </span>
        </div>

        <div className="divide-y divide-stone-200">
          {lots.map((lot) => {
            const isCompleted = lot.status === 'COMPLETED';
            return (
              <div key={lot.id} className="p-4 hover:bg-stone-50 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-stone-900 text-sm">{lot.referenceCode}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isCompleted 
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                        : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}>
                      {lot.paymentStatus}
                    </span>
                    {lot.paymentMode === 'CASH' ? (
                      <span className="bg-stone-100 text-stone-700 px-1.5 py-0.5 rounded text-[10px] font-semibold">
                        💵 Cash
                      </span>
                    ) : (
                      <span className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded text-[10px] font-semibold">
                        ⚡ UPI
                      </span>
                    )}
                  </div>
                  <p className="text-stone-600">
                    {lot.materialCategory.toUpperCase()} • <span className="font-semibold">{lot.actualWeightKg || lot.estimatedWeightKg} kg</span> • {lot.gpsLocation.address}
                  </p>
                  <p className="text-[11px] text-stone-400 font-mono">
                    {new Date(lot.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    {lot.matchedRecyclerName && ` • ${lot.matchedRecyclerName}`}
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <div className="text-base font-extrabold text-emerald-700 font-display">
                    ₹{(lot.finalSaleValue || lot.estimatedValue).toLocaleString('en-IN')}
                  </div>
                  <div className="text-[11px] text-emerald-600 font-bold">
                    +₹{lot.priceUplift.toLocaleString('en-IN')} extra uplift
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
