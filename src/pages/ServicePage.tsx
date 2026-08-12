import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Star } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import TopBar from '@/components/TopBar';
import BottomNav from '@/components/BottomNav';
import DrawerMenu from '@/components/DrawerMenu';
import { Button } from '@/components/ui/button';
import { services } from '@/data/services';
import PageSeo from '@/components/PageSeo';
import { useGuestAction } from '@/contexts/GuestActionContext';

const serviceDetails: Record<string, { features: string[]; benefits: string[] }> = {
  advertising: {
    features: [
      'تصميم حملات إعلانية مبتكرة',
      'إعلانات على جميع المنصات',
      'تحليل وتقارير الأداء',
      'استهداف الجمهور المناسب',
    ],
    benefits: [
      'زيادة الوعي بالعلامة التجارية',
      'جذب عملاء جدد',
      'تحسين المبيعات',
      'بناء سمعة قوية',
    ],
  },
  marketing: {
    features: [
      'استراتيجيات تسويق رقمي',
      'إدارة حملات السوشيال ميديا',
      'تحسين محركات البحث SEO',
      'التسويق بالمحتوى',
    ],
    benefits: [
      'زيادة التواجد الرقمي',
      'تحسين معدل التحويل',
      'بناء علاقات مع العملاء',
      'نمو مستدام للأعمال',
    ],
  },
  pages: {
    features: [
      'إدارة صفحات السوشيال ميديا',
      'جدولة المحتوى',
      'تمويل وترويج الصفحات',
      'الرد على التعليقات والرسائل',
    ],
    benefits: [
      'توفير الوقت والجهد',
      'محتوى احترافي مستمر',
      'تفاعل أعلى مع الجمهور',
      'نمو المتابعين',
    ],
  },
  websites: {
    features: [
      'تصميم مواقع احترافية',
      'تطوير متاجر إلكترونية',
      'صيانة وتحديث المواقع',
      'استضافة آمنة',
    ],
    benefits: [
      'تواجد رقمي قوي',
      'مبيعات على مدار الساعة',
      'مصداقية أعلى',
      'وصول عالمي',
    ],
  },
  apps: {
    features: [
      'تطوير تطبيقات iOS و Android',
      'تصميم واجهات مستخدم',
      'صيانة وتحديث التطبيقات',
      'نشر على المتاجر',
    ],
    benefits: [
      'تواصل مباشر مع العملاء',
      'تجربة مستخدم مميزة',
      'ولاء أعلى للعملاء',
      'ميزة تنافسية',
    ],
  },
  montage: {
    features: [
      'مونتاج فيديو احترافي',
      'موشن جرافيك',
      'تصحيح ألوان',
      'إضافة مؤثرات بصرية',
    ],
    benefits: [
      'محتوى جذاب ومميز',
      'رسالة واضحة ومؤثرة',
      'جودة عالية',
      'تفاعل أكبر',
    ],
  },
  security: {
    features: [
      'حماية الحسابات',
      'تأمين المواقع والتطبيقات',
      'فحص الثغرات الأمنية',
      'استعادة الحسابات',
    ],
    benefits: [
      'أمان البيانات',
      'حماية السمعة',
      'راحة البال',
      'منع الاختراقات',
    ],
  },
  printing: {
    features: [
      'طباعة بجودة عالية',
      'كروت أعمال',
      'بروشورات ومطويات',
      'لوحات إعلانية',
    ],
    benefits: [
      'مظهر احترافي',
      'دعاية ملموسة',
      'تأثير دائم',
      'تكلفة مناسبة',
    ],
  },
};

const ServicePage: React.FC = () => {
  const { requireAccount } = useGuestAction();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const { serviceId } = useParams();

  const service = services.find((s) => s.id === serviceId);
  const details = serviceId ? serviceDetails[serviceId] : null;

  const openWhatsApp = () => {
    const text = `مرحباً، أريد الاستفسار عن خدمة ${service?.title}`;
    window.open(`https://wa.me/967778215553?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (!service) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">الخدمة غير موجودة</p>
      </div>
    );
  }

  const Icon = service.icon;

  return (
    <div className="min-h-screen bg-background">
      <PageSeo
        title={`${service.title} | منصة ابوكيان الرقمية`}
        description={service.description || `تعرف على خدمة ${service.title} من منصة ابوكيان الرقمية للدعاية والإعلان والتسويق الإلكتروني.`}
        path={`/services/${serviceId}`}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: service.title,
          description: service.description || `خدمة ${service.title} من منصة ابوكيان الرقمية.`,
          provider: { '@type': 'Organization', name: 'منصة ابوكيان الرقمية' },
        }}
      />
      <TopBar onMenuClick={() => setIsDrawerOpen(true)} />
      <DrawerMenu isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      <main className="pt-20 pb-24 px-4">
        <div className="container mx-auto max-w-lg">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="mb-5 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-700/80 text-foreground font-bold text-xs shadow-sm hover:bg-slate-100 dark:hover:bg-slate-700 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <ArrowRight className="w-4 h-4" />
            <span>رجوع</span>
          </button>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 relative overflow-hidden rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-800/80 p-6 shadow-2xl shadow-blue-950/10"
          >
            <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-xl shadow-blue-900/30 ring-4 ring-white/30 dark:ring-slate-800`}>
              <Icon className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-black text-foreground mb-2 tracking-tight">{service.title}</h1>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">{service.description}</p>
          </motion.div>

          {/* Features */}
          {details && (
            <>
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 mb-6 shadow-xl shadow-blue-950/5"
              >
                <h2 className="text-base font-extrabold text-foreground mb-4 flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center">
                    <Star className="w-4.5 h-4.5 text-amber-500 fill-amber-500" />
                  </div>
                  <span>المميزات الرئيسية</span>
                </h2>
                <div className="space-y-3">
                  {details.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50/60 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800/50">
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      <span className="text-sm font-bold text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 mb-8 shadow-xl shadow-blue-950/5"
              >
                <h2 className="text-base font-extrabold text-foreground mb-4 flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-400/30 flex items-center justify-center">
                    <CheckCircle className="w-4.5 h-4.5 text-blue-500" />
                  </div>
                  <span>الفوائد والقيمة المضافة</span>
                </h2>
                <div className="space-y-3">
                  {details.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50/60 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800/50">
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-sm shrink-0" />
                      <span className="text-sm font-medium text-foreground/90">{benefit}</span>
                    </div>
                  ))}
                </div>
              </motion.section>
            </>
          )}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-3"
          >
            <Button
              onClick={() => requireAccount(openWhatsApp, { action: 'order', title: 'طلب الخدمة يتطلب حساباً', description: 'سجّل حسابك المجاني لطلب الخدمة ومتابعة طلبك والحصول على الدعم الكامل.' })}
              className="w-full h-14 bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-black text-base rounded-2xl shadow-xl shadow-emerald-950/20 hover:scale-[1.01] active:scale-95 transition-all duration-300"
            >
              طلب الخدمة عبر واتساب
            </Button>
            <Button
              variant="outline"
              onClick={() => requireAccount(() => navigate('/booking'), { action: 'booking', title: 'الحجز يتطلب حساباً', description: 'سجّل حسابك المجاني لحجز موعد ومتابعة حالته.' })}
              className="w-full h-12 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-700/80 hover:bg-slate-100 dark:hover:bg-slate-700 font-bold text-sm rounded-2xl shadow-sm hover:scale-[1.01] active:scale-95 transition-all duration-300"
            >
              حجز موعد
            </Button>
          </motion.div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default ServicePage;
