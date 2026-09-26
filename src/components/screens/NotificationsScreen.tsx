import React, { useState } from 'react';
import {
  Bell,
  Clock,
  AlertCircle,
  RotateCcw,
  CheckCheck,
  Check,
  Server,
  FileText,
  ChevronRight,
} from 'lucide-react';
import { NotificationItem, NotificationCategory, ScreenId } from '../../types';

interface NotificationsScreenProps {
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
  onNotificationClick: (notif: NotificationItem) => void;
}

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({
  notifications,
  onMarkAllAsRead,
  onNotificationClick,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | NotificationCategory>('all');

  const filtered = notifications.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const categories: { id: 'all' | NotificationCategory; label: string }[] = [
    { id: 'all', label: 'Semua' },
    { id: 'terlambat', label: 'Terlambat' },
    { id: 'belum_lengkap', label: 'Belum Lengkap' },
    { id: 'belum_kembali', label: 'Belum Kembali' },
    { id: 'sistem', label: 'Sistem' },
  ];

  const getCategoryIcon = (category: NotificationCategory) => {
    switch (category) {
      case 'terlambat':
        return <AlertCircle className="w-4 h-4 text-rose-600" strokeWidth={2.5} />;
      case 'belum_lengkap':
        return <FileText className="w-4 h-4 text-[#1976D2]" strokeWidth={2.5} />;
      case 'belum_kembali':
        return <RotateCcw className="w-4 h-4 text-amber-600" strokeWidth={2.5} />;
      case 'sistem':
        return <Server className="w-4 h-4 text-[#0D47A1]" strokeWidth={2} />;
      default:
        return <Bell className="w-4 h-4 text-[#1976D2]" />;
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="w-full pb-24 bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-20 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
        <div className="px-5 pt-3 pb-3 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Notifikasi
            </h2>
            <p className="text-[11px] text-slate-500">
              {unreadCount > 0
                ? `${unreadCount} pemberitahuan belum dibaca`
                : 'Semua pemberitahuan telah dibaca'}
            </p>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={onMarkAllAsRead}
              className="text-xs font-semibold text-[#1976D2] hover:text-[#0D47A1] flex items-center gap-1 hover:underline"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Tandai Semua Dibaca</span>
            </button>
          )}
        </div>

        {/* Category Filter Chips */}
        <div className="px-5 pb-3 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#1976D2] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Notifications List */}
      <div className="px-5 pt-3 space-y-2.5">
        {filtered.length === 0 ? (
          <div className="bg-white border border-slate-200/90 rounded-2xl p-8 text-center mt-4">
            <div className="w-12 h-12 rounded-2xl bg-[#EAF4FF] text-[#1976D2] mx-auto flex items-center justify-center mb-3">
              <Check className="w-6 h-6 stroke-[2.5]" />
            </div>
            <h4 className="text-sm font-bold text-slate-800">
              Tidak Ada Notifikasi
            </h4>
            <p className="text-xs text-slate-500 mt-1 max-w-[220px] mx-auto">
              Tidak ada notifikasi dalam kategori yang dipilih saat ini.
            </p>
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => onNotificationClick(item)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 shadow-xs ${
                !item.read
                  ? 'bg-white border-[#1976D2]/30 ring-1 ring-[#1976D2]/10'
                  : 'bg-white/80 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                  item.category === 'terlambat'
                    ? 'bg-rose-50'
                    : item.category === 'belum_lengkap'
                    ? 'bg-[#EAF4FF]'
                    : item.category === 'belum_kembali'
                    ? 'bg-amber-50'
                    : 'bg-slate-100'
                }`}
              >
                {getCategoryIcon(item.category)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4
                    className={`text-xs font-bold leading-tight truncate ${
                      !item.read ? 'text-slate-900' : 'text-slate-700'
                    }`}
                  >
                    {item.title}
                  </h4>

                  {!item.read && (
                    <span className="w-2 h-2 rounded-full bg-[#1976D2] shrink-0 ml-2" />
                  )}
                </div>

                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-50">
                  <span className="text-[10px] text-slate-400 flex items-center gap-1 font-medium">
                    <Clock className="w-3 h-3" />
                    <span>{item.timestamp}</span>
                  </span>

                  {item.targetRmId && (
                    <span className="text-[10px] font-semibold text-[#1976D2] hover:underline flex items-center gap-0.5">
                      Lihat Berkas <ChevronRight className="w-3 h-3" />
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
