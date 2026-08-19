import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useAuth();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center justify-between p-4 rounded-xl shadow-2xl backdrop-blur-xl border transition-all duration-300 transform translate-y-0 animate-in fade-in slide-in-from-bottom-3 ${
            toast.type === 'success'
              ? 'bg-emerald-950/90 text-emerald-100 border-emerald-500/40 shadow-emerald-950/50'
              : toast.type === 'warning'
              ? 'bg-amber-950/90 text-amber-100 border-amber-500/40 shadow-amber-950/50'
              : 'bg-slate-900/90 text-slate-100 border-blue-500/40 shadow-blue-950/50'
          }`}
        >
          <div className="flex items-center gap-3">
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
            {toast.type === 'warning' && <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-blue-400 shrink-0" />}
            <p className="text-sm font-medium leading-snug">{toast.message}</p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
