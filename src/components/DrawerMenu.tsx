import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Moon, Sun, LogOut, ChevronLeft, LayoutDashboard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { useAdmin } from '@/hooks/useAdmin';
import { menuItems } from '@/data/services';

const getUserDisplayInfo = (user: any, profile: any) => {
  if (profile) return { name: profile.name, email: profile.email, isGuest: false };
  if (user) return { name: user.user_metadata?.name || user.email?.split('@')[0] || 'مستخدم', email: user.email, isGuest: false };
  return { name: 'زائر', email: '', isGuest: true };
};

interface DrawerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const DrawerMenu: React.FC<DrawerMenuProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { user, profile, logout } = useAuth();
  const { isAdmin } = useAdmin();
  const displayInfo = getUserDisplayInfo(user, profile);

  // Filter out admin item from regular menu - we'll show it conditionally
  const filteredMenuItems = menuItems.filter(item => item.id !== 'admin');

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  const handleLogout = () => {
    logout();
    onClose();
    navigate('/auth');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-80 max-w-[88vw] bg-[#00112c]/95 backdrop-blur-2xl text-white border-l border-white/15 shadow-2xl overflow-hidden flex flex-col"
            dir="rtl"
          >
            {/* Drawer Header */}
            <div className="p-5 bg-gradient-to-b from-[#00173d] via-[#001e4a] to-transparent border-b border-white/10 relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 p-[1px] shadow-md">
                    <div className="w-full h-full bg-[#00173d] rounded-[11px] flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-blue-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base tracking-tight text-white">قائمة المنصة</h3>
                    <p className="text-[11px] text-blue-200/70 font-medium">منصة ابوكيان الرقمية</p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-200 border border-white/10 active:scale-95"
                  aria-label="إغلاق القائمة"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* User Profile Card */}
              {(user || displayInfo.isGuest) && (
                <div
                  onClick={() => { if (user) handleNavigate('/profile'); }}
                  className="w-full flex items-center gap-3 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 hover:bg-white/15 transition-all duration-300 cursor-pointer shadow-lg group"
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-600 to-red-600 p-[1.5px] shrink-0">
                    <div className="w-full h-full bg-[#00173d] rounded-[10px] flex items-center justify-center text-white font-black text-base">
                      {displayInfo.name.charAt(0)}
                    </div>
                  </div>
                  <div className="flex-1 text-right min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <p className="font-bold text-sm text-white truncate">{displayInfo.name}</p>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 shrink-0">
                        {isAdmin ? 'مدير' : displayInfo.isGuest ? 'زائر' : 'عضو'}
                      </span>
                    </div>
                    <p className="text-xs text-blue-200/60 truncate dir-ltr text-right">{displayInfo.isGuest ? 'مرحباً بك في المنصة' : displayInfo.email}</p>
                  </div>
                  <ChevronLeft className="w-4 h-4 text-blue-200/60 group-hover:-translate-x-1 transition-transform shrink-0" />
                </div>
              )}
            </div>

            {/* Menu Links */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2.5 scrollbar-custom">
              {/* Admin Dashboard Entry */}
              {isAdmin && (
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={() => handleNavigate('/admin')}
                  className="w-full flex items-center gap-3 p-3.5 rounded-2xl bg-gradient-to-r from-red-600/30 via-rose-600/20 to-amber-500/20 hover:from-red-600/40 hover:to-amber-500/30 border border-red-500/40 text-white transition-all duration-300 group shadow-lg"
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-md shrink-0">
                    <LayoutDashboard className="w-5 h-5 text-white" />
                  </div>
                  <span className="flex-1 text-right font-extrabold text-sm text-amber-200">لوحة تحكم الإدارة</span>
                  <ChevronLeft className="w-4 h-4 text-amber-200 group-hover:-translate-x-1 transition-transform" />
                </motion.button>
              )}

              {filteredMenuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    onClick={() => handleNavigate(item.path)}
                    className="w-full flex items-center gap-3 p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-400/40 text-white transition-all duration-200 group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-400/20 group-hover:bg-blue-600 group-hover:border-blue-500 flex items-center justify-center transition-all duration-300 shrink-0">
                      <Icon className="w-4.5 h-4.5 text-blue-400 group-hover:text-white transition-colors" />
                    </div>
                    <span className="flex-1 text-right font-bold text-sm text-slate-100 group-hover:text-white">{item.title}</span>
                    <ChevronLeft className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:-translate-x-1 transition-all" />
                  </motion.button>
                );
              })}
            </div>

            {/* Drawer Footer */}
            <div className="p-4 bg-[#00173d]/80 border-t border-white/10 space-y-2.5">
              <Button
                variant="outline"
                className="w-full justify-between bg-white/10 hover:bg-white/20 text-white border-white/15 rounded-2xl h-11 font-bold text-xs"
                onClick={toggleTheme}
              >
                <span>{theme === 'dark' ? 'الوضع الفاتح ☀️' : 'الوضع المظلم 🌙'}</span>
                {theme === 'dark' ? <Sun className="w-4.5 h-4.5 text-amber-300" /> : <Moon className="w-4.5 h-4.5 text-blue-300" />}
              </Button>

              {user ? (
                <Button
                  onClick={handleLogout}
                  className="w-full bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-bold text-xs rounded-2xl h-11 shadow-lg shadow-red-950/40 transition-all duration-300"
                >
                  <LogOut className="w-4 h-4 ml-2" />
                  تسجيل الخروج
                </Button>
              ) : (
                <Button
                  onClick={() => handleNavigate('/auth')}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs rounded-2xl h-11 shadow-lg shadow-blue-950/40 transition-all duration-300"
                >
                  تسجيل الدخول / حساب جديد
                </Button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DrawerMenu;
