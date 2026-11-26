import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  Key, 
  ArrowRight, 
  UserCheck, 
  AlertCircle, 
  Building2, 
  Eye, 
  EyeOff, 
  X, 
  CheckCircle2, 
  Activity,
  Stethoscope,
  Sparkles
} from 'lucide-react';

export interface AdminUser {
  name: string;
  role: 'STO' | 'DTO' | 'MO_STS';
  designation: string;
  email: string;
  district: string;
}

interface AdminLoginProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: AdminUser) => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  // Preset Demo Accounts
  const DEMO_ACCOUNTS: { [key: string]: AdminUser & { pass: string } } = {
    'admin@nhm.assam.gov.in': {
      name: 'Dr. Debojit Sarmah',
      role: 'STO',
      designation: 'State TB Officer & Directorate Admin',
      email: 'admin@nhm.assam.gov.in',
      district: 'Statewide / Assam HQ',
      pass: 'dispur2026'
    },
    'dto.kamrup@nhm.assam.gov.in': {
      name: 'Dr. Ananya Kalita',
      role: 'DTO',
      designation: 'District TB Officer',
      email: 'dto.kamrup@nhm.assam.gov.in',
      district: 'Kamrup Metropolitan',
      pass: 'dispur2026'
    },
    'motc.guwahati@nhm.assam.gov.in': {
      name: 'Dr. Bipul Saikia',
      role: 'MO_STS',
      designation: 'Supervisory Medical Officer (MO-TC)',
      email: 'motc.guwahati@nhm.assam.gov.in',
      district: 'Guwahati TU',
      pass: 'dispur2026'
    }
  };

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      const cleanEmail = email.trim().toLowerCase();
      const account = DEMO_ACCOUNTS[cleanEmail];

      if (account && password === account.pass) {
        onLoginSuccess({
          name: account.name,
          role: account.role,
          designation: account.designation,
          email: account.email,
          district: account.district
        });
        setIsLoading(false);
        onClose();
      } else if (cleanEmail === 'admin@nhm.assam.gov.in' && (password === 'dispur2026' || password === 'admin123')) {
        // Fallback convenience demo account
        onLoginSuccess({
          name: 'Dr. Debojit Sarmah',
          role: 'STO',
          designation: 'State TB Officer & Directorate Admin',
          email: 'admin@nhm.assam.gov.in',
          district: 'Statewide / Assam HQ'
        });
        setIsLoading(false);
        onClose();
      } else {
        setError('Invalid credentials. Please click one of the 1-click Demo Fill accounts below.');
        setIsLoading(false);
      }
    }, 450);
  };

  const handleQuickLogin = (demoEmail: string) => {
    const account = DEMO_ACCOUNTS[demoEmail];
    if (account) {
      setEmail(account.email);
      setPassword(account.pass);
      setError('');
      setIsLoading(true);
      setTimeout(() => {
        onLoginSuccess({
          name: account.name,
          role: account.role,
          designation: account.designation,
          email: account.email,
          district: account.district
        });
        setIsLoading(false);
        onClose();
      }, 350);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#0a192f] border border-blue-600/40 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 text-white my-8">
        
        {/* Top Aesthetic Decorative Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-700 via-blue-500 to-indigo-400" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-full hover:bg-blue-900/40 transition-colors"
          title="Close Login Window"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Branding */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center mx-auto shadow-lg shadow-blue-950/50">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-950/80 border border-blue-700/60 text-[11px] font-mono text-blue-300 mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Assam State Health Portal • Secure Auth</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              NikshayDrishti Management Console
            </h2>
            <p className="text-xs text-blue-200/70">
              National Health Mission & State TB Cell, Government of Assam (NESFIC-D-30)
            </p>
          </div>
        </div>

        {/* 1-Click Quick Fill Demo Accounts Banner */}
        <div className="bg-[#071326] border border-blue-600/30 rounded-2xl p-4 mb-6 shadow-inner">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[11px] font-bold text-blue-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              1-Click Demo Persona Access
            </span>
            <span className="text-[10px] bg-blue-900/80 text-blue-200 border border-blue-700 px-2 py-0.5 rounded-full font-mono">
              Pass: dispur2026
            </span>
          </div>

          <div className="space-y-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('admin@nhm.assam.gov.in')}
              disabled={isLoading}
              className="w-full text-left p-2.5 rounded-xl bg-[#0d1f3b] hover:bg-[#12284b] border border-blue-900/60 hover:border-blue-500/50 transition-all flex items-center justify-between group"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white group-hover:text-blue-300">
                    State TB Officer (STO) / Super Admin
                  </span>
                  <span className="text-[10px] px-1.5 py-0.2 bg-blue-900 text-blue-200 rounded font-semibold border border-blue-700">
                    Full Control
                  </span>
                </div>
                <div className="text-[11px] text-blue-200/60 font-mono">admin@nhm.assam.gov.in</div>
              </div>
              <span className="text-xs text-blue-400 font-medium group-hover:translate-x-0.5 transition-transform">
                Sign In →
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('dto.kamrup@nhm.assam.gov.in')}
              disabled={isLoading}
              className="w-full text-left p-2.5 rounded-xl bg-[#0d1f3b] hover:bg-[#12284b] border border-blue-900/60 hover:border-blue-500/50 transition-all flex items-center justify-between group"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white group-hover:text-blue-300">
                    District TB Officer (DTO)
                  </span>
                  <span className="text-[10px] px-1.5 py-0.2 bg-indigo-900 text-indigo-200 rounded font-semibold border border-indigo-700">
                    Kamrup Metro
                  </span>
                </div>
                <div className="text-[11px] text-blue-200/60 font-mono">dto.kamrup@nhm.assam.gov.in</div>
              </div>
              <span className="text-xs text-blue-400 font-medium group-hover:translate-x-0.5 transition-transform">
                Sign In →
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('motc.guwahati@nhm.assam.gov.in')}
              disabled={isLoading}
              className="w-full text-left p-2.5 rounded-xl bg-[#0d1f3b] hover:bg-[#12284b] border border-blue-900/60 hover:border-blue-500/50 transition-all flex items-center justify-between group"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white group-hover:text-blue-300">
                    Supervisory Medical Officer (MO-TC)
                  </span>
                  <span className="text-[10px] px-1.5 py-0.2 bg-sky-900 text-sky-200 rounded font-semibold border border-sky-700">
                    Clinical
                  </span>
                </div>
                <div className="text-[11px] text-blue-200/60 font-mono">motc.guwahati@nhm.assam.gov.in</div>
              </div>
              <span className="text-xs text-blue-400 font-medium group-hover:translate-x-0.5 transition-transform">
                Sign In →
              </span>
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-4">
          <div className="border-t border-blue-900/50 w-full" />
          <span className="bg-[#0a192f] px-3 text-[11px] uppercase tracking-wider text-blue-300 font-mono">
            Or Enter Specific Credentials
          </span>
          <div className="border-t border-blue-900/50 w-full" />
        </div>

        {/* Manual Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-950/60 border border-red-500/50 rounded-xl text-red-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-blue-100 mb-1.5">
              Official Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-blue-300/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@nhm.assam.gov.in"
                required
                className="w-full bg-[#071326] border border-blue-900/60 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-500 outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-blue-100 mb-1.5">
              Secure Access Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-blue-300/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full bg-[#071326] border border-blue-900/60 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl py-2.5 pl-10 pr-10 text-xs text-white placeholder-slate-500 outline-none transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-600 hover:to-blue-500 text-white font-semibold text-xs tracking-wide shadow-lg shadow-blue-950/50 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Authenticating ASDC Gateway...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Authenticate & Access Console <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </button>
        </form>

        {/* Statutory Regulatory Disclaimer */}
        <div className="mt-6 pt-4 border-t border-blue-900/50 text-center">
          <p className="text-[10px] text-blue-200/50 leading-relaxed">
            Authorized personnel only under National Health Mission, Assam. All system actions are monitored and logged with immutable SHA-256 digital audit trails in accordance with the Digital Personal Data Protection Act (DPDPA 2023).
          </p>
        </div>

      </div>
    </div>
  );
};
