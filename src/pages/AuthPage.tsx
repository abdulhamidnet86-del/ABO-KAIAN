import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff, Sparkles, Mail, Lock, User, UserCheck } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useSiteSettings } from '@/hooks/useSiteSettings';

type AuthMode = 'login' | 'register';

const AuthPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState<AuthMode>(searchParams.get('mode') === 'register' ? 'register' : 'login');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login, register, loginAsGuest } = useAuth();
  const { toast } = useToast();
  const { getSetting, getBool } = useSiteSettings();

  const logoUrl = getSetting('site_logo_url');
  const showRegister = getBool('auth_show_register');
  const showGuest = getBool('auth_show_guest');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let result: { error: string | null };
      if (mode === 'login') {
        result = await login(email, password);
      } else {
        result = await register(name, email, password);
      }

      if (result.error) {
        toast({
          title: 'خطأ',
          description: result.error,
          variant: 'destructive',
        });
      } else {
        toast({
          title: mode === 'login' ? 'تم تسجيل الدخول' : 'تم إنشاء الحساب',
          description: mode === 'login' ? 'مرحباً بك في منصة ابوكيان الرقمية' : 'يرجى التحقق من بريدك الإلكتروني لتفعيل الحساب',
        });
        if (mode === 'login') {
          navigate('/');
        }
      }
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'حدث خطأ، يرجى المحاولة مرة أخرى',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuest = () => {
    loginAsGuest();
    toast({
      title: 'مرحباً بك',
      description: 'تم الدخول كزائر',
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#edf2f9] flex flex-col items-center justify-center p-4 sm:p-6 select-none" dir="rtl">
      {/* Curved Background Decorations matching screenshots */}
      {/* Top-Left Blue Ribbon Wave */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-gradient-to-br from-[#00173d] via-[#002870] to-[#2563eb] opacity-90 blur-xl pointer-events-none transform -rotate-45" />
      <div className="absolute top-0 left-0 w-80 h-80 bg-[#002870]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Bottom-Right Red Ribbon Wave */}
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-tl from-[#e60000] via-[#dc2626] to-[#990000] opacity-80 blur-xl pointer-events-none transform rotate-45" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#e60000]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Ambient background grid dots */}
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-md my-auto"
      >
        {/* Logo and Brand Header */}
        <div className="text-center mb-6">
          {/* Logo Card Box */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 15 }}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-[2rem] bg-white p-2.5 shadow-2xl shadow-blue-900/10 border-2 border-red-500/20 relative flex items-center justify-center mx-auto mb-4 group cursor-pointer"
            onClick={() => navigate('/')}
          >
            {logoUrl ? (
              <img src={logoUrl} alt="منصة ابوكيان الرقمية" className="w-full h-full rounded-[1.5rem] object-contain" />
            ) : (
              <div className="relative w-full h-full flex items-center justify-center bg-white rounded-[1.5rem]">
                {/* Custom Four-Point Star Logo */}
                <div className="relative flex items-center justify-center">
                  <Sparkles className="w-12 h-12 text-[#2563eb] stroke-[2]" />
                  <span className="absolute w-3 h-3 rounded-full bg-[#e60000] border-2 border-white" />
                </div>
              </div>
            )}
          </motion.div>

          {/* Main Title: منصة ابوكيان الرقمية */}
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#00173d] flex items-center justify-center gap-1.5 mb-1">
            <span>منصة</span>
            <span className="text-[#e60000]">ابوكيان</span>
            <span>الرقمية</span>
          </h1>
          <p className="text-sm font-semibold text-slate-500">خدمات الدعاية والإعلان</p>
        </div>

        {/* Auth Form Card */}
        <div className="bg-white/95 backdrop-blur-md rounded-[2.2rem] p-6 sm:p-8 shadow-2xl shadow-blue-900/15 border border-slate-100/80">
          
          {/* Capsule Tab Switcher */}
          <div className="bg-slate-100/90 p-1.5 rounded-[1.4rem] flex items-center justify-between gap-1 border border-slate-200/80 mb-6">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`flex-1 py-3 px-4 rounded-[1.1rem] font-bold text-sm sm:text-base transition-all duration-300 relative overflow-hidden ${
                mode === 'login'
                  ? 'bg-gradient-to-r from-[#1d4ed8] via-[#2563eb] to-[#1d4ed8] text-white shadow-md shadow-blue-500/30'
                  : 'text-[#2563eb] hover:text-blue-800 hover:bg-white/50'
              }`}
            >
              تسجيل الدخول
            </button>

            {showRegister && (
              <button
                type="button"
                onClick={() => setMode('register')}
                className={`flex-1 py-3 px-4 rounded-[1.1rem] font-bold text-sm sm:text-base transition-all duration-300 relative overflow-hidden ${
                  mode === 'register'
                    ? 'bg-gradient-to-r from-[#00173d] via-[#002870] to-[#00173d] text-white shadow-md shadow-blue-900/30'
                    : 'text-[#2563eb] hover:text-blue-800 hover:bg-white/50'
                }`}
              >
                حساب جديد
              </button>
            )}
          </div>

          {/* Auth Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name Input (Register Mode) */}
            {mode === 'register' && (
              <div className="relative rounded-[1.2rem] border border-slate-200/90 bg-slate-50/60 hover:bg-white focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100/60 transition-all duration-200 h-14 flex items-center px-4 shadow-sm">
                <input
                  type="text"
                  placeholder="الاسم الكامل"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-slate-800 font-semibold text-sm sm:text-base bg-transparent outline-none pr-2 placeholder:text-slate-400 text-right"
                  required
                />
                <User className="w-5 h-5 text-[#2563eb] shrink-0 mr-2 stroke-[2.2]" />
              </div>
            )}

            {/* Email Input */}
            <div className="relative rounded-[1.2rem] border border-slate-200/90 bg-slate-50/60 hover:bg-white focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100/60 transition-all duration-200 h-14 flex items-center px-4 shadow-sm">
              <input
                type="email"
                placeholder="البريد الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-slate-800 font-semibold text-sm sm:text-base bg-transparent outline-none pr-2 placeholder:text-slate-400 text-right"
                required
              />
              <Mail className="w-5 h-5 text-[#2563eb] shrink-0 mr-2 stroke-[2.2]" />
            </div>

            {/* Password Input */}
            <div className="relative rounded-[1.2rem] border border-slate-200/90 bg-slate-50/60 hover:bg-white focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100/60 transition-all duration-200 h-14 flex items-center px-4 shadow-sm">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="كلمة المرور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-slate-800 font-semibold text-sm sm:text-base bg-transparent outline-none pr-2 placeholder:text-slate-400 text-right"
                required
              />
              <Lock className="w-5 h-5 text-[#2563eb] shrink-0 mr-2 stroke-[2.2]" />
            </div>

            {/* Password Field 2 / Visibility Toggle Bar matching screenshot */}
            <div className="relative rounded-[1.2rem] border border-slate-200/90 bg-slate-50/60 hover:bg-white focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100/60 transition-all duration-200 h-14 flex items-center px-4 shadow-sm overflow-hidden">
              {/* Left Badge Toggle Button with Red/Blue Gradient */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-0 top-0 bottom-0 px-4 bg-gradient-to-br from-[#00173d] via-[#a80000] to-[#00173d] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                title={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>

              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="كلمة المرور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-slate-800 font-semibold text-sm sm:text-base bg-transparent outline-none pr-2 pl-12 placeholder:text-slate-400 text-right"
              />
              {mode === 'register' ? (
                <Lock className="w-5 h-5 text-[#2563eb] shrink-0 mr-2 stroke-[2.2]" />
              ) : (
                <Eye className="w-5 h-5 text-[#2563eb] shrink-0 mr-2 stroke-[2.2]" />
              )}
            </div>

            {/* Primary Action Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full h-14 rounded-[1.2rem] font-black text-lg text-white transition-all duration-300 shadow-lg active:scale-[0.99] flex items-center justify-center mt-2 ${
                mode === 'login'
                  ? 'bg-gradient-to-r from-[#1d4ed8] via-[#2563eb] to-[#1d4ed8] shadow-blue-500/30 hover:shadow-blue-500/40'
                  : 'bg-gradient-to-r from-[#00173d] via-[#002870] to-[#00173d] shadow-blue-900/30 hover:shadow-blue-900/40'
              }`}
            >
              {isLoading
                ? 'جاري التحميل...'
                : mode === 'login'
                ? getSetting('auth_login_button_text', 'دخول')
                : getSetting('auth_register_button_text', 'إنشاء حساب')}
            </button>
          </form>

          {/* Divider matching screenshot with blue & red end dots */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-slate-200 relative flex items-center justify-start">
              <span className="w-2 h-2 rounded-full bg-[#2563eb]" />
            </div>
            <span className="text-slate-500 font-bold text-sm">أو</span>
            <div className="flex-1 h-px bg-slate-200 relative flex items-center justify-end">
              <span className="w-2 h-2 rounded-full bg-[#e60000]" />
            </div>
          </div>

          {/* Guest Action Button */}
          {showGuest && (
            <button
              type="button"
              onClick={handleGuest}
              className="w-full h-14 rounded-[1.2rem] border-2 border-[#2563eb] bg-white hover:bg-blue-50/60 text-[#1d4ed8] font-black text-base flex items-center justify-center gap-3 shadow-sm transition-all duration-200"
            >
              <UserCheck className="w-5 h-5 text-[#2563eb] stroke-[2.2]" />
              <span>الدخول كضيف</span>
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
