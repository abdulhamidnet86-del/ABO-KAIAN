import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PortfolioPromoCard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate('/portfolio')}
      className="relative overflow-hidden rounded-[1.5rem] cursor-pointer bg-gradient-to-r from-[#00173d]/90 via-[#002870]/85 to-[#00173d]/90 backdrop-blur-xl p-4 sm:p-5 shadow-xl shadow-blue-950/20 hover:shadow-2xl hover:shadow-blue-900/30 border border-white/20 text-white my-3 transition-all duration-300"
      dir="rtl"
    >
      <div className="relative z-10 flex items-center justify-between gap-4">
        {/* Right Icon Box */}
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#002d80] border border-blue-400/30 flex items-center justify-center text-white shrink-0 shadow-inner">
          <Briefcase className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.8]" />
        </div>

        {/* Center Text */}
        <div className="flex-1 min-w-0 text-right">
          <h3 className="text-white font-black text-base sm:text-lg leading-tight mb-1">
            معرض أعمالنا
          </h3>
          <p className="text-cyan-100/80 text-xs leading-relaxed truncate">
            تصاميم احترافية · صور · تجارب ملهمة لأعمالنا
          </p>
        </div>

        {/* Left Arrow Button */}
        <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0">
          <ArrowLeft className="w-5 h-5" />
        </div>
      </div>
    </motion.div>
  );
};

export default PortfolioPromoCard;

