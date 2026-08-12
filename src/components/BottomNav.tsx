import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Users, Store, Phone, Briefcase } from 'lucide-react';
import { useSiteSettings } from '@/hooks/useSiteSettings';

const defaultNavItems = [
  { id: 'home', label: 'الرئيسية', icon: Home, path: '/' },
  { id: 'about', label: 'من نحن', icon: Users, path: '/about' },
  { id: 'store', label: 'متجر', icon: Store, path: '/apps' },
  { id: 'contact', label: 'اتصل بنا', icon: Phone, path: '/contact' },
  { id: 'assistant', label: 'المساعد', icon: Briefcase, path: '/assistant' },
];

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getBool } = useSiteSettings();

  if (getBool('bottom_nav_enabled') === false) return null;

  return (
    <div className="fixed bottom-3 inset-x-0 z-40 px-4 max-w-lg mx-auto pointer-events-none" dir="rtl">
      <nav className="pointer-events-auto bg-[#00173d] text-white rounded-[2.2rem] p-2 shadow-2xl border border-slate-800 flex items-center justify-around">
        {defaultNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));

          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`relative flex flex-col items-center justify-center transition-all duration-200 px-3 py-1.5 rounded-2xl ${
                isActive
                  ? 'bg-[#1d4ed8] text-white font-bold shadow-lg scale-105'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                {isActive && item.id === 'home' && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-[#00173d]" />
                )}
              </div>
              <span className="text-[11px] mt-0.5 whitespace-nowrap">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default BottomNav;

