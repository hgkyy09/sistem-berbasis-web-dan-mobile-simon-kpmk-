import React, { useState } from 'react';
import {
  FileText,
  Download,
  Calendar,
  Building2,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  Clock,
  Printer,
} from 'lucide-react';
import { MedicalRecord } from '../../types';
import { Button } from '../common/Buttons';

interface ReportsScreenProps {
  records: MedicalRecord[];
  onExport: (type: 'pdf' | 'excel') => void;
}

export const ReportsScreen: React.FC<ReportsScreenProps> = ({
  records,
  onExport,
}) => {
  const [periode, setPeriode] = useState('Bulan Ini (September 2026)');
  const [selectedUnit, setSelectedUnit] = useState('Semua Unit');
  const [statusKelengkapan, setStatusKelengkapan] = useState('all');
  const [statusPengembalian, setStatusPengembalian] = useState('all');
  const [isExporting, setIsExporting] = useState<'pdf' | 'excel' | null>(null);

  // Filter records based on report selections
  const filtered = records.filter((r) => {
    if (selectedUnit !== 'Semua Unit' && r.serviceUnit !== selectedUnit) {
      return false;
    }
    if (statusKelengkapan === 'lengkap' && !r.isComplete) return false;
    if (statusKelengkapan === 'belum' && r.isComplete) return false;
    if (statusPengembalian === 'kembali' && !r.isReturned) return false;
    if (statusPengembalian === 'belum' && r.isReturned) return false;
    return true;
  });

  const total = filtered.length;
  const lengkap = filtered.filter((r) => r.isComplete).length;
  const belumLengkap = total - lengkap;
  const sudahKembali = filtered.filter((r) => r.isReturned).length;
  const belumKembali = total - sudahKembali;

  const handleExport = (type: 'pdf' | 'excel') => {
    setIsExporting(type);
    setTimeout(() => {
      setIsExporting(null);
      onExport(type);
    }, 700);
  };

  return (
    <div className="w-full pb-28 bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 px-5 pt-3 pb-3 sticky top-0 z-20 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
        <h2 className="text-base font-bold text-slate-900 tracking-tight">
          Laporan Rekam Medis
        </h2>
        <p className="text-[11px] text-slate-500">
          Rekapitulasi kelengkapan & waktu pengembalian berkas
        </p>
      </div>

      <div className="px-5 pt-4 space-y-4">
        {/* Filter Card */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm space-y-3">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
            Parameter Laporan
          </span>

          {/* Periode */}
          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">
              Periode Laporan
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={periode}
                onChange={(e) => setPeriode(e.target.value)}
                className="w-full h-10 pl-9 pr-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#1976D2] outline-none text-slate-800 appearance-none font-medium"
              >
                <option>Hari Ini (25 September 2026)</option>
                <option>7 Hari Terakhir</option>
                <option>Bulan Ini (September 2026)</option>
                <option>Triwulan III 2026</option>
                <option>Tahun 2026 (YTD)</option>
              </select>
            </div>
          </div>

          {/* Unit Pelayanan */}
          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">
              Unit Pelayanan
            </label>
            <div className="relative">
              <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={selectedUnit}
                onChange={(e) => setSelectedUnit(e.target.value)}
                className="w-full h-10 pl-9 pr-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#1976D2] outline-none text-slate-800 appearance-none font-medium"
              >
                <option>Semua Unit</option>
                <option>Poli Umum</option>
                <option>Poli Gigi</option>
                <option>IGD</option>
                <option>Rawat Inap Melati</option>
                <option>Poli Kandungan</option>
                <option>Poli Bedah</option>
                <option>Poli Anak</option>
              </select>
            </div>
          </div>

          {/* Quick Dual Status Filter */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <div>
              <label className="text-[10px] font-semibold text-slate-500 block mb-1">
                Kelengkapan
              </label>
              <select
                value={statusKelengkapan}
                onChange={(e) => setStatusKelengkapan(e.target.value)}
                className="w-full h-9 px-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium"
              >
                <option value="all">Semua</option>
                <option value="lengkap">Lengkap</option>
                <option value="belum">Belum Lengkap</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-semibold text-slate-500 block mb-1">
                Pengembalian
              </label>
              <select
                value={statusPengembalian}
                onChange={(e) => setStatusPengembalian(e.target.value)}
                className="w-full h-9 px-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium"
              >
                <option value="all">Semua</option>
                <option value="kembali">Sudah Kembali</option>
                <option value="belum">Belum Kembali</option>
              </select>
            </div>
          </div>
        </div>

        {/* Report Summary Cards */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
            <div>
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Ringkasan Rekapitulasi
              </span>
              <span className="text-[10px] text-slate-500">{periode}</span>
            </div>

            <div className="text-right">
              <span className="text-xl font-bold text-[#0D47A1] tabular-nums">
                {total}
              </span>
              <span className="text-[10px] text-slate-500 block">Total Berkas</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 rounded-xl bg-[#EAF4FF]/70 border border-[#1976D2]/20">
              <div className="flex items-center gap-1.5 text-xs text-[#0D47A1] font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1976D2]" />
                <span>Lengkap</span>
              </div>
              <span className="text-xl font-bold text-[#0D47A1] mt-1 block tabular-nums">
                {lengkap}
              </span>
              <span className="text-[10px] text-slate-500">
                {total > 0 ? Math.round((lengkap / total) * 100) : 0}% Kepatuhan
              </span>
            </div>

            <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200">
              <div className="flex items-center gap-1.5 text-xs text-amber-900 font-semibold">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>Belum Lengkap</span>
              </div>
              <span className="text-xl font-bold text-amber-900 mt-1 block tabular-nums">
                {belumLengkap}
              </span>
              <span className="text-[10px] text-amber-700">Perlu tindak lanjut</span>
            </div>

            <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-100">
              <div className="flex items-center gap-1.5 text-xs text-[#0D47A1] font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1976D2]" />
                <span>Sudah Kembali</span>
              </div>
              <span className="text-xl font-bold text-[#0D47A1] mt-1 block tabular-nums">
                {sudahKembali}
              </span>
              <span className="text-[10px] text-slate-500">
                {total > 0 ? Math.round((sudahKembali / total) * 100) : 0}% Kembali
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-1.5 text-xs text-slate-700 font-semibold">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>Belum Kembali</span>
              </div>
              <span className="text-xl font-bold text-slate-800 mt-1 block tabular-nums">
                {belumKembali}
              </span>
              <span className="text-[10px] text-slate-500">Masih di ruangan</span>
            </div>
          </div>
        </div>

        {/* Export Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <Button
            onClick={() => handleExport('pdf')}
            loading={isExporting === 'pdf'}
            variant="primary"
            size="md"
            icon={<Download className="w-4 h-4" />}
          >
            Export PDF
          </Button>

          <Button
            onClick={() => handleExport('excel')}
            loading={isExporting === 'excel'}
            variant="secondary"
            size="md"
            icon={<FileSpreadsheet className="w-4 h-4" />}
          >
            Export Excel
          </Button>
        </div>

        <p className="text-[11px] text-center text-slate-400">
          Format standar pelaporan akreditasi Kemenkes RI (SIMRS)
        </p>
      </div>
    </div>
  );
};
