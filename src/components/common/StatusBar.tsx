import React from 'react';
import { Wifi, BatteryMedium, Signal } from 'lucide-react';

interface StatusBarProps {
  dark?: boolean;
}

export const StatusBar: React.FC<StatusBarProps> = ({ dark = false }) => {
  return (
    <div
      className={`w-full px-6 pt-3 pb-1 flex md:hidden items-center justify-between text-xs select-none transition-colors ${
        dark ? 'text-white' : 'text-slate-800'
      }`}
    >
      <span className="font-semibold tracking-tight text-[13px] pl-1">09:41</span>
      
      {/* Dynamic island center mock spacer */}
      <div className="w-24 h-4 rounded-full bg-black/10 flex items-center justify-center opacity-0 pointer-events-none" />

      <div className="flex items-center gap-1.5 pr-1">
        <Signal className="w-3.5 h-3.5" strokeWidth={2.5} />
        <Wifi className="w-3.5 h-3.5" strokeWidth={2.5} />
        <BatteryMedium className="w-4 h-4" strokeWidth={2.5} />
      </div>
    </div>
  );
};
