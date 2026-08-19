import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Zap, 
  Lock, 
  Mail, 
  ArrowLeft, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  Car, 
  Gauge
} from 'lucide-react';

export const VoltDriveLogin = ({ onLoginSuccess, onBackToShowroom }) => {
  const { addToast } = useAuth();
  const [roleType, setRoleType] = useState('fleet'); // 'fleet' | 'driver'
  const [email, setEmail] = useState('fleet.director@voltdrive.com');
  const [password, setPassword] = useState('voltdrive2026');
  const [fleetId, setFleetId] = useState('FL-CORP-8802');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      addToast(
        roleType === 'fleet' 
          ? 'Authenticated to VoltDrive Corporate Telematics Fleet Console!' 
          : 'Welcome VIP Chauffeur Driver #482', 
        'success'
      );
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    }, 700);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center py-12 px-4 sm:px-6 relative overflow-hidden font-sans">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Back Link */}
      <div className="w-full max-w-md mb-6 flex items-center justify-between relative z-10">
        <button
          onClick={onBackToShowroom}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-300 transition-colors bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Executive Hub</span>
        </button>

        <span className="text-[11px] font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          Telematics Cloud
        </span>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl p-7 sm:p-9 shadow-2xl backdrop-blur-2xl relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-6 space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/10">
            <Zap className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-heading font-extrabold text-white">
            VoltDrive Fleet Portal
          </h1>
          <p className="text-xs text-slate-400">
            Sign in to access fleet telematics, VIP rentals, and vehicle specs
          </p>
        </div>

        {/* Tab Switcher: Fleet Director vs Chauffeur Driver */}
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-950 rounded-2xl border border-slate-800 mb-6">
          <button
            type="button"
            onClick={() => {
              setRoleType('fleet');
              setEmail('fleet.director@voltdrive.com');
              setFleetId('FL-CORP-8802');
            }}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              roleType === 'fleet'
                ? 'bg-cyan-500 text-slate-950 font-extrabold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Fleet Manager</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setRoleType('driver');
              setEmail('driver.vip482@voltdrive.com');
              setFleetId('DRV-VIP-482');
            }}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              roleType === 'driver'
                ? 'bg-cyan-500 text-slate-950 font-extrabold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Car className="w-3.5 h-3.5" />
            <span>VIP Chauffeur</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Corporate Account Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-white text-xs focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              {roleType === 'fleet' ? 'Fleet Account ID' : 'Chauffeur Badge ID'}
            </label>
            <div className="relative">
              <Gauge className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={fleetId}
                onChange={(e) => setFleetId(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-white text-xs focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-white text-xs focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-medium"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                  <span>Connecting to Fleet GPS...</span>
                </>
              ) : (
                <>
                  <span>Sign In & Open EV Showroom</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Footer Security Badges */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-center gap-4 text-[11px] text-slate-500">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> 256-Bit Telematics TLS
          </span>
          <span>•</span>
          <span>ISO 27001 Certified</span>
        </div>
      </div>
    </div>
  );
};
