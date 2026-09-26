import React, { useState } from 'react';
import { SimonLogo } from '../common/SimonLogo';
import { Eye, EyeOff, Lock, User, Check, AlertCircle } from 'lucide-react';
import { Button } from '../common/Buttons';

interface LoginScreenProps {
  onLoginSuccess: () => void;
  onForgotPassword?: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLoginSuccess,
  onForgotPassword,
}) => {
  const [username, setUsername] = useState('admin.rekammedis');
  const [password, setPassword] = useState('medis2026');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Mohon isi username dan password');
      return;
    }
    setError(null);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
    }, 600);
  };

  return (
    <div className="w-full min-h-[680px] bg-transparent flex flex-col justify-center items-center py-6 px-4">
      <div className="w-full max-w-md bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col">
        {/* Top Branding */}
        <div className="flex flex-col items-center text-center pb-2">
          <SimonLogo size="lg" />
          
          <h1 className="text-2xl font-bold tracking-tight text-[#0D47A1] mt-4">
            Selamat Datang
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-[280px]">
            Masuk untuk mengelola kelengkapan & lokasi berkas rekam medis <strong className="text-[#1976D2]">RSUD Muara Enim</strong>
          </p>
        </div>

      {/* Form Card */}
      <div className="my-auto py-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Username Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Username atau Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username atau email"
                className="w-full h-11 pl-10 pr-3.5 text-sm bg-slate-50/80 border border-slate-200 rounded-xl focus:bg-white focus:border-[#1976D2] focus:ring-2 focus:ring-[#1976D2]/15 outline-none transition-all text-slate-800 placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                className="w-full h-11 pl-10 pr-10 text-sm bg-slate-50/80 border border-slate-200 rounded-xl focus:bg-white focus:border-[#1976D2] focus:ring-2 focus:ring-[#1976D2]/15 outline-none transition-all text-slate-800 placeholder:text-slate-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="sr-only"
              />
              <div
                className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                  rememberMe
                    ? 'bg-[#1976D2] border-[#1976D2] text-white'
                    : 'border-slate-300 bg-white'
                }`}
              >
                {rememberMe && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
              <span className="text-xs text-slate-600">Ingat saya</span>
            </label>

            <button
              type="button"
              onClick={onForgotPassword}
              className="text-xs font-semibold text-[#1976D2] hover:text-[#0D47A1] hover:underline"
            >
              Lupa Password?
            </button>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={isLoading}
            >
              Masuk
            </Button>
          </div>

          {/* Quick Demo Credentials Tip */}
          <div className="p-3 rounded-xl bg-[#EAF4FF]/80 border border-[#1976D2]/20 text-[11px] text-slate-600 flex flex-col gap-0.5 mt-2">
            <span className="font-semibold text-[#0D47A1]">
              Akun Demonstrasi Petugas:
            </span>
            <span>Username: <strong className="text-slate-800">admin.rekammedis</strong></span>
            <span>Password: <strong className="text-slate-800">medis2026</strong> (Unit Rekam Medis)</span>
          </div>
        </form>
      </div>

        {/* Footer */}
        <div className="text-center pt-4">
          <p className="text-[11px] text-slate-400">
            SIMON KPMK · Dibuat untuk Instalasi Rekam Medis RSUD Muara Enim
          </p>
        </div>
      </div>
    </div>
  );
};
