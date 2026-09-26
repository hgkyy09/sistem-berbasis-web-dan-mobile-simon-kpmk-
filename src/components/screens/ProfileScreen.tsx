import React, { useState } from 'react';
import {
  User,
  Settings,
  Shield,
  BellRing,
  HelpCircle,
  Info,
  LogOut,
  ChevronRight,
  Hospital,
  Award,
  Check,
  X,
  MapPin,
  Smartphone,
  FileCheck2,
} from 'lucide-react';
import { SimonLogo } from '../common/SimonLogo';
import { PWAInstallModal } from '../common/PWAInstallModal';

interface ProfileScreenProps {
  onLogout: () => void;
  onOpenHelp: () => void;
  onOpenAbout: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onLogout,
  onOpenHelp,
  onOpenAbout,
}) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showPWAModal, setShowPWAModal] = useState(false);

  const menuItems = [
    {
      id: 'settings',
      label: 'Pengaturan Akun',
      desc: 'Informasi personal & preferensi',
      icon: Settings,
      onClick: () => {},
    },
    {
      id: 'security',
      label: 'Keamanan',
      desc: 'Ubah password & autentikasi 2 faktor',
      icon: Shield,
      onClick: () => {},
    },
    {
      id: 'notifications',
      label: 'Preferensi Notifikasi',
      desc: 'Pengingat pengembalian & alert keterlambatan',
      icon: BellRing,
      onClick: () => {},
    },
    {
      id: 'help',
      label: 'Bantuan',
      desc: 'Panduan operasional & FAQ sistem',
      icon: HelpCircle,
      onClick: onOpenHelp,
    },
    {
      id: 'about',
      label: 'Tentang SIMON KPMK',
      desc: 'Dibuat untuk RSUD Muara Enim',
      icon: Info,
      onClick: () => setShowAboutModal(true),
    },
  ];

  return (
    <div className="w-full pb-28 bg-[#F8FAFC]">
      {/* Top Header Banner */}
      <div className="bg-[#1976D2] text-white px-5 pt-4 pb-14 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-36 h-36 bg-white/10 rounded-full blur-xl pointer-events-none" />
        <h2 className="text-base font-bold text-white tracking-tight">
          Profil Petugas
        </h2>
        <p className="text-xs text-blue-100">
          Instalasi Rekam Medis & PMK · RSUD Muara Enim
        </p>
      </div>

      <div className="px-5 -mt-10 space-y-4">
        {/* User Card */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-[#EAF4FF] text-[#1976D2] border-2 border-white shadow-sm flex items-center justify-center font-bold text-lg">
                HA
              </div>
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center text-white">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-slate-900 truncate">
                Hengki Aditya Saputra, A.Md.RMIK
              </h3>
              <p className="text-xs font-semibold text-[#1976D2]">
                Staff Rekam Medis & PMK
              </p>
              <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                @hengki.rmik · NIP 19950612 202203 1 002
              </p>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-600">
            <Hospital className="w-4 h-4 text-[#1976D2] shrink-0" />
            <span className="truncate">Unit Kerja: <strong>Instalasi Rekam Medis · RSUD Muara Enim</strong></span>
          </div>
        </div>

        {/* Institution Dedicated Card - Dibuat untuk RSUD Muara Enim */}
        <div className="bg-gradient-to-r from-[#EAF4FF] to-white border border-[#1976D2]/25 rounded-2xl p-3.5 shadow-xs">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#1976D2] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Hospital className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold text-[#0D47A1] uppercase tracking-wider block">
                Fasilitas Kesehatan Pengguna
              </span>
              <h4 className="text-xs font-bold text-slate-900 mt-0.5">
                RSUD Dr. H. Mohamad Rabain (RSUD Muara Enim)
              </h4>
              <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                Sistem monitoring kelengkapan, pelacakan lokasi berkas, & kepatuhan pengembalian rekam medis 1x24 jam.
              </p>
            </div>
          </div>
        </div>

        {/* Performance Snippet */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-3 shadow-sm">
            <span className="text-[11px] text-slate-500 block">Berkas Diverifikasi</span>
            <span className="text-lg font-bold text-[#0D47A1] tabular-nums">148 berkas</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Bulan ini</span>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-3 shadow-sm">
            <span className="text-[11px] text-slate-500 block">Akurasi Audit PMK</span>
            <span className="text-lg font-bold text-[#1976D2] tabular-nums">98.4%</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Sesuai standar</span>
          </div>
        </div>

        {/* PWA Mobile Installation Card */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-4 text-white shadow-sm flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <Smartphone className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-200 block">
                Aplikasi Ponsel (PWA)
              </span>
              <h4 className="text-xs font-bold text-white">
                Pasang SIMON KPMK di HP
              </h4>
              <p className="text-[11px] text-emerald-100">
                Akses cepat dari beranda HP tanpa buka browser
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowPWAModal(true)}
            className="px-3 py-1.5 bg-white text-emerald-800 hover:bg-emerald-50 rounded-xl text-xs font-bold shrink-0 shadow-xs transition active:scale-95"
          >
            Unduh
          </button>
        </div>

        {/* Menu Items Card */}
        <div className="bg-white border border-slate-200/90 rounded-2xl shadow-sm divide-y divide-slate-100 overflow-hidden">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={item.onClick}
                className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#EAF4FF] text-[#1976D2] group-hover:bg-[#1976D2] group-hover:text-white flex items-center justify-center transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">
                      {item.label}
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
              </button>
            );
          })}
        </div>

        {/* Logout Button */}
        <button
          onClick={() => setShowLogoutModal(true)}
          className="w-full h-11 bg-white hover:bg-rose-50 border border-rose-200 text-rose-600 font-semibold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Keluar dari Aplikasi</span>
        </button>

        {/* System Info Footnote */}
        <div className="text-center pt-2">
          <p className="text-[10px] text-slate-400">
            SIMON KPMK Mobile Web v2.4.0 · Dibuat untuk RSUD Muara Enim
          </p>
        </div>
      </div>

      {/* Logout Confirmation Dialog Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xs w-full p-5 shadow-xl animate-in fade-in zoom-in-95 duration-150">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3">
              <LogOut className="w-5 h-5" />
            </div>

            <h3 className="text-sm font-bold text-center text-slate-900">
              Konfirmasi Keluar
            </h3>
            <p className="text-xs text-center text-slate-500 mt-1">
              Apakah Anda yakin ingin keluar dari sesi aplikasi SIMON KPMK?
            </p>

            <div className="grid grid-cols-2 gap-2 mt-5">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  setShowLogoutModal(false);
                  onLogout();
                }}
                className="py-2.5 px-3 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl"
              >
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}
      {/* About RSUD Muara Enim Modal */}
      {showAboutModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl animate-in zoom-in-95 duration-150 max-h-[85vh] overflow-y-auto no-scrollbar">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#EAF4FF] text-[#1976D2] flex items-center justify-center">
                  <Hospital className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 leading-tight">
                    SIMON KPMK
                  </h3>
                  <span className="text-[10px] text-[#1976D2] font-semibold">
                    Dibuat untuk RSUD Muara Enim
                  </span>
                </div>
              </div>

              <button
                onClick={() => setShowAboutModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 space-y-3.5 text-xs text-slate-600">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Instansi Rumah Sakit
                </span>
                <h4 className="font-bold text-slate-900 text-xs">
                  RSUD Dr. H. Mohamad Rabain (RSUD Muara Enim)
                </h4>
                <div className="flex items-start gap-1.5 text-[11px] text-slate-500 pt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                  <span>Jl. Sultan Mahmud Badaruddin II No. 48, Kel. Air Lintang, Kec. Muara Enim, Kab. Muara Enim, Sumatera Selatan</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#EAF4FF]/60 border border-[#1976D2]/20 space-y-1">
                <span className="text-[10px] font-bold text-[#0D47A1] uppercase tracking-wider block">
                  Petugas / Pengembang Sistem
                </span>
                <p className="font-bold text-slate-900 text-xs">
                  Hengki Aditya Saputra, A.Md.RMIK
                </p>
                <p className="text-[11px] text-slate-600">
                  Staff Instalasi Rekam Medis & PMK · RSUD Muara Enim
                </p>
                <p className="text-[10px] text-slate-400 font-mono">
                  NIP: 19950612 202203 1 002
                </p>
              </div>

              <div className="space-y-1.5 text-[11px] text-slate-600">
                <div className="flex items-center gap-2">
                  <FileCheck2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Kepatuhan Standar PMK No. 24 Tahun 2022</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#1976D2] shrink-0" />
                  <span>Tracking Lokasi Fisik Berkas Rekam Medis (Tracer)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#1976D2] shrink-0" />
                  <span>Monitoring Batas Waktu Pengembalian 1x24 Jam</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowAboutModal(false)}
              className="mt-5 w-full py-2.5 bg-[#1976D2] hover:bg-[#0D47A1] text-white text-xs font-semibold rounded-xl transition-colors"
            >
              Tutup Informasi
            </button>
          </div>
        </div>
      )}

      {/* PWA Install Modal */}
      <PWAInstallModal
        isOpen={showPWAModal}
        onClose={() => setShowPWAModal(false)}
      />
    </div>
  );
};
