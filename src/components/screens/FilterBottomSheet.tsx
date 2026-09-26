import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import {
  FilterOptions,
  FilterStatusKelengkapan,
  FilterStatusPengembalian,
} from '../../types';
import { Button } from '../common/Buttons';

interface FilterBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  currentFilters: FilterOptions;
  onApplyFilters: (filters: FilterOptions) => void;
}

export const FilterBottomSheet: React.FC<FilterBottomSheetProps> = ({
  isOpen,
  onClose,
  currentFilters,
  onApplyFilters,
}) => {
  const [kelengkapan, setKelengkapan] = useState<FilterStatusKelengkapan>(
    currentFilters.statusKelengkapan
  );
  const [pengembalian, setPengembalian] = useState<FilterStatusPengembalian>(
    currentFilters.statusPengembalian
  );
  const [unit, setUnit] = useState<string>(currentFilters.serviceUnit || 'all');
  const [dateRange, setDateRange] = useState<string>(
    currentFilters.dateRange || 'all'
  );

  if (!isOpen) return null;

  const units = [
    { id: 'all', label: 'Semua Unit' },
    { id: 'Poli Umum', label: 'Poli Umum' },
    { id: 'IGD', label: 'IGD' },
    { id: 'Poli Gigi', label: 'Poli Gigi' },
    { id: 'Rawat Inap Melati', label: 'Rawat Inap' },
    { id: 'Poli Kandungan', label: 'Poli Kandungan' },
    { id: 'Poli Bedah', label: 'Poli Bedah' },
    { id: 'Poli Anak', label: 'Poli Anak' },
  ];

  const dateOptions = [
    { id: 'all', label: 'Semua Waktu' },
    { id: 'today', label: 'Hari Ini' },
    { id: '7days', label: '7 Hari Terakhir' },
    { id: '30days', label: 'Bulan Ini' },
  ];

  const handleReset = () => {
    setKelengkapan('all');
    setPengembalian('all');
    setUnit('all');
    setDateRange('all');
  };

  const handleApply = () => {
    onApplyFilters({
      statusKelengkapan: kelengkapan,
      statusPengembalian: pengembalian,
      serviceUnit: unit,
      dateRange,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Sheet Modal Container */}
      <div className="relative w-full max-w-[420px] bg-white rounded-t-3xl shadow-2xl p-5 pb-8 max-h-[85vh] overflow-y-auto no-scrollbar animate-in slide-in-from-bottom duration-200 z-10">
        {/* Grab Handle */}
        <div className="w-10 h-1.5 bg-slate-300 rounded-full mx-auto mb-4" />

        {/* Top Title Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Filter Rekam Medis
            </h3>
            <p className="text-[11px] text-slate-500">
              Saring berkas berdasarkan kelengkapan & unit
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
            aria-label="Tutup filter"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="py-4 space-y-5 text-xs">
          {/* Status Kelengkapan */}
          <div>
            <label className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block mb-2">
              Status Kelengkapan
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'all', label: 'Semua' },
                { id: 'lengkap', label: 'Lengkap' },
                { id: 'belum_lengkap', label: 'Belum Lengkap' },
              ].map((opt) => {
                const isSelected = kelengkapan === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() =>
                      setKelengkapan(opt.id as FilterStatusKelengkapan)
                    }
                    className={`py-2 px-2 rounded-xl font-semibold border text-center transition-all ${
                      isSelected
                        ? 'bg-[#1976D2] text-white border-[#1976D2] shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Status Pengembalian */}
          <div>
            <label className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block mb-2">
              Status Pengembalian
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'all', label: 'Semua Status' },
                { id: 'sudah_kembali', label: 'Sudah Kembali' },
                { id: 'belum_kembali', label: 'Belum Kembali' },
                { id: 'terlambat', label: 'Terlambat (>24 Jam)' },
              ].map((opt) => {
                const isSelected = pengembalian === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() =>
                      setPengembalian(opt.id as FilterStatusPengembalian)
                    }
                    className={`py-2 px-3 rounded-xl font-semibold border text-left flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-[#EAF4FF] text-[#0D47A1] border-[#1976D2] shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-[#1976D2] stroke-[2.5]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Unit Pelayanan */}
          <div>
            <label className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block mb-2">
              Unit Pelayanan
            </label>
            <div className="flex flex-wrap gap-1.5">
              {units.map((u) => {
                const isSelected = unit === u.id;
                return (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => setUnit(u.id)}
                    className={`px-3 py-1.5 rounded-xl font-medium text-xs border transition-all ${
                      isSelected
                        ? 'bg-[#1976D2] text-white border-[#1976D2]'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {u.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tanggal / Periode */}
          <div>
            <label className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block mb-2">
              Periode Kunjungan
            </label>
            <div className="grid grid-cols-2 gap-2">
              {dateOptions.map((d) => {
                const isSelected = dateRange === d.id;
                return (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setDateRange(d.id)}
                    className={`py-2 px-3 rounded-xl font-medium border text-center transition-all ${
                      isSelected
                        ? 'bg-[#0D47A1] text-white border-[#0D47A1]'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {d.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Action Buttons: Reset & Terapkan */}
        <div className="pt-2 grid grid-cols-2 gap-3 border-t border-slate-100">
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={handleReset}
          >
            Reset Filter
          </Button>

          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={handleApply}
          >
            Terapkan Filter
          </Button>
        </div>
      </div>
    </div>
  );
};
