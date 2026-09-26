import React, { useState } from 'react';
import {
  ArrowLeft,
  WifiOff,
  ServerCrash,
  RefreshCw,
  Loader2,
  CheckCircle,
} from 'lucide-react';
import { Button } from '../common/Buttons';

interface LoadingErrorScreenProps {
  onBack: () => void;
}

type StateOption = 'skeleton' | 'spinner' | 'network_error' | 'server_error';

export const LoadingErrorScreen: React.FC<LoadingErrorScreenProps> = ({
  onBack,
}) => {
  const [activeState, setActiveState] = useState<StateOption>('skeleton');
  const [isRetrying, setIsRetrying] = useState(false);
  const [retrySuccess, setRetrySuccess] = useState(false);

  const handleRetry = () => {
    setIsRetrying(true);
    setRetrySuccess(false);
    setTimeout(() => {
      setIsRetrying(false);
      setRetrySuccess(true);
      setTimeout(() => setRetrySuccess(false), 2000);
    }, 1000);
  };

  return (
    <div className="w-full pb-24 bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 px-5 pt-3 pb-3 flex items-center justify-between sticky top-0 z-20 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-xl bg-slate-50 hover:bg-[#EAF4FF] text-slate-700 hover:text-[#1976D2] flex items-center justify-center border border-slate-200/60"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
        </button>

        <div className="text-center">
          <h2 className="text-sm font-bold text-slate-900 tracking-tight">
            Loading & Error States
          </h2>
          <span className="text-[11px] text-slate-500">Screen 13 Preview</span>
        </div>

        <div className="w-9" />
      </div>

      {/* Tabs */}
      <div className="px-5 pt-3">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {[
            { id: 'skeleton' as StateOption, label: 'Skeleton' },
            { id: 'spinner' as StateOption, label: 'Spinner' },
            { id: 'network_error' as StateOption, label: 'Network Error' },
            { id: 'server_error' as StateOption, label: 'Server 500' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveState(item.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeState === item.id
                  ? 'bg-[#1976D2] text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 pt-4">
        {/* State 1: Skeleton Loading */}
        {activeState === 'skeleton' && (
          <div className="space-y-4">
            <div className="text-xs text-slate-500 font-medium">
              Simulasi Skeleton Placeholder saat memuat berkas rekam medis:
            </div>

            {/* Skeleton summary card */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm animate-pulse space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-24 h-4 bg-slate-200 rounded-md" />
                <div className="w-16 h-4 bg-slate-200 rounded-md" />
              </div>
              <div className="w-3/4 h-6 bg-slate-200 rounded-lg" />
              <div className="grid grid-cols-3 gap-2 pt-2">
                <div className="h-12 bg-slate-100 rounded-xl" />
                <div className="h-12 bg-slate-100 rounded-xl" />
                <div className="h-12 bg-slate-100 rounded-xl" />
              </div>
            </div>

            {/* Skeleton list items */}
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm animate-pulse space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="w-28 h-3.5 bg-slate-200 rounded" />
                  <div className="w-14 h-4 bg-slate-200 rounded-full" />
                </div>
                <div className="w-48 h-4 bg-slate-200 rounded" />
                <div className="flex items-center gap-2 pt-1">
                  <div className="w-20 h-5 bg-slate-100 rounded" />
                  <div className="w-20 h-5 bg-slate-100 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* State 2: Spinner Loading State */}
        {activeState === 'spinner' && (
          <div className="bg-white border border-slate-200/90 rounded-3xl p-10 text-center shadow-sm min-h-[380px] flex flex-col items-center justify-center">
            <div className="relative mb-4">
              <div className="w-16 h-16 rounded-full border-4 border-[#EAF4FF] border-t-[#1976D2] animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 bg-[#1976D2] rounded-full" />
              </div>
            </div>

            <h3 className="text-base font-bold text-slate-900">
              Sinkronisasi Rekam Medis
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-[240px]">
              Menghubungkan ke server database SIMRS & memvalidasi data rekam medis...
            </p>

            <span className="text-[11px] text-slate-400 mt-5 font-mono">
              Mohon tunggu sebentar...
            </span>
          </div>
        )}

        {/* State 3: Network Error */}
        {activeState === 'network_error' && (
          <div className="bg-white border border-slate-200/90 rounded-3xl p-8 text-center shadow-sm min-h-[380px] flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-3xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center mb-4 shadow-sm">
              <WifiOff className="w-8 h-8 stroke-[1.8]" />
            </div>

            <h3 className="text-base font-bold text-slate-900">
              Koneksi Jaringan Terputus
            </h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed max-w-[260px]">
              Tidak dapat terhubung ke jaringan internal rumah sakit. Pastikan koneksi Wi-Fi atau data seluler Anda aktif.
            </p>

            {retrySuccess && (
              <div className="mt-3 p-2 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-xl flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4" />
                <span>Koneksi berhasil dipulihkan!</span>
              </div>
            )}

            <div className="mt-6 w-full max-w-[220px]">
              <Button
                variant="primary"
                size="md"
                fullWidth
                loading={isRetrying}
                icon={<RefreshCw className="w-4 h-4" />}
                onClick={handleRetry}
              >
                Coba Lagi (Retry)
              </Button>
            </div>
          </div>
        )}

        {/* State 4: Server Error 500 */}
        {activeState === 'server_error' && (
          <div className="bg-white border border-slate-200/90 rounded-3xl p-8 text-center shadow-sm min-h-[380px] flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-3xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mb-4 shadow-sm">
              <ServerCrash className="w-8 h-8 stroke-[1.8]" />
            </div>

            <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold font-mono mb-1">
              ERR_500: INTERNAL SERVER ERROR
            </div>

            <h3 className="text-base font-bold text-slate-900 mt-1">
              Gangguan Layanan Server
            </h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed max-w-[260px]">
              Terjadi kendala pada layanan repositori berkas SIMON KPMK. Tim IT sedang melakukan perbaikan.
            </p>

            {retrySuccess && (
              <div className="mt-3 p-2 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-xl flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4" />
                <span>Layanan server normal kembali!</span>
              </div>
            )}

            <div className="mt-6 w-full max-w-[220px]">
              <Button
                variant="primary"
                size="md"
                fullWidth
                loading={isRetrying}
                icon={<RefreshCw className="w-4 h-4" />}
                onClick={handleRetry}
              >
                Muat Ulang Halaman
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
