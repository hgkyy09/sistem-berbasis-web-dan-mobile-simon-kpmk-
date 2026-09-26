import React, { useState, useMemo } from 'react';
import {
  RotateCcw,
  CheckCircle2,
  Clock,
  Building2,
  User,
  Search,
  Check,
  MapPin,
  Calendar,
  AlertTriangle,
  History,
  ShieldCheck,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { MedicalRecord, LocationHistoryEntry } from '../../types';
import { StatusBadge } from '../common/Badge';

interface WardReturnPortalScreenProps {
  records: MedicalRecord[];
  onUpdateRecord: (updatedRecord: MedicalRecord) => void;
  onSelectRecord: (record: MedicalRecord) => void;
}

export const WardReturnPortalScreen: React.FC<WardReturnPortalScreenProps> = ({
  records,
  onUpdateRecord,
  onSelectRecord,
}) => {
  const [selectedUnit, setSelectedUnit] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecordToReturn, setSelectedRecordToReturn] = useState<MedicalRecord | null>(null);

  // Form pengembalian
  const [petugasRuangan, setPetugasRuangan] = useState('Ns. Linda (Perawat Rawat Inap)');
  const [petugasPenerima, setPetugasPenerima] = useState('Hengki Aditya Saputra, A.Md.RMIK');
  const [catatan, setCatatan] = useState('Pasien telah KRS / pulang. Berkas lengkap dan rapi.');
  const [lokasiSimpan, setLokasiSimpan] = useState('Ruang Filing - Rak A-04 (Penyimpanan)');

  const units = [
    'Semua',
    'Rawat Inap Melati',
    'Rawat Inap Dahlia',
    'IGD',
    'Poli Bedah',
    'Poli Umum',
    'Poli Gigi',
    'Poli Anak',
    'Poli Kandungan',
  ];

  // Records that are NOT yet returned
  const pendingRecords = useMemo(() => {
    return records
      .filter((r) => !r.isReturned)
      .filter((r) => {
        if (selectedUnit !== 'Semua' && !r.serviceUnit.includes(selectedUnit)) return false;
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
          r.noRm.toLowerCase().includes(q) ||
          r.patientName.toLowerCase().includes(q) ||
          r.serviceUnit.toLowerCase().includes(q) ||
          r.lokasiBerkas.toLowerCase().includes(q)
        );
      });
  }, [records, selectedUnit, searchQuery]);

  const returnedTodayRecords = useMemo(() => {
    return records.filter((r) => r.isReturned);
  }, [records]);

  const handleConfirmReturn = (record: MedicalRecord) => {
    const now = new Date();
    const nowStr =
      now.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }) +
      ', ' +
      now.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
      });

    const newHistoryEntry: LocationHistoryEntry = {
      id: `ret-${Date.now()}`,
      waktu: nowStr,
      lokasi: lokasiSimpan,
      petugas: petugasPenerima,
      keterangan: `Pengembalian dikonfirmasi oleh ${petugasRuangan}. ${catatan}`,
      catatanVerifikasi: `Verifikasi pengembalian: Berkas diterima di Filing oleh ${petugasPenerima}. ${catatan}`,
      tipe: 'pengembalian',
    };

    const existingHistory = record.riwayatLokasi || [];

    const updated: MedicalRecord = {
      ...record,
      isReturned: true,
      returnDate: nowStr,
      lokasiBerkas: lokasiSimpan,
      lokasiUpdatedAt: nowStr,
      lokasiPetugas: petugasPenerima,
      petugasPenerimaPengembalian: petugasPenerima,
      unitPengembali: petugasRuangan,
      catatanPengembalian: catatan,
      isOverdue: false,
      riwayatLokasi: [...existingHistory, newHistoryEntry],
    };

    onUpdateRecord(updated);
    setSelectedRecordToReturn(null);
  };

  return (
    <div className="w-full pb-28 bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 px-5 pt-4 pb-3.5 sticky top-0 z-20 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#EAF4FF] text-[#1976D2] flex items-center justify-center">
              <RotateCcw className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-[#1976D2] uppercase tracking-wider bg-[#EAF4FF] px-1.5 py-0.2 rounded">
                  Portal Petugas
                </span>
                <span className="text-[10px] text-slate-400">RSUD Muara Enim</span>
              </div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight leading-tight">
                Pengembalian Berkas Bangsal & IGD
              </h2>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
              {pendingRecords.length} Belum Kembali
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-3 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari No. RM, nama pasien, atau lokasi BRM..."
            className="w-full h-10 pl-9 pr-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#1976D2] outline-none"
          />
        </div>

        {/* Filter Unit Ruangan */}
        <div className="mt-2.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {units.map((unit) => {
            const isSel = selectedUnit === unit;
            return (
              <button
                key={unit}
                onClick={() => setSelectedUnit(unit)}
                className={`text-[11px] px-2.5 py-1 rounded-xl font-semibold whitespace-nowrap transition-colors shrink-0 ${
                  isSel
                    ? 'bg-[#1976D2] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {unit}
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-5 pt-3 space-y-3">
        {/* Info Banner */}
        <div className="p-3 rounded-2xl bg-blue-50/80 border border-[#1976D2]/25 flex items-start gap-2.5 text-xs">
          <ShieldCheck className="w-4 h-4 text-[#1976D2] shrink-0 mt-0.5" />
          <p className="text-slate-700 leading-snug">
            Khusus petugas Bangsal Rawat Inap, IGD, dan Poliklinik untuk mencatat pengembalian berkas rekam medis ke Instalasi Rekam Medis (Filing). Status berkas dan riwayat tracer akan otomatis terupdate seketika.
          </p>
        </div>

        {/* Records Waiting for Return */}
        <div>
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Daftar Berkas Sedang Dipinjam ({pendingRecords.length})</span>
            <span className="text-[10px] text-slate-400 font-normal">Klik untuk kembalikan</span>
          </h3>

          {pendingRecords.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
              <h4 className="text-xs font-bold text-slate-800">
                Semua Berkas Sudah Dikembalikan!
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Tidak ada berkas yang tertahan di unit {selectedUnit}.
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {pendingRecords.map((r) => (
                <div
                  key={r.id}
                  className="bg-white border border-slate-200/90 rounded-2xl p-3.5 shadow-sm hover:border-[#1976D2]/50 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold font-mono text-[#0D47A1]">
                          {r.noRm}
                        </span>
                        <span className="text-[10px] text-slate-300">·</span>
                        <span className="text-[11px] font-semibold text-slate-700">
                          {r.serviceUnit}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                        {r.patientName}
                      </h4>
                    </div>

                    {r.isOverdue && (
                      <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                        Terlambat
                      </span>
                    )}
                  </div>

                  {/* Lokasi BRM Sekarang */}
                  <div className="mt-2 p-2 rounded-xl bg-amber-50/80 border border-amber-200/70 text-xs">
                    <div className="flex items-center justify-between text-[10px] text-amber-800 font-semibold mb-0.5">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-amber-600" />
                        <span>LOKASI BRM SEKARANG:</span>
                      </span>
                      <span>Tracer Aktif</span>
                    </div>
                    <p className="font-bold text-slate-900 text-xs">
                      {r.lokasiBerkas}
                    </p>
                    <span className="text-[10px] text-slate-500 mt-0.5 block">
                      Update: {r.lokasiUpdatedAt || r.visitDate}
                    </span>
                  </div>

                  {/* Action Row */}
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectRecord(r)}
                      className="text-[11px] font-semibold text-[#1976D2] hover:underline"
                    >
                      Lihat Detail & Checklist
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedRecordToReturn(r);
                        setPetugasRuangan(`Petugas ${r.serviceUnit}`);
                      }}
                      className="px-3 py-1.5 bg-[#1976D2] hover:bg-[#0D47A1] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Kembalikan Berkas</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section: Berkas yang Baru Saja Dikembalikan */}
        <div className="pt-2">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
            Riwayat Berkas Sudah Dikembalikan ({returnedTodayRecords.length})
          </h3>
          <div className="space-y-2">
            {returnedTodayRecords.slice(0, 3).map((r) => (
              <div
                key={r.id}
                onClick={() => onSelectRecord(r)}
                className="bg-white border border-emerald-100 rounded-xl p-3 flex items-center justify-between cursor-pointer hover:border-emerald-300 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-emerald-800">
                      {r.noRm}
                    </span>
                    <span className="text-xs font-semibold text-slate-800">
                      {r.patientName}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                    <MapPin className="w-3 h-3 text-emerald-600" />
                    <span>{r.lokasiBerkas}</span>
                    <span>·</span>
                    <span>Kembali: {r.returnDate}</span>
                  </div>
                </div>

                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                  Selesai
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Konfirmasi Pengembalian Berkas dari Bangsal / IGD */}
      {selectedRecordToReturn && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setSelectedRecordToReturn(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl max-h-[92vh] overflow-y-auto no-scrollbar animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 leading-tight">
                    Form Pengembalian Berkas
                  </h4>
                  <span className="text-[11px] text-slate-500">
                    Instalasi Rekam Medis RSUD Muara Enim
                  </span>
                </div>
              </div>
            </div>

            {/* Target Record Info */}
            <div className="mt-3 p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-[#0D47A1]">
                  {selectedRecordToReturn.noRm}
                </span>
                <span className="font-semibold text-slate-700">
                  {selectedRecordToReturn.serviceUnit}
                </span>
              </div>
              <p className="font-bold text-slate-900 text-sm mt-0.5">
                {selectedRecordToReturn.patientName}
              </p>
              <div className="mt-1 pt-1 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                <span>Lokasi saat ini:</span>
                <strong className="text-slate-800">{selectedRecordToReturn.lokasiBerkas}</strong>
              </div>
            </div>

            {/* Input Form Fields */}
            <div className="mt-3.5 space-y-3 text-xs">
              {/* Petugas Pengembali (Bangsal / IGD) */}
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Petugas Pengembali (Bangsal / IGD):
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={petugasRuangan}
                    onChange={(e) => setPetugasRuangan(e.target.value)}
                    placeholder="Nama perawat / petugas ruangan..."
                    className="w-full h-10 pl-9 pr-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#1976D2] font-medium"
                  />
                </div>
              </div>

              {/* Petugas Penerima di Filing Rekam Medis */}
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Petugas Penerima (Instalasi Rekam Medis):
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#1976D2] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={petugasPenerima}
                    onChange={(e) => setPetugasPenerima(e.target.value)}
                    placeholder="Petugas loket IRM..."
                    className="w-full h-10 pl-9 pr-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#1976D2] font-semibold text-slate-800"
                  />
                </div>
              </div>

              {/* Lokasi Rak Penyimpanan di Filing */}
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Tujuan Simpan di Ruang Filing (Tracer Kembali):
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-emerald-600 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={lokasiSimpan}
                    onChange={(e) => setLokasiSimpan(e.target.value)}
                    placeholder="Ruang Filing - Rak A-04 (Penyimpanan)"
                    className="w-full h-10 pl-9 pr-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#1976D2] font-medium"
                  />
                </div>
              </div>

              {/* Catatan Pengembalian */}
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Catatan Pengembalian / Kondisi Berkas:
                </label>
                <textarea
                  rows={2}
                  value={catatan}
                  onChange={(e) => setCatatan(e.target.value)}
                  placeholder="Catatan kondisi lembaran rekam medis..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#1976D2] resize-none"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSelectedRecordToReturn(null)}
                className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => handleConfirmReturn(selectedRecordToReturn)}
                className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-colors"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Simpan & Kembali</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
