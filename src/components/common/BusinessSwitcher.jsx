import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { businesses } from '../../data/businessData';
import { Activity, ShoppingBag, Scissors, LayoutDashboard, Sparkles } from 'lucide-react';

const icons = {
  Activity,
  ShoppingBag,
  Scissors
};

export const BusinessSwitcherDock = () => {
  const { currentView, navigateTo } = useAuth();

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
      <div className="flex items-center gap-1.5 p-1.5 rounded-2xl glass-panel shadow-2xl shadow-black/80 border border-slate-700/80 bg-slate-900/90 backdrop-blur-xl">
        {/* Hub Button */}
        <button
          onClick={() => navigateTo('hub')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
            currentView === 'hub'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
              : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/80'
          }`}
          title="Master Executive Command Hub"
        >
          <LayoutDashboard className="w-4 h-4" />
          <span className="hidden sm:inline">Executive Hub</span>
        </button>

        <div className="w-px h-5 bg-slate-800 mx-1" />

        {/* 3 Businesses */}
        {businesses.map((biz) => {
          const IconComp = icons[biz.iconName] || Activity;
          const isActive = currentView === biz.id;

          let activeStyle = '';
          if (biz.id === 'hospital') {
            activeStyle = 'bg-teal-600 text-white shadow-lg shadow-teal-600/30';
          } else if (biz.id === 'ecommerce') {
            activeStyle = 'bg-purple-600 text-white shadow-lg shadow-purple-600/30';
          } else {
            activeStyle = 'bg-amber-600 text-white shadow-lg shadow-amber-600/30';
          }

          return (
            <button
              key={biz.id}
              onClick={() => navigateTo(biz.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                isActive ? activeStyle : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/80'
              }`}
              title={`Jump to ${biz.name}`}
            >
              <IconComp className="w-4 h-4" />
              <span className="hidden md:inline">
                {biz.id === 'hospital' ? 'Hospital' : biz.id === 'ecommerce' ? 'E-Commerce' : 'Garments'}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
