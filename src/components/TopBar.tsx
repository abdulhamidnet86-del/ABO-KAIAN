import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, MessageCircle, Menu, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNotifications } from '@/hooks/useNotifications';
import { useMessages } from '@/hooks/useMessages';
import { useNavigate } from 'react-router-dom';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import NotificationsDropdown from './NotificationsDropdown';
import MessagesDropdown from './MessagesDropdown';

interface TopBarProps {
  onMenuClick: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onMenuClick }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const { unreadCount: notificationCount } = useNotifications();
  const { unreadCount: messageCount } = useMessages();
  const { getSetting, getBool } = useSiteSettings();
  const navigate = useNavigate();

  const logoUrl = getSetting('site_logo_url');
  const whatsappNumber = getSetting('header_whatsapp_number', '967778215553');
  const displayNotifCount = notificationCount > 0 ? notificationCount : 3;

  const openWhatsApp = () => {
    window.open(`https://wa.me/${whatsappNumber}`, '_blank');
  };

  if (!getBool('header_enabled')) return null;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-40 bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 shadow-lg shadow-blue-950/5"
      dir="rtl"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Right Side in RTL: Menu Button, Logo Box, Title */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Menu Button */}
          <button
            onClick={onMenuClick}
            className="w-10 h-10 rounded-2xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-md shadow-sm border border-slate-200/80 dark:border-slate-700/80 text-[#00173d] dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 hover:border-blue-400 hover:shadow-md hover:scale-105 active:scale-95 flex items-center justify-center transition-all duration-300"
            aria-label="فتح القائمة"
          >
            <Menu className="w-6 h-6 stroke-[2.2]" />
          </button>

          {/* Logo Box */}
          <div
            onClick={() => navigate('/')}
            className="w-10 h-10 rounded-2xl bg-white shadow-md border border-slate-200/80 p-1 flex items-center justify-center shrink-0 cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300"
          >
            {logoUrl ? (
              <img src={logoUrl} alt="منصة ابوكيان الرقمية" className="w-full h-full object-contain rounded-xl" />
            ) : (
              <div className="relative w-full h-full flex items-center justify-center">
                <Sparkles className="w-5.5 h-5.5 text-[#2563eb]" />
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#e60000]" />
              </div>
            )}
          </div>

          {/* Title Text */}
          <div
            onClick={() => navigate('/')}
            className="flex flex-col text-right leading-tight select-none cursor-pointer hover:opacity-90 transition-opacity"
          >
            <div className="flex items-center gap-1 font-black text-sm sm:text-base text-[#00173d] dark:text-white tracking-tight">
              <span>منصة</span>
              <span className="text-[#e60000]">ابوكيان</span>
            </div>
            <span className="font-black text-[11px] sm:text-xs text-[#00173d] dark:text-slate-300 tracking-tight">الرقمية</span>
          </div>
        </div>

        {/* Left Side in RTL: WhatsApp, Messages, Notifications Buttons */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* WhatsApp Button */}
          {getBool('header_show_whatsapp') && (
            <button
              onClick={openWhatsApp}
              className="w-10 h-10 rounded-2xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-md shadow-sm border border-emerald-200/80 text-[#25D366] hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20 hover:scale-105 active:scale-95 flex items-center justify-center transition-all duration-300"
              aria-label="تواصل عبر واتساب"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </button>
          )}

          {/* Messages Button */}
          {getBool('header_show_messages') && (
            <div className="relative">
              <button
                onClick={() => {
                  setShowMessages(!showMessages);
                  setShowNotifications(false);
                }}
                className="w-10 h-10 rounded-2xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-md shadow-sm border border-slate-200/80 dark:border-slate-700/80 text-[#00173d] dark:text-white hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-105 active:scale-95 flex items-center justify-center transition-all duration-300 relative"
                aria-label="الرسائل"
              >
                <MessageCircle className="w-5 h-5 stroke-[2.2]" />
                {messageCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-[#2563eb] text-white text-[10px] font-black flex items-center justify-center border-2 border-white dark:border-slate-900 shadow-sm animate-pulse">
                    {messageCount}
                  </span>
                )}
              </button>
              <MessagesDropdown
                isOpen={showMessages}
                onClose={() => setShowMessages(false)}
              />
            </div>
          )}

          {/* Notifications Button */}
          {getBool('header_show_notifications') && (
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowMessages(false);
                }}
                className="w-10 h-10 rounded-2xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-md shadow-sm border border-slate-200/80 dark:border-slate-700/80 text-[#00173d] dark:text-white hover:border-red-400 hover:shadow-lg hover:shadow-red-500/20 hover:scale-105 active:scale-95 flex items-center justify-center transition-all duration-300 relative"
                aria-label="الإشعارات"
              >
                <Bell className="w-5 h-5 stroke-[2.2]" />
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#e60000] text-white text-[11px] font-black flex items-center justify-center border-2 border-white dark:border-slate-900 shadow-md">
                  {displayNotifCount > 9 ? '9+' : displayNotifCount}
                </span>
              </button>
              <NotificationsDropdown
                isOpen={showNotifications}
                onClose={() => setShowNotifications(false)}
              />
            </div>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default TopBar;

