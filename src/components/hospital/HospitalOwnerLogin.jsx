import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Activity,
  Lock,
  Mail,
  ArrowRight,
  Eye,
  EyeOff,
  Heart,
  Shield,
  Users,
  ArrowLeft,
  CheckCircle2,
  KeyRound,
  LogOut
} from 'lucide-react';

const STATS = [
  { label: 'Active Patients', value: '12,480' },
  { label: 'Medical Staff', value: '640+' },
  { label: 'Departments', value: '24' },
];

const FEATURES = [
  'Full EMR & Clinical Dashboard Access',
  'Real-Time Patient Triage & Monitoring',
  'OT Scheduling & Surgical Planning',
  'Billing, Insurance & Compliance Suite',
];

export const HospitalOwnerLogin = ({ onLoginSuccess, onBack }) => {
  const { addToast } = useAuth();
  const [email, setEmail] = useState('admin@mail.com');
  const [password, setPassword] = useState('Admin@123');
  const [staffId, setStaffId] = useState('CMO-DIR-9001');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      addToast('Please enter your institutional email', 'error');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      addToast('Welcome, Chief Medical Director. Access granted.', 'success');
      if (onLoginSuccess) onLoginSuccess();
    }, 700);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col lg:flex-row text-slate-100 font-sans overflow-hidden">

      {/* ─── LEFT BRAND PANEL ─── */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 xl:p-16 overflow-hidden bg-gradient-to-br from-slate-950 via-teal-950/40 to-slate-950 border-r border-teal-900/30">
        {/* Ambient glows */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '40px 40px' }} />

        {/* Brand */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-2xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center">
              <Activity className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <div className="text-sm font-black tracking-widest text-white uppercase">AuraCare</div>
              <div className="text-[10px] text-teal-400 font-semibold tracking-wider">Multi-Specialty Hospital</div>
            </div>
          </div>

          <h2 className="text-4xl xl:text-5xl font-extrabold text-white leading-tight mb-4 font-heading">
            Healthcare<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">
              Command Centre
            </span>
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
            Unified clinical operations, patient management, and hospital administration in one secure executive portal.
          </p>
        </div>

        {/* Stats */}
        <div className="relative z-10 space-y-8">
          <div className="grid grid-cols-3 gap-4">
            {STATS.map((s) => (
              <div key={s.label} className="bg-slate-900/60 border border-teal-900/40 rounded-2xl p-4 backdrop-blur-sm">
                <div className="text-xl font-extrabold text-white font-heading">{s.value}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            {FEATURES.map((f) => (
              <div key={f} className="flex items-center gap-2.5 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>{f}</span>
              </div>
            ))}
          </div>


        </div>
      </div>

      {/* ─── RIGHT FORM PANEL ─── */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 sm:px-10 relative">
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md relative z-10">

          {/* Back button */}
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-teal-300 transition-colors mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Hub</span>
          </button>

          {/* Mobile brand */}
          <div className="flex items-center gap-2.5 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center">
              <Activity className="w-4 h-4 text-teal-400" />
            </div>
            <span className="font-black tracking-widest text-white uppercase text-sm">AuraCare Hospital</span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[11px] font-bold mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              Healthcare Division — Owner Access
            </div>
            <h1 className="text-3xl font-extrabold text-white font-heading leading-tight">
              Director Sign In
            </h1>
            <p className="text-sm text-slate-400 mt-2">
              Enter your credentials to access the hospital management portal.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2">Institutional Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/50 transition-all placeholder:text-slate-600"
                />
              </div>
            </div>



            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/50 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-500 hover:text-teal-400 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm transition-all shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2.5 active:scale-[0.98] disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In & Enter Hospital Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
