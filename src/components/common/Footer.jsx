import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { businesses } from '../../data/businessData';
import { Layers, ShieldCheck, Heart, ArrowUpRight } from 'lucide-react';

export const Footer = () => {
  const { navigateTo } = useAuth();

  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-slate-950/80 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        <div className="md:col-span-1 space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Layers className="w-4 h-4" />
            </div>
            <span className="font-heading font-bold text-white text-lg tracking-tight">OMNICORP GROUP</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Multi-enterprise unified digital operating system powering healthcare excellence, omnichannel retail, and global industrial manufacturing.
          </p>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
            <ShieldCheck className="w-4 h-4" />
            <span>256-Bit Encrypted Multi-Tenant SSO</span>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">Enterprise Portals</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            {businesses.map((biz) => (
              <li key={biz.id}>
                <button
                  onClick={() => navigateTo(biz.id)}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>{biz.name}</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => navigateTo('hub')}
                className="hover:text-white transition-colors text-blue-400 font-medium"
              >
                Executive Command Center
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">Daily Operations</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>OPD & Bed Capacity Monitoring</li>
            <li>Omnichannel Order Fulfillment</li>
            <li>Industrial Factory Floor OEE</li>
            <li>Consolidated Cross-Business P&L</li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">Governance & Support</h4>
          <p className="text-xs text-slate-400 leading-relaxed mb-3">
            Group Executive Office: 742 Corporate Tower, Financial District.
          </p>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
            <span className="font-semibold text-slate-200">24/7 Group IT Operations: </span>
            support@omnicorpgroup.com
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div>© {new Date().getFullYear()} OmniCorp Multi-Enterprise Holdings Ltd. All rights reserved.</div>
        <div className="flex items-center gap-4">
          <span>Enterprise Confidential</span>
          <span>•</span>
          <span>Security Protocol v4.2</span>
        </div>
      </div>
    </footer>
  );
};
