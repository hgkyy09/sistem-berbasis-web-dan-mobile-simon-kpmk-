import React from 'react';

interface SimonLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  inverted?: boolean;
}

export const SimonLogo: React.FC<SimonLogoProps> = ({
  size = 'md',
  showText = false,
  inverted = false,
}) => {
  const sizeMap = {
    xs: { icon: 'w-7 h-7', text: 'text-xs' },
    sm: { icon: 'w-9 h-9', text: 'text-sm' },
    md: { icon: 'w-12 h-12', text: 'text-base' },
    lg: { icon: 'w-16 h-16', text: 'text-xl' },
    xl: { icon: 'w-24 h-24', text: 'text-2xl' },
  };

  return (
    <div className="flex items-center gap-3">
      {/* Official SIMON KPMK Logo Emblem */}
      <div
        className={`${sizeMap[size].icon} relative flex items-center justify-center shrink-0 drop-shadow-sm select-none transition-transform hover:scale-105 duration-200`}
      >
        <svg
          viewBox="0 0 512 512"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="squircleBgComp" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#BAE6FD" />
              <stop offset="50%" stopColor="#7DD3FC" />
              <stop offset="100%" stopColor="#38BDF8" />
            </linearGradient>

            <linearGradient id="folderFrontComp" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#1D4ED8" />
            </linearGradient>

            <linearGradient id="folderBackComp" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1E3A8A" />
              <stop offset="100%" stopColor="#172554" />
            </linearGradient>

            <linearGradient id="badgeGradComp" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E40AF" />
              <stop offset="100%" stopColor="#1D4ED8" />
            </linearGradient>
          </defs>

          {/* Squircle Light Blue Card */}
          <rect x="36" y="36" width="440" height="440" rx="108" fill="url(#squircleBgComp)" />
          <rect x="38" y="38" width="436" height="436" rx="106" fill="none" stroke="#FFFFFF" strokeWidth="6" strokeOpacity="0.5" />

          {/* Dark Navy Tab Back */}
          <path d="M78 195 C78 180 90 168 105 168 L170 168 C182 168 192 174 198 182 L216 208 L405 208 C420 208 432 220 432 235 L432 370 C432 385 420 398 405 398 L105 398 C90 398 78 385 78 370 Z" fill="url(#folderBackComp)" />

          {/* Medical Document Back Accent */}
          <rect x="180" y="110" width="220" height="230" rx="24" fill="#E2E8F0" />
          
          {/* Main White Medical Document */}
          <rect x="188" y="118" width="220" height="225" rx="24" fill="#FFFFFF" stroke="#1E40AF" strokeWidth="12" />
          
          {/* Medical Plus Symbol inside paper */}
          <path d="M256 160 C256 156 259 153 263 153 L281 153 C285 153 288 156 288 160 L288 174 L302 174 C306 174 309 177 309 181 L309 199 C309 203 306 206 302 206 L288 206 L288 220 C288 224 285 227 281 227 L263 227 C259 227 256 224 256 220 L256 206 L242 206 C238 206 235 203 235 199 L235 181 C235 177 238 174 242 174 L256 174 Z" fill="#1E40AF" />
          
          {/* Document Content Lines */}
          <rect x="325" y="165" width="62" height="12" rx="6" fill="#93C5FD" />
          <rect x="325" y="195" width="62" height="12" rx="6" fill="#93C5FD" />
          <rect x="325" y="225" width="46" height="12" rx="6" fill="#93C5FD" />
          <rect x="235" y="252" width="135" height="12" rx="6" fill="#93C5FD" />

          {/* Front Folder with Cutout Lip */}
          <path d="M78 280 C78 256 94 242 118 242 L212 242 C226 242 238 248 248 258 L270 280 C278 288 288 292 298 292 L396 292 C418 292 434 306 434 328 L434 404 C434 428 416 448 392 448 L120 448 C96 448 78 428 78 404 Z" fill="url(#folderFrontComp)" />
          
          <path d="M80 282 C80 260 96 244 118 244 L212 244 C226 244 238 250 248 260 L270 282 C278 290 288 294 298 294 L396 294 C417 294 432 307 433 328" fill="none" stroke="#93C5FD" strokeWidth="6" strokeLinecap="round" />

          {/* Label Bar on Front Folder */}
          <rect x="122" y="336" width="140" height="34" rx="14" fill="#FFFFFF" opacity="0.95" />

          {/* Checkmark Circle Badge */}
          <circle cx="370" cy="385" r="72" fill="#FFFFFF" />
          <circle cx="370" cy="385" r="60" fill="url(#badgeGradComp)" />
          <path d="M338 384 L358 404 L402 360" fill="none" stroke="#FFFFFF" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-black tracking-tight ${sizeMap[size].text} ${
                inverted ? 'text-white' : 'text-[#0D47A1]'
              }`}
            >
              SIM<span className="text-[#1976D2]">O</span>N <span className="text-[#2563EB]">KPMK</span>
            </span>
          </div>
          <span
            className={`text-[10px] leading-tight font-medium ${
              inverted ? 'text-blue-100' : 'text-slate-500'
            }`}
          >
            Sistem Informasi Monitoring Kelengkapan & Pengembalian Rekam Medis
          </span>
        </div>
      )}
    </div>
  );
};
