import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  ArrowUpDown,
  ChevronRight,
  Plus,
  FileQuestion,
  MapPin,
  X,
  Building2,
  Check,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { MedicalRecord, FilterOptions } from '../../types';
import { StatusBadge } from '../common/Badge';

interface MedicalRecordsScreenProps {
  records: MedicalRecord[];
  onSelectRecord: (record: MedicalRecord) => void;
  onOpenFilter: () => void;
  onOpenAddModal: () => void;
  activeFilterOptions: FilterOptions;
  onUpdateRecord?: (record: MedicalRecord) => void;
}

type TabType =
  | 'semua'
  | 'belum_lengkap'
  | 'lengkap'
  | 'belum_kembali'
  | 'sudah_kembali';

export const MedicalRecordsScreen: React.FC<MedicalRecordsScreenProps> = ({
  records,
  onSelectRecord,
  onOpenFilter,
  onOpenAddModal,
  activeFilterOptions,
  onUpdateRecord,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'latest' | 'oldest' | 'name'>('latest');

  // State for updating location modal
  const [editingLocationRecord, setEditingLocationRecord] = useState<MedicalRecord | null>(null);
  const [newLocation, setNewLocation] = useState('');
  const [alsoMarkReturned, setAlsoMarkReturned] = useState(false);

  // Filter & sort logic
  const filteredRecords = useMemo(() => {
    return records
      .filter((r) => {
        // Tab filtering
        if (activeTab === 'belum_lengkap' && r.isComplete) return false;
        if (activeTab === 'lengkap' && !r.isComplete) return false;
        if (activeTab === 'belum_kembali' && r.isReturned) return false;
        if (activeTab === 'sudah_kembali' && !r.isReturned) return false;

        // Bottom sheet options filter
        if (
          activeFilterOptions.statusKelengkapan === 'lengkap' &&
          !r.isComplete
        )
          return false;
        if (
          activeFilterOptions.statusKelengkapan === 'belum_lengkap' &&
          r.isComplete
        )
          return false;
        if (
          activeFilterOptions.statusPengembalian === 'sudah_kembali' &&
          !r.isReturned
        )
          return false;
        if (
          activeFilterOptions.statusPengembalian === 'belum_kembali' &&
          r.isReturned
        )
          return false;
        if (
          activeFilterOptions.statusPengembalian === 'terlambat' &&
          !r.isOverdue
        )
          return false;
        if (
          activeFilterOptions.serviceUnit &&
          activeFilterOptions.serviceUnit !== 'all' &&
          r.serviceUnit !== activeFilterOptions.serviceUnit
        )
          return false;

        // Search field
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchNo = r.noRm.toLowerCase().includes(q);
          const matchName = r.patientName.toLowerCase().includes(q);
          const matchUnit = r.serviceUnit.toLowerCase().includes(q);
          return matchNo || matchName || matchUnit;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortOrder === 'name') {
          return a.patientName.localeCompare(b.patientName);
        }
        if (sortOrder === 'oldest') {
          return a.id.localeCompare(b.id);
        }
        // latest default
        return b.id.localeCompare(a.id);
      });
  }, [records, activeTab, searchQuery, sortOrder, activeFilterOptions]);

  const tabs: { id: TabType; label: string; count?: number }[] = [
    { id: 'semua', label: 'Semua', count: records.length },
    {
      id: 'belum_lengkap',
      label: 'Belum Lengkap',
      count: records.filter((r) => !r.isComplete).length,
    },
    {
      id: 'lengkap',
      label: 'Lengkap',
      count: records.filter((r) => r.isComplete).length,
    },
    {
      id: 'belum_kembali',
      label: 'Belum Kembali',
      count: records.filter((r) => !r.isReturned).length,
    },
    {
      id: 'sudah_kembali',
      label: 'Sudah Kembali',
      count: records.filter((r) => r.isReturned).length,
    },
  ];

  const hasActiveFilters =
    activeFilterOptions.statusKelengkapan !== 'all' ||
    activeFilterOptions.statusPengembalian !== 'all' ||
    (activeFilterOptions.serviceUnit && activeFilterOptions.serviceUnit !== 'all');

  return (
    <div className="w-full pb-24 bg-[#F8FAFC]">
      {/* Sticky Header */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-20 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
        <div className="px-5 pt-3 pb-3 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Berkas Rekam Medis
            </h2>
            <p className="text-[11px] text-slate-500">
              Kelola status kelengkapan & waktu pengembalian
            </p>
          </div>

          <button
            onClick={onOpenAddModal}
            className="h-9 px-3 bg-[#1976D2] hover:bg-[#0D47A1] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
            aria-label="Tambah rekam medis"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Tambah</span>
          </button>
        </div>

        {/* Search Field & Control Bar */}
        <div className="px-5 pb-3 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari No. RM, pasien, unit..."
              className="w-full h-10 pl-9 pr-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#1976D2] focus:ring-1 focus:ring-[#1976D2] outline-none text-slate-800 placeholder:text-slate-400"
            />
          </div>

          {/* Filter Button */}
          <button
            onClick={onOpenFilter}
            className={`h-10 px-3 rounded-xl border flex items-center gap-1.5 text-xs font-semibold transition-all ${
              hasActiveFilters
                ? 'bg-[#EAF4FF] text-[#0D47A1] border-[#1976D2]'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
            aria-label="Filter berkas"
          >
            <Filter className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Filter</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-[#1976D2]" />
            )}
          </button>

          {/* Sort Button */}
          <button
            onClick={() => {
              setSortOrder((prev) =>
                prev === 'latest' ? 'oldest' : prev === 'oldest' ? 'name' : 'latest'
              );
            }}
            className="h-10 px-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 flex items-center gap-1 text-xs font-semibold"
            aria-label="Urutkan berkas"
            title={`Urutan: ${sortOrder}`}
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Horizontal Tabs / Segmented Control */}
        <div className="px-5 pb-2.5 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                  isActive
                    ? 'bg-[#1976D2] text-white shadow-sm'
                    : 'bg-slate-100/90 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                }`}
              >
                <span>{tab.label}</span>
                {typeof tab.count === 'number' && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-white text-slate-600'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Medical Record Cards List */}
      <div className="px-5 pt-3">
        {filteredRecords.length === 0 ? (
          <div className="bg-white border border-slate-200/90 rounded-2xl p-8 text-center mt-4">
            <div className="w-12 h-12 rounded-2xl bg-[#EAF4FF] text-[#1976D2] mx-auto flex items-center justify-center mb-3">
              <FileQuestion className="w-6 h-6 stroke-[2]" />
            </div>
            <h4 className="text-sm font-bold text-slate-800">
              Tidak Ada Rekam Medis
            </h4>
            <p className="text-xs text-slate-500 mt-1 max-w-[240px] mx-auto">
              Tidak ditemukan data rekam medis yang sesuai dengan pencarian atau kriteria filter saat ini.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveTab('semua');
              }}
              className="mt-4 px-4 py-2 bg-[#EAF4FF] text-[#0D47A1] text-xs font-semibold rounded-xl hover:bg-[#d4e8ff]"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredRecords.map((record) => (
            <div
              key={record.id}
              onClick={() => onSelectRecord(record)}
              className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm hover:border-[#1976D2]/50 active:scale-[0.99] transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0 pr-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#0D47A1] font-mono tracking-tight">
                      {record.noRm}
                    </span>
                    <span className="text-[11px] text-slate-300">|</span>
                    <span className="text-[11px] font-medium text-slate-600 truncate">
                      {record.serviceUnit}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 mt-1 truncate">
                    {record.patientName}
                  </h3>

                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                    <span>{record.gender}</span>
                    <span>·</span>
                    <span>{record.visitDate}</span>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-[#EAF4FF] group-hover:text-[#1976D2] flex items-center justify-center text-slate-400 transition-colors shrink-0">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>

              {/* Status Badges Row & Lokasi Berkas Rekam Medis */}
              <div className="mt-3 pt-3 border-t border-slate-100 flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  {/* Status Badges and Lokasi Berkas Button */}
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

                    {/* Fitur Update Lokasi Berkas di Dekat Status Pengembalian */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingLocationRecord(record);
                        setNewLocation(record.lokasiBerkas || 'Ruang Filing - Rak A-04');
                        setAlsoMarkReturned(!record.isReturned && record.lokasiBerkas?.includes('Ruang Filing') ? true : false);
                      }}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-semibold bg-[#EAF4FF] text-[#0D47A1] border border-[#1976D2]/30 hover:bg-[#1976D2] hover:text-white transition-all shadow-xs group/loc"
                      title="Klik untuk memperbarui lokasi berkas rekam medis"
                    >
                      <MapPin className="w-3 h-3 text-[#1976D2] group-hover/loc:text-white shrink-0" />
                      <span className="truncate max-w-[130px]">
                        {record.lokasiBerkas || 'Ruang Filing'}
                      </span>
                      <span className="text-[9px] px-1 py-0.2 rounded font-bold bg-white text-[#1976D2] border border-[#1976D2]/30 group-hover/loc:bg-white group-hover/loc:text-[#1976D2] ml-0.5">
                        Ubah
                      </span>
                    </button>
                  </div>

                  <span className="text-[10px] text-slate-400 font-medium shrink-0">
                    {record.officer.split(' ')[0]}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>

      {/* Modal Update Lokasi Berkas Rekam Medis */}
      {editingLocationRecord && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setEditingLocationRecord(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto no-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#EAF4FF] text-[#1976D2] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 leading-tight">
                    Update Lokasi Berkas
                  </h3>
                  <span className="text-[10px] text-slate-500 font-medium">
                    Tracer Rekam Medis RSUD Muara Enim
                  </span>
                </div>
              </div>

              <button
                onClick={() => setEditingLocationRecord(null)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Rekam Medis Info Brief */}
            <div className="mt-3.5 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-[#0D47A1]">
                  {editingLocationRecord.noRm}
                </span>
                <StatusBadge
                  type={
                    editingLocationRecord.isOverdue
                      ? 'terlambat'
                      : editingLocationRecord.isReturned
                      ? 'sudah_kembali'
                      : 'belum_kembali'
                  }
                />
              </div>
              <p className="font-bold text-slate-900">
                {editingLocationRecord.patientName}
              </p>
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>Unit: {editingLocationRecord.serviceUnit}</span>
                <span>DPJP: {editingLocationRecord.doctorName.split(',')[0]}</span>
              </div>
            </div>

            {/* Current Location Note */}
            <div className="mt-3">
              <span className="text-[11px] font-semibold text-slate-600 block mb-1">
                Lokasi Saat Ini:
              </span>
              <div className="px-3 py-2 rounded-xl bg-[#EAF4FF]/70 border border-[#1976D2]/30 text-xs font-semibold text-[#0D47A1] flex items-center justify-between">
                <span>{editingLocationRecord.lokasiBerkas || 'Ruang Filing'}</span>
                <span className="text-[10px] text-slate-500 font-normal">
                  {editingLocationRecord.lokasiUpdatedAt || 'Hari ini'}
                </span>
              </div>
            </div>

            {/* Fast Preset Options */}
            <div className="mt-3.5">
              <label className="text-[11px] font-semibold text-slate-700 block mb-1.5">
                Pilih Lokasi Cepat:
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  'Ruang Filing - Rak A Utama',
                  'Ruang Filing - Rak B',
                  'Ruang Filing - Roll O\'Pack',
                  'Ruang Assembling & Verifikasi',
                  'Ruang Koding & Casemix BPJS',
                  `${editingLocationRecord.serviceUnit} (Poli)`,
                  'Rawat Inap (Bangsal)',
                  `Meja DPJP (${editingLocationRecord.doctorName.split(',')[0]})`,
                ].map((preset) => {
                  const isMatch = newLocation === preset;
                  return (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => {
                        setNewLocation(preset);
                        if (preset.includes('Ruang Filing')) {
                          setAlsoMarkReturned(true);
                        }
                      }}
                      className={`text-left p-2 rounded-xl text-[11px] font-medium border transition-all truncate ${
                        isMatch
                          ? 'bg-[#1976D2] text-white border-[#1976D2] shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                      }`}
                    >
                      {preset}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Location Input */}
            <div className="mt-3">
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                Atau Ketik Lokasi / Rak Spesifik:
              </label>
              <input
                type="text"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                placeholder="Contoh: Ruang Filing - Rak A-04, Sekat 2"
                className="w-full h-10 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#1976D2] outline-none text-slate-800"
              />
            </div>

            {/* Checkbox: Also mark returned if returned to filing */}
            <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 font-medium">
                <input
                  type="checkbox"
                  checked={alsoMarkReturned}
                  onChange={(e) => setAlsoMarkReturned(e.target.checked)}
                  className="rounded text-[#1976D2] focus:ring-[#1976D2] w-4 h-4"
                />
                <span>Sekaligus ubah status berkas menjadi <strong>Sudah Dikembalikan</strong></span>
              </label>
            </div>

            {/* Petugas Pengupdate */}
            <div className="mt-3 text-[11px] text-slate-500 flex items-center justify-between">
              <span>Petugas Tracer:</span>
              <span className="font-semibold text-slate-700">Hengki Aditya Saputra, A.Md.RMIK</span>
            </div>

            {/* Action Buttons */}
            <div className="mt-5 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setEditingLocationRecord(null)}
                className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!newLocation.trim()) return;
                  const nowStr = new Date().toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  }) + ', ' + new Date().toLocaleTimeString('id-ID', {
                    hour: '2-digit',
                    minute: '2-digit',
                  });

                  const historyEntry = {
                    id: `h-modal-${Date.now()}`,
                    waktu: nowStr,
                    lokasi: newLocation.trim(),
                    petugas: 'Hengki Aditya Saputra, A.Md.RMIK',
                    keterangan: alsoMarkReturned
                      ? 'Berkas dikembalikan ke Ruang Filing'
                      : 'Pembaruan lokasi fisik berkas',
                    tipe: alsoMarkReturned ? ('pengembalian' as const) : ('perpindahan' as const),
                  };

                  const updatedRecord: MedicalRecord = {
                    ...editingLocationRecord,
                    lokasiBerkas: newLocation.trim(),
                    lokasiUpdatedAt: nowStr,
                    lokasiPetugas: 'Hengki Aditya Saputra, A.Md.RMIK',
                    isReturned: alsoMarkReturned ? true : editingLocationRecord.isReturned,
                    returnDate: alsoMarkReturned
                      ? editingLocationRecord.returnDate || nowStr
                      : editingLocationRecord.returnDate,
                    isOverdue: alsoMarkReturned ? false : editingLocationRecord.isOverdue,
                    riwayatLokasi: [...(editingLocationRecord.riwayatLokasi || []), historyEntry],
                  };

                  if (onUpdateRecord) {
                    onUpdateRecord(updatedRecord);
                  }
                  setEditingLocationRecord(null);
                }}
                className="py-2.5 px-3 bg-[#1976D2] hover:bg-[#0D47A1] text-white text-xs font-semibold rounded-xl transition-colors shadow-sm"
              >
                Simpan Lokasi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
