import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Store, Sparkles } from 'lucide-react';
import { useHeroSlides } from '@/hooks/useHeroSlides';
import { useNavigate } from 'react-router-dom';

const defaultStoreSlide = {
  id: 'store-banner-default',
  title: 'تصفح متجرنا الإلكتروني',
  highlightTitle: 'للتطبيقات والألعاب',
  description: 'تطبيقات مميزة، باقات، وألعاب شيقة',
  gradient: 'from-[#00173d] via-[#002870] to-[#00173d]',
  link: '/apps',
  isStoreDefault: true,
};

const HeroSlider: React.FC = () => {
  const [[currentIndex, direction], setState] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);
  const { activeSlides } = useHeroSlides();
  const navigate = useNavigate();

  const customItems = activeSlides.map(s => ({
    id: s.id,
    title: s.title,
    highlightTitle: '',
    description: s.description || '',
    gradient: s.gradient || 'from-[#00173d] via-[#002d80] to-[#00173d]',
    image_url: (s as any).image_url || null,
    link: '/packages',
    isStoreDefault: false,
  }));

  const items = [defaultStoreSlide, ...customItems];
  const count = items.length;

  const paginate = useCallback((dir: number) => {
    setState(([i]) => [(i + dir + count) % count, dir]);
  }, [count]);

  useEffect(() => {
    if (count <= 1 || paused) return;
    const timer = setInterval(() => paginate(1), 5000);
    return () => clearInterval(timer);
  }, [count, paused, paginate]);

  const currentItem = items[currentIndex] || defaultStoreSlide;

  return (
    <div
      className="relative w-full rounded-[2rem] overflow-hidden shadow-2xl shadow-blue-950/20 border border-white/20 backdrop-blur-xl group my-2 cursor-pointer bg-[#00173d]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onClick={() => currentItem.link && navigate(currentItem.link)}
      dir="rtl"
    >
      <AnimatePresence mode="popLayout" custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          initial={{ opacity: 0, scale: 1.04, x: direction > 0 ? -40 : 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.98, x: direction > 0 ? 40 : -40 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`w-full min-h-[220px] sm:min-h-[260px] p-6 sm:p-8 flex items-center justify-between relative bg-gradient-to-r ${currentItem.gradient}`}
        >
          {/* Ambient Glow Effects */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.35),transparent_70%)] pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

          {/* Right Side 3D Store Graphic (RTL layout: right side) */}
          <div className="relative z-10 flex items-center justify-center shrink-0 mr-2 sm:mr-6">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-gradient-to-b from-cyan-500/20 via-blue-600/30 to-blue-900/60 border border-cyan-400/50 shadow-[0_0_35px_rgba(6,182,212,0.4)] flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
              {/* Neon store lines */}
              <div className="absolute inset-0 bg-cyan-500/10 blur-md" />
              <Store className="w-16 h-16 sm:w-20 sm:h-20 text-cyan-300 stroke-[1.5] drop-shadow-[0_0_15px_rgba(6,182,212,0.8)] relative z-10" />
              <div className="absolute bottom-2 inset-x-3 h-2 rounded-full bg-cyan-400/80 shadow-[0_0_12px_#22d3ee]" />
            </div>
          </div>

          {/* Left/Center Text Content */}
          <div className="relative z-10 flex-1 text-right flex flex-col justify-center gap-2">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-3xl font-black text-white leading-snug tracking-tight">
                {currentItem.title}
              </h2>
              {currentItem.highlightTitle && (
                <h3 className="text-lg sm:text-2xl font-black text-white leading-snug tracking-tight">
                  {currentItem.highlightTitle}
                </h3>
              )}
            </div>

            <p className="text-cyan-100/90 text-xs sm:text-sm font-medium leading-relaxed max-w-sm">
              {currentItem.description}
            </p>

            {/* Sub-arrows around text */}
            <div className="flex items-center gap-2 mt-2">
              <ChevronRight className="w-5 h-5 text-cyan-300 animate-pulse" />
              <ChevronLeft className="w-5 h-5 text-cyan-300 animate-pulse" />
            </div>
          </div>

          {/* Background custom slide image if provided */}
          {currentItem.image_url && (
            <img
              src={currentItem.image_url}
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-overlay"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Pagination Bar at Bottom */}
      <div className="absolute bottom-3 inset-x-0 z-20 flex items-center justify-center gap-1.5" dir="ltr">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              setState([idx, idx > currentIndex ? 1 : -1]);
            }}
            className={`transition-all duration-300 ${
              idx === currentIndex
                ? 'w-8 h-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]'
                : 'w-2 h-2 rounded-full bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`الشريحة ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;

