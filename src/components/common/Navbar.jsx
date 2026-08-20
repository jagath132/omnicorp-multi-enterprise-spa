import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Layers } from 'lucide-react';

export const Navbar = () => {
  const { navigateTo } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-slate-800/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Left: Brand Logo (Returns to Hub) */}
          <button 
            onClick={() => navigateTo('hub')}
            className="flex items-center gap-3 group text-left focus:outline-none shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 p-[2px] shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Layers className="w-5 h-5 text-blue-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-extrabold text-base tracking-tight text-white">OMNICORP</span>
                <span className="text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30 px-1.5 py-0.2 rounded">GROUP</span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">Executive Multi-Business</p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
