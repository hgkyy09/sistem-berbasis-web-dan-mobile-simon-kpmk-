import React, { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ChevronRight,
  TrendingUp,
  FileText,
  Filter,
  MapPin,
} from 'lucide-react';
import { MedicalRecord, ScreenId } from '../../types';
import { StatusBadge } from '../common/Badge';

interface MonitoringScreenProps {
  records: MedicalRecord[];
  onSelectRecord: (record: MedicalRecord) => void;
  onNavigate: (screen: ScreenId) => void;
}

export const MonitoringScreen: React.FC<MonitoringScreenProps> = ({
  records,
  onSelectRecord,
  onNavigate,
}) => {
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month'>('today');

  // Compute analytics
  const total = records.length;
  const lengkap = records.filter((r) => r.isComplete).length;
  const belumLengkap = total - lengkap;
  const completePercentage = Math.round((lengkap / (total || 1)) * 100);

  const returned = records.filter((r) => r.isReturned).length;
  const notReturned = total - returned;
  const returnPercentage = Math.round((returned / (total || 1)) * 100);

  const overdue = records.filter((r) => r.isOverdue).length;

  // Unit breakdown data
  const unitStats = [
    { unit: 'Poli Umum', total: 4, complete: 3, incomplete: 1 },
    { unit: 'Poli Gigi', total: 3, complete: 3, incomplete: 0 },
    { unit: 'IGD', total: 3, complete: 1, incomplete: 2 },
    { unit: 'Rawat Inap', total: 4, complete: 2, incomplete: 2 },
    { unit: 'Poli Bedah', total: 2, complete: 0, incomplete: 2 },
  ];

  // Records requiring follow up
  const actionableRecords = records.filter((r) => !r.isComplete || r.isOverdue);

  return (
    <div className="w-full pb-24 bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 px-5 pt-3 pb-3 flex items-center justify-between sticky top-0 z-20 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Dashboard Monitoring
          </h2>
          <p className="text-[11px] text-slate-500">
            Kepatuhan & efisiensi rekam medis
          </p>
        </div>

        {/* Time Filter Buttons */}
        <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setTimeRange('today')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              timeRange === 'today'
                ? 'bg-white text-[#1976D2] shadow-xs'
                : 'text-slate-600'
            }`}
          >
            Hari Ini
          </button>
          <button
            onClick={() => setTimeRange('week')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              timeRange === 'week'
                ? 'bg-white text-[#1976D2] shadow-xs'
                : 'text-slate-600'
            }`}
          >
            7 Hari
          </button>
        </div>
      </div>

      <div className="px-5 pt-4 space-y-4">
        {/* 4 Metric Highlights */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-3.5 shadow-sm">
            <span className="text-[11px] font-semibold text-slate-500 block">
              Total Rekam Medis
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-slate-900 tabular-nums">
                {total}
              </span>
              <span className="text-[11px] font-semibold text-[#1976D2]">
                Berkas
              </span>
            </div>
            <div className="mt-2 flex items-center gap-1 text-[10px] text-slate-400">
              <TrendingUp className="w-3 h-3 text-[#1976D2]" />
              <span>Semua instalasi pelayanan</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-3.5 shadow-sm">
            <span className="text-[11px] font-semibold text-slate-500 block">
              Persentase Kelengkapan
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-[#1976D2] tabular-nums">
                {completePercentage}%
              </span>
              <span className="text-[11px] text-slate-400">
                ({lengkap}/{total})
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-[#1976D2] rounded-full"
                style={{ width: `${completePercentage}%` }}
              />
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-3.5 shadow-sm">
            <span className="text-[11px] font-semibold text-slate-500 block">
              Persentase Pengembalian
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-[#0D47A1] tabular-nums">
                {returnPercentage}%
              </span>
              <span className="text-[11px] text-slate-400">
                ({returned}/{total})
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-[#0D47A1] rounded-full"
                style={{ width: `${returnPercentage}%` }}
              />
            </div>
          </div>

          <div className="bg-white border border-amber-200/80 rounded-2xl p-3.5 shadow-sm">
            <span className="text-[11px] font-semibold text-amber-800 block">
              RM Terlambat
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-rose-600 tabular-nums">
                {overdue}
              </span>
              <span className="text-[11px] text-rose-500">&gt; 1x24 jam</span>
            </div>
            <div className="mt-2 flex items-center gap-1 text-[10px] text-amber-700 font-medium">
              <AlertTriangle className="w-3 h-3" />
              <span>Butuh follow up</span>
            </div>
          </div>
        </div>

        {/* Chart 1: Donut Chart - Status Distribusi */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Distribusi Kelengkapan
              </h4>
              <span className="text-[11px] text-slate-500">
                Standar akreditasi RS minimal 80%
              </span>
            </div>
            <span className="text-xs font-bold text-[#1976D2] bg-[#EAF4FF] px-2 py-0.5 rounded-lg border border-[#1976D2]/20">
              {completePercentage}% Capai
            </span>
          </div>

          <div className="flex items-center justify-around py-2">
            {/* SVG Donut */}
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#E2E8F0"
                  strokeWidth="12"
                />
                {/* Incomplete Segment */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#EAF4FF"
                  strokeWidth="12"
                  strokeDasharray={`${(100 - completePercentage) * 2.38} 238`}
                  strokeDashoffset="0"
                />
                {/* Complete Segment (Primary Blue) */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#1976D2"
                  strokeWidth="12"
                  strokeDasharray={`${completePercentage * 2.38} 238`}
                  strokeDashoffset={`-${(100 - completePercentage) * 2.38}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-lg font-bold text-slate-900 leading-none">
                  {completePercentage}%
                </span>
                <span className="text-[10px] text-slate-500 mt-0.5">Lengkap</span>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#1976D2] shrink-0" />
                <div>
                  <span className="font-semibold text-slate-800">Lengkap</span>
                  <span className="text-[11px] text-slate-400 block">{lengkap} berkas</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-slate-300 shrink-0" />
                <div>
                  <span className="font-semibold text-slate-800">Belum Lengkap</span>
                  <span className="text-[11px] text-slate-400 block">{belumLengkap} berkas</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chart 2: Bar Chart - Kepatuhan per Unit Pelayanan */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Kelengkapan per Unit Pelayanan
              </h4>
              <span className="text-[11px] text-slate-500">
                Perbandingan lengkap vs belum lengkap
              </span>
            </div>
          </div>

          <div className="space-y-2.5 pt-1">
            {unitStats.map((item) => {
              const compPercent = Math.round((item.complete / item.total) * 100);
              return (
                <div key={item.unit} className="text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-slate-700">{item.unit}</span>
                    <span className="text-[11px] text-slate-500 tabular-nums">
                      <strong className="text-[#1976D2]">{item.complete}</strong> / {item.total} berkas ({compPercent}%)
                    </span>
                  </div>

                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
                    <div
                      className="bg-[#1976D2] h-full"
                      style={{ width: `${compPercent}%` }}
                      title={`Lengkap: ${compPercent}%`}
                    />
                    <div
                      className="bg-amber-400/80 h-full"
                      style={{ width: `${100 - compPercent}%` }}
                      title={`Belum Lengkap: ${100 - compPercent}%`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-center gap-4 text-[11px] text-slate-500">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#1976D2]" />
              <span>Lengkap</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-amber-400/80" />
              <span>Belum Lengkap</span>
            </div>
          </div>
        </div>

        {/* Section: "Perlu Ditindaklanjuti" */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Perlu Ditindaklanjuti
              </h4>
              <p className="text-[11px] text-slate-500">
                Berkas belum lengkap atau pengembalian terlambat
              </p>
            </div>
            <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
              {actionableRecords.length} Berkas
            </span>
          </div>

          <div className="space-y-2">
            {actionableRecords.map((record) => (
              <div
                key={record.id}
                onClick={() => onSelectRecord(record)}
                className="p-3 rounded-xl border border-slate-200 hover:border-[#1976D2] transition-colors cursor-pointer flex items-center justify-between group"
              >
                <div className="min-w-0 pr-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#0D47A1]">
                      {record.noRm}
                    </span>
                    <span className="text-[11px] text-slate-400">·</span>
                    <span className="text-[11px] text-slate-600 truncate">
                      {record.serviceUnit}
                    </span>
                  </div>

                  <p className="text-xs font-bold text-slate-800 mt-0.5 truncate">
                    {record.patientName}
                  </p>

                  <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                    {!record.isComplete && (
                      <span className="text-[10px] font-semibold text-amber-800 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                        Item Belum Lengkap
                      </span>
                    )}
                    {record.isOverdue && (
                      <span className="text-[10px] font-semibold text-rose-800 bg-rose-50 px-1.5 py-0.2 rounded border border-rose-200">
                        Terlambat &gt;24 Jam
                      </span>
                    )}
                    <span className="text-[10px] font-medium text-[#0D47A1] bg-[#EAF4FF] px-1.5 py-0.2 rounded border border-[#1976D2]/25 flex items-center gap-1">
                      <MapPin className="w-2.5 h-2.5 text-[#1976D2]" />
                      <span className="truncate max-w-[120px]">{record.lokasiBerkas || 'Ruang Filing'}</span>
                    </span>
                  </div>
                </div>

                <div className="w-7 h-7 rounded-full bg-slate-50 group-hover:bg-[#EAF4FF] group-hover:text-[#1976D2] flex items-center justify-center text-slate-400 shrink-0">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
