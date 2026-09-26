import React from 'react';
import { SimonLogo } from '../common/SimonLogo';
import { ArrowRight, ShieldCheck } from 'lucide-react';

interface SplashScreenProps {
  onContinue: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onContinue }) => {
  return (
    <div className="w-full min-h-[640px] flex items-center justify-center py-6 px-4">
      <div className="w-full max-w-md bg-white border border-slate-200/90 rounded-3xl p-8 shadow-sm flex flex-col justify-between items-center relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#EAF4FF] rounded-full blur-3xl opacity-60 pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#EAF4FF] rounded-full blur-3xl opacity-60 pointer-events-none" />

        {/* Top institution tag */}
        <div className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wider uppercase text-[#1976D2] bg-[#EAF4FF] px-3.5 py-1 rounded-full border border-[#1976D2]/20">
          <ShieldCheck className="w-3.5 h-3.5 text-[#1976D2]" />
          <span>RSUD Muara Enim · Sumatera Selatan</span>
        </div>

      {/* Center Logo & Branding */}
      <div className="flex flex-col items-center text-center my-auto">
        <div className="mb-6 transform hover:scale-105 transition-transform duration-300">
          <SimonLogo size="xl" />
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-[#0D47A1]">
          SIMON <span className="text-[#1976D2]">KPMK</span>
        </h1>

        <p className="text-sm font-semibold text-slate-700 mt-2 max-w-[270px]">
          Monitoring Kelengkapan, Tracer & Pengembalian Rekam Medis
        </p>

        <p className="text-xs text-[#1976D2] font-semibold mt-1 max-w-[260px]">
          Dibuat Khusus untuk RSUD Muara Enim
        </p>
        <p className="text-[11px] text-slate-500 mt-0.5 max-w-[250px]">
          Instalasi Rekam Medis & PMK RSUD Dr. H. Mohamad Rabain
        </p>

        {/* Blue pulse loading indicator */}
        <div className="mt-8 flex flex-col items-center gap-2">
          <div className="w-40 h-1.5 bg-[#EAF4FF] rounded-full overflow-hidden">
            <div className="w-24 h-full bg-[#1976D2] rounded-full animate-[pulse_1.5s_ease-in-out_infinite]" />
          </div>
          <span className="text-[11px] font-medium text-slate-400">
            Memuat sistem rekam medis...
          </span>
        </div>
      </div>

        {/* Bottom Action */}
        <div className="w-full flex flex-col items-center gap-3 pt-6 pb-2">
          <button
            onClick={onContinue}
            className="w-full h-12 bg-[#1976D2] hover:bg-[#0D47A1] active:scale-[0.98] text-white font-semibold rounded-xl text-sm flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(25,118,210,0.25)] transition-all"
          >
            <span>Masuk ke Aplikasi</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <span className="text-[11px] text-slate-400">
            Versi 2.4.0 · Dibuat untuk RSUD Muara Enim
          </span>
        </div>
      </div>
    </div>
  );
};
