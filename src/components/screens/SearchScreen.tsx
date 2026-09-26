import React, { useState, useMemo } from 'react';
import {
  Search,
  ArrowLeft,
  X,
  Clock,
  ChevronRight,
  Sparkles,
  FileQuestion,
} from 'lucide-react';
import { MedicalRecord } from '../../types';
import { StatusBadge } from '../common/Badge';

interface SearchScreenProps {
  records: MedicalRecord[];
  onBack: () => void;
  onSelectRecord: (record: MedicalRecord) => void;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({
  records,
  onBack,
  onSelectRecord,
}) => {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'RM-2026-0842',
    'Ahmad Fauzi',
    'Poli Gigi',
    'IGD',
    'Bambang',
  ]);
  const [activeChip, setActiveChip] = useState<'all' | 'belum_lengkap' | 'terlambat' | 'poli_umum'>('all');

  const filterChips = [
    { id: 'all', label: 'Semua Kategori' },
    { id: 'belum_lengkap', label: 'Belum Lengkap' },
    { id: 'terlambat', label: 'Terlambat' },
    { id: 'poli_umum', label: 'Poli Umum' },
  ];

  const searchResults = useMemo(() => {
    if (!query.trim() && activeChip === 'all') return [];

    return records.filter((r) => {
      // Query filter
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        r.noRm.toLowerCase().includes(q) ||
        r.patientName.toLowerCase().includes(q) ||
        r.serviceUnit.toLowerCase().includes(q) ||
        r.doctorName.toLowerCase().includes(q) ||
        (r.lokasiBerkas && r.lokasiBerkas.toLowerCase().includes(q));

      // Chip filter
      if (activeChip === 'belum_lengkap' && r.isComplete) return false;
      if (activeChip === 'terlambat' && !r.isOverdue) return false;
      if (activeChip === 'poli_umum' && r.serviceUnit !== 'Poli Umum') return false;

      return matchesQuery;
    });
  }, [records, query, activeChip]);

  const handleSelectRecent = (term: string) => {
    setQuery(term);
  };

  const handleClearRecent = () => {
    setRecentSearches([]);
  };

  return (
    <div className="w-full pb-24 bg-[#F8FAFC]">
      {/* Sticky Top Search Header */}
      <div className="bg-white border-b border-slate-100 px-4 pt-3 pb-3 sticky top-0 z-20 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-xl bg-slate-50 hover:bg-[#EAF4FF] text-slate-700 hover:text-[#1976D2] flex items-center justify-center shrink-0 border border-slate-200/60 transition-colors"
            aria-label="Kembali"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
          </button>

          {/* Large Search Field */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari nomor RM, nama pasien, unit..."
              className="w-full h-11 pl-10 pr-9 text-xs font-medium bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:border-[#1976D2] focus:ring-2 focus:ring-[#1976D2]/15 outline-none text-slate-900 placeholder:text-slate-400"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
                aria-label="Hapus kata kunci"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-1.5 mt-2.5 overflow-x-auto no-scrollbar">
          {filterChips.map((chip) => {
            const isActive = activeChip === chip.id;
            return (
              <button
                key={chip.id}
                onClick={() =>
                  setActiveChip(chip.id as typeof activeChip)
                }
                className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#1976D2] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {chip.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-5 pt-4 space-y-4">
        {/* If no query and all chip: show Recent Searches */}
        {!query && activeChip === 'all' ? (
          <div>
            {recentSearches.length > 0 ? (
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    Pencarian Terakhir
                  </span>
                  <button
                    onClick={handleClearRecent}
                    className="text-[11px] font-semibold text-[#1976D2] hover:underline"
                  >
                    Hapus Semua
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {recentSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => handleSelectRecent(term)}
                      className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-700 hover:border-[#1976D2] hover:text-[#1976D2] transition-colors shadow-xs"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Suggested Shortcuts */}
            <div className="mt-5 bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
                Pencarian Cepat Berkas
              </span>
              <div className="space-y-2 text-xs">
                <button
                  onClick={() => {
                    setActiveChip('belum_lengkap');
                  }}
                  className="w-full text-left p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-amber-900 flex items-center justify-between"
                >
                  <span className="font-semibold">Semua Rekam Medis Belum Lengkap</span>
                  <ChevronRight className="w-4 h-4 text-amber-600" />
                </button>

                <button
                  onClick={() => {
                    setActiveChip('terlambat');
                  }}
                  className="w-full text-left p-2.5 rounded-xl bg-rose-50/70 border border-rose-200/80 text-rose-900 flex items-center justify-between"
                >
                  <span className="font-semibold">Berkas Terlambat &gt;24 Jam</span>
                  <ChevronRight className="w-4 h-4 text-rose-600" />
                </button>
              </div>
            </div>
          </div>
        ) : searchResults.length === 0 ? (
          /* No Results State */
          <div className="bg-white border border-slate-200/90 rounded-2xl p-8 text-center mt-4">
            <div className="w-12 h-12 rounded-2xl bg-[#EAF4FF] text-[#1976D2] mx-auto flex items-center justify-center mb-3">
              <FileQuestion className="w-6 h-6 stroke-[2]" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">
              Tidak Ada Hasil
            </h4>
            <p className="text-xs text-slate-500 mt-1 max-w-[240px] mx-auto">
              Tidak ada rekam medis yang cocok dengan kata kunci &quot;{query}&quot;. Coba periksa nomor RM atau ejaan nama pasien.
            </p>
            <button
              onClick={() => {
                setQuery('');
                setActiveChip('all');
              }}
              className="mt-4 px-4 py-2 bg-[#EAF4FF] text-[#0D47A1] text-xs font-semibold rounded-xl hover:bg-[#d5eaff]"
            >
              Reset Pencarian
            </button>
          </div>
        ) : (
          /* Results list */
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-semibold text-slate-500">
                Ditemukan <strong className="text-slate-800">{searchResults.length}</strong> rekam medis
              </span>
            </div>

            <div className="space-y-2.5">
              {searchResults.map((record) => (
                <div
                  key={record.id}
                  onClick={() => onSelectRecord(record)}
                  className="bg-white border border-slate-200/80 rounded-2xl p-3.5 shadow-sm hover:border-[#1976D2]/60 cursor-pointer transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-[#0D47A1]">
                          {record.noRm}
                        </span>
                        <span className="text-[11px] text-slate-400">·</span>
                        <span className="text-[11px] font-medium text-slate-600">
                          {record.serviceUnit}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                        {record.patientName}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Dokter: {record.doctorName}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-1">
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
                      <span className="text-[10px] text-[#0D47A1] bg-[#EAF4FF] px-1.5 py-0.5 rounded-md font-medium max-w-[130px] truncate text-right">
                        📍 {record.lokasiBerkas || 'Ruang Filing'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
