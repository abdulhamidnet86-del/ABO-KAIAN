import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Palette, X, ZoomIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TopBar from '@/components/TopBar';
import BottomNav from '@/components/BottomNav';
import DrawerMenu from '@/components/DrawerMenu';
import { Button } from '@/components/ui/button';
import { usePortfolio, PORTFOLIO_CATEGORIES } from '@/hooks/usePortfolio';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageSeo from '@/components/PageSeo';

const PortfolioPage: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { items, isLoading } = usePortfolio();

  const getItemsByCategory = (cat: string) => items.filter(i => i.category === cat && i.is_active);

  return (
    <>
      <PageSeo
        title="معرض الأعمال | منصة ابوكيان الرقمية"
        description="شاهد أبرز أعمالنا في التصميم، الدعاية، المونتاج، والتسويق الإلكتروني لعملاء منصة ابوكيان الرقمية."
        path="/portfolio"
      />
    <div className="min-h-screen bg-background">
      <TopBar onMenuClick={() => setIsDrawerOpen(true)} />
      <DrawerMenu isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      <main className="pt-20 pb-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <button
            onClick={() => navigate(-1)}
            className="mb-5 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-700/80 text-foreground font-bold text-xs shadow-sm hover:bg-slate-100 dark:hover:bg-slate-700 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <ArrowRight className="w-4 h-4" />
            <span>رجوع</span>
          </button>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 relative overflow-hidden rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-800/80 p-6 shadow-2xl shadow-blue-950/10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-600 shadow-lg shadow-amber-950/20 text-white mb-3">
              <Palette className="w-7 h-7" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-foreground mb-1.5 tracking-tight">معرض الأعمال والمشاريع</h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">نماذج حية ومبتكرة من أحدث مشاريعنا المنفذة بأعلى معايير الجودة والإتقان</p>
          </motion.div>

          <Tabs defaultValue={PORTFOLIO_CATEGORIES[0].value} dir="rtl">
            <TabsList className="flex flex-wrap gap-1.5 h-auto bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-2 rounded-2xl mb-6 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              {PORTFOLIO_CATEGORIES.map(cat => (
                <TabsTrigger key={cat.value} value={cat.value} className="text-xs font-bold px-3.5 py-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all">
                  <span className="ml-1">{cat.icon}</span>
                  <span className="hidden sm:inline">{cat.label}</span>
                  <span className="sm:hidden">{cat.label.split(' ')[0]}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {PORTFOLIO_CATEGORIES.map(cat => (
              <TabsContent key={cat.value} value={cat.value}>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
                  <div className={`rounded-2xl bg-gradient-to-r ${cat.color} p-4 mb-6 shadow-lg shadow-blue-950/10 border border-white/20 text-white`}>
                    <h2 className="font-black text-lg sm:text-xl flex items-center gap-2.5">
                      <span className="text-2xl">{cat.icon}</span>
                      <span>{cat.label}</span>
                    </h2>
                  </div>

                  {isLoading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="aspect-square bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
                      ))}
                    </div>
                  ) : getItemsByCategory(cat.value).length === 0 ? (
                    <div className="text-center py-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-lg">
                      <Palette className="w-12 h-12 text-muted-foreground opacity-40 mx-auto mb-3" />
                      <p className="text-sm font-semibold text-muted-foreground">لا توجد أعمال في هذا القسم حالياً</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {getItemsByCategory(cat.value).map((item, idx) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.05 }}
                          className="group relative aspect-square bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl hover:border-blue-400/50 transition-all duration-300"
                          onClick={() => navigate(`/portfolio/${item.id}`)}
                        >
                          {item.image_url ? (
                            <img src={item.image_url} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                          ) : (
                            <div className={`w-full h-full bg-gradient-to-br ${cat.color} flex items-center justify-center`}>
                              <span className="text-4xl drop-shadow-md">{cat.icon}</span>
                            </div>
                          )}
                          {/* Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3.5">
                            <p className="text-white font-extrabold text-sm line-clamp-1">{item.title}</p>
                            <span className="text-[10px] text-blue-200 font-medium mt-1">اضغط للتفاصيل</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>

          {/* WhatsApp CTA */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-center mt-10 p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-800 shadow-xl">
            <p className="text-sm font-bold text-foreground mb-3">هل ترغب في طلب تصميم أو مشروع مخصص؟</p>
            <Button
              onClick={() => window.open('https://wa.me/967778215553?text=مرحباً، أريد طلب تصميم مخصص', '_blank')}
              className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-extrabold text-sm h-12 px-8 rounded-2xl shadow-lg shadow-emerald-950/20 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              تواصل معنا مباشرة عبر واتساب
            </Button>
          </motion.div>
        </div>
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/20"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </Button>
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={selectedImage}
              alt="Preview"
              className="max-w-full max-h-[90vh] rounded-lg object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav />
    </div>
    </>
  );
};

export default PortfolioPage;
