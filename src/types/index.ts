export interface MedicalRecordChecklist {
  identitasPasien: boolean;
  anamnesis: boolean;
  pemeriksaan: boolean;
  diagnosis: boolean;
  tindakan: boolean;
  resumeMedis: boolean;
  tandaTanganDokter: boolean;
  dokumenPendukung: boolean;
}

export type ServiceUnit =
  | 'Poli Umum'
  | 'IGD'
  | 'Poli Gigi'
  | 'Poli Anak'
  | 'Rawat Inap Melati'
  | 'Rawat Inap Dahlia'
  | 'Poli Kandungan'
  | 'Poli Bedah';

export interface LocationHistoryEntry {
  id: string;
  waktu: string;
  lokasi: string;
  petugas: string;
  keterangan?: string;
  catatanVerifikasi?: string;
  tipe?: 'peminjaman' | 'perpindahan' | 'pengembalian';
}

export interface MedicalRecord {
  id: string;
  noRm: string;
  patientName: string;
  birthDate: string;
  gender: 'Laki-laki' | 'Perempuan';
  serviceUnit: ServiceUnit;
  visitDate: string;
  doctorName: string;
  isComplete: boolean;
  isReturned: boolean;
  returnDate: string | null;
  returnDeadline: string;
  isOverdue: boolean;
  officer: string;
  checklist: MedicalRecordChecklist;
  notes?: string;
  lokasiBerkas: string;
  lokasiUpdatedAt?: string;
  lokasiPetugas?: string;
  // Peminjaman & Tracer Khusus RSUD Muara Enim
  tujuanPeminjaman?: string;
  waktuPeminjaman?: string;
  petugasPeminjam?: string;
  petugasPenerimaPengembalian?: string;
  unitPengembali?: string;
  catatanPengembalian?: string;
  riwayatLokasi?: LocationHistoryEntry[];
}

export type NotificationCategory =
  | 'belum_lengkap'
  | 'belum_kembali'
  | 'terlambat'
  | 'sistem';

export interface NotificationItem {
  id: string;
  category: NotificationCategory;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  targetRmId?: string;
}

export type ScreenId =
  | 'splash'
  | 'login'
  | 'home'
  | 'records'
  | 'detail'
  | 'monitoring'
  | 'notifications'
  | 'reports'
  | 'profile'
  | 'search'
  | 'return_portal'
  | 'empty_states'
  | 'loading_error'
  | 'design_system';

export type FilterStatusKelengkapan = 'all' | 'lengkap' | 'belum_lengkap';
export type FilterStatusPengembalian = 'all' | 'sudah_kembali' | 'belum_kembali' | 'terlambat';

export interface FilterOptions {
  statusKelengkapan: FilterStatusKelengkapan;
  statusPengembalian: FilterStatusPengembalian;
  serviceUnit: string;
  dateRange: string;
}
