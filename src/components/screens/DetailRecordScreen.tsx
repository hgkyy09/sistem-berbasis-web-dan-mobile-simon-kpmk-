import React, { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Clock,
  User,
  Calendar,
  Building2,
  Stethoscope,
  Save,
  Check,
  RotateCcw,
  AlertTriangle,
  MapPin,
  Compass,
  History,
  Send,
  ArrowRight,
  ShieldCheck,
  CheckCheck,
} from 'lucide-react';
import { MedicalRecord, MedicalRecordChecklist, LocationHistoryEntry } from '../../types';
import { Button } from '../common/Buttons';
import { StatusBadge } from '../common/Badge';

interface DetailRecordScreenProps {
  record: MedicalRecord;
  onBack: () => void;
  onUpdateRecord: (updatedRecord: MedicalRecord) => void;
}

export const DetailRecordScreen: React.FC<DetailRecordScreenProps> = ({
  record,
  onBack,
  onUpdateRecord,
}) => {
  // Local editable state for checklist, return status, and file location
  const [checklist, setChecklist] = useState<MedicalRecordChecklist>({
    ...record.checklist,
  });
  const [isReturned, setIsReturned] = useState<boolean>(record.isReturned);
  const [returnDate, setReturnDate] = useState<string>(
    record.returnDate || '25 Sep 2026, 12:00'
  );
  const [officer, setOfficer] = useState<string>(
    record.officer || 'Hengki Aditya Saputra, A.Md.RMIK'
  );
  const [lokasiBerkas, setLokasiBerkas] = useState<string>(
    record.lokasiBerkas || 'Rawat Inap Melati 1 (Nurse Station)'
  );
  const [lokasiUpdatedAt, setLokasiUpdatedAt] = useState<string>(
    record.lokasiUpdatedAt || '25 Sep 2026, 12:00'
  );
  const [notes, setNotes] = useState<string>(record.notes || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Return & Loan tracer state
  const [petugasPenerima, setPetugasPenerima] = useState<string>(
    record.petugasPenerimaPengembalian || 'Hengki Aditya Saputra, A.Md.RMIK'
  );
  const [unitPengembali, setUnitPengembali] = useState<string>(
    record.unitPengembali || record.serviceUnit
  );
  const [catatanPengembalian, setCatatanPengembalian] = useState<string>(
    record.catatanPengembalian || 'Berkas telah diserahkan kembali ke loket rekam medis RSUD Muara Enim'
  );

  // History tracking state
  const [riwayatLokasi, setRiwayatLokasi] = useState<LocationHistoryEntry[]>(
    record.riwayatLokasi || [
      {
        id: 'h-def-1',
        waktu: '25 Sep 2026, 08:30',
        lokasi: 'Ruang Filing - Rak A-04',
        petugas: 'Hengki Aditya Saputra, A.Md.RMIK',
        keterangan: 'Berkas diambil dari rak arsip',
        tipe: 'perpindahan',
      },
      {
        id: 'h-def-2',
        waktu: '25 Sep 2026, 09:00',
        lokasi: record.serviceUnit,
        petugas: 'Perawat Unit ' + record.serviceUnit,
        keterangan: 'Dipinjam untuk pelayanan pasien',
        tipe: 'peminjaman',
      },
    ]
  );

  // Quick preset locations for RSUD Muara Enim
  const locationPresets = [
    'Ruang Filing - Rak Utama',
    'Ruang Filing - Rak A-04',
    'Rawat Inap Melati 1',
    'Rawat Inap Dahlia',
    'IGD - Ruang Resusitasi',
    'Poli Bedah',
    'Poli Umum',
    'Poli Gigi',
    'Ruang Assembling & Verifikasi PMK',
    'Ruang Koding & Casemix BPJS',
    `Dipinjam DPJP (${record.doctorName.split(',')[0]})`,
  ];

  // Quick add movement modal/form state
  const [showAddMovement, setShowAddMovement] = useState(false);
  const [movementLokasi, setMovementLokasi] = useState('Poli Gigi');
  const [movementPetugas, setMovementPetugas] = useState('Ns. Ratih');
  const [movementKet, setMovementKet] = useState('Konsul antar poli / ruangan');

  // Compute checklist completeness
  const checklistItems: { key: keyof MedicalRecordChecklist; label: string }[] =
    [
      { key: 'identitasPasien', label: 'Identitas Pasien' },
      { key: 'anamnesis', label: 'Anamnesis' },
      { key: 'pemeriksaan', label: 'Pemeriksaan Fisik & Penunjang' },
      { key: 'diagnosis', label: 'Diagnosis Utama & Sekunder' },
      { key: 'tindakan', label: 'Tindakan / Prosedur Terapi' },
      { key: 'resumeMedis', label: 'Resume Medis' },
      { key: 'tandaTanganDokter', label: 'Tanda Tangan & Nama DPJP' },
      { key: 'dokumenPendukung', label: 'Dokumen Pendukung / Informed Consent' },
    ];

  const totalItems = checklistItems.length;
  const completedCount = Object.values(checklist).filter(Boolean).length;
  const isAllComplete = completedCount === totalItems;

  const toggleChecklistItem = (key: keyof MedicalRecordChecklist) => {
    setChecklist((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleAddNewMovement = () => {
    if (!movementLokasi.trim()) return;
    const nowStr =
      new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }) +
      ', ' +
      new Date().toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
      });

    const newEntry: LocationHistoryEntry = {
      id: `h-mov-${Date.now()}`,
      waktu: nowStr,
      lokasi: movementLokasi.trim(),
      petugas: movementPetugas.trim() || 'Petugas Ruangan',
      keterangan: movementKet.trim() || 'Perpindahan berkas rekam medis',
      tipe: 'perpindahan',
    };

    const updatedHistory = [...riwayatLokasi, newEntry];
    setRiwayatLokasi(updatedHistory);
    setLokasiBerkas(movementLokasi.trim());
    setLokasiUpdatedAt(nowStr);
    setShowAddMovement(false);
  };

  const handleMarkReturnedFromWard = () => {
    const nowStr =
      new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }) +
      ', ' +
      new Date().toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
      });

    const returnEntry: LocationHistoryEntry = {
      id: `h-ret-${Date.now()}`,
      waktu: nowStr,
      lokasi: 'Ruang Filing - Rak A Utama (Penyimpanan)',
      petugas: petugasPenerima || 'Hengki Aditya Saputra, A.Md.RMIK',
      keterangan: `Pengembalian dikonfirmasi dari ${unitPengembali}. ${catatanPengembalian}`,
      tipe: 'pengembalian',
    };

    setIsReturned(true);
    setReturnDate(nowStr);
    setLokasiBerkas('Ruang Filing - Rak A Utama (Penyimpanan)');
    setLokasiUpdatedAt(nowStr);
    setRiwayatLokasi((prev) => [...prev, returnEntry]);
  };

  const handleSave = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const nowStr =
        new Date().toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }) +
        ', ' +
        new Date().toLocaleTimeString('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
        });

      const updated: MedicalRecord = {
        ...record,
        checklist,
        isComplete: isAllComplete,
        isReturned,
        returnDate: isReturned ? returnDate : null,
        officer: officer || 'Hengki Aditya Saputra, A.Md.RMIK',
        notes,
        lokasiBerkas: lokasiBerkas.trim() || 'Ruang Filing - Rak Utama',
        lokasiUpdatedAt: nowStr,
        lokasiPetugas: officer || 'Hengki Aditya Saputra, A.Md.RMIK',
        isOverdue: isReturned ? false : record.isOverdue,
        petugasPenerimaPengembalian: isReturned ? petugasPenerima : undefined,
        unitPengembali: isReturned ? unitPengembali : undefined,
        catatanPengembalian: isReturned ? catatanPengembalian : undefined,
        riwayatLokasi,
      };
      onUpdateRecord(updated);
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div className="w-full pb-28 bg-[#F8FAFC]">
      {/* Sticky Header */}
      <div className="bg-white border-b border-slate-100 px-5 pt-3 pb-3 flex items-center justify-between sticky top-0 z-20 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100 text-slate-600 flex items-center justify-center transition-colors"
          aria-label="Kembali ke daftar berkas"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
        </button>

        <div className="text-center">
          <h2 className="text-sm font-bold text-slate-900 tracking-tight">
            Detail Rekam Medis & Tracer
          </h2>
          <span className="text-[11px] font-mono text-[#0D47A1] font-semibold">
            {record.noRm} · RSUD Muara Enim
          </span>
        </div>

        <div className="w-9" />
      </div>

      <div className="px-5 pt-4 space-y-4">
        {/* Patient Information Card with LOKASI BRM SEKARANG directly below Unit Pelayanan */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm">
          <div className="flex items-start justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#1976D2]">
                Informasi Pasien
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">
                {record.patientName}
              </h3>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                No. RM: <strong className="text-[#0D47A1]">{record.noRm}</strong>
              </p>
            </div>

            <div className="flex flex-col items-end gap-1">
              <StatusBadge type={isAllComplete ? 'lengkap' : 'belum_lengkap'} />
              <StatusBadge
                type={
                  isReturned
                    ? 'sudah_kembali'
                    : record.isOverdue
                    ? 'terlambat'
                    : 'belum_kembali'
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-y-2.5 gap-x-3 pt-3 text-xs">
            <div>
              <span className="text-[11px] text-slate-400 block">Tanggal Lahir / Usia</span>
              <span className="font-semibold text-slate-700">{record.birthDate}</span>
            </div>

            <div>
              <span className="text-[11px] text-slate-400 block">Jenis Kelamin</span>
              <span className="font-semibold text-slate-700">{record.gender}</span>
            </div>

            {/* Unit Pelayanan */}
            <div>
              <span className="text-[11px] text-slate-400 block">Unit Pelayanan</span>
              <div className="flex items-center gap-1 font-semibold text-slate-700 mt-0.5">
                <Building2 className="w-3.5 h-3.5 text-[#1976D2]" />
                <span>{record.serviceUnit}</span>
              </div>
            </div>

            {/* Tanggal Kunjungan */}
            <div>
              <span className="text-[11px] text-slate-400 block">Tanggal Kunjungan</span>
              <div className="flex items-center gap-1 font-semibold text-slate-700 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-[#1976D2]" />
                <span className="text-[11px]">{record.visitDate}</span>
              </div>
            </div>

            {/* PERSYARATAN UTAMA: INFORMASI LOKASI BRM SEKARANG DI BAWAH UNIT PELAYANAN */}
            <div className="col-span-2 p-2.5 rounded-xl bg-[#EAF4FF] border border-[#1976D2]/30 mt-1 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#0D47A1] uppercase tracking-wider flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#1976D2]" />
                  <span>LOKASI BRM SEKARANG</span>
                </span>
                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-md bg-white text-[#1976D2] border border-[#1976D2]/20">
                  {isReturned ? 'Di Filing' : 'Sedang Dipinjam'}
                </span>
              </div>
              <p className="text-xs font-bold text-slate-900 mt-1">
                {lokasiBerkas || 'Rawat Inap Melati 1'}
              </p>
              <div className="flex items-center justify-between text-[10px] text-slate-500 mt-0.5 pt-1 border-t border-[#1976D2]/15">
                <span>Update: {lokasiUpdatedAt}</span>
                <span className="text-slate-600 font-medium">Petugas: {officer.split(' ')[0]}</span>
              </div>
            </div>

            <div className="col-span-2 pt-1 border-t border-slate-50">
              <span className="text-[11px] text-slate-400 block">Dokter Penanggung Jawab (DPJP)</span>
              <div className="flex items-center gap-1.5 font-semibold text-[#0D47A1] mt-0.5">
                <Stethoscope className="w-3.5 h-3.5 text-[#1976D2]" />
                <span>{record.doctorName}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Tracer & Riwayat Perjalanan BRM */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#EAF4FF] text-[#1976D2] flex items-center justify-center">
                <History className="w-4 h-4 stroke-[2.2]" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Riwayat Perjalanan BRM (Tracer)
                </h4>
                <p className="text-[10px] text-slate-500">
                  Pencatatan perpindahan jam ke jam sampai rak filing
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowAddMovement(!showAddMovement)}
              className="text-[10px] font-bold px-2 py-1 bg-[#1976D2] text-white hover:bg-[#0D47A1] rounded-lg transition-colors flex items-center gap-1"
            >
              <span>+ Pindah Ruang</span>
            </button>
          </div>

          {/* Form Quick Tambah Perpindahan Ruangan */}
          {showAddMovement && (
            <div className="mb-3 p-3 rounded-xl bg-slate-50 border border-slate-200 animate-in fade-in duration-150 space-y-2 text-xs">
              <span className="text-[11px] font-bold text-slate-800 block">
                Catat Lokasi Baru (Misal: dari Poli Umum ke Poli Gigi / Bangsal)
              </span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-500 block mb-0.5">Lokasi / Ruangan:</label>
                  <input
                    type="text"
                    value={movementLokasi}
                    onChange={(e) => setMovementLokasi(e.target.value)}
                    placeholder="Poli Gigi / Ruang Melati 1"
                    className="w-full h-8 px-2 text-xs bg-white border border-slate-200 rounded-lg outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 block mb-0.5">Petugas Penerima:</label>
                  <input
                    type="text"
                    value={movementPetugas}
                    onChange={(e) => setMovementPetugas(e.target.value)}
                    placeholder="Ns. Ratih / Petugas IGD"
                    className="w-full h-8 px-2 text-xs bg-white border border-slate-200 rounded-lg outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] text-slate-500 block mb-0.5">Keterangan Aktivitas:</label>
                <input
                  type="text"
                  value={movementKet}
                  onChange={(e) => setMovementKet(e.target.value)}
                  placeholder="Konsul gigi sebelum operasi..."
                  className="w-full h-8 px-2 text-xs bg-white border border-slate-200 rounded-lg outline-none"
                />
              </div>
              <div className="flex justify-end gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => setShowAddMovement(false)}
                  className="px-2.5 py-1 text-[11px] text-slate-600 bg-white border border-slate-200 rounded-lg"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleAddNewMovement}
                  className="px-3 py-1 text-[11px] font-semibold text-white bg-[#1976D2] rounded-lg hover:bg-[#0D47A1]"
                >
                  Simpan Riwayat
                </button>
              </div>
            </div>
          )}

          {/* Timeline Riwayat BRM */}
          <div className="relative pl-5 border-l-2 border-[#1976D2]/30 space-y-3.5 my-2">
            {riwayatLokasi.map((item, idx) => {
              const isLast = idx === riwayatLokasi.length - 1;
              return (
                <div key={item.id} className="relative">
                  {/* Pin Dot */}
                  <div
                    className={`absolute -left-[27px] top-0.5 w-3.5 h-3.5 rounded-full border-2 border-white shadow-xs flex items-center justify-center ${
                      item.tipe === 'pengembalian'
                        ? 'bg-emerald-500'
                        : item.tipe === 'peminjaman'
                        ? 'bg-amber-500'
                        : isLast
                        ? 'bg-[#1976D2] ring-2 ring-[#1976D2]/30'
                        : 'bg-slate-400'
                    }`}
                  />
                  <div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-slate-900 flex items-center gap-1.5">
                        <span>{item.lokasi}</span>
                        {item.tipe === 'pengembalian' && (
                          <span className="text-[9px] bg-emerald-50 text-emerald-700 px-1.5 rounded font-semibold border border-emerald-200">
                            Filing
                          </span>
                        )}
                        {item.tipe === 'peminjaman' && (
                          <span className="text-[9px] bg-amber-50 text-amber-700 px-1.5 rounded font-semibold border border-amber-200">
                            Dipinjam
                          </span>
                        )}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {item.waktu}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      {item.keterangan}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
                      <User className="w-3 h-3 text-slate-400" />
                      <span>Petugas: <strong>{item.petugas}</strong></span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section: Status Pengembalian & Fitur Pengembalian dari Bangsal/IGD */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Pengembalian Berkas Rekam Medis
              </h4>
              <p className="text-[11px] text-slate-500">
                Maksimal 1×24 jam setelah pasien pulang / selesai poli
              </p>
            </div>
            {record.isOverdue && !isReturned && (
              <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                Terlambat
              </span>
            )}
          </div>

          {/* Quick Return Action Button for Ward/IGD Officers */}
          {!isReturned ? (
            <div className="mb-4 p-3.5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50/70 border border-[#1976D2]/30 space-y-2.5">
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#1976D2] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <CheckCheck className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-900">
                    Fitur Pengembalian oleh Petugas Bangsal / IGD
                  </h5>
                  <p className="text-[11px] text-slate-600">
                    Petugas ruangan dapat langsung mencatat berkas telah diserahkan kembali ke Instalasi Rekam Medis RSUD Muara Enim.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div>
                  <label className="text-[10px] font-semibold text-slate-600 block mb-0.5">
                    Unit Pengembali:
                  </label>
                  <input
                    type="text"
                    value={unitPengembali}
                    onChange={(e) => setUnitPengembali(e.target.value)}
                    placeholder="Bangsal Melati / IGD"
                    className="w-full h-8 px-2 text-xs bg-white border border-slate-200 rounded-lg outline-none font-medium"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-slate-600 block mb-0.5">
                    Petugas Penerima IRM:
                  </label>
                  <input
                    type="text"
                    value={petugasPenerima}
                    onChange={(e) => setPetugasPenerima(e.target.value)}
                    placeholder="Hengki Aditya Saputra, A.Md.RMIK"
                    className="w-full h-8 px-2 text-xs bg-white border border-slate-200 rounded-lg outline-none font-medium"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleMarkReturnedFromWard}
                className="w-full py-2 px-3 bg-[#1976D2] hover:bg-[#0D47A1] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-colors"
              >
                <Check className="w-4 h-4 stroke-[2.5]" />
                <span>Konfirmasi Berkas Sudah Kembali ke IRM</span>
              </button>
            </div>
          ) : (
            <div className="mb-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <span className="font-bold text-emerald-900 block">Berkas Telah Dikembalikan</span>
                  <span className="text-[11px] text-emerald-700">
                    Diterima: {petugasPenerima} ({returnDate})
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsReturned(false)}
                className="text-[10px] font-semibold text-emerald-800 underline hover:text-emerald-950"
              >
                Ubah Status
              </button>
            </div>
          )}

          {/* Manual Toggle buttons for Return Status */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl mb-3">
            <button
              type="button"
              onClick={() => setIsReturned(false)}
              className={`py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
                !isReturned
                  ? 'bg-white text-slate-800 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Belum Dikembalikan
            </button>
            <button
              type="button"
              onClick={() => {
                setIsReturned(true);
                setLokasiBerkas('Ruang Filing - Rak A-04 (Penyimpanan)');
              }}
              className={`py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
                isReturned
                  ? 'bg-[#1976D2] text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Sudah Dikembalikan
            </button>
          </div>

          <div className="space-y-3 text-xs">
            {/* Tanggal Pengembalian */}
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                Tanggal & Jam Pengembalian
              </label>
              <input
                type="text"
                disabled={!isReturned}
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                placeholder="Contoh: 25 Sep 2026, 12:00"
                className="w-full h-10 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#1976D2] outline-none disabled:opacity-50 text-slate-800"
              />
            </div>

            {/* Fitur Update Lokasi Berkas Rekam Medis (Pelacakan / Tracer) */}
            <div className="pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-bold text-slate-800 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#1976D2]" />
                  <span>Update Lokasi Berkas (Tracer Rak / Ruangan)</span>
                </label>
                <span className="text-[10px] text-slate-400 font-mono">
                  RSUD Muara Enim
                </span>
              </div>

              {/* Current Active Location Pill */}
              <div className="p-2.5 rounded-xl bg-[#EAF4FF] border border-[#1976D2]/25 flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2 h-2 rounded-full bg-[#1976D2] shrink-0 animate-pulse" />
                  <span className="text-xs font-bold text-[#0D47A1] truncate">
                    {lokasiBerkas}
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-[#1976D2] shrink-0 bg-white px-2 py-0.5 rounded-md border border-[#1976D2]/20">
                  {isReturned ? 'Tersimpan' : 'Dipinjam'}
                </span>
              </div>

              {/* Quick Preset Location Pills */}
              <div className="mb-2">
                <span className="text-[10px] text-slate-400 block mb-1">Pilih Cepat Lokasi Berkas:</span>
                <div className="flex flex-wrap gap-1.5">
                  {locationPresets.map((loc) => {
                    const isSelected = lokasiBerkas === loc;
                    return (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => {
                          setLokasiBerkas(loc);
                          if (loc.includes('Ruang Filing')) {
                            setIsReturned(true);
                          }
                        }}
                        className={`text-[10px] font-semibold px-2 py-1 rounded-lg border transition-all ${
                          isSelected
                            ? 'bg-[#1976D2] text-white border-[#1976D2] shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                        }`}
                      >
                        {loc}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Input for Rak / Ruang Berkas */}
              <div className="relative">
                <input
                  type="text"
                  value={lokasiBerkas}
                  onChange={(e) => setLokasiBerkas(e.target.value)}
                  placeholder="Ketik detail rak/ruangan (cth: Rawat Inap Melati 1)..."
                  className="w-full h-10 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#1976D2] outline-none text-slate-800"
                />
              </div>
              <p className="text-[10px] text-slate-400 mt-1 flex items-center justify-between">
                <span>Diperbarui terakhir: {lokasiUpdatedAt}</span>
                <span className="font-semibold text-slate-500">RSUD Muara Enim</span>
              </p>
            </div>

            {/* Petugas Penerima / Pemeriksa */}
            <div className="pt-2 border-t border-slate-100">
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                Petugas Verifikator Rekam Medis
              </label>
              <input
                type="text"
                value={officer}
                onChange={(e) => setOfficer(e.target.value)}
                placeholder="Nama petugas rekam medis"
                className="w-full h-10 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#1976D2] outline-none text-slate-800 font-semibold"
              />
            </div>

            {/* Catatan Tambahan */}
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                Catatan Verifikasi
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Tambahkan catatan khusus terkait berkas..."
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#1976D2] outline-none text-slate-800 resize-none"
              />
            </div>
          </div>
        </div>

        {/* Section: Kelengkapan Rekam Medis (Checklist) */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Kelengkapan Rekam Medis
              </h4>
              <p className="text-[11px] text-slate-500">
                Kriteria standar PMK No. 24 Thn 2022
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs font-bold text-[#1976D2] bg-[#EAF4FF] px-2 py-0.5 rounded-lg border border-[#1976D2]/20">
                {completedCount} dari {totalItems} item
              </span>
            </div>
          </div>

          {/* Checklist Items list */}
          <div className="space-y-2">
            {checklistItems.map((item) => {
              const checked = checklist[item.key];
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => toggleChecklistItem(item.key)}
                  className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-left transition-all ${
                    checked
                      ? 'bg-emerald-50/50 border-emerald-200 text-slate-800'
                      : 'bg-slate-50/60 border-slate-200/80 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-5 h-5 rounded-lg flex items-center justify-center transition-colors ${
                        checked
                          ? 'bg-emerald-500 text-white'
                          : 'bg-white border border-slate-300 text-transparent'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span className="text-xs font-medium">{item.label}</span>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      checked
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {checked ? 'Lengkap' : 'Belum'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Action Bar: Update Status (Adapts smoothly to desktop width) */}
      <div className="sticky bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-md border-t border-slate-200/80 z-30 shadow-[0_-4px_16px_rgba(0,0,0,0.05)] rounded-b-2xl">
        <div className="max-w-md mx-auto">
          <Button
            onClick={handleSave}
            loading={isSubmitting}
            variant="primary"
            size="lg"
            fullWidth
            icon={<Save className="w-4 h-4" />}
          >
            Simpan Pembaruan & Tracer
          </Button>
        </div>
      </div>
    </div>
  );
};
