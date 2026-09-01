// src/App.tsx
import React, { useState } from 'react';
import { Header } from './components/Header';
import { CollectorView } from './components/CollectorView/CollectorView';
import { AdminDashboard } from './components/AdminDashboard';
import { RecyclerPortal } from './components/RecyclerPortal';
import { UnitEconomicsView } from './components/UnitEconomicsView';
import { Language } from './types';

export function App() {
  const [currentTab, setCurrentTab] = useState<'collector' | 'admin' | 'recycler' | 'economics'>('collector');
  const [language, setLanguage] = useState<Language>('en');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        language={language}
        setLanguage={setLanguage}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentTab === 'collector' && <CollectorView language={language} />}
        {currentTab === 'admin' && <AdminDashboard language={language} />}
        {currentTab === 'recycler' && <RecyclerPortal language={language} />}
        {currentTab === 'economics' && <UnitEconomicsView language={language} />}
      </main>

      <footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        <p>Kabadiwala Connect — Smart India Hackathon (SIH) Finalist Project. Built with GovTech & Circular Economy Standards.</p>
      </footer>
    </div>
  );
}

export default App;