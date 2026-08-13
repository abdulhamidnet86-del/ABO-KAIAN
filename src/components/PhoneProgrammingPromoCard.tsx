import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Smartphone, Zap, Radio, PhoneCall, Globe, Sparkles, ShieldCheck } from 'lucide-react';

export const PhoneProgrammingPromoCard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.6 }}
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      onClick={() => navigate('/phone-programming')}
      className="relative cursor-pointer overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 p-[2px] shadow-xl shadow-blue-500/20 hover:shadow-2xl hover:shadow-cyan-500/35 transition-all duration-500 group"
    >
      <div className="relative overflow-hidden rounded-[22px] bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-5 sm:p-6 text-white">
        
        {/* Background Glowing Ambient Orbs */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-cyan-500/15 rounded-full blur-2xl group-hover:bg-cyan-500/25 transition-all duration-700 -translate-y-10 translate-x-10" />
        <div className="absolute bottom-0 left-0 w-44 h-44 bg-indigo-500/20 rounded-full blur-2xl group-hover:bg-indigo-500/30 transition-all duration-700 translate-y-10 -translate-x-10" />

        {/* Animated Tech Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-40" />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          
          {/* Right Side: Animated Smartphone Frame & Tech Badges */}
          <div className="flex items-center gap-4 flex-1">
            
            {/* Animated Smartphone Frame */}
            <div className="relative flex-shrink-0">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-600 to-indigo-700 p-0.5 shadow-lg shadow-cyan-500/30 flex items-center justify-center"
              >
                <div className="w-full h-full bg-slate-950/90 rounded-[14px] backdrop-blur-md flex flex-col items-center justify-center relative overflow-hidden border border-white/10">
                  {/* Top Phone Speaker Notch */}
                  <div className="absolute top-1.5 w-4 h-1 bg-white/30 rounded-full" />
                  
                  {/* Phone Screen Icon */}
                  <Smartphone className="w-7 h-7 text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] mt-1" />

                  {/* Animated Signal Waves Effect */}
                  <div className="absolute bottom-1.5 flex items-end gap-0.5">
                    <motion.div animate={{ height: ['4px', '8px', '4px'] }} transition={{ repeat: Infinity, duration: 1.2 }} className="w-1 bg-cyan-400 rounded-full" />
                    <motion.div animate={{ height: ['6px', '12px', '6px'] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }} className="w-1 bg-emerald-400 rounded-full" />
                    <motion.div animate={{ height: ['8px', '14px', '8px'] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }} className="w-1 bg-blue-400 rounded-full" />
                    <motion.div animate={{ height: ['10px', '16px', '10px'] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.6 }} className="w-1 bg-purple-400 rounded-full" />
                  </div>
                </div>
              </motion.div>

              {/* Sparkle Floating Badge */}
              <motion.div 
                animate={{ scale: [0.9, 1.15, 0.9], rotate: [0, 10, -10, 0] }} 
                transition={{ repeat: Infinity, duration: 2.5 }}
                className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center shadow-md shadow-orange-500/40 text-slate-950"
              >
                <Sparkles className="w-3.5 h-3.5 fill-current" />
              </motion.div>
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg sm:text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-200">
                  برمجة الهواتف الذكية
                </h3>
                <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-black px-2 py-0.5 rounded-full border border-cyan-400/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  3G / 4G / VoLTE
                </span>
              </div>

              <p className="text-slate-300 text-xs sm:text-sm font-medium leading-relaxed">
                تفعيل الثري جي، الفورجي، الفولتي، التعريب، وأكواد الدياج لجميع أجهزة السامسونج والـ LG والـ LT والشاومي والموتورولا..
              </p>

              {/* Tech Badges Pills Row */}
              <div className="flex items-center gap-2 pt-1 flex-wrap">
                <span className="bg-blue-900/60 text-blue-200 text-[11px] font-bold px-2.5 py-0.5 rounded-lg border border-blue-500/30 flex items-center gap-1">
                  <Radio className="w-3 h-3 text-blue-400" />
                  3G CDMA
                </span>
                <span className="bg-emerald-900/60 text-emerald-200 text-[11px] font-bold px-2.5 py-0.5 rounded-lg border border-emerald-500/30 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-emerald-400" />
                  4G LTE
                </span>
                <span className="bg-purple-900/60 text-purple-200 text-[11px] font-bold px-2.5 py-0.5 rounded-lg border border-purple-500/30 flex items-center gap-1">
                  <PhoneCall className="w-3 h-3 text-purple-400" />
                  VoLTE HD
                </span>
                <span className="bg-amber-900/60 text-amber-200 text-[11px] font-bold px-2.5 py-0.5 rounded-lg border border-amber-500/30 flex items-center gap-1">
                  <Globe className="w-3 h-3 text-amber-400" />
                  التعريب
                </span>
              </div>
            </div>

          </div>

          {/* Action Arrow Button */}
          <div className="flex items-center justify-end w-full sm:w-auto self-end sm:self-center">
            <motion.div
              animate={{ x: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
              className="w-10 h-10 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30 group-hover:bg-cyan-400 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.div>
          </div>

        </div>

      </div>
    </motion.div>
  );
};

export default PhoneProgrammingPromoCard;
