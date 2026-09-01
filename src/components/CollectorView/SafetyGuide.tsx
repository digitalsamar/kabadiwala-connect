import React from 'react';
import { SafetyGuideline, Language } from '../../types';
import { getTranslation } from '../../data/translations';
import { speechAssistant } from '../../utils/speech';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Flame, 
  Skull, 
  AlertTriangle, 
  CheckCircle2, 
  Volume2, 
  Sparkles, 
  HeartHandshake 
} from 'lucide-react';

interface SafetyGuideProps {
  guidelines: SafetyGuideline[];
  language: Language;
}

export const SafetyGuide: React.FC<SafetyGuideProps> = ({ guidelines, language }) => {
  const t = getTranslation(language);

  const speakGuideline = (item: SafetyGuideline) => {
    const text = item.audioPrompt[language] || item.audioPrompt.hi;
    speechAssistant.speak(text, language);
  };

  const speakAllSafety = () => {
    let text = '';
    if (language === 'hi') {
      text = `कबाड़ी सुरक्षा नियम: तारों को कभी आग में न जलाएं, सर्किट बोर्ड पर तेजाब न डालें, और बैटरियों को हथौड़े से न तोड़ें। बिना जलाए अधिकृत रीसायकलर को देने पर स्वास्थ्य भी सुरक्षित रहता है और दोगुना दाम मिलता है।`;
    } else if (language === 'mr') {
      text = `कबाडी सुरक्षा नियम: तारा जाळू नका, सर्किट बोर्डवर ॲसिड टाकू नका, बॅटऱ्या फोडू नका. अधिकृत केंद्राला दिल्यास आरोग्य सुरक्षित राहते आणि जास्तीचा भाव मिळतो.`;
    } else {
      text = `Safety guidance: Never burn cables, avoid acid washing of circuit boards, and do not puncture lithium batteries. Authorized recyclers protect your health and pay maximum rates.`;
    }
    speechAssistant.speak(text, language);
  };

  const getDangerIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame': return <Flame className="w-6 h-6 text-red-500" />;
      case 'Skull': return <Skull className="w-6 h-6 text-red-600" />;
      default: return <AlertTriangle className="w-6 h-6 text-amber-500" />;
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-red-950 via-stone-900 to-emerald-950 text-white p-5 rounded-3xl border border-red-800/40 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-red-400 uppercase tracking-wider block mb-1">
            Worker Health & Ministry Safety Standards
          </span>
          <h2 className="font-extrabold text-xl text-white">{t.safetyTitle}</h2>
          <p className="text-xs text-stone-300 mt-1 max-w-xl">
            {t.safetySub}
          </p>
        </div>

        <button
          onClick={speakAllSafety}
          className="bg-emerald-500 hover:bg-emerald-400 text-stone-950 px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-lg transition transform active:scale-95 shrink-0 self-start sm:self-auto"
        >
          <Volume2 className="w-4 h-4" />
          <span>{t.listenSafety}</span>
        </button>
      </div>

      {/* Safety Cards Grid */}
      <div className="grid grid-cols-1 gap-6">
        {guidelines.map((guide) => (
          <div
            key={guide.id}
            className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden p-6 space-y-4"
          >
            {/* Title Bar with Audio Button */}
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-extrabold text-base sm:text-lg text-stone-900 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>{guide.title[language]}</span>
              </h3>

              <button
                onClick={() => speakGuideline(guide)}
                className="bg-stone-100 hover:bg-emerald-50 hover:text-emerald-800 text-stone-700 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'ऑडियो सुनें' : language === 'mr' ? 'ऐका' : 'Listen'}</span>
              </button>
            </div>

            {/* Side-by-side DOs vs DONTs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* DANGER (Never do this) */}
              <div className="bg-red-50/80 rounded-2xl p-4 border border-red-200 flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-red-100 border border-red-300 shrink-0">
                  {getDangerIcon(guide.dangerIcon)}
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-red-700 uppercase tracking-wider block">
                    ❌ {t.dangerLabel}
                  </span>
                  <p className="text-xs sm:text-sm text-red-950 font-medium leading-relaxed">
                    {guide.dangerText[language]}
                  </p>
                </div>
              </div>

              {/* SAFE & HIGH PROFIT (Do this) */}
              <div className="bg-emerald-50/90 rounded-2xl p-4 border border-emerald-300 flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-100 border border-emerald-300 shrink-0">
                  <ShieldCheck className="w-6 h-6 text-emerald-700" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                    ✅ {t.safeLabel}
                  </span>
                  <p className="text-xs sm:text-sm text-emerald-950 font-semibold leading-relaxed">
                    {guide.safeActionText[language]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
