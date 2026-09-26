import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  ExternalLink,
  Layers,
  Sparkles,
  Palette,
  FileCode,
  ShieldCheck,
} from 'lucide-react';

interface ExportFigmaModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentScreenTitle: string;
}

export const ExportFigmaModal: React.FC<ExportFigmaModalProps> = ({
  isOpen,
  onClose,
  currentScreenTitle,
}) => {
  const [copiedType, setCopiedType] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentUrl = window.location.href;

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  // Raw SVG of SIMON KPMK Medical Shield & Folder Icon
  const simonLogoSvg = `<svg width="120" height="120" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="48" height="48" rx="12" fill="#EAF4FF"/>
  <path d="M12 16C12 14.8954 12.8954 14 14 14H20.3431C20.8736 14 21.3824 14.2107 21.7574 14.5858L24.4142 17.2426C24.7893 17.6176 25.2981 17.8284 25.8286 17.8284H34C35.1046 17.8284 36 18.7238 36 19.8284V33C36 34.1046 35.1046 35 34 35H14C12.8954 35 12 34.1046 12 33V16Z" fill="#1976D2" fill-opacity="0.15" stroke="#1976D2" stroke-width="2"/>
  <path d="M24 22V30M20 26H28" stroke="#0D47A1" stroke-width="2.5" stroke-linecap="round"/>
</svg>`;

  // Raw SVG of Medical Record Card component for Figma
  const medicalCardSvg = `<svg width="358" height="116" viewBox="0 0 358 116" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="358" height="116" rx="16" fill="#FFFFFF" stroke="#E2E8F0"/>
  <rect x="14" y="14" width="76" height="24" rx="6" fill="#EAF4FF"/>
  <text x="22" y="30" fill="#0D47A1" font-family="Inter, sans-serif" font-size="11" font-weight="bold">RM-2024-001</text>
  <rect x="238" y="14" width="106" height="22" rx="6" fill="#DCFCE7"/>
  <text x="246" y="29" fill="#15803D" font-family="Inter, sans-serif" font-size="10" font-weight="600">Lengkap (100%)</text>
  <text x="14" y="60" fill="#0F172A" font-family="Inter, sans-serif" font-size="14" font-weight="bold">Budi Santoso, Tn.</text>
  <text x="14" y="78" fill="#64748B" font-family="Inter, sans-serif" font-size="12">Poli Penyakit Dalam • 24 Sep 2026</text>
  <rect x="14" y="88" width="112" height="18" rx="4" fill="#F1F5F9"/>
  <text x="20" y="101" fill="#475569" font-family="Inter, sans-serif" font-size="10">Sudah Dikembalikan</text>
</svg>`;

  // Design tokens in JSON
  const designTokensJson = JSON.stringify(
    {
      name: 'SIMON KPMK Design System Tokens',
      colors: {
        primaryBlue: '#1976D2',
        darkBlue: '#0D47A1',
        lightBlue: '#EAF4FF',
        white: '#FFFFFF',
        slateText: '#64748B',
        slateDark: '#0F172A',
        surfaceBg: '#F8FAFC',
        cardBorder: '#E2E8F0',
        successGreen: '#16A34A',
        successLight: '#DCFCE7',
        warningOrange: '#EA580C',
        warningLight: '#FFEDD5',
      },
      spacingGrid: 8,
      typography: {
        fontFamily: 'Plus Jakarta Sans, Inter, sans-serif',
        pageTitle: { size: '20px', weight: '700', lineHeight: '28px' },
        sectionHeading: { size: '15px', weight: '600', lineHeight: '22px' },
        bodyText: { size: '13px', weight: '400', lineHeight: '18px' },
        metadataText: { size: '11px', weight: '500', lineHeight: '16px' },
      },
      borderRadius: {
        button: '12px',
        card: '16px',
        badge: '8px',
        modal: '24px',
      },
      viewport: {
        width: 390,
        height: 844,
        device: 'iPhone 14 / 15 / 16',
      },
    },
    null,
    2
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1976D2] to-[#0D47A1] text-white flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-sky-200" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                Salin UI ke Aplikasi Figma
              </h2>
              <p className="text-xs text-slate-500">
                Pilih metode tercepat untuk memasukkan desain SIMON KPMK ke canvas Figma Anda
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 space-y-5">
          {/* Method 1: The Best & Easiest Way */}
          <div className="border-2 border-[#1976D2]/30 bg-[#EAF4FF]/40 rounded-xl p-4 relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#1976D2] text-white tracking-wide uppercase">
                Metode 1 • Paling Praktis & 100% Editable
              </span>
              <span className="text-[11px] font-semibold text-[#0D47A1]">
                Auto Layout + Layers
              </span>
            </div>

            <h3 className="text-sm font-bold text-slate-900 mb-1">
              Import Otomatis via Plugin Figma &ldquo;html.to.design&rdquo;
            </h3>
            <p className="text-xs text-slate-600 mb-3 leading-relaxed">
              Plugin gratis ini mengubah seluruh halaman web menjadi <b>Frame iPhone 390×844</b> dengan layer, komponen, dan font yang dapat langsung diedit di Figma.
            </p>

            <div className="bg-white rounded-lg p-2.5 border border-slate-200 flex items-center gap-2 mb-3">
              <input
                type="text"
                readOnly
                value={currentUrl}
                className="text-xs text-slate-700 bg-transparent flex-1 outline-none truncate font-mono select-all"
              />
              <button
                onClick={() => handleCopy(currentUrl, 'url')}
                className="px-3 py-1.5 rounded-md bg-[#1976D2] text-white text-xs font-semibold hover:bg-[#0D47A1] flex items-center gap-1.5 shrink-0 transition-colors"
              >
                {copiedType === 'url' ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin URL</span>
                  </>
                )}
              </button>
            </div>

            <ol className="text-xs text-slate-600 space-y-1.5 pl-4 list-decimal">
              <li>
                Di Figma, buka menu <b>Plugins</b> &gt; cari <b>&ldquo;html.to.design&rdquo;</b> (atau <b>&ldquo;Builder.io&rdquo;</b>).
              </li>
              <li>
                Pilih ukuran <b>iPhone 14 / Mobile (390px)</b> di dalam plugin.
              </li>
              <li>
                Tempel (Paste) URL di atas lalu klik <b>Import</b>. Seluruh screen akan masuk ke canvas Figma!
              </li>
            </ol>
          </div>

          {/* Method 2: Copy Vectors & Elements as SVG directly */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
            <div className="flex items-center gap-2 mb-2">
              <FileCode className="w-4 h-4 text-[#1976D2]" />
              <h3 className="text-sm font-bold text-slate-900">
                Metode 2 • Salin Komponen Vektor SVG (Direct Paste)
              </h3>
            </div>
            <p className="text-xs text-slate-600 mb-3">
              Salin kode SVG berikut, lalu langsung buka Figma dan tekan <b>Ctrl + V</b> (atau <b>Cmd + V</b>) di canvas. Komponen akan langsung muncul sebagai shape vektor!
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                onClick={() => handleCopy(simonLogoSvg, 'logo-svg')}
                className="p-3 bg-white border border-slate-200 hover:border-[#1976D2] rounded-lg text-left transition-colors flex items-center justify-between group"
              >
                <div>
                  <div className="text-xs font-bold text-slate-800">
                    Logo & Lambang SIMON KPMK
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Medical folder & clinical cross icon
                  </div>
                </div>
                <span className="p-1.5 rounded bg-slate-100 group-hover:bg-[#EAF4FF] text-[#1976D2] shrink-0">
                  {copiedType === 'logo-svg' ? (
                    <Check className="w-3.5 h-3.5 text-green-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </span>
              </button>

              <button
                onClick={() => handleCopy(medicalCardSvg, 'card-svg')}
                className="p-3 bg-white border border-slate-200 hover:border-[#1976D2] rounded-lg text-left transition-colors flex items-center justify-between group"
              >
                <div>
                  <div className="text-xs font-bold text-slate-800">
                    Kartu Rekam Medis Pasien
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Status kelengkapan & No. RM
                  </div>
                </div>
                <span className="p-1.5 rounded bg-slate-100 group-hover:bg-[#EAF4FF] text-[#1976D2] shrink-0">
                  {copiedType === 'card-svg' ? (
                    <Check className="w-3.5 h-3.5 text-green-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </span>
              </button>
            </div>
          </div>

          {/* Method 3: Design Tokens (Figma Variables) */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-[#1976D2]" />
                <h3 className="text-sm font-bold text-slate-900">
                  Metode 3 • Figma Variables & Design Tokens (JSON)
                </h3>
              </div>
              <button
                onClick={() => handleCopy(designTokensJson, 'tokens')}
                className="text-xs font-semibold text-[#1976D2] hover:text-[#0D47A1] flex items-center gap-1"
              >
                {copiedType === 'tokens' ? (
                  <>
                    <Check className="w-3 h-3 text-green-600" />
                    <span className="text-green-600">Tersalin</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Salin Tokens</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-xs text-slate-600 mb-2">
              Palet warna resmi SIMON KPMK untuk diimpor ke Figma Color Variables:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[11px] font-mono">
              <div className="bg-[#1976D2] text-white p-2 rounded-lg font-bold shadow-xs">
                #1976D2
                <span className="block text-[9px] font-normal font-sans opacity-90">
                  Primary Blue
                </span>
              </div>
              <div className="bg-[#0D47A1] text-white p-2 rounded-lg font-bold shadow-xs">
                #0D47A1
                <span className="block text-[9px] font-normal font-sans opacity-90">
                  Dark Blue
                </span>
              </div>
              <div className="bg-[#EAF4FF] text-[#0D47A1] border border-[#1976D2]/30 p-2 rounded-lg font-bold shadow-xs">
                #EAF4FF
                <span className="block text-[9px] font-normal font-sans text-slate-600">
                  Light Blue
                </span>
              </div>
              <div className="bg-white text-slate-800 border border-slate-200 p-2 rounded-lg font-bold shadow-xs">
                #FFFFFF
                <span className="block text-[9px] font-normal font-sans text-slate-500">
                  Pure White
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between rounded-b-2xl">
          <span className="text-xs text-slate-500">
            Layar Aktif Saat Ini: <b className="text-slate-700">{currentScreenTitle}</b>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
