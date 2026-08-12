import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { services } from '@/data/services';

const ServiceGrid: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="my-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col">
          <h2 className="text-xl sm:text-2xl font-black text-[#00173d]">
            خدماتنا
          </h2>
          <div className="h-1 w-10 rounded-full bg-gradient-to-r from-blue-600 to-red-600 mt-1" />
        </div>
        <span className="text-xs sm:text-sm font-medium text-slate-500">
          اختر الخدمة المطلوبة
        </span>
      </div>

      {/* Grid of 8 Services */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <motion.button
              key={service.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(service.path)}
              className="group bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 rounded-[1.25rem] p-4 flex flex-col items-center justify-center text-center shadow-lg shadow-blue-950/5 hover:shadow-xl hover:shadow-blue-900/10 hover:border-blue-400/40 transition-all duration-300 cursor-pointer"
            >
              <div className={`w-12 h-12 rounded-2xl ${service.bgColor} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}>
                <Icon className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="font-bold text-[#00173d] text-xs sm:text-sm leading-tight">
                {service.title}
              </h3>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default ServiceGrid;

