import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  description?: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-14 left-0 right-0 z-50 pointer-events-none px-4 flex flex-col items-center gap-2">
      {toasts.map((toast) => {
        return (
          <div
            key={toast.id}
            className="pointer-events-auto w-full max-w-[358px] bg-white border border-slate-200/90 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] p-3.5 flex items-start gap-3 animate-in fade-in slide-in-from-top-4 duration-200"
          >
            <div className="shrink-0 mt-0.5">
              {toast.type === 'success' && (
                <CheckCircle2 className="w-5 h-5 text-[#1976D2]" />
              )}
              {toast.type === 'warning' && (
                <AlertTriangle className="w-5 h-5 text-amber-500" />
              )}
              {toast.type === 'error' && (
                <XCircle className="w-5 h-5 text-rose-500" />
              )}
              {toast.type === 'info' && (
                <Info className="w-5 h-5 text-[#0D47A1]" />
              )}
            </div>

            <div className="flex-1 min-w-0 pr-1">
              <p className="text-xs font-semibold text-slate-900 leading-tight">
                {toast.title}
              </p>
              {toast.description && (
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                  {toast.description}
                </p>
              )}
            </div>

            <button
              onClick={() => onDismiss(toast.id)}
              className="shrink-0 p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              aria-label="Tutup notifikasi"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
