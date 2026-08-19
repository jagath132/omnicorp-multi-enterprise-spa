import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { businesses } from '../../data/businessData';
import { 
  Activity, 
  ShoppingBag, 
  Zap, 
  Car,
  ArrowRight, 
  Building2
} from 'lucide-react';

const icons = {
  Activity,
  ShoppingBag,
  Zap,
  Car
};

export const ExecutiveHub = () => {
  const { navigateTo } = useAuth();

  return (
    <div className="min-h-screen pb-24 animate-in fade-in duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Clean Executive Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-300 shadow-sm">
            <Building2 className="w-3.5 h-3.5 text-blue-400" />
            <span>Central Business Selection & Daily Login</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight leading-tight">
            Select Your <span className="bg-gradient-to-r from-blue-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent">Enterprise Business</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Select a business division below to access dedicated landing pages, executive operations, and daily portal logins.
          </p>
        </div>

        {/* 3 Dedicated Business Portals Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 items-stretch">
          {businesses.map((biz) => {
            const IconComp = icons[biz.iconName] || Activity;

            let themeBorder = 'hover:border-teal-500/50 hover:shadow-teal-950/40';
            let btnTheme = 'bg-teal-600 hover:bg-teal-500 text-white';
            let badgeStyle = 'bg-slate-950/90 text-teal-300 border-teal-500/30';
            let dotColor = 'bg-teal-400 shadow-teal-400/50';
            let iconBoxStyle = 'bg-teal-500/10 text-teal-400 border-teal-500/20';

            if (biz.id === 'ecommerce') {
              themeBorder = 'hover:border-purple-500/50 hover:shadow-purple-950/40';
              btnTheme = 'bg-purple-600 hover:bg-purple-500 text-white';
              badgeStyle = 'bg-slate-950/90 text-purple-300 border-purple-500/30';
              dotColor = 'bg-purple-400 shadow-purple-400/50';
              iconBoxStyle = 'bg-purple-500/10 text-purple-400 border-purple-500/20';
            } else if (biz.id === 'voltdrive') {
              themeBorder = 'hover:border-cyan-500/50 hover:shadow-cyan-950/40';
              btnTheme = 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold';
              badgeStyle = 'bg-slate-950/90 text-cyan-300 border-cyan-500/30';
              dotColor = 'bg-cyan-400 shadow-cyan-400/50';
              iconBoxStyle = 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
            }

            return (
              <div
                key={biz.id}
                className={`group relative rounded-3xl overflow-hidden glass-panel border border-slate-800 transition-all duration-300 hover:shadow-2xl flex flex-col justify-between ${themeBorder}`}
              >
                {/* Header Image */}
                <div className="relative h-48 overflow-hidden shrink-0">
                  <img
                    src={biz.heroImage}
                    alt={biz.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  
                  {/* Redesigned Premium High-Contrast Category Pill */}
                  <div className="absolute top-3.5 left-3.5">
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase border shadow-lg backdrop-blur-xl ${badgeStyle}`}>
                      <span className={`w-1.5 h-1.5 rounded-full shadow-sm ${dotColor}`} />
                      <span>{biz.category}</span>
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  {/* Title & Tagline with Icon */}
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <div className={`p-2.5 rounded-xl border shrink-0 ${iconBoxStyle}`}>
                        <IconComp className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white font-heading leading-snug">
                          {biz.name}
                        </h3>
                        <p className="text-xs text-slate-300 font-medium leading-relaxed mt-1">
                          {biz.tagline}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed pt-1">
                      {biz.description}
                    </p>
                  </div>

                  {/* Single Clean Action Button */}
                  <div className="pt-2">
                    <button
                      onClick={() => navigateTo(biz.id)}
                      className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md ${btnTheme}`}
                    >
                      <span>Enter {biz.id === 'hospital' ? 'Hospital' : biz.id === 'ecommerce' ? 'E-Commerce' : 'VoltDrive'} Portal</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
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
