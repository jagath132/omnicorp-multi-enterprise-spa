import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { businesses } from '../../data/businessData';
import { X, Lock, ShieldCheck, Mail, ArrowRight, UserCheck, Activity, ShoppingBag, Scissors } from 'lucide-react';

const icons = {
  Activity,
  ShoppingBag,
  Scissors
};

export const AuthModal = () => {
  const { authModalState, closeBusinessLoginModal, loginToBusiness } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('••••••••••••');
  const [selectedRole, setSelectedRole] = useState('');

  const targetBiz = businesses.find((b) => b.id === authModalState.targetBusinessId);

  useEffect(() => {
    if (targetBiz) {
      setEmail(targetBiz.credentials.defaultEmail);
      setSelectedRole(targetBiz.credentials.role);
    }
  }, [targetBiz]);

  if (!authModalState.isOpen || !targetBiz) return null;

  const IconComponent = icons[targetBiz.iconName] || ShieldCheck;

  const handleSubmit = (e) => {
    e.preventDefault();
    loginToBusiness(targetBiz.id, email, selectedRole);
  };

  const getBadgeColors = () => {
    if (targetBiz.id === 'hospital') return 'border-teal-500/30 text-teal-400 bg-teal-500/10';
    if (targetBiz.id === 'ecommerce') return 'border-purple-500/30 text-purple-400 bg-purple-500/10';
    return 'border-amber-500/30 text-amber-400 bg-amber-500/10';
  };

  const getButtonBg = () => {
    if (targetBiz.id === 'hospital') return 'bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500 shadow-teal-500/20';
    if (targetBiz.id === 'ecommerce') return 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-purple-500/20';
    return 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 shadow-amber-500/20';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl">
        {/* Glow Header */}
        <div className={`p-6 border-b border-slate-800 flex items-start justify-between relative`}>
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl border ${getBadgeColors()}`}>
              <IconComponent className="w-6 h-6" />
            </div>
            <div>
              <span className={`text-xs font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${getBadgeColors()}`}>
                {targetBiz.category}
              </span>
              <h3 className="text-xl font-bold text-white mt-1">{targetBiz.name}</h3>
              <p className="text-xs text-slate-400">Enterprise Dedicated Login Portal</p>
            </div>
          </div>
          <button
            onClick={closeBusinessLoginModal}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <div className="text-xs text-slate-300">
              <span className="font-semibold text-white">Single-Sign-On Verified: </span>
              Your master executive session token is recognized. You can enter with executive credentials.
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Business User Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Security Password / Passkey</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Access Role Privilege</label>
            <div className="relative">
              <UserCheck className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer"
              >
                <option value={targetBiz.credentials.role}>{targetBiz.credentials.role} (Default Executive)</option>
                <option value="Senior Operations Manager">Senior Operations Manager</option>
                <option value="Finance & Audit Director">Finance & Audit Director</option>
                <option value="Staff & Department Specialist">Staff & Department Specialist</option>
              </select>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className={`w-full py-3 px-4 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg transition-all transform active:scale-[0.99] ${getButtonBg()}`}
            >
              <span>Authenticate & Enter {targetBiz.id.toUpperCase()} Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        <div className="bg-slate-950/80 px-6 py-3 border-t border-slate-800 text-center text-xs text-slate-500">
          Secured by OmniCorp Enterprise Multi-Tenant Gateway • 256-Bit SSL
        </div>
      </div>
    </div>
  );
};
