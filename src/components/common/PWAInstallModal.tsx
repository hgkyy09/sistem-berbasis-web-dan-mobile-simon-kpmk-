import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  Download,
  Smartphone,
  Share2,
  Copy,
  Check,
  X,
  ExternalLink,
  ShieldCheck,
  WifiOff,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { usePWAInstall } from '../../hooks/usePWAInstall';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, isIOS, isAndroid, install } = usePWAInstall();
  const [copied, setCopied] = useState(false);
  const [installing, setInstalling] = useState(false);
  const [downloadingZip, setDownloadingZip] = useState(false);
  const [activeTab, setActiveTab] = useState<'qr' | 'android' | 'ios' | 'netlify'>(
    isIOS ? 'ios' : isAndroid ? 'android' : 'qr'
  );

  const handleDownloadZip = () => {
    try {
      setDownloadingZip(true);
      const link = document.createElement('a');
      link.href = '/dist-netlify.zip';
      link.download = 'simon-kpmk-dist.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => setDownloadingZip(false), 1500);
    } catch (err) {
      window.location.href = '/dist-netlify.zip';
      setDownloadingZip(false);
    }
  };

  if (!isOpen) return null;

  // Use the canonical public preview URL or window.location.origin
  const currentUrl =
    typeof window !== 'undefined' && window.location.origin.includes('run.app')
      ? window.location.origin
      : 'https://ais-pre-5vrrxoylykxzlpdrgxatyc-956890235737.asia-east1.run.app';

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleDirectInstall = async () => {
    setInstalling(true);
    const success = await install();
    setInstalling(false);
    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0D47A1] via-[#1565C0] to-[#1976D2] p-5 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white p-1.5 shadow-md flex items-center justify-center shrink-0">
              <img
                src="/icon.svg"
                alt="SIMON KPMK Icon"
                className="w-full h-full object-contain rounded-xl"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg text-white leading-tight">
                  Unduh SIMON KPMK
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-slate-900 tracking-wide">
                  PWA Mobile
                </span>
              </div>
              <p className="text-xs text-blue-100 mt-0.5">
                Instal langsung ke layar utama ponsel (Android / iOS)
              </p>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-100 bg-slate-50/80 px-4 pt-2 gap-1 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('qr')}
            className={`px-3 py-2 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'qr'
                ? 'border-[#1976D2] text-[#1976D2] bg-white rounded-t-lg'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Scan QR Code</span>
          </button>
          <button
            onClick={() => setActiveTab('android')}
            className={`px-3 py-2 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'android'
                ? 'border-[#1976D2] text-[#1976D2] bg-white rounded-t-lg'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Panduan Android</span>
          </button>
          <button
            onClick={() => setActiveTab('ios')}
            className={`px-3 py-2 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'ios'
                ? 'border-[#1976D2] text-[#1976D2] bg-white rounded-t-lg'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span>iPhone (iOS)</span>
          </button>
          <button
            onClick={() => setActiveTab('netlify')}
            className={`px-3 py-2 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'netlify'
                ? 'border-[#1976D2] text-[#1976D2] bg-white rounded-t-lg'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-cyan-500" />
            <span>Deploy Netlify</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          {/* Quick Direct Install Button if browser supports beforeinstallprompt */}
          {isInstallable && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 flex items-center justify-between gap-3">
              <div className="text-left">
                <span className="text-xs font-bold text-emerald-800 block">
                  Perangkat Ini Mendukung Instalasi Langsung!
                </span>
                <span className="text-[11px] text-emerald-600">
                  Pasang SIMON KPMK ke aplikasi desktop atau HP Anda dalam 1 detik.
                </span>
              </div>
              <button
                onClick={handleDirectInstall}
                disabled={installing}
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shrink-0 shadow-xs flex items-center gap-1.5 transition active:scale-95 disabled:opacity-50"
              >
                <Download className="w-3.5 h-3.5" />
                {installing ? 'Memasang...' : 'Instal Sekarang'}
              </button>
            </div>
          )}

          {/* TAB 1: QR CODE & SCAN */}
          {activeTab === 'qr' && (
            <div className="text-center space-y-4">
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 inline-flex flex-col items-center justify-center mx-auto shadow-inner">
                <div className="p-3 bg-white rounded-xl shadow-xs border border-slate-100">
                  <QRCodeSVG
                    value={currentUrl}
                    size={180}
                    level="H"
                    includeMargin={false}
                    imageSettings={{
                      src: '/pwa-192x192.png',
                      x: undefined,
                      y: undefined,
                      height: 34,
                      width: 34,
                      excavate: true,
                    }}
                  />
                </div>
                <div className="mt-3 text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-[#1976D2]" />
                  Arahkan kamera ponsel Anda ke QR code ini
                </div>
              </div>

              {/* URL Copy box */}
              <div className="space-y-1.5 text-left">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Atau Buka Tautan Langsung di Browser Ponsel:
                </label>
                <div className="flex items-center gap-2 bg-slate-100 rounded-xl p-1.5 border border-slate-200">
                  <input
                    type="text"
                    readOnly
                    value={currentUrl}
                    className="bg-transparent flex-1 text-xs text-slate-700 px-2 font-mono outline-none truncate"
                  />
                  <button
                    onClick={handleCopyUrl}
                    className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-[#1976D2] flex items-center gap-1 shadow-2xs transition active:scale-95"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600">Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin Link</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ANDROID GUIDE */}
          {activeTab === 'android' && (
            <div className="space-y-3">
              <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-3.5 flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">
                    Buka Link di Google Chrome Android
                  </h4>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Buka browser Google Chrome di HP Anda dan masukkan tautan aplikasi atau scan QR code.
                  </p>
                </div>
              </div>

              <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-3.5 flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">
                    Tekan Menu Titik Tiga (⋮) di Pojok Kanan Atas
                  </h4>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Ketuk menu pilihan browser Google Chrome di sebelah bilah alamat.
                  </p>
                </div>
              </div>

              <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-3.5 flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">
                    Pilih "Instal Aplikasi" atau "Tambahkan ke Layar Utama"
                  </h4>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Ikon <strong>SIMON KPMK</strong> akan otomatis diunduh dan dipasang di beranda/app drawer HP Anda layaknya aplikasi Play Store.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: IOS GUIDE */}
          {activeTab === 'ios' && (
            <div className="space-y-3">
              <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-3.5 flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#1976D2] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">
                    Buka Link di Browser Safari iPhone / iPad
                  </h4>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Pastikan Anda membuka aplikasi menggunakan peramban bawaan <strong>Safari</strong> (bukan di dalam in-app browser IG/WA).
                  </p>
                </div>
              </div>

              <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-3.5 flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#1976D2] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">
                    Ketuk Tombol "Bagikan" (Share Icon)
                  </h4>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Ikon kotak dengan panah menghadap ke atas <span className="inline-block px-1.5 py-0.5 bg-slate-200 rounded text-[10px]">􀈂 Share</span> pada bar navigasi bawah Safari.
                  </p>
                </div>
              </div>

              <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-3.5 flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#1976D2] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">
                    Pilih "Tambah ke Layar Utama" (Add to Home Screen)
                  </h4>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Gulir ke bawah pada menu bagikan, pilih <strong>Tambah ke Layar Utama</strong>, lalu ketuk <strong>Tambah</strong> di kanan atas.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: NETLIFY DROP & ZIP DOWNLOAD */}
          {activeTab === 'netlify' && (
            <div className="space-y-3.5 text-left">
              <div className="bg-cyan-50 border border-cyan-200 rounded-2xl p-3.5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-xs font-bold text-cyan-900 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                      Paket Build Folder dist/ Telah Siap!
                    </h4>
                    <p className="text-[11px] text-cyan-800 mt-1">
                      Folder <code className="bg-cyan-100 text-cyan-900 px-1 py-0.5 rounded font-mono font-bold">dist/</code> berisi seluruh berkas HTML, JS, CSS, PWA Manifest, dan aturan routing SPA.
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-cyan-200/80 flex flex-wrap items-center gap-2">
                  <button
                    onClick={handleDownloadZip}
                    disabled={downloadingZip}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-cyan-700 hover:bg-cyan-800 text-white rounded-xl text-xs font-bold shadow-xs transition active:scale-95 disabled:opacity-60 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    {downloadingZip ? 'Menyiapkan ZIP...' : 'Unduh Folder dist (ZIP)'}
                  </button>
                  <a
                    href="https://app.netlify.com/drop"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-2 bg-white hover:bg-slate-50 border border-cyan-300 rounded-xl text-xs font-bold text-cyan-800 shadow-2xs transition"
                  >
                    Buka Netlify Drop ↗
                  </a>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-2.5">
                <h5 className="text-xs font-bold text-slate-800">
                  Cara Pasang ke Netlify dalam 1 Menit:
                </h5>
                <ol className="text-[11px] text-slate-600 space-y-1.5 list-decimal pl-4">
                  <li>
                    Klik tombol <strong>"Unduh Folder dist (ZIP)"</strong> di atas, lalu ekstrak filenya.
                  </li>
                  <li>
                    Buka <a href="https://app.netlify.com/drop" target="_blank" rel="noopener noreferrer" className="text-[#1976D2] font-semibold underline">app.netlify.com/drop</a> di browser komputer Anda.
                  </li>
                  <li>
                    Tarik (drag & drop) folder hasil ekstrak tersebut ke kotak Netlify.
                  </li>
                  <li>
                    Situs Netlify Anda langsung aktif dan dapat diakses publik dari mana saja!
                  </li>
                </ol>
              </div>
            </div>
          )}

          {/* PWA Feature Highlights */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#1976D2] shrink-0" />
              <div className="text-left">
                <span className="text-[11px] font-bold text-slate-800 block leading-tight">
                  Aman & Terverifikasi
                </span>
                <span className="text-[10px] text-slate-500">
                  Standar HTTPS RSUD
                </span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center gap-2">
              <WifiOff className="w-4 h-4 text-emerald-600 shrink-0" />
              <div className="text-left">
                <span className="text-[11px] font-bold text-slate-800 block leading-tight">
                  Mendukung Offline
                </span>
                <span className="text-[10px] text-slate-500">
                  Cache Cepat Tanpa Lag
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
          <button
            onClick={handleCopyUrl}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 transition"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Tautan Tersalin' : 'Salin Tautan'}</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#1976D2] hover:bg-[#1565C0] text-white text-xs font-bold shadow-xs transition active:scale-95"
          >
            Mengerti, Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
