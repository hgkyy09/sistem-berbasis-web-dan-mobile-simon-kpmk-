import React, { useState } from 'react';
import {
  X,
  Plus,
  User,
  Building2,
  Stethoscope,
  Calendar,
  MapPin,
  Clock,
  Send,
  HelpCircle,
} from 'lucide-react';
import { MedicalRecord, ServiceUnit, LocationHistoryEntry } from '../../types';
import { Button } from '../common/Buttons';

interface AddRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddRecord: (record: MedicalRecord) => void;
}

export const AddRecordModal: React.FC<AddRecordModalProps> = ({
  isOpen,
  onClose,
  onAddRecord,
}) => {
  const [noRm, setNoRm] = useState(`RM-2026-08${Math.floor(45 + Math.random() * 40)}`);
  const [patientName, setPatientName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState<'Laki-laki' | 'Perempuan'>('Laki-laki');
  const [serviceUnit, setServiceUnit] = useState<ServiceUnit>('Poli Bedah');
  const [doctorName, setDoctorName] = useState('dr. Faisal Rahman, Sp.B');

  // New fields: Tujuan berkas dipinjam & Waktu peminjaman
  const [tujuanPeminjaman, setTujuanPeminjaman] = useState<string>('Poli Bedah');
  const [waktuPeminjaman, setWaktuPeminjaman] = useState<string>(() => {
    const now = new Date();
    const datePart = now.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    const timePart = now.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    });
    return `${datePart}, ${timePart}`;
  });
  const [petugasPeminjam, setPetugasPeminjam] = useState('Perawat Poli Bedah (Ns. Agus)');

  // Lokasi fisik berkas saat ini
  const [lokasiBerkas, setLokasiBerkas] = useState('Poli Bedah (Meja Tindakan DPJP)');
  const [catatanVerifikasi, setCatatanVerifikasi] = useState(
    'Kondisi fisik berkas lengkap & verifikasi awal loket selesai'
  );
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const quickUnits = [
    'Poli Bedah',
    'Poli Umum',
    'Poli Gigi',
    'IGD',
    'Poli Anak',
    'Rawat Inap Melati 1',
    'Rawat Inap Dahlia',
    'Poli Kandungan',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim()) {
      setError('Nama pasien wajib diisi');
      return;
    }

    const currentWaktu = waktuPeminjaman.trim() || new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }) + ', ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

    // Initial history entries tracking from Filing to Destination
    const initialHistory: LocationHistoryEntry[] = [
      {
        id: `h-init-1-${Date.now()}`,
        waktu: currentWaktu,
        lokasi: 'Ruang Filing - Loket Rekam Medis RSUD Muara Enim',
        petugas: 'Hengki Aditya Saputra, A.Md.RMIK',
        keterangan: 'Penerbitan berkas rekam medis dan tracer keluar',
        catatanVerifikasi: catatanVerifikasi.trim() || 'Verifikasi awal di loket rekam medis',
        tipe: 'perpindahan',
      },
      {
        id: `h-init-2-${Date.now()}`,
        waktu: currentWaktu,
        lokasi: lokasiBerkas.trim() || tujuanPeminjaman,
        petugas: petugasPeminjam.trim() || 'Petugas Peminjam',
        keterangan: `Berkas dipinjam dan diterima oleh ${tujuanPeminjaman}`,
        catatanVerifikasi: 'Diterima oleh unit pelayanan dengan berkas lengkap',
        tipe: 'peminjaman',
      },
    ];

    const newRecord: MedicalRecord = {
      id: `rm-${Date.now()}`,
      noRm: noRm.trim() || `RM-2026-0899`,
      patientName: patientName.trim(),
      birthDate: birthDate.trim() || '12 Januari 1992 (34 thn)',
      gender,
      serviceUnit,
      visitDate: currentWaktu,
      doctorName,
      isComplete: false,
      isReturned: false,
      returnDate: null,
      returnDeadline: '26 Sep 2026, 12:00',
      isOverdue: false,
      officer: 'Hengki Aditya Saputra, A.Md.RMIK',
      checklist: {
        identitasPasien: true,
        anamnesis: true,
        pemeriksaan: true,
        diagnosis: true,
        tindakan: false,
        resumeMedis: false,
        tandaTanganDokter: false,
        dokumenPendukung: false,
      },
      notes: `Berkas dipinjam ke ${tujuanPeminjaman}. Registrasi via SIMON KPMK RSUD Muara Enim.`,
      lokasiBerkas: lokasiBerkas.trim() || tujuanPeminjaman,
      lokasiUpdatedAt: currentWaktu,
      lokasiPetugas: 'Hengki Aditya Saputra, A.Md.RMIK',
      tujuanPeminjaman: tujuanPeminjaman.trim(),
      waktuPeminjaman: currentWaktu,
      petugasPeminjam: petugasPeminjam.trim(),
      riwayatLokasi: initialHistory,
    };

    onAddRecord(newRecord);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-[390px] bg-white rounded-3xl shadow-2xl p-5 max-h-[92vh] overflow-y-auto no-scrollbar animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-[10px] font-bold text-[#1976D2] uppercase tracking-wider bg-[#EAF4FF] px-2 py-0.5 rounded-md">
                RSUD Muara Enim
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Peminjaman & Registrasi Berkas
            </h3>
            <p className="text-[11px] text-slate-500">
              Input data pasien, tujuan peminjaman & tracer lokasi
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {error && (
          <div className="mt-3 p-2.5 rounded-xl bg-rose-50 text-rose-700 text-xs font-medium">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
          {/* Section 1: Identitas Pasien */}
          <div className="space-y-3 pb-3 border-b border-slate-100">
            <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider block">
              1. Identitas Rekam Medis
            </span>

            {/* No. RM */}
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Nomor Rekam Medis (No. RM)
              </label>
              <input
                type="text"
                value={noRm}
                onChange={(e) => setNoRm(e.target.value)}
                placeholder="Contoh: RM-2026-0845"
                className="w-full h-10 px-3 font-mono font-bold text-[#0D47A1] bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#1976D2] outline-none"
              />
            </div>

            {/* Nama Pasien */}
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Nama Pasien <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="Ketik nama lengkap pasien..."
                  className="w-full h-10 pl-9 pr-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#1976D2] outline-none text-slate-800"
                />
              </div>
            </div>

            {/* Tanggal Lahir / Usia */}
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Tanggal Lahir / Usia Pasien
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  placeholder="Contoh: 15 Maret 1990 (36 thn)"
                  className="w-full h-10 pl-9 pr-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#1976D2] outline-none text-slate-800"
                />
              </div>
            </div>

            {/* Jenis Kelamin */}
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Jenis Kelamin
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['Laki-laki', 'Perempuan'] as const).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGender(g)}
                    className={`h-9 px-3 rounded-xl border font-semibold transition-all ${
                      gender === g
                        ? 'bg-[#1976D2] text-white border-[#1976D2] shadow-xs'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Unit Pelayanan & DPJP */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Unit Pelayanan
                </label>
                <select
                  value={serviceUnit}
                  onChange={(e) => {
                    const val = e.target.value as ServiceUnit;
                    setServiceUnit(val);
                    setTujuanPeminjaman(val);
                  }}
                  className="w-full h-10 px-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#1976D2] outline-none font-medium text-slate-800 text-xs"
                >
                  <option value="Poli Bedah">Poli Bedah</option>
                  <option value="Poli Umum">Poli Umum</option>
                  <option value="Poli Gigi">Poli Gigi</option>
                  <option value="IGD">IGD</option>
                  <option value="Poli Anak">Poli Anak</option>
                  <option value="Rawat Inap Melati">Rawat Inap Melati</option>
                  <option value="Rawat Inap Dahlia">Rawat Inap Dahlia</option>
                  <option value="Poli Kandungan">Poli Kandungan</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Dokter DPJP
                </label>
                <input
                  type="text"
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  placeholder="dr. Dokter, Sp..."
                  className="w-full h-10 px-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#1976D2] outline-none text-slate-800 text-xs"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Data Peminjaman & Lokasi BRM */}
          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#0D47A1] uppercase tracking-wider block">
                2. Tujuan Peminjaman & Lokasi BRM
              </span>
              <span className="text-[10px] font-semibold text-[#1976D2] bg-[#EAF4FF] px-2 py-0.5 rounded-full">
                Tracer Rekam Medis
              </span>
            </div>

            {/* Tujuan Berkas Dipinjam */}
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Tujuan Berkas Dipinjam <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-[#1976D2] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={tujuanPeminjaman}
                  onChange={(e) => {
                    setTujuanPeminjaman(e.target.value);
                    setLokasiBerkas(e.target.value);
                  }}
                  placeholder="Contoh: Poli Bedah / IGD / Rawat Inap Melati 1"
                  className="w-full h-10 pl-9 pr-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#1976D2] outline-none font-semibold text-slate-800"
                />
              </div>

              {/* Quick Preset Unit */}
              <div className="flex flex-wrap gap-1 mt-1.5">
                {quickUnits.map((u) => (
                  <button
                    key={u}
                    type="button"
                    onClick={() => {
                      setTujuanPeminjaman(u);
                      setLokasiBerkas(u);
                    }}
                    className={`text-[10px] px-2 py-0.5 rounded-md border transition-colors ${
                      tujuanPeminjaman === u
                        ? 'bg-[#1976D2] text-white border-[#1976D2]'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>

            {/* Waktu Peminjaman */}
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Waktu Peminjaman <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Clock className="w-4 h-4 text-[#1976D2] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={waktuPeminjaman}
                  onChange={(e) => setWaktuPeminjaman(e.target.value)}
                  placeholder="Contoh: 25 Sep 2026, 11:30"
                  className="w-full h-10 pl-9 pr-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#1976D2] outline-none font-medium text-slate-800"
                />
              </div>
            </div>

            {/* Petugas Peminjam */}
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Petugas / Perawat Peminjam
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={petugasPeminjam}
                  onChange={(e) => setPetugasPeminjam(e.target.value)}
                  placeholder="Nama perawat atau petugas penerima berkas..."
                  className="w-full h-10 pl-9 pr-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#1976D2] outline-none text-slate-800"
                />
              </div>
            </div>

            {/* Lokasi Fisik Berkas Rekam Medis (Lokasi BRM Sekarang) */}
            <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200/80">
              <label className="font-bold text-amber-900 block mb-1 flex items-center justify-between text-[11px]">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-700" />
                  <span>Lokasi Fisik Berkas Rekam Medis (BRM) Sekarang</span>
                </span>
                <span className="text-[10px] text-amber-700 font-mono">Tracer Aktif</span>
              </label>
              <input
                type="text"
                value={lokasiBerkas}
                onChange={(e) => setLokasiBerkas(e.target.value)}
                placeholder="Misal: Poli Bedah (Meja Tindakan DPJP) / Rawat Inap Melati 1"
                className="w-full h-10 px-3 bg-white border border-amber-300 rounded-xl focus:border-[#1976D2] outline-none text-slate-800 font-semibold text-xs"
              />
              <p className="text-[10px] text-amber-800 mt-1">
                Lokasi ini otomatis dicatat dalam riwayat perjalanan berkas RSUD Muara Enim.
              </p>
            </div>

            {/* Opsi Catatan Verifikasi Berkas Awal */}
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Catatan Verifikasi Berkas (Kondisi Awal)
              </label>
              <textarea
                rows={2}
                value={catatanVerifikasi}
                onChange={(e) => setCatatanVerifikasi(e.target.value)}
                placeholder="Contoh: Dokumen RM lengkap, informed consent tindakan operasi terverifikasi..."
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#1976D2] outline-none text-slate-800 text-xs resize-none"
              />
            </div>

            {/* Petugas Rekam Medis Bertugas */}
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-[11px]">
              <span className="text-slate-500">Petugas Tracer IRM:</span>
              <span className="font-bold text-[#0D47A1]">Hengki Aditya Saputra, A.Md.RMIK</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 grid grid-cols-2 gap-2 border-t border-slate-100">
            <Button type="button" variant="outline" size="md" onClick={onClose}>
              Batal
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              icon={<Send className="w-4 h-4" />}
            >
              Simpan & Terbitkan
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
