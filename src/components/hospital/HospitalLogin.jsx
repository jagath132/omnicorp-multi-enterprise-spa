import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Activity, 
  Lock, 
  Mail, 
  ArrowLeft, 
  ArrowRight, 
  ShieldCheck, 
  User, 
  Stethoscope, 
  FileText
} from 'lucide-react';

export const HospitalLogin = ({ onLoginSuccess, onBackToHospital }) => {
  const { addToast } = useAuth();
  const [activeTab, setActiveTab] = useState('patient'); // 'patient' | 'staff'
  const [email, setEmail] = useState('chief.doctor@auracare.med');
  const [password, setPassword] = useState('hospital2026');
  const [mrnNumber, setMrnNumber] = useState('MD-SURG-482');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      addToast(
        activeTab === 'patient' 
          ? 'Welcome to AuraCare MyHealth Patient Portal!' 
          : 'Authenticated to AuraCare Clinical EMR Dashboard', 
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
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-teal-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Back Link */}
      <div className="w-full max-w-md mb-6 flex items-center justify-between relative z-10">
        <button
          onClick={onBackToHospital}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-teal-300 transition-colors bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Executive Hub</span>
        </button>

        <span className="text-[11px] font-mono text-teal-400 bg-teal-500/10 border border-teal-500/20 px-2.5 py-0.5 rounded-full">
          Hospital EMR Gateway
        </span>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl p-7 sm:p-9 shadow-2xl backdrop-blur-2xl relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-6 space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-teal-400 flex items-center justify-center mx-auto shadow-lg shadow-teal-500/10">
            <Activity className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-heading font-extrabold text-white">
            AuraCare Hospital Portal
          </h1>
          <p className="text-xs text-slate-400">
            Sign in to access patient records, clinical triage, and hospital services
          </p>
        </div>

        {/* Tab Switcher: Patient vs Medical Staff */}
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-950 rounded-2xl border border-slate-800 mb-6">
          <button
            type="button"
            onClick={() => {
              setActiveTab('staff');
              setEmail('chief.doctor@auracare.med');
              setMrnNumber('MD-SURG-482');
            }}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'staff'
                ? 'bg-teal-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Doctor / Staff</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('patient');
              setEmail('patient.smith@auracare.med');
              setMrnNumber('AC-849204');
            }}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'patient'
                ? 'bg-teal-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Patient Portal</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              {activeTab === 'patient' ? 'Patient Email Address' : 'Doctor / Staff Institutional Email'}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-white text-xs focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              {activeTab === 'patient' ? 'Medical Record Number (MRN)' : 'Medical License / Staff ID'}
            </label>
            <div className="relative">
              <FileText className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={mrnNumber}
                onChange={(e) => setMrnNumber(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-white text-xs focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all font-mono"
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
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-white text-xs focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all font-medium"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold text-xs shadow-lg shadow-teal-500/25 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying Hospital Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In & Open Hospital Website</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Footer Security Badges */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-center gap-4 text-[11px] text-slate-500">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-400" /> HIPAA Compliant
          </span>
          <span>•</span>
          <span>HL7 FHIR Certified</span>
        </div>
      </div>
    </div>
  );
};
