import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  ShoppingBag, 
  ArrowRight, 
  ChevronRight, 
  ChevronDown, 
  AlertCircle, 
  CheckCircle2, 
  Lock, 
  Mail, 
  ShieldCheck,
  ArrowLeft
} from 'lucide-react';

export const AmazonSignIn = ({ onLoginSuccess, onBackToStore }) => {
  const { addToast } = useAuth();
  const [emailOrPhone, setEmailOrPhone] = useState('alexander.s@omnicorpgroup.com');
  const [password, setPassword] = useState('••••••••••••');
  const [step, setStep] = useState(1); // 1: Email, 2: Password
  const [keepSignedIn, setKeepSignedIn] = useState(true);
  const [showHelp, setShowHelp] = useState(false);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [newName, setNewName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = (e) => {
    e.preventDefault();
    if (!emailOrPhone.trim()) {
      addToast('Enter your email or mobile phone number', 'error');
      return;
    }
    setStep(2);
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const userName = emailOrPhone.includes('@') 
        ? emailOrPhone.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()) 
        : 'Alexander Sterling';
      
      const userData = {
        name: isCreatingAccount ? (newName || 'New Customer') : userName,
        email: emailOrPhone,
        isLoggedIn: true,
        primeMember: true,
        cartCount: 2
      };

      localStorage.setItem('nextrend_customer_user', JSON.stringify(userData));
      addToast(`Welcome back, ${userData.name}! Successfully signed in.`, 'success');
      
      if (onLoginSuccess) {
        onLoginSuccess(userData);
      }
    }, 800);
  };

  const handleDemoQuickLogin = (demoName, demoEmail) => {
    setEmailOrPhone(demoEmail);
    setPassword('demopass123');
    setStep(2);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-between py-8 px-4 text-slate-100 animate-in fade-in duration-300">
      {/* Top Header Logo */}
      <div className="w-full max-w-sm mx-auto text-center mb-6">
        <button
          onClick={onBackToStore}
          className="inline-flex items-center gap-2 group focus:outline-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 via-orange-500 to-yellow-400 p-[2px] shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[9px] flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
            </div>
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1">
              <span className="font-heading font-extrabold text-xl tracking-tight text-white">NEXTREND</span>
              <span className="text-[10px] font-bold text-amber-400">.store</span>
            </div>
          </div>
        </button>
      </div>

      {/* Main Amazon-Style Sign-In Card */}
      <div className="w-full max-w-[380px] mx-auto">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-7 shadow-2xl backdrop-blur-xl">
          <h1 className="text-2xl font-bold font-heading text-white mb-4">
            {isCreatingAccount ? 'Create account' : 'Sign in'}
          </h1>

          {/* Quick Demo Autofill Switcher */}
          <div className="mb-5 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-[11px] space-y-1.5">
            <span className="text-slate-400 font-semibold block">Quick 1-Click Demo Login:</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleDemoQuickLogin('Alexander Sterling', 'alexander.s@omnicorpgroup.com')}
                className="flex-1 py-1 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-medium border border-slate-700 truncate"
              >
                Executive Admin
              </button>
              <button
                type="button"
                onClick={() => handleDemoQuickLogin('Sarah Jenkins', 'sarah.j@lifestyle.com')}
                className="flex-1 py-1 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-medium border border-slate-700 truncate"
              >
                Prime Shopper
              </button>
            </div>
          </div>

          {isCreatingAccount ? (
            /* CREATE ACCOUNT FORM */
            <form onSubmit={handleSignInSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">Your name</label>
                <input
                  type="text"
                  required
                  placeholder="First and last name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">Mobile number or email</label>
                <input
                  type="text"
                  required
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">Password</label>
                <input
                  type="password"
                  required
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                />
                <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 text-amber-400" />
                  Passwords must be at least 6 characters.
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-b from-[#FFD814] to-[#F7CA00] hover:from-[#F7CA00] hover:to-[#E8BD00] text-slate-950 font-bold text-xs shadow-md border border-[#FCD200] transition-all flex items-center justify-center gap-1.5"
              >
                {isLoading ? 'Creating account...' : 'Verify mobile number / Continue'}
              </button>
            </form>
          ) : step === 1 ? (
            /* STEP 1: EMAIL / PHONE INPUT */
            <form onSubmit={handleContinue} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">
                  Email or mobile phone number
                </label>
                <input
                  type="text"
                  required
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-b from-[#FFD814] to-[#F7CA00] hover:from-[#F7CA00] hover:to-[#E8BD00] text-slate-950 font-bold text-xs shadow-md border border-[#FCD200] transition-all"
              >
                Continue
              </button>
            </form>
          ) : (
            /* STEP 2: PASSWORD INPUT */
            <form onSubmit={handleSignInSubmit} className="space-y-4">
              <div className="flex items-center justify-between text-xs pb-1">
                <span className="text-slate-300 font-medium truncate max-w-[200px]">{emailOrPhone}</span>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-amber-400 hover:underline text-[11px]"
                >
                  Change
                </button>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-200">Password</label>
                  <a href="#forgot" onClick={(e) => { e.preventDefault(); addToast('Password reset link dispatched', 'info'); }} className="text-[11px] text-amber-400 hover:underline">
                    Forgot your password?
                  </a>
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-b from-[#FFD814] to-[#F7CA00] hover:from-[#F7CA00] hover:to-[#E8BD00] text-slate-950 font-bold text-xs shadow-md border border-[#FCD200] transition-all flex items-center justify-center gap-1.5"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="keepSignedIn"
                  checked={keepSignedIn}
                  onChange={(e) => setKeepSignedIn(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-amber-400"
                />
                <label htmlFor="keepSignedIn" className="text-xs text-slate-300 select-none">
                  Keep me signed in. <span className="text-amber-400 hover:underline cursor-pointer">Details</span>
                </label>
              </div>
            </form>
          )}

          {/* Amazon-style Legal Disclaimer */}
          <div className="mt-5 pt-4 border-t border-slate-800 text-[11px] text-slate-400 leading-relaxed">
            By continuing, you agree to NexTrend's{' '}
            <a href="#conditions" className="text-amber-400 hover:underline">Conditions of Use</a>{' '}
            and{' '}
            <a href="#privacy" className="text-amber-400 hover:underline">Privacy Notice</a>.
          </div>

          {/* Need Help Dropdown Accordion */}
          <div className="mt-3 text-xs">
            <button
              type="button"
              onClick={() => setShowHelp(!showHelp)}
              className="flex items-center gap-1 text-amber-400 hover:underline text-[11px]"
            >
              <ChevronRight className={`w-3 h-3 transition-transform ${showHelp ? 'rotate-90' : ''}`} />
              <span>Need help?</span>
            </button>

            {showHelp && (
              <div className="pl-4 mt-2 space-y-1.5 text-[11px] text-slate-300">
                <a href="#forgot" className="block text-amber-400 hover:underline">Forgot your password?</a>
                <a href="#issues" className="block text-amber-400 hover:underline">Other issues with Sign-In</a>
              </div>
            )}
          </div>

          {/* Buying for work section */}
          <div className="mt-5 pt-4 border-t border-slate-800 text-xs">
            <div className="font-bold text-slate-200 text-xs">Buying for work?</div>
            <a href="#business" className="text-amber-400 hover:underline text-[11px]">
              Shop on NexTrend Business
            </a>
          </div>
        </div>

        {/* New to NexTrend? Divider & Create Account Button */}
        <div className="mt-6">
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-slate-800"></div>
            <span className="flex-shrink mx-3 text-xs text-slate-500 font-medium">
              {isCreatingAccount ? 'Already have an account?' : 'New to NexTrend?'}
            </span>
            <div className="flex-grow border-t border-slate-800"></div>
          </div>

          <button
            type="button"
            onClick={() => {
              setIsCreatingAccount(!isCreatingAccount);
              setStep(1);
            }}
            className="w-full mt-2 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs border border-slate-700 shadow-sm transition-all"
          >
            {isCreatingAccount ? 'Sign in to your account' : 'Create your NexTrend account'}
          </button>
        </div>

        {/* Back to Storefront Link */}
        <div className="text-center mt-6">
          <button
            onClick={onBackToStore}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-400 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Consumer Storefront</span>
          </button>
        </div>
      </div>

      {/* Amazon-Style Clean Footer */}
      <footer className="w-full max-w-xl mx-auto mt-12 pt-6 border-t border-slate-900 text-center space-y-3">
        <div className="flex items-center justify-center gap-6 text-[11px] text-amber-400">
          <a href="#terms" className="hover:underline">Conditions of Use</a>
          <a href="#privacy" className="hover:underline">Privacy Notice</a>
          <a href="#help" className="hover:underline">Help & Customer Support</a>
        </div>
        <p className="text-[10px] text-slate-500">
          © 2026, NexTrend.com, Inc. or its multi-enterprise affiliates
        </p>
      </footer>
    </div>
  );
};
