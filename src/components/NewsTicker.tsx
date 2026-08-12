import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ChevronDown } from 'lucide-react';
import { useNewsItems } from '@/hooks/useNewsItems';

const NewsTicker: React.FC = () => {
  const { activeNewsItems, isLoading } = useNewsItems();
  const [currentIndex, setCurrentIndex] = useState(0);

  const defaultMessage = 'من العايدين وكل عام وأنتم بخير';
  const items = activeNewsItems.length > 0 
    ? activeNewsItems.map(n => n.content)
    : [defaultMessage];

  useEffect(() => {
    if (items.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % items.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [items.length]);

  return (
    <div className="w-full bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 shadow-lg shadow-blue-950/5 rounded-2xl p-2 sm:p-2.5 flex items-center gap-3 my-2" dir="rtl">
      {/* Right Icon Box */}
      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#00173d] text-white flex items-center justify-center shadow-md shrink-0">
        <FileText className="w-5 h-5 stroke-[2]" />
      </div>

      {/* Center News Text */}
      <div className="flex-1 overflow-hidden h-6 relative flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -15, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="absolute inset-x-0 text-center font-bold text-[#00173d] text-sm sm:text-base truncate"
          >
            {items[currentIndex] || defaultMessage}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Left Chevron Button */}
      <button
        onClick={() => setCurrentIndex(prev => (prev + 1) % items.length)}
        className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 hover:bg-slate-100 text-slate-500 flex items-center justify-center shrink-0 transition-colors"
        aria-label="الخبر التالي"
      >
        <ChevronDown className="w-4 h-4 stroke-[2]" />
      </button>
    </div>
  );
};

export default NewsTicker;

