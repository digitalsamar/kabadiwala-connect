import React, { useState } from 'react';
import { MaterialCategoryInfo, Language } from '../../types';
import { getTranslation } from '../../data/translations';
import { speechAssistant } from '../../utils/speech';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Volume2, 
  Sparkles, 
  MapPin, 
  Coins, 
  Cpu, 
  Cable, 
  BatteryCharging, 
  Tv, 
  Monitor, 
  Magnet, 
  Layers 
} from 'lucide-react';

interface PriceBoardProps {
  categories: MaterialCategoryInfo[];
  language: Language;
}

export const PriceBoard: React.FC<PriceBoardProps> = ({ categories, language }) => {
  const t = getTranslation(language);
  const [selectedCity, setSelectedCity] = useState<string>('Nagpur');

  // Spoken price board readout for low literacy users
  const speakAllPrices = () => {
    let text = '';
    if (language === 'hi') {
      text = `आज का ताजा भाव: सर्किट बोर्ड ₹480 प्रति किलो, तांबे के तार ₹340 प्रति किलो, बैटरियां ₹190 प्रति किलो, टीवी सीआरटी ₹160 प्रति नग, एलसीडी स्क्रीन ₹95 प्रति किलो। अधिकृत रीसायकलर से पूरा पक्का दाम पाएं।`;
    } else if (language === 'mr') {
      text = `आजचे ताजे बाजारभाव: सर्किट बोर्ड ₹480 किलो, तांब्याची वायर ₹340 किलो, बॅटरी ₹190 किलो, टीव्ही सीआरटी ₹160 नग, एलसीडी स्क्रीन ₹95 किलो. अधिकृत केंद्राला देऊन पूर्ण भाव मिळवा.`;
    } else {
      text = `Today's official buying rates: Printed Circuit Boards ₹480 per kg, Copper cables ₹340 per kg, Batteries ₹190 per kg, CRT monitors ₹160 per piece, LCD screens ₹95 per kg.`;
    }
    speechAssistant.speak(text, language);
  };

  const speakSingleCategory = (cat: MaterialCategoryInfo) => {
    const uplift = cat.formalRate - cat.informalBaselineRate;
    let text = '';
    if (language === 'hi') {
      text = `${cat.name.hi} का आज का सरकारी भाव ₹${cat.formalRate} प्रति ${cat.unit} है। कबाड़ी से ₹${uplift} अधिक!`;
    } else if (language === 'mr') {
      text = `${cat.name.mr} चा आजचा अधिकृत दर ₹${cat.formalRate} प्रति ${cat.unit} आहे. जुन्या भावापेक्षा ₹${uplift} जास्त!`;
    } else {
      text = `${cat.name.en} current formal rate is ₹${cat.formalRate} per ${cat.unit}, which is ₹${uplift} higher than informal scrap rates.`;
    }
    speechAssistant.speak(text, language);
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-5 h-5 text-emerald-600" />;
      case 'Cable': return <Cable className="w-5 h-5 text-amber-600" />;
      case 'BatteryCharging': return <BatteryCharging className="w-5 h-5 text-red-500" />;
      case 'Tv': return <Tv className="w-5 h-5 text-purple-600" />;
      case 'Monitor': return <Monitor className="w-5 h-5 text-blue-600" />;
      case 'Magnet': return <Magnet className="w-5 h-5 text-orange-600" />;
      default: return <Layers className="w-5 h-5 text-stone-600" />;
    }
  };

  return (
    <div className="space-y-5 max-w-5xl mx-auto">
      {/* Top Banner with Audio Button */}
      <div className="bg-gradient-to-r from-stone-900 to-emerald-950 text-white p-5 rounded-2xl border border-emerald-800/50 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
            <Coins className="w-4 h-4" />
            <span>Ministry of Mines / JNARDDC Daily Index</span>
          </div>
          <h2 className="font-extrabold text-xl text-stone-50">{t.priceBoardTitle}</h2>
          <p className="text-xs text-stone-300 mt-0.5">
            {language === 'hi' 
              ? 'पारदर्शी भाव • कोई बिचौलिया नहीं • सीधे अधिकृत रीसायकलर से उच्चतम मूल्य' 
              : language === 'mr'
              ? 'पारदर्शक दर • थेट अधिकृत केंद्राकडून जास्तीत जास्त किंमत'
              : 'Transparent EPR benchmark prices updated daily across authorized facilities'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* City Selector */}
          <div className="flex items-center gap-1.5 bg-stone-950/80 border border-stone-700 px-3 py-1.5 rounded-xl text-xs font-semibold">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-transparent text-white focus:outline-none cursor-pointer"
            >
              <option value="Nagpur" className="bg-stone-900 text-white">Nagpur (नागपुर)</option>
              <option value="Mumbai" className="bg-stone-900 text-white">Mumbai (मुंबई)</option>
              <option value="Pune" className="bg-stone-900 text-white">Pune (पुणे)</option>
              <option value="Delhi" className="bg-stone-900 text-white">Delhi NCR (दिल्ली)</option>
            </select>
          </div>

          {/* Master Voice Readout Button */}
          <button
            onClick={speakAllPrices}
            className="bg-emerald-500 hover:bg-emerald-400 text-stone-950 px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition transform active:scale-95 shrink-0"
          >
            <Volume2 className="w-4 h-4" />
            <span>{t.priceSpokenBtn}</span>
          </button>
        </div>
      </div>

      {/* Grid of Price Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => {
          const uplift = cat.formalRate - cat.informalBaselineRate;
          const upliftPercent = Math.round((uplift / cat.informalBaselineRate) * 100);

          return (
            <div
              key={cat.id}
              className="bg-white rounded-2xl border border-stone-200 p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header & Icon */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-stone-100 border border-stone-200">
                      {getCategoryIcon(cat.iconName)}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-stone-900 leading-snug">{cat.name[language]}</h3>
                      <span className="text-[10px] text-stone-500 uppercase tracking-wider font-mono">{cat.id}</span>
                    </div>
                  </div>

                  {/* Trend Badge */}
                  <div className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {cat.trend === 'up' && <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />}
                    {cat.trend === 'down' && <TrendingDown className="w-3.5 h-3.5 text-red-600" />}
                    {cat.trend === 'stable' && <Minus className="w-3.5 h-3.5 text-stone-500" />}
                    <span>+{cat.trendPercent}%</span>
                  </div>
                </div>

                {/* Rates Comparison */}
                <div className="bg-stone-50 rounded-xl p-3 border border-stone-200 my-2 space-y-1.5">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-stone-600 font-medium">अधिकृत भाव (Formal Rate):</span>
                    <div className="text-right">
                      <span className="text-xl font-extrabold font-display text-emerald-700">₹{cat.formalRate}</span>
                      <span className="text-xs font-bold text-stone-600">/{cat.unit}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-stone-500 pt-1 border-t border-stone-200/60">
                    <span>स्थानीय कबाड़ी भाव (Informal):</span>
                    <span className="line-through text-stone-400 font-medium">₹{cat.informalBaselineRate}/{cat.unit}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs font-bold text-emerald-800 bg-emerald-100/60 px-2 py-1 rounded-lg mt-1">
                    <span>सीधा अतिरिक्त फायदा:</span>
                    <span>+₹{uplift}/{cat.unit} (+{upliftPercent}%)</span>
                  </div>
                </div>

                {/* Subcategories */}
                <p className="text-[11px] text-stone-500 mt-2 line-clamp-1">
                  <span className="font-semibold text-stone-700">शामिल माल: </span>
                  {cat.subCategories.join(', ')}
                </p>

                {/* Critical Minerals Tags */}
                <div className="flex flex-wrap gap-1 mt-2">
                  {cat.criticalMinerals.slice(0, 3).map((m, idx) => (
                    <span key={idx} className="bg-teal-50 text-teal-800 text-[10px] font-semibold px-1.5 py-0.5 rounded border border-teal-200">
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {/* Single Category Audio Button */}
              <button
                onClick={() => speakSingleCategory(cat)}
                className="mt-3 w-full bg-stone-100 hover:bg-emerald-50 hover:text-emerald-800 text-stone-700 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border border-stone-200 transition"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'यह भाव सुनें' : language === 'mr' ? 'हा दर ऐका' : 'Listen Rate'}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
