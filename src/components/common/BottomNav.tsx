import React from 'react';
import { Home, FileText, Activity, Bell, User } from 'lucide-react';
import { ScreenId } from '../../types';

interface BottomNavProps {
  activeScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  unreadCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeScreen,
  onNavigate,
  unreadCount = 2,
}) => {
  const navItems = [
    {
      id: 'home' as ScreenId,
      label: 'Beranda',
      icon: Home,
    },
    {
      id: 'records' as ScreenId,
      label: 'Rekam Medis',
      icon: FileText,
    },
    {
      id: 'monitoring' as ScreenId,
      label: 'Monitoring',
      icon: Activity,
    },
    {
      id: 'notifications' as ScreenId,
      label: 'Notifikasi',
      icon: Bell,
      badge: unreadCount,
    },
    {
      id: 'profile' as ScreenId,
      label: 'Profil',
      icon: User,
    },
  ];

  return (
    <nav className="w-full bg-white border-t border-slate-200/80 px-2 py-1.5 flex items-center justify-around z-30 shadow-[0_-4px_16px_rgba(0,0,0,0.03)] select-none">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive =
          activeScreen === item.id ||
          (item.id === 'records' && activeScreen === 'detail');

        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`relative flex flex-col items-center justify-center min-w-[56px] min-h-[48px] py-1 px-1 transition-all rounded-xl ${
              isActive
                ? 'text-[#1976D2]'
                : 'text-slate-400 hover:text-slate-600 active:scale-95'
            }`}
            aria-label={item.label}
          >
            <div className="relative">
              <Icon
                className={`w-[22px] h-[22px] transition-transform ${
                  isActive ? 'scale-105 stroke-[2.3]' : 'stroke-[1.8]'
                }`}
              />
              {item.badge && item.badge > 0 ? (
                <span className="absolute -top-1 -right-2 min-w-[17px] h-[17px] bg-[#1976D2] text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 border-2 border-white">
                  {item.badge}
                </span>
              ) : null}
            </div>

            <span
              className={`text-[11px] font-medium tracking-tight mt-1 whitespace-nowrap ${
                isActive ? 'text-[#1976D2] font-semibold' : 'text-slate-500'
              }`}
            >
              {item.label}
            </span>

            {isActive && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#1976D2] mt-0.5" />
            )}
          </button>
        );
      })}
    </nav>
  );
};
