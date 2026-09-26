import React from 'react';
import { CheckCircle2, Clock, AlertCircle, Check } from 'lucide-react';

interface BadgeProps {
  type: 'lengkap' | 'belum_lengkap' | 'sudah_kembali' | 'belum_kembali' | 'terlambat' | 'unit' | 'custom';
  text?: string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<BadgeProps> = ({ type, text, size = 'sm' }) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs';

  switch (type) {
    case 'lengkap':
      return (
        <span
          className={`inline-flex items-center gap-1 font-semibold rounded-md bg-[#EAF4FF] text-[#0D47A1] border border-[#1976D2]/25 ${sizeClasses}`}
        >
          <CheckCircle2 className="w-3 h-3 text-[#1976D2]" strokeWidth={2.5} />
          <span>{text || 'Lengkap'}</span>
        </span>
      );

    case 'belum_lengkap':
      return (
        <span
          className={`inline-flex items-center gap-1 font-semibold rounded-md bg-amber-50 text-amber-900 border border-amber-200/80 ${sizeClasses}`}
        >
          <AlertCircle className="w-3 h-3 text-amber-600" strokeWidth={2.5} />
          <span>{text || 'Belum Lengkap'}</span>
        </span>
      );

    case 'sudah_kembali':
      return (
        <span
          className={`inline-flex items-center gap-1 font-medium rounded-md bg-blue-50 text-[#0D47A1] border border-blue-100 ${sizeClasses}`}
        >
          <Check className="w-3 h-3 text-[#1976D2]" strokeWidth={2.5} />
          <span>{text || 'Sudah Kembali'}</span>
        </span>
      );

    case 'belum_kembali':
      return (
        <span
          className={`inline-flex items-center gap-1 font-medium rounded-md bg-slate-100 text-slate-700 border border-slate-200 ${sizeClasses}`}
        >
          <Clock className="w-3 h-3 text-slate-500" strokeWidth={2} />
          <span>{text || 'Belum Kembali'}</span>
        </span>
      );

    case 'terlambat':
      return (
        <span
          className={`inline-flex items-center gap-1 font-semibold rounded-md bg-rose-50 text-rose-800 border border-rose-200 ${sizeClasses}`}
        >
          <AlertCircle className="w-3 h-3 text-rose-600" strokeWidth={2.5} />
          <span>{text || 'Terlambat'}</span>
        </span>
      );

    case 'unit':
      return (
        <span
          className={`inline-flex items-center font-medium rounded-md bg-[#F1F5F9] text-slate-600 border border-slate-200/60 ${sizeClasses}`}
        >
          {text}
        </span>
      );

    default:
      return (
        <span
          className={`inline-flex items-center font-medium rounded-md bg-slate-100 text-slate-700 ${sizeClasses}`}
        >
          {text}
        </span>
      );
  }
};
