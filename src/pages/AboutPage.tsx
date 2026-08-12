import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Target, Users, Award, Clock, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TopBar from '@/components/TopBar';
import BottomNav from '@/components/BottomNav';
import DrawerMenu from '@/components/DrawerMenu';
import { Button } from '@/components/ui/button';
import PageSeo from '@/components/PageSeo';

const features = [
  { icon: Target, title: 'رؤية واضحة', description: 'نسعى لتقديم أفضل الخدمات الإعلانية' },
  { icon: Users, title: 'فريق متميز', description: 'خبراء في مجالات الدعاية والتسويق' },
  { icon: Award, title: 'جودة عالية', description: 'نلتزم بأعلى معايير الجودة' },
  { icon: Clock, title: 'دعم متواصل', description: 'متاحون لخدمتكم على مدار الساعة' },
];

const AboutPage: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const openWhatsApp = () => {
    window.open('https://wa.me/967778215553', '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <PageSeo
        title="من نحن | منصة ابوكيان الرقمية"
        description="تعرف على منصة ابوكيان الرقمية، فريقنا، ورؤيتنا في تقديم خدمات الدعاية والإعلان والتسويق الإلكتروني بجودة عالية."
        path="/about"
      />
      <TopBar onMenuClick={() => setIsDrawerOpen(true)} />
      <DrawerMenu isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      <main className="pt-20 pb-24 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="mb-5 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-700/80 text-foreground font-bold text-xs shadow-sm hover:bg-slate-100 dark:hover:bg-slate-700 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <ArrowRight className="w-4 h-4" />
            <span>رجوع</span>
          </button>

          {/* Hero Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10 relative overflow-hidden rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-800/80 p-8 shadow-2xl shadow-blue-950/10"
          >
            <h1 className="text-3xl sm:text-4xl font-black text-foreground mb-3 tracking-tight">
              من نحن - منصة ابوكيان الرقمية
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              رائدة في تقديم حلول الدعاية والإنتاج الفني والحلول البرمجية الذكية. 
              نسعى لتقديم تجربة إبداعية متكاملة تمكّن عملاءنا من تطوير هوياتهم وتحقيق أعلى مستويات الانتشار.
            </p>
          </motion.section>

          {/* Features Grid */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  className="p-6 bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 rounded-2xl shadow-lg shadow-blue-950/5 hover:border-blue-400/50 hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center mb-4 text-white shadow-md">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-base text-foreground mb-1.5">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.section>

          {/* Why Choose Us */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 mb-8 shadow-xl shadow-blue-950/5"
          >
            <h2 className="text-xl font-black text-foreground mb-6 pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-emerald-500" />
              <span>لماذا منصة ابوكيان الرقمية؟</span>
            </h2>
            <div className="space-y-3.5">
              {[
                'خبرة متراكمة في مجالات التصميم والتسويق الرقمي والهندسة الميدانية',
                'فريق إبداعي متخصص يضمن التنفيذ بدقة متناهية وسرعة فائقة',
                'أسعار تنافسية مرنة تلائم مختلف الشركات والمؤسسات',
                'التزام تام بالمواعيد والجودة واستدامة الحلول الرقمية',
                'دعم فني واستشاري متواصل على مدار الساعة',
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/60 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800/50">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </motion.section>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <Button
              onClick={openWhatsApp}
              className="h-14 px-8 bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-extrabold text-base rounded-2xl shadow-xl shadow-emerald-950/20 hover:scale-[1.02] active:scale-95 transition-all duration-300"
            >
              تواصل معنا مباشرة عبر واتساب
            </Button>
          </motion.div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default AboutPage;
