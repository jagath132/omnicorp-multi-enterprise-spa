import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Layers, 
  Lock, 
  Mail, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  Activity, 
  ShoppingBag, 
  Zap
} from 'lucide-react';

export const MasterLogin = () => {
  const { masterLogin, addToast } = useAuth();
  const [email, setEmail] = useState('admin@mail.com');
  const [password, setPassword] = useState('Admin@123');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      addToast('Please enter your executive email address', 'error');
      return;
    }
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      masterLogin(email);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col lg:flex-row relative overflow-hidden font-sans selection:bg-blue-500 selection:text-white">
      {/* LEFT COLUMN: Immersive Enterprise Brand Showcase (Visible on lg+) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-12 xl:p-16 flex-col justify-between border-r border-slate-800/80 overflow-hidden">
        {/* Subtle Ambient Orbs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Brand Header */}
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 p-[2px] shadow-xl shadow-blue-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Layers className="w-5 h-5 text-blue-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-black text-xl tracking-tight text-white">OMNICORP</span>
                <span className="text-[10px] font-extrabold bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded-full">
                  ENTERPRISE
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">Executive Management Ecosystem</p>
            </div>
          </div>
        </div>

        {/* Center Editorial Pitch */}
        <div className="relative z-10 max-w-lg space-y-6 my-auto py-12">
          <h2 className="text-4xl xl:text-5xl font-heading font-extrabold text-white leading-tight tracking-tight">
            One Master Key. <br />
            <span className="bg-gradient-to-r from-blue-400 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
              Three Global Enterprises.
            </span>
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed">
            Gain immediate oversight and operational control over your healthcare institutes, direct-to-consumer e-commerce, and high-performance EV fleet mobility.
          </p>

          {/* 3 Enterprises Live Telemetry Cards */}
          <div className="space-y-3 pt-4">
            <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
              <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20 shrink-0">
                <Activity className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold text-white">AuraCare Multi-Specialty Hospital</div>
                <div className="text-[11px] text-slate-400">450+ Tertiary Beds & 24/7 Clinical Emergency</div>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                Live
              </span>
            </div>

            <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 shrink-0">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold text-white">NexTrend Direct & Retail Commerce</div>
                <div className="text-[11px] text-slate-400">Amazon-Scale Storefront & Prime Global Logistics</div>
              </div>
              <span className="text-[10px] font-mono text-purple-300 bg-purple-950/60 border border-purple-500/30 px-2 py-0.5 rounded-full">
                Active
              </span>
            </div>

            <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
                <Zap className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold text-white">VoltDrive Mobility & Fleet Logistics</div>
                <div className="text-[11px] text-slate-400">EV Automotive Showroom & 480+ Connected Fleet</div>
              </div>
              <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded-full">
                Connected
              </span>
            </div>
          </div>
        </div>

        {/* Empty bottom spacer for balance */}
        <div className="relative z-10" />
      </div>

      {/* RIGHT COLUMN: Ultra-Clean Executive Login Card */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 lg:p-16 relative z-10 my-auto">
        <div className="w-full max-w-md space-y-6">
          {/* Mobile-Only Header Brand */}
          <div className="lg:hidden flex items-center justify-center gap-3 text-center mb-4">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 p-[2px] shadow-lg shadow-blue-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[12px] flex items-center justify-center">
                <Layers className="w-5 h-5 text-blue-400" />
              </div>
            </div>
            <div className="text-left">
              <span className="font-heading font-extrabold text-lg tracking-tight text-white">OMNICORP</span>
              <p className="text-[11px] text-slate-400">Executive Master Portal</p>
            </div>
          </div>

          {/* Card Container */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-2xl relative">
            {/* Header */}
            <div className="mb-8 space-y-2">
              <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white tracking-tight">
                Welcome back
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Enter your executive credentials to access your multi-enterprise dashboard.
              </p>
            </div>

            {/* Authentication Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Input */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  Executive Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@omnicorpgroup.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-700/80 text-white text-xs font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-300">Master Password</label>
                  <button
                    type="button"
                    onClick={() => addToast('Password reset instructions sent to your corporate email', 'info')}
                    className="text-xs text-blue-400 hover:text-blue-300 font-medium hover:underline transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter master password"
                    className="w-full pl-10 pr-12 py-3 rounded-xl bg-slate-950 border border-slate-700/80 text-white text-xs font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowPassword((prev) => !prev);
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors z-20 cursor-pointer"
                    title={showPassword ? 'Hide password' : 'Show password'}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4 text-blue-400" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Primary Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs shadow-xl shadow-blue-500/25 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Authenticating Master Session...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In to Executive Hub</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
