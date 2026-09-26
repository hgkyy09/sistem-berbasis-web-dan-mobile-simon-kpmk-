import React from 'react';
import {
  Bell,
  Search,
  PlusCircle,
  ClipboardCheck,
  RotateCcw,
  BarChart3,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  MapPin,
} from 'lucide-react';
import { MedicalRecord, ScreenId } from '../../types';
import { StatusBadge } from '../common/Badge';
import { SimonLogo } from '../common/SimonLogo';

interface HomeScreenProps {
  records: MedicalRecord[];
  onNavigate: (screen: ScreenId) => void;
  onSelectRecord: (record: MedicalRecord) => void;
  onOpenAddModal: () => void;
  unreadCount?: number;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  records,
  onNavigate,
  onSelectRecord,
  onOpenAddModal,
  unreadCount = 2,
}) => {
  // Compute counts
  const totalToday = records.length;
  const belumLengkap = records.filter((r) => !r.isComplete).length;
  const lengkap = records.filter((r) => r.isComplete).length;
  const belumKembali = records.filter((r) => !r.isReturned).length;
  const sudahKembali = records.filter((r) => r.isReturned).length;
  const completenessPercent = Math.round((lengkap / (totalToday || 1)) * 100);

  return (
    <div className="w-full pb-24 bg-[#F8FAFC]">
      {/* Top Header - Mobile only (hidden on desktop workstation to avoid duplicate headers) */}
      <div className="bg-white px-5 pt-3 pb-4 border-b border-slate-100 flex items-center justify-between sticky top-0 z-20 shadow-[0_2px_8px_rgba(0,0,0,0.02)] md:hidden">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-[#EAF4FF] border border-[#1976D2]/20 flex items-center justify-center text-[#1976D2] font-bold text-sm">
              HA
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-[#1976D2] font-bold uppercase tracking-wider">RSUD Muara Enim</span>
            </div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight leading-tight">
              Halo, Hengki Aditya
            </h2>
          </div>
        </div>

        <button
          onClick={() => onNavigate('notifications')}
          className="relative w-10 h-10 rounded-xl bg-slate-50 hover:bg-[#EAF4FF] text-slate-600 hover:text-[#1976D2] flex items-center justify-center transition-colors border border-slate-200/70"
          aria-label="Lihat notifikasi"
        >
          <Bell className="w-5 h-5 stroke-[2]" />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#1976D2] rounded-full ring-2 ring-white" />
          )}
        </button>
      </div>

      <div className="px-5 pt-4 space-y-5">
        {/* Search Bar Trigger */}
        <button
          onClick={() => onNavigate('search')}
          className="w-full h-11 px-4 bg-white border border-slate-200/90 rounded-2xl flex items-center gap-3 text-slate-400 hover:border-[#1976D2]/50 hover:text-slate-600 transition-all shadow-[0_2px_6px_rgba(0,0,0,0.02)] text-left"
        >
          <Search className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-normal">Cari nomor rekam medis atau pasien...</span>
        </button>

        {/* Large Blue Summary Card: "Monitoring Rekam Medis Hari Ini" */}
        <div className="w-full bg-[#1976D2] text-white rounded-3xl p-5 shadow-[0_8px_20px_rgba(25,118,210,0.25)] relative overflow-hidden">
          {/* Subtle background curved circles */}
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/10 rounded-full blur-xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-12 w-44 h-44 bg-[#0D47A1]/40 rounded-full blur-lg pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-blue-100 tracking-wide uppercase">
                  Ringkasan Harian
                </span>
                <h3 className="text-lg font-bold tracking-tight text-white mt-0.5">
                  Monitoring Rekam Medis Hari Ini
                </h3>
              </div>
              <button
                onClick={() => onNavigate('monitoring')}
                className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
                aria-label="Lihat analitik monitoring"
              >
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-blue-100/90 mt-1">
              Sistem Tracer & Monitoring Rekam Medis · RSUD Muara Enim
            </p>

            <div className="mt-4 pt-4 border-t border-white/20 grid grid-cols-3 gap-2 text-center">
              <div className="bg-white/10 rounded-xl py-2 px-1">
                <span className="text-[11px] text-blue-100 block">Total Berkas</span>
                <span className="text-lg font-bold text-white tracking-tight tabular-nums">
                  {totalToday}
                </span>
              </div>
              <div className="bg-white/10 rounded-xl py-2 px-1">
                <span className="text-[11px] text-blue-100 block">Kepatuhan</span>
                <span className="text-lg font-bold text-white tracking-tight tabular-nums">
                  {completenessPercent}%
                </span>
              </div>
              <div className="bg-white/10 rounded-xl py-2 px-1">
                <span className="text-[11px] text-blue-100 block">Terlambat</span>
                <span className="text-lg font-bold text-amber-200 tracking-tight tabular-nums">
                  {records.filter(r => r.isOverdue).length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Statistics Cards */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Status Berkas Saat Ini
            </h4>
            <span className="text-[11px] text-slate-500 font-medium">Update realtime</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* 1. Belum Lengkap */}
            <div
              onClick={() => onNavigate('records')}
              className="bg-white border border-amber-200/70 rounded-2xl p-3.5 shadow-sm hover:border-amber-300 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 stroke-[2.5]" />
                </div>
                <span className="text-[10px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  Perlu Cek
                </span>
              </div>
              <div>
                <span className="text-2xl font-bold text-slate-900 tabular-nums leading-none">
                  {belumLengkap}
                </span>
                <p className="text-xs font-semibold text-slate-700 mt-1">
                  Belum Lengkap
                </p>
                <p className="text-[10px] text-slate-500">Resume / TTD dokter</p>
              </div>
            </div>

            {/* 2. Lengkap */}
            <div
              onClick={() => onNavigate('records')}
              className="bg-white border border-[#1976D2]/20 rounded-2xl p-3.5 shadow-sm hover:border-[#1976D2]/50 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-xl bg-[#EAF4FF] text-[#1976D2] flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                </div>
                <span className="text-[10px] font-semibold text-[#0D47A1] bg-[#EAF4FF] px-2 py-0.5 rounded-full border border-[#1976D2]/20">
                  Lolos Validasi
                </span>
              </div>
              <div>
                <span className="text-2xl font-bold text-slate-900 tabular-nums leading-none">
                  {lengkap}
                </span>
                <p className="text-xs font-semibold text-slate-700 mt-1">
                  Lengkap
                </p>
                <p className="text-[10px] text-slate-500">100% item terisi</p>
              </div>
            </div>

            {/* 3. Belum Dikembalikan */}
            <div
              onClick={() => onNavigate('return_portal')}
              className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-sm hover:border-[#1976D2]/50 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                  <Clock className="w-4 h-4 stroke-[2]" />
                </div>
                <span className="text-[10px] font-semibold text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded-full">
                  Dipinjam
                </span>
              </div>
              <div>
                <span className="text-2xl font-bold text-slate-900 tabular-nums leading-none">
                  {belumKembali}
                </span>
                <p className="text-xs font-semibold text-slate-700 mt-1">
                  Belum Dikembalikan
                </p>
                <p className="text-[10px] text-[#1976D2] font-medium group-hover:underline">Buka Portal Pengembalian &gt;</p>
              </div>
            </div>

            {/* 4. Sudah Dikembalikan */}
            <div
              onClick={() => onNavigate('records')}
              className="bg-white border border-blue-100 rounded-2xl p-3.5 shadow-sm hover:border-[#1976D2]/40 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0D47A1] flex items-center justify-center">
                  <RotateCcw className="w-4 h-4 stroke-[2.5]" />
                </div>
                <span className="text-[10px] font-semibold text-[#0D47A1] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                  Di Filing
                </span>
              </div>
              <div>
                <span className="text-2xl font-bold text-slate-900 tabular-nums leading-none">
                  {sudahKembali}
                </span>
                <p className="text-xs font-semibold text-slate-700 mt-1">
                  Sudah Dikembalikan
                </p>
                <p className="text-[10px] text-slate-500">Tersimpan di rak</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
            Aksi Cepat
          </h4>
          <div className="grid grid-cols-4 gap-2">
            {/* Tambah RM */}
            <button
              onClick={onOpenAddModal}
              className="bg-white border border-slate-200/90 rounded-2xl p-2.5 flex flex-col items-center text-center shadow-sm hover:border-[#1976D2] active:scale-95 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#EAF4FF] text-[#1976D2] group-hover:bg-[#1976D2] group-hover:text-white flex items-center justify-center mb-1.5 transition-colors">
                <PlusCircle className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-[11px] font-semibold text-slate-700 leading-tight">
                Tambah RM
              </span>
            </button>

            {/* Cek Kelengkapan */}
            <button
              onClick={() => onNavigate('records')}
              className="bg-white border border-slate-200/90 rounded-2xl p-2.5 flex flex-col items-center text-center shadow-sm hover:border-[#1976D2] active:scale-95 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#EAF4FF] text-[#1976D2] group-hover:bg-[#1976D2] group-hover:text-white flex items-center justify-center mb-1.5 transition-colors">
                <ClipboardCheck className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-[11px] font-semibold text-slate-700 leading-tight">
                Cek Lengkap
              </span>
            </button>

            {/* Kembalikan Berkas (Bangsal/IGD) */}
            <button
              onClick={() => onNavigate('return_portal')}
              className="bg-white border border-[#1976D2]/30 rounded-2xl p-2.5 flex flex-col items-center text-center shadow-sm hover:border-[#1976D2] active:scale-95 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500" />
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1976D2] group-hover:bg-[#1976D2] group-hover:text-white flex items-center justify-center mb-1.5 transition-colors">
                <RotateCcw className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-[11px] font-semibold text-slate-700 leading-tight">
                Kembali BRM
              </span>
            </button>

            {/* Laporan */}
            <button
              onClick={() => onNavigate('reports')}
              className="bg-white border border-slate-200/90 rounded-2xl p-2.5 flex flex-col items-center text-center shadow-sm hover:border-[#1976D2] active:scale-95 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#EAF4FF] text-[#1976D2] group-hover:bg-[#1976D2] group-hover:text-white flex items-center justify-center mb-1.5 transition-colors">
                <BarChart3 className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-[11px] font-semibold text-slate-700 leading-tight">
                Laporan
              </span>
            </button>
          </div>
        </div>

        {/* Section: Rekam Medis Terbaru */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="text-sm font-bold text-slate-900 tracking-tight">
                Rekam Medis Terbaru
              </h4>
              <span className="text-[11px] text-slate-500 font-normal">
                Kunjungan & peminjaman terakhir
              </span>
            </div>
            <button
              onClick={() => onNavigate('records')}
              className="text-xs font-semibold text-[#1976D2] hover:text-[#0D47A1] flex items-center gap-0.5"
            >
              <span>Lihat Semua</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {records.slice(0, 4).map((record) => (
              <div
                key={record.id}
                onClick={() => onSelectRecord(record)}
                className="bg-white border border-slate-200/80 rounded-2xl p-3.5 shadow-sm hover:border-[#1976D2]/50 active:scale-[0.99] transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex-1 pr-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#0D47A1] font-mono tracking-tight">
                        {record.noRm}
                      </span>
                      <span className="text-[11px] text-slate-400">·</span>
                      <span className="text-[11px] font-medium text-slate-500 truncate">
                        {record.serviceUnit}
                      </span>
                    </div>

                    <h5 className="text-sm font-bold text-slate-800 mt-1 truncate">
                      {record.patientName}
                    </h5>

                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {record.visitDate}
                    </p>
                  </div>

                  <div className="shrink-0 flex items-center gap-1 pt-1 text-slate-300">
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 flex-wrap flex-1 min-w-0">
                    <StatusBadge
                      type={record.isComplete ? 'lengkap' : 'belum_lengkap'}
                    />
                    <StatusBadge
                      type={
                        record.isOverdue
                          ? 'terlambat'
                          : record.isReturned
                          ? 'sudah_kembali'
                          : 'belum_kembali'
                      }
                    />
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#EAF4FF] text-[#0D47A1] border border-[#1976D2]/25 truncate max-w-[140px]">
                      <MapPin className="w-2.5 h-2.5 text-[#1976D2] shrink-0" />
                      <span className="truncate">{record.lokasiBerkas || 'Ruang Filing'}</span>
                    </span>
                  </div>

                  <span className="text-[10px] text-slate-400 font-medium">
                    Detail &gt;
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
