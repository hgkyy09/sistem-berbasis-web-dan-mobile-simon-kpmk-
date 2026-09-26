import React, { useState } from 'react';
import {
  FileText,
  Bell,
  CheckCircle2,
  BarChart2,
  ArrowLeft,
  Sparkles,
  RefreshCw,
  Plus,
} from 'lucide-react';
import { Button } from '../common/Buttons';

interface EmptyStatesScreenProps {
  onBack: () => void;
  onAction?: (actionType: string) => void;
}

type EmptyStateType = 'records' | 'notifications' | 'all_complete' | 'monitoring';

export const EmptyStatesScreen: React.FC<EmptyStatesScreenProps> = ({
  onBack,
  onAction,
}) => {
  const [selectedState, setSelectedState] = useState<EmptyStateType>('records');

  const states = [
    { id: 'records' as EmptyStateType, label: 'Tanpa Rekam Medis' },
    { id: 'notifications' as EmptyStateType, label: 'Tanpa Notifikasi' },
    { id: 'all_complete' as EmptyStateType, label: 'Semua Lengkap (100%)' },
    { id: 'monitoring' as EmptyStateType, label: 'Tanpa Data Monitoring' },
  ];

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
            Empty States Showcase
          </h2>
          <span className="text-[11px] text-slate-500">Screen 12 Preview</span>
        </div>

        <div className="w-9" />
      </div>

      {/* State Switcher Tabs */}
      <div className="px-5 pt-3">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {states.map((st) => (
            <button
              key={st.id}
              onClick={() => setSelectedState(st.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedState === st.id
                  ? 'bg-[#1976D2] text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {/* Active Empty State Card Display */}
      <div className="px-5 pt-6">
        <div className="bg-white border border-slate-200/90 rounded-3xl p-8 text-center shadow-sm min-h-[380px] flex flex-col items-center justify-center">
          {selectedState === 'records' && (
            <div className="flex flex-col items-center max-w-[280px]">
              <div className="w-16 h-16 rounded-3xl bg-[#EAF4FF] text-[#1976D2] border border-[#1976D2]/20 flex items-center justify-center mb-4 shadow-sm">
                <FileText className="w-8 h-8 stroke-[1.8]" />
              </div>

              <h3 className="text-base font-bold text-slate-900">
                Tidak Ada Rekam Medis
              </h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Belum ada data berkas rekam medis yang terdaftar pada sistem atau filter pencarian tidak menemukan hasil.
              </p>

              <div className="mt-6 flex flex-col gap-2 w-full">
                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  icon={<Plus className="w-4 h-4 stroke-[2.5]" />}
                  onClick={() => onAction && onAction('add_record')}
                >
                  Tambah Rekam Medis Baru
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  onClick={() => onAction && onAction('reset_filter')}
                >
                  Segarkan Halaman
                </Button>
              </div>
            </div>
          )}

          {selectedState === 'notifications' && (
            <div className="flex flex-col items-center max-w-[280px]">
              <div className="w-16 h-16 rounded-3xl bg-[#EAF4FF] text-[#1976D2] border border-[#1976D2]/20 flex items-center justify-center mb-4 shadow-sm">
                <Bell className="w-8 h-8 stroke-[1.8]" />
              </div>

              <h3 className="text-base font-bold text-slate-900">
                Tidak Ada Notifikasi Baru
              </h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Semua pemberitahuan telah dibaca. Anda akan menerima notifikasi jika ada berkas terlambat atau kelengkapan yang perlu diverifikasi.
              </p>

              <div className="mt-6 w-full">
                <Button
                  variant="outline"
                  size="md"
                  fullWidth
                  icon={<RefreshCw className="w-4 h-4" />}
                  onClick={() => onAction && onAction('refresh_notif')}
                >
                  Cek Notifikasi Baru
                </Button>
              </div>
            </div>
          )}

          {selectedState === 'all_complete' && (
            <div className="flex flex-col items-center max-w-[280px]">
              <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mb-4 shadow-sm">
                <CheckCircle2 className="w-8 h-8 stroke-[2]" />
              </div>

              <div className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 rounded-full mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>100% Kepatuhan Standar</span>
              </div>

              <h3 className="text-base font-bold text-slate-900 mt-1">
                Semua Rekam Medis Sudah Lengkap
              </h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Luar biasa! Seluruh berkas rekam medis pada periode ini telah memenuhi 8 kriteria kelengkapan dan resume medis DPJP.
              </p>

              <div className="mt-6 w-full">
                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  onClick={() => onAction && onAction('view_report')}
                >
                  Unduh Laporan Kepatuhan
                </Button>
              </div>
            </div>
          )}

          {selectedState === 'monitoring' && (
            <div className="flex flex-col items-center max-w-[280px]">
              <div className="w-16 h-16 rounded-3xl bg-slate-100 text-slate-500 border border-slate-200 flex items-center justify-center mb-4 shadow-sm">
                <BarChart2 className="w-8 h-8 stroke-[1.8]" />
              </div>

              <h3 className="text-base font-bold text-slate-900">
                Tidak Ada Data Monitoring
              </h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Belum ada transaksi rekam medis atau kunjungan pasien yang tercatat pada rentang periode yang Anda pilih.
              </p>

              <div className="mt-6 w-full">
                <Button
                  variant="outline"
                  size="md"
                  fullWidth
                  onClick={() => onAction && onAction('change_period')}
                >
                  Ubah Rentang Periode
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
