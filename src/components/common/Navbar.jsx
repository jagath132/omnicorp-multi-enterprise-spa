import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  ChevronDown, 
  LogOut, 
  ShieldCheck, 
  Layers
} from 'lucide-react';

export const Navbar = () => {
  const { navigateTo, masterUser, masterLogout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

          {/* Right: Master Executive Profile Widget */}
          <div className="relative" ref={dropdownRef}>
            {/* Minimalist Rounded Pill Trigger */}
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className={`flex items-center gap-2.5 px-3 py-1.5 rounded-full border transition-all duration-200 ${
                profileOpen
                  ? 'bg-slate-800 border-blue-500/60 shadow-lg shadow-blue-500/15 ring-1 ring-blue-500/30'
                  : 'bg-slate-900/90 hover:bg-slate-800/90 border-slate-700/80 hover:border-slate-600'
              }`}
            >
              <div className="relative">
                <img
                  src={masterUser.avatar}
                  alt={masterUser.name}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200';
                  }}
                  className="w-7 h-7 rounded-full object-cover ring-1 ring-blue-500/40 bg-slate-800"
                />
                <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-400 border border-slate-900 rounded-full" />
              </div>

              <span className="text-xs font-bold text-white hidden sm:inline">
                {masterUser.name}
              </span>

              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${profileOpen ? 'rotate-180 text-blue-400' : ''}`} />
            </button>

            {/* Clean Executive Profile Dropdown Card */}
            {profileOpen && (
              <div className="absolute right-0 mt-2.5 w-72 rounded-2xl bg-slate-900/95 border border-slate-700/80 shadow-2xl backdrop-blur-2xl p-4 z-[100] animate-in fade-in slide-in-from-top-2 duration-150">
                {/* Profile Identity Block */}
                <div className="flex items-center gap-3 pb-3.5 border-b border-slate-800">
                  <div className="relative shrink-0">
                    <img
                      src={masterUser.avatar}
                      alt={masterUser.name}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200';
                      }}
                      className="w-11 h-11 rounded-full object-cover ring-2 ring-blue-500/30"
                    />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border border-slate-900 rounded-full" />
                  </div>

                  <div className="overflow-hidden min-w-0 flex-1">
                    <div className="flex items-center gap-1">
                      <span className="font-heading font-bold text-white text-xs truncate">{masterUser.name}</span>
                      <ShieldCheck className="w-3 h-3 text-blue-400 shrink-0" />
                    </div>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">{masterUser.email}</p>
                    <div className="mt-1 inline-block text-[9px] font-bold text-blue-300 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full">
                      {masterUser.role}
                    </div>
                  </div>
                </div>

                {/* Direct Action Button: Sign Out */}
                <div className="pt-3">
                  <button
                    onClick={() => { masterLogout(); setProfileOpen(false); }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-rose-300 hover:text-white bg-rose-500/10 hover:bg-rose-600 border border-rose-500/20 hover:border-rose-600 transition-all duration-200 active:scale-[0.98]"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
