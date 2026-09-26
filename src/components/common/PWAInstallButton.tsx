import React, { useState } from 'react';
import { Download, Smartphone } from 'lucide-react';
import { usePWAInstall } from '../../hooks/usePWAInstall';
import { PWAInstallModal } from './PWAInstallModal';

interface PWAInstallButtonProps {
  variant?: 'primary' | 'outline' | 'header';
  className?: string;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  variant = 'header',
  className = '',
}) => {
  const { isInstallable, isInstalled, install } = usePWAInstall();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // If already running in standalone mode (installed), we can still show a button or hide it
  if (isInstalled) {
    return null;
  }

  const handleClick = async () => {
    if (isInstallable) {
      const outcome = await install();
      if (!outcome) {
        setIsModalOpen(true);
      }
    } else {
      setIsModalOpen(true);
    }
  };

  if (variant === 'header') {
    return (
      <>
        <button
          onClick={handleClick}
          className={`h-8 px-2.5 rounded-lg text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 flex items-center gap-1.5 shadow-xs transition-transform active:scale-95 ${className}`}
          title="Unduh & Pasang SIMON KPMK ke HP Anda"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>📲 Pasang di HP</span>
        </button>

        <PWAInstallModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </>
    );
  }

  if (variant === 'primary') {
    return (
      <>
        <button
          onClick={handleClick}
          className={`w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#1976D2] to-[#0D47A1] text-white font-bold text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition active:scale-98 ${className}`}
        >
          <Download className="w-4 h-4" />
          <span>Pasang Aplikasi SIMON KPMK di Ponsel</span>
        </button>

        <PWAInstallModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </>
    );
  }

  return (
    <>
      <button
        onClick={handleClick}
        className={`px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 transition ${className}`}
      >
        <Download className="w-3.5 h-3.5 text-[#1976D2]" />
        <span>Instal PWA</span>
      </button>

      <PWAInstallModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
