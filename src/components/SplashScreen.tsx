import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Megaphone, TrendingUp, Code, Video, Printer, Palette, ChevronLeft } from 'lucide-react';
import { useSiteSettings } from '@/hooks/useSiteSettings';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { getSetting, getBool } = useSiteSettings();

  const duration = parseInt(getSetting('splash_duration', '8000'), 10) || 8000;
  const logoUrl = getSetting('site_logo_url');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    const splashTimer = setTimeout(() => onComplete(), duration);
    return () => {
      clearInterval(timer);
      clearTimeout(splashTimer);
    };
  }, [onComplete, duration]);

  // Analog Clock Calculations
  const seconds = currentTime.getSeconds();
  const minutes = currentTime.getMinutes() + seconds / 60;
  const hours = (currentTime.getHours() % 12) + minutes / 60;

  const secondAngle = seconds * 6;
  const minuteAngle = minutes * 6;
  const hourAngle = hours * 30;

  // Digital Time & Date Formatting
  const hours12 = currentTime.getHours() % 12 || 12;
  const formattedHours = String(hours12).padStart(2, '0');
  const formattedMinutes = String(currentTime.getMinutes()).padStart(2, '0');
  const formattedSeconds = String(currentTime.getSeconds()).padStart(2, '0');
  const isPm = currentTime.getHours() >= 12;
  const amPmBadge = isPm ? 'م' : 'ص';

  const formattedDate = currentTime.toLocaleDateString('ar-EG', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  let formattedHijriDate = '';
  try {
    formattedHijriDate = new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(currentTime);
  } catch (e) {
    try {
      formattedHijriDate = new Intl.DateTimeFormat('ar-SA-u-ca-islamic', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(currentTime);
    } catch (e2) {
      formattedHijriDate = '';
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onComplete}
        className="fixed inset-0 z-50 flex flex-col items-center justify-between min-h-screen bg-[#edf2f9] p-4 sm:p-6 overflow-y-auto cursor-pointer select-none"
        dir="rtl"
      >
        {/* Background Decorative Waves matching screenshot */}
        {/* Top-Left Blue Wave Ribbon */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-gradient-to-br from-[#00173d] via-[#002870] to-[#2563eb] opacity-90 blur-xl pointer-events-none transform -rotate-45" />
        <div className="absolute top-0 left-0 w-80 h-80 bg-[#002870]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top-Right Red Wave Ribbon */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-bl from-[#990000] via-[#dc2626] to-[#e60000] opacity-90 blur-xl pointer-events-none transform rotate-45" />

        {/* Bottom-Left Red Wave Ribbon */}
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-gradient-to-tr from-[#990000] via-[#dc2626] to-[#e60000] opacity-80 blur-xl pointer-events-none transform -rotate-45" />

        {/* Bottom-Right Blue Wave Ribbon */}
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-tl from-[#00173d] via-[#002870] to-[#2563eb] opacity-90 blur-xl pointer-events-none transform rotate-45" />

        {/* Floating Confetti Dots */}
        <div className="absolute top-28 left-8 flex flex-col gap-3 pointer-events-none opacity-60">
          <span className="w-2.5 h-2.5 rounded-sm bg-[#2563eb] rotate-12" />
          <span className="w-2 h-2 rounded-sm bg-[#00173d]" />
          <span className="w-1.5 h-1.5 rounded-sm bg-[#e60000] -rotate-12" />
        </div>
        <div className="absolute top-28 right-8 flex flex-col gap-3 pointer-events-none opacity-60">
          <span className="w-2.5 h-2.5 rounded-sm bg-[#e60000] -rotate-12" />
          <span className="w-2 h-2 rounded-sm bg-[#2563eb]" />
          <span className="w-1.5 h-1.5 rounded-sm bg-[#00173d] rotate-12" />
        </div>

        {/* Skip button top left */}
        <div className="relative z-20 w-full flex justify-between items-center max-w-md pt-2">
          <span className="text-xs text-slate-400 font-medium">اضغط في أي مكان للمتابعة</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onComplete();
            }}
            className="px-3 py-1.5 rounded-full bg-white/80 hover:bg-white text-slate-700 text-xs font-bold border border-slate-200/80 shadow-sm flex items-center gap-1 transition-all"
          >
            <span>تخطي</span>
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Main Content Container */}
        <div className="relative z-10 w-full max-w-md my-auto flex flex-col items-center text-center space-y-5 py-4">
          
          {/* Logo Card Box matching screenshot */}
          {getBool('splash_show_logo', true) && (
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="w-full max-w-[320px] sm:max-w-[350px] bg-white rounded-[2.5rem] p-5 shadow-2xl shadow-blue-950/15 border border-slate-100 flex flex-col items-center justify-center relative group"
            >
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt={getSetting('site_name', 'منصة ابوكيان الرقمية')}
                  className="w-full h-auto max-h-48 object-contain rounded-[2rem]"
                />
              ) : (
                <div className="w-full flex flex-col items-center py-2">
                  {/* Styled 3D Brand Logo Graphic */}
                  <div className="relative mb-2 flex items-center justify-center">
                    {/* Feather/Flame Feather Graphic */}
                    <div className="relative z-10 text-center">
                      <div className="text-4xl sm:text-5xl font-black tracking-tight text-[#002d80] drop-shadow-md flex items-center justify-center gap-1">
                        <span className="text-[#e60000] relative">
                          ابو
                          <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-6 bg-gradient-to-t from-red-600 to-orange-400 rounded-full blur-[1px] transform -rotate-12" />
                        </span>
                        <span className="text-[#002d80]">كيان</span>
                      </div>
                    </div>
                  </div>

                  {/* Subtitle Pill inside logo box */}
                  <div className="inline-block px-4 py-1 rounded-full bg-white border border-[#002d80] text-[#002d80] font-black text-xs sm:text-sm shadow-sm mb-3">
                    منصة <span className="text-[#e60000]">ابوكيان</span> الرقمية
                  </div>

                  {/* 6 Mini Service Icons Row matching screenshot */}
                  <div className="grid grid-cols-6 gap-1.5 w-full pt-2 border-t border-slate-100 text-[9px] text-slate-600 font-bold">
                    <div className="flex flex-col items-center gap-0.5">
                      <Megaphone className="w-3.5 h-3.5 text-blue-600" />
                      <span className="truncate w-full text-center">الدعاية</span>
                    </div>
                    <div className="flex flex-col items-center gap-0.5">
                      <TrendingUp className="w-3.5 h-3.5 text-red-600" />
                      <span className="truncate w-full text-center">التسويق</span>
                    </div>
                    <div className="flex flex-col items-center gap-0.5">
                      <Palette className="w-3.5 h-3.5 text-amber-600" />
                      <span className="truncate w-full text-center">المطبوعات</span>
                    </div>
                    <div className="flex flex-col items-center gap-0.5">
                      <Code className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="truncate w-full text-center">البرمجة</span>
                    </div>
                    <div className="flex flex-col items-center gap-0.5">
                      <Video className="w-3.5 h-3.5 text-purple-600" />
                      <span className="truncate w-full text-center">الإنتاج</span>
                    </div>
                    <div className="flex flex-col items-center gap-0.5">
                      <Printer className="w-3.5 h-3.5 text-cyan-600" />
                      <span className="truncate w-full text-center">طباعات</span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Main Title Header */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-1.5"
          >
            <h1 className="text-2xl sm:text-3xl font-black text-[#00173d] tracking-tight">
              <span>منصة </span>
              <span className="text-[#e60000]">ابوكيان </span>
              <span>الرقمية</span>
            </h1>
            <p className="text-slate-600 font-semibold text-xs sm:text-sm max-w-xs mx-auto leading-relaxed">
              {getSetting('splash_subtitle') || 'خدمات الدعاية والإعلان والتسويق الإلكتروني والبرمجة والتطوير والإنتاج الفني'}
            </p>
          </motion.div>

          {/* Greeting Section with Decorative Dot Line */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-1 pt-1"
          >
            <div className="flex items-center justify-center gap-2 text-sm sm:text-base font-black text-[#00173d]">
              <span className="w-12 h-px bg-slate-300 relative flex items-center justify-start">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00173d]" />
              </span>
              <span>
                {getSetting('splash_welcome', 'مرحباً بك')} <span className="text-[#e60000]">عزيزنا العميل</span>
              </span>
              <span className="w-12 h-px bg-slate-300 relative flex items-center justify-end">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00173d]" />
              </span>
            </div>
            <p className="text-slate-500 font-medium text-xs sm:text-sm">
              {getSetting('splash_welcome_sub', 'نسعد بخدمتكم دائماً')}
            </p>
          </motion.div>

          {/* Clock Widget Card matching screenshot */}
          {getBool('splash_show_time', true) && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ delay: 0.4, type: 'spring' }}
              className="w-full bg-gradient-to-b from-white via-white to-[#0284c7]/15 rounded-[2.2rem] p-4 sm:p-5 shadow-2xl shadow-blue-900/15 border border-white/90 relative overflow-hidden"
            >
              <div className="flex items-center justify-between gap-3">
                
                {/* LEFT: Analog Clock SVG */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#00173d] p-1.5 shadow-lg border-4 border-white shrink-0 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                    {/* Clock Outer Dial Circle */}
                    <circle cx="50" cy="50" r="48" fill="url(#clockGrad)" stroke="#1d4ed8" strokeWidth="2" />
                    <defs>
                      <radialGradient id="clockGrad" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#002870" />
                        <stop offset="100%" stopColor="#000d2b" />
                      </radialGradient>
                    </defs>

                    {/* Hour Marks */}
                    {[...Array(12)].map((_, i) => {
                      const angle = (i * 30 * Math.PI) / 180;
                      const x1 = 50 + 40 * Math.sin(angle);
                      const y1 = 50 - 40 * Math.cos(angle);
                      const x2 = 50 + 44 * Math.sin(angle);
                      const y2 = 50 - 44 * Math.cos(angle);
                      return (
                        <line
                          key={i}
                          x1={x1}
                          y1={y1}
                          x2={x2}
                          y2={y2}
                          stroke="#60a5fa"
                          strokeWidth={i % 3 === 0 ? "2.5" : "1"}
                          strokeLinecap="round"
                        />
                      );
                    })}

                    {/* Hour Hand */}
                    <line
                      x1="50"
                      y1="50"
                      x2={50 + 24 * Math.sin((hourAngle * Math.PI) / 180)}
                      y2={50 - 24 * Math.cos((hourAngle * Math.PI) / 180)}
                      stroke="#ffffff"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />

                    {/* Minute Hand */}
                    <line
                      x1="50"
                      y1="50"
                      x2={50 + 34 * Math.sin((minuteAngle * Math.PI) / 180)}
                      y2={50 - 34 * Math.cos((minuteAngle * Math.PI) / 180)}
                      stroke="#ffffff"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />

                    {/* Second Hand (Red) */}
                    <line
                      x1="50"
                      y1="50"
                      x2={50 + 38 * Math.sin((secondAngle * Math.PI) / 180)}
                      y2={50 - 38 * Math.cos((secondAngle * Math.PI) / 180)}
                      stroke="#e60000"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />

                    {/* Center Pin */}
                    <circle cx="50" cy="50" r="3" fill="#e60000" stroke="#ffffff" strokeWidth="1" />
                  </svg>
                </div>

                {/* RIGHT: Digital Time & Date */}
                <div className="flex-1 min-w-0 text-right flex flex-col justify-center gap-1.5">
                  {/* Digital Time Row */}
                  <div className="flex items-center justify-end gap-2 dir-ltr">
                    <span className="text-2xl sm:text-3xl font-black text-[#00173d] tracking-tight font-mono">
                      {formattedHours}:{formattedMinutes}:{formattedSeconds}
                    </span>
                    <span className="w-6 h-6 rounded-md bg-[#e60000] text-white font-black text-xs flex items-center justify-center shrink-0 shadow-sm">
                      {amPmBadge}
                    </span>
                  </div>

                  {/* Red Divider Line with Glow */}
                  <div className="w-full h-0.5 bg-slate-200 relative my-0.5 overflow-hidden rounded-full">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#e60000] to-transparent" />
                  </div>

                  {/* Date Pill Box matching screenshot */}
                  <div className="bg-white/90 border border-slate-200/80 rounded-2xl px-3 py-1.5 shadow-sm flex flex-col gap-1">
                    <div className="flex items-center justify-between gap-2">
                      <Calendar className="w-4 h-4 text-[#2563eb] shrink-0" />
                      <span className="text-xs sm:text-sm font-bold text-[#00173d] truncate">
                        {formattedDate}
                      </span>
                    </div>
                    {formattedHijriDate && (
                      <div className="text-[11px] font-extrabold text-[#e60000] text-center pt-1 border-t border-slate-100/80 flex items-center justify-center gap-1">
                        <span>{formattedHijriDate} هـ</span>
                      </div>
                    )}
                  </div>

                </div>

              </div>
            </motion.div>
          )}

        </div>

        {/* Page Dots Indicator at Very Bottom */}
        <div className="relative z-10 flex items-center justify-center gap-2 pb-2">
          <span className="w-3 h-3 rounded-full bg-[#2563eb] shadow-sm animate-pulse" />
          <span className="w-3 h-3 rounded-full bg-slate-300" />
          <span className="w-3 h-3 rounded-full bg-slate-300" />
        </div>

      </motion.div>
    </AnimatePresence>
  );
};

export default SplashScreen;
