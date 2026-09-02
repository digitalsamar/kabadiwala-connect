// src/components/Header.tsx
import React from 'react';
import { ShieldCheck, Globe, Leaf, Cpu } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface HeaderProps {
  currentTab: 'collector' | 'admin' | 'recycler' | 'economics';
  setCurrentTab: (tab: 'collector' | 'admin' | 'recycler' | 'economics') => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, setCurrentTab, language, setLanguage }) => {
  const t = translations[language];

  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-900/40">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg tracking-tight text-white">{t.appTitle}</span>
                <span className="px-2 py-0.5 text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded">
                  SIH Finalist
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">GovTech Circular Economy Ecosystem</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-950/60 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setCurrentTab('collector')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                currentTab === 'collector'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              {t.collectorTab}
            </button>
            <button
              onClick={() => setCurrentTab('admin')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                currentTab === 'admin'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              {t.adminTab}
            </button>
            <button
              onClick={() => setCurrentTab('recycler')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                currentTab === 'recycler'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              {t.recyclerTab}
            </button>
            <button
              onClick={() => setCurrentTab('economics')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                currentTab === 'economics'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              {t.unitEconomicsTab}
            </button>
          </nav>

          {/* Language Switcher & Govt Badge */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="flex items-center space-x-1 px-3 py-1.5 text-xs font-medium rounded-md bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 transition"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>{language === 'en' ? 'हिंदी' : 'English'}</span>
            </button>

            <div className="hidden lg:flex items-center space-x-1.5 text-xs text-emerald-400 bg-emerald-950/50 px-2.5 py-1 rounded-md border border-emerald-800/50">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>CPCB Verified</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
