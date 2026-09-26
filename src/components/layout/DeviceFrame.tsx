import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  Monitor,
  RotateCcw,
  Layers,
  QrCode,
  Download,
  Building2,
  FileText,
  Activity,
  Bell,
  User,
  LogOut,
  PlusCircle,
  HelpCircle,
  Search,
  CheckCircle2,
  FileCheck2,
  CornerDownLeft,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react';
import { ScreenId } from '../../types';
import { PWAInstallModal } from '../common/PWAInstallModal';
import { usePWAInstall } from '../../hooks/usePWAInstall';
import { SimonLogo } from '../common/SimonLogo';

interface DeviceFrameProps {
  children: React.ReactNode;
  activeScreen: ScreenId;
  onScreenChange: (screen: ScreenId) => void;
  isFramed?: boolean;
  onToggleFrame?: () => void;
  onResetData: () => void;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  children,
  activeScreen,
  onScreenChange,
  isFramed = false,
  onToggleFrame = () => {},
  onResetData,
}) => {
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
  const [isRealMobile, setIsRealMobile] = useState(false);
  const { isInstalled, isInstallable } = usePWAInstall();

  useEffect(() => {
    const checkIsRealMobile = () => {
      const isSmallScreen = window.innerWidth <= 640;
      const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
      const isStandalone =
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as unknown as { standalone?: boolean }).standalone === true;
      setIsRealMobile(isSmallScreen || isMobileUA || isStandalone);
    };

    checkIsRealMobile();
    window.addEventListener('resize', checkIsRealMobile);
    return () => window.removeEventListener('resize', checkIsRealMobile);
  }, []);

  const screensList: { id: ScreenId; label: string }[] = [
    { id: 'splash', label: 'Screen 1 — Splash Screen' },
    { id: 'login', label: 'Screen 2 — Login' },
    { id: 'home', label: 'Screen 3 — Home / Beranda' },
    { id: 'records', label: 'Screen 4 — Rekam Medis' },
    { id: 'detail', label: 'Screen 5 — Detail Rekam Medis' },
    { id: 'monitoring', label: 'Screen 6 — Monitoring Dashboard' },
    { id: 'notifications', label: 'Screen 7 — Notifikasi' },
    { id: 'reports', label: 'Screen 8 — Laporan Rekam Medis' },
    { id: 'profile', label: 'Screen 9 — Profil Petugas' },
    { id: 'search', label: 'Screen 10 — Pencarian' },
    { id: 'return_portal', label: 'Screen 11 — Portal Pengembalian (Bangsal/IGD)' },
    { id: 'empty_states', label: 'Screen 12 — Empty States' },
    { id: 'loading_error', label: 'Screen 13 — Loading & Error' },
    { id: 'design_system', label: 'UI Component System & Tokens' },
  ];

  const mainNavigation = [
    {
      id: 'home' as ScreenId,
      label: 'Dashboard Utama',
      icon: Activity,
      badge: undefined,
    },
    {
      id: 'records' as ScreenId,
      label: 'Berkas Rekam Medis',
      icon: FileText,
      badge: '16',
    },
    {
      id: 'monitoring' as ScreenId,
      label: 'Monitoring & Tracer',
      icon: CheckCircle2,
      badge: undefined,
    },
    {
      id: 'return_portal' as ScreenId,
      label: 'Portal Pengembalian',
      icon: CornerDownLeft,
      badge: 'Bangsal',
    },
    {
      id: 'reports' as ScreenId,
      label: 'Laporan & Statistik',
      icon: FileCheck2,
      badge: 'PDF/XLS',
    },
    {
      id: 'notifications' as ScreenId,
      label: 'Pusat Notifikasi',
      icon: Bell,
      badge: '2',
    },
    {
      id: 'profile' as ScreenId,
      label: 'Profil & Pengaturan',
      icon: User,
      badge: undefined,
    },
  ];

  // If running on a real smartphone or standalone mobile PWA
  if (isRealMobile && !isFramed) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col w-full selection:bg-[#1976D2] selection:text-white">
        {!isInstalled && (
          <div className="bg-gradient-to-r from-[#0D47A1] to-[#1976D2] text-white px-3 py-1.5 flex items-center justify-between text-xs sticky top-0 z-50 shadow-xs">
            <span className="font-medium flex items-center gap-1.5 truncate">
              <Download className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span>Pasang aplikasi di layar utama HP</span>
            </span>
            <button
              onClick={() => setIsInstallModalOpen(true)}
              className="px-2.5 py-1 bg-white text-[#0D47A1] font-bold rounded-lg text-[11px] shadow-xs active:scale-95 shrink-0"
            >
              Pasang
            </button>
          </div>
        )}

        <div className="flex-1 w-full max-w-md mx-auto relative flex flex-col">
          {children}
        </div>

        <PWAInstallModal
          isOpen={isInstallModalOpen}
          onClose={() => setIsInstallModalOpen(false)}
        />
      </div>
    );
  }

  // DESKTOP WORKSTATION / LAPTOP VIEW (Default)
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col selection:bg-[#1976D2] selection:text-white font-sans">
      {/* Clean Hospital Officer Topbar */}
      <header className="w-full bg-[#0D47A1] text-white sticky top-0 z-40 px-4 lg:px-8 py-3 shadow-md border-b border-[#1565C0]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Brand Info & Hospital Tag */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onScreenChange('home')}
              className="hover:opacity-90 transition-opacity focus:outline-none flex items-center"
              title="Ke Dashboard Utama"
            >
              <SimonLogo size="sm" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-white flex items-center gap-2">
                  SIMON KPMK
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#1976D2] text-white tracking-wide border border-white/20">
                    Sistem Rekam Medis
                  </span>
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-emerald-400/30 animate-pulse" title="Sistem Aktif" />
              </div>
              <span className="text-xs text-blue-100 font-medium block">
                RSUD Dr. H. Mohamad Rabain · Kabupaten Muara Enim
              </span>
            </div>
          </div>

          {/* Right Action Controls: Clean and Professional for Hospital Staff */}
          <div className="flex items-center gap-2.5">
            {/* Quick Screen Switcher */}
            <div className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-xl border border-white/15">
              <span className="text-xs text-blue-200 font-medium hidden sm:inline">Modul:</span>
              <select
                value={activeScreen}
                onChange={(e) => onScreenChange(e.target.value as ScreenId)}
                className="text-xs font-semibold bg-transparent text-white outline-none cursor-pointer pr-1"
              >
                {screensList.map((sc) => (
                  <option key={sc.id} value={sc.id} className="text-slate-900 bg-white">
                    {sc.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Buka di HP (QR Code) */}
            <button
              onClick={() => setIsInstallModalOpen(true)}
              className="h-9 px-3 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 shadow-sm transition active:scale-95"
              title="Akses aplikasi ini di HP (Scan QR Code / Panduan)"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Akses di HP</span>
            </button>

            {/* Deploy Netlify / Unduh Paket ZIP */}
            <a
              href="/dist-netlify.zip"
              download="simon-kpmk-dist.zip"
              className="h-9 px-3 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white flex items-center gap-1.5 shadow-sm transition active:scale-95"
              title="Unduh paket ZIP folder dist siap upload ke Netlify Drop"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Unduh ZIP Netlify</span>
            </a>

            {/* Reset Data */}
            <button
              onClick={onResetData}
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-blue-100 hover:text-white flex items-center justify-center transition"
              title="Reset data demonstrasi ke setelan awal"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* PWA & Mobile QR Modal */}
      <PWAInstallModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
      />

      {/* Main Content Area - Full Standard Desktop Workstation Web Layout */}
      <div className="max-w-7xl w-full mx-auto flex-1 flex gap-6 px-4 lg:px-6 py-6 items-start">
          {/* Desktop Left Medical Navigation Sidebar */}
          <aside className="w-64 bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 shrink-0 sticky top-20 hidden md:flex flex-col gap-5">
            {/* Official App Logo Banner */}
            <div className="p-3 bg-gradient-to-br from-blue-50/80 to-indigo-50/60 rounded-xl border border-[#1976D2]/20 flex items-center gap-3">
              <SimonLogo size="md" />
              <div className="min-w-0 flex-1">
                <span className="font-extrabold text-sm text-[#0D47A1] leading-tight block">
                  SIMON KPMK
                </span>
                <span className="text-[10px] text-slate-500 block leading-tight">
                  SIM Rekam Medis
                </span>
              </div>
            </div>

            {/* Officer Information Badge */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1976D2] text-white flex items-center justify-center font-bold text-xs ring-2 ring-white shrink-0">
                HA
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1976D2] block">
                  Petugas Rekam Medis
                </span>
                <span className="text-xs font-bold text-slate-900 truncate block">
                  Hengki Aditya, A.Md
                </span>
                <span className="text-[10px] text-slate-500 block truncate">
                  Instalasi RMIK RSUD
                </span>
              </div>
            </div>

            {/* Main Menu Links */}
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 block mb-2">
                Menu Utama Rumah Sakit
              </span>
              <nav className="space-y-1">
                {mainNavigation.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    activeScreen === item.id ||
                    (item.id === 'records' && activeScreen === 'detail');

                  return (
                    <button
                      key={item.id}
                      onClick={() => onScreenChange(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-[#1976D2] text-white shadow-xs'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Quick Stats or Notice */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-left">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                <Building2 className="w-3.5 h-3.5 text-[#1976D2]" />
                <span>RSUD Muara Enim</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                Pengembalian berkas rawat inap wajib dalam 1x24 jam sesuai regulasi PMK 24/2022.
              </p>
            </div>

            {/* Bottom Hospital Help / PWA Actions */}
            <div className="pt-2 border-t border-slate-100 space-y-1.5">
              <button
                onClick={() => setIsInstallModalOpen(true)}
                className="w-full py-2 px-3 rounded-xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 text-xs font-bold flex items-center justify-center gap-2 transition"
              >
                <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
                <span>Akses Mobile / Scan QR</span>
              </button>

              <button
                onClick={() => onScreenChange('reports')}
                className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-center gap-2 transition"
              >
                <FileCheck2 className="w-3.5 h-3.5 text-slate-500" />
                <span>Cetak Laporan PDF</span>
              </button>
            </div>
          </aside>

          {/* Center Main Workstation Application Container */}
          <main className="flex-1 bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden flex flex-col min-w-0">
            {/* Top Workspace Breadcrumb bar */}
            <div className="bg-slate-50/80 border-b border-slate-200/80 px-5 py-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-bold text-[#1976D2]">SIMON KPMK</span>
                <span className="text-slate-300">/</span>
                <span className="text-slate-600 font-medium capitalize">
                  {screensList.find((s) => s.id === activeScreen)?.label.split('—')[1] || activeScreen}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[11px] text-slate-400 hidden sm:inline">
                  RSUD Muara Enim · {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
                <button
                  onClick={() => onScreenChange('records')}
                  className="text-xs font-bold text-[#1976D2] hover:text-[#0D47A1] hover:underline flex items-center gap-1"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Daftar Berkas</span>
                </button>
              </div>
            </div>

            {/* Active Screen View (Expands naturally across desktop width) */}
            <div className="flex-1 overflow-y-auto p-4 lg:p-6 bg-[#F8FAFC]">
              <div className="w-full">
                {children}
              </div>
            </div>
          </main>
        </div>
    </div>
  );
};
