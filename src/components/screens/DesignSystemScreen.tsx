import React, { useState } from 'react';
import {
  ArrowLeft,
  Search,
  Check,
  CheckCircle2,
  AlertCircle,
  Clock,
  RotateCcw,
  Sparkles,
  Layers,
  Palette,
  Eye,
} from 'lucide-react';
import { Button } from '../common/Buttons';
import { StatusBadge } from '../common/Badge';
import { SimonLogo } from '../common/SimonLogo';

interface DesignSystemScreenProps {
  onBack: () => void;
  onTriggerToast: (type: 'success' | 'warning' | 'error') => void;
}

export const DesignSystemScreen: React.FC<DesignSystemScreenProps> = ({
  onBack,
  onTriggerToast,
}) => {
  const [selectedRadio, setSelectedRadio] = useState<'opt1' | 'opt2'>('opt1');
  const [checkboxState, setCheckboxState] = useState(true);
  const [activeTab, setActiveTab] = useState('Tab 1');

  return (
    <div className="w-full pb-28 bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 px-5 pt-3 pb-3 flex items-center justify-between sticky top-0 z-20 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-xl bg-slate-50 hover:bg-[#EAF4FF] text-slate-700 hover:text-[#1976D2] flex items-center justify-center border border-slate-200/60"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
        </button>

        <div className="text-center">
          <h2 className="text-sm font-bold text-slate-900 tracking-tight">
            Design System Kit
          </h2>
          <span className="text-[11px] text-[#1976D2] font-semibold">
            Figma-Ready Tokens & UI Atoms
          </span>
        </div>

        <div className="w-9" />
      </div>

      <div className="px-5 pt-4 space-y-6 text-xs">
        {/* Color Palette Specification */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Palette className="w-4 h-4 text-[#1976D2]" />
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              1. Color Tokens (Strict Palette)
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-2 text-slate-700 font-mono">
            <div className="p-2.5 rounded-xl bg-[#1976D2] text-white">
              <span className="block font-bold">Primary Blue</span>
              <span className="text-[10px] opacity-90">#1976D2</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#0D47A1] text-white">
              <span className="block font-bold">Dark Blue</span>
              <span className="text-[10px] opacity-90">#0D47A1</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#EAF4FF] text-[#0D47A1] border border-[#1976D2]/25">
              <span className="block font-bold">Light Blue</span>
              <span className="text-[10px]">#EAF4FF</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white text-slate-800 border border-slate-200">
              <span className="block font-bold">Pure White</span>
              <span className="text-[10px] text-slate-400">#FFFFFF</span>
            </div>
          </div>
          <p className="text-[10px] text-slate-400 mt-2">
            Subtle text & borders: #64748B, #94A3B8, #F8FAFC
          </p>
        </div>

        {/* Buttons */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm space-y-3">
          <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
            2. Button Variants
          </h3>

          <div className="space-y-2">
            <Button variant="primary" fullWidth>
              Primary Button (#1976D2)
            </Button>
            <Button variant="secondary" fullWidth>
              Secondary Button
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="soft" size="sm">
                Soft Blue Button
              </Button>
              <Button variant="outline" size="sm">
                Outline Button
              </Button>
            </div>
          </div>
        </div>

        {/* Status Badges */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm space-y-3">
          <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
            3. Healthcare Status Badges
          </h3>

          <div className="flex flex-wrap gap-2">
            <StatusBadge type="lengkap" />
            <StatusBadge type="belum_lengkap" />
            <StatusBadge type="sudah_kembali" />
            <StatusBadge type="belum_kembali" />
            <StatusBadge type="terlambat" />
            <StatusBadge type="unit" text="Poli Umum" />
          </div>
        </div>

        {/* Input & Search Fields */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm space-y-3">
          <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
            4. Inputs & Search Fields
          </h3>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              readOnly
              value="Cari nomor rekam medis..."
              className="w-full h-10 pl-9 pr-3 text-xs bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">
              Field Standar
            </label>
            <input
              type="text"
              readOnly
              value="Nilai field terisi (Fokus State)"
              className="w-full h-10 px-3 text-xs bg-white border border-[#1976D2] ring-2 ring-[#1976D2]/15 rounded-xl font-medium text-slate-800"
            />
          </div>
        </div>

        {/* Checkbox & Radio Controls */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm space-y-3">
          <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
            5. Checkbox & Radio Buttons
          </h3>

          <div className="flex items-center justify-between">
            <label
              onClick={() => setCheckboxState(!checkboxState)}
              className="flex items-center gap-2 cursor-pointer select-none"
            >
              <div
                className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                  checkboxState
                    ? 'bg-[#1976D2] border-[#1976D2] text-white'
                    : 'border-slate-300 bg-white'
                }`}
              >
                {checkboxState && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
              <span className="text-xs font-semibold text-slate-700">
                Checkbox Aktif
              </span>
            </label>

            <div className="flex items-center gap-3">
              <label
                onClick={() => setSelectedRadio('opt1')}
                className="flex items-center gap-1.5 cursor-pointer select-none"
              >
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    selectedRadio === 'opt1'
                      ? 'border-[#1976D2]'
                      : 'border-slate-300'
                  }`}
                >
                  {selectedRadio === 'opt1' && (
                    <div className="w-2 h-2 rounded-full bg-[#1976D2]" />
                  )}
                </div>
                <span className="text-xs text-slate-700">Opsi A</span>
              </label>

              <label
                onClick={() => setSelectedRadio('opt2')}
                className="flex items-center gap-1.5 cursor-pointer select-none"
              >
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    selectedRadio === 'opt2'
                      ? 'border-[#1976D2]'
                      : 'border-slate-300'
                  }`}
                >
                  {selectedRadio === 'opt2' && (
                    <div className="w-2 h-2 rounded-full bg-[#1976D2]" />
                  )}
                </div>
                <span className="text-xs text-slate-700">Opsi B</span>
              </label>
            </div>
          </div>
        </div>

        {/* Tabs & Filter Chips */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm space-y-3">
          <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
            6. Tabs & Filter Chips
          </h3>

          <div className="flex items-center gap-1.5">
            {['Tab 1', 'Tab 2', 'Tab 3'].map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                  activeTab === t
                    ? 'bg-[#1976D2] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <span className="px-2.5 py-1 rounded-lg bg-[#EAF4FF] text-[#0D47A1] font-semibold border border-[#1976D2]/20">
              Filter Chip Aktif
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 font-medium">
              Filter Normal
            </span>
          </div>
        </div>

        {/* Progress Bar & Indicators */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm space-y-3">
          <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
            7. Progress Bar (8px Spacing Grid)
          </h3>

          <div>
            <div className="flex justify-between text-[11px] font-semibold mb-1">
              <span className="text-slate-700">Kepatuhan Berkas</span>
              <span className="text-[#1976D2]">85%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="w-[85%] h-full bg-[#1976D2] rounded-full" />
            </div>
          </div>
        </div>

        {/* Toast Triggers */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm space-y-3">
          <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
            8. Interactive Toast Notifications
          </h3>
          <p className="text-[11px] text-slate-500">
            Uji interaksi umpan balik pengguna:
          </p>
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => onTriggerToast('success')}
            >
              Toast Sukses
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onTriggerToast('warning')}
            >
              Toast Warning
            </Button>
            <Button
              variant="soft"
              size="sm"
              onClick={() => onTriggerToast('error')}
            >
              Toast Error
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
