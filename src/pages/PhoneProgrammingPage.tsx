import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  ArrowRight, Smartphone, Radio, Zap, PhoneCall, Globe, Cpu, Lightbulb, 
  Copy, Check, Play, ExternalLink, ShieldAlert, Sparkles, ChevronLeft, 
  Layers, Search, Share2, Info, ArrowLeft, Download, Package, FileCode, CheckCircle2
} from 'lucide-react';
import TopBar from '@/components/TopBar';
import BottomNav from '@/components/BottomNav';
import DrawerMenu from '@/components/DrawerMenu';
import PageSeo from '@/components/PageSeo';
import { usePhoneProgramming } from '@/hooks/usePhoneProgramming';
import AttachmentManager from '@/components/AttachmentManager';
import { PhoneBrand, ServiceCategoryGuide, GuideAttachment, SERVICE_CATEGORIES, MARQUEE_ITEMS } from '@/data/phoneProgrammingData';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export const PhoneProgrammingPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { toast } = useToast();
  const { brands, guides, isLoading, saveGuide } = usePhoneProgramming();

  // Active brand & category states
  const brandParam = searchParams.get('brand') || '';
  const categoryParam = searchParams.get('category') || '3g';

  const activeBrand = brands.find(b => b.id === brandParam) || null;
  const [activeCategoryKey, setActiveCategoryKey] = useState<string>(categoryParam);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    if (categoryParam) {
      setActiveCategoryKey(categoryParam);
    }
  }, [categoryParam]);

  const selectBrand = (brandId: string) => {
    setSearchParams({ brand: brandId, category: activeCategoryKey });
  };

  const clearBrandSelection = () => {
    setSearchParams({});
  };

  const selectCategory = (catKey: string) => {
    setActiveCategoryKey(catKey);
    if (activeBrand) {
      setSearchParams({ brand: activeBrand.id, category: catKey });
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast({ title: 'تم نسخ الكود!', description: `الكود ${code} جاهز للصق في لوحة الاتصال` });
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleAddAttachment = (newAtt: GuideAttachment) => {
    if (!activeGuide) return;
    const current = activeGuide.attachments || [];
    const updated = [...current, newAtt];
    saveGuide({
      ...activeGuide,
      attachments: updated
    });
  };

  const handleRemoveAttachment = (attId: string) => {
    if (!activeGuide) return;
    const current = activeGuide.attachments || [];
    const updated = current.filter(a => a.id !== attId);
    saveGuide({
      ...activeGuide,
      attachments: updated
    });
  };

  // Find guide matching selected brand and active category
  const activeGuide: ServiceCategoryGuide | undefined = guides.find(
    g => (g.brandId === activeBrand?.id || g.brandId === 'all') && g.categoryKey === activeCategoryKey
  ) || guides.find(g => g.categoryKey === activeCategoryKey);

  // Helper to get YouTube Embed ID
  const getYouTubeEmbedUrl = (url?: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}?autoplay=0&rel=0`;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans dir-rtl pb-24">
      <PageSeo 
        title="برمجة الهواتف الذكية — تفعيل 3G و 4G و VoLTE والتعريب" 
        description="دليل وشروحات شاملة لتفعيل الثري جي، الفورجي، الفولتي، التعريب وأكواد الدياج لجميع الهواتف (سامسونج، LG، LT، شاومي، هواوي، موتورولا)."
        path="/phone-programming" 
      />

      <TopBar onMenuClick={() => setIsDrawerOpen(true)} />
      <DrawerMenu isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      <main className="container max-w-5xl mx-auto px-4 pt-16 space-y-6">

        {/* Top Header Navigation Bar */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            onClick={() => activeBrand ? clearBrandSelection() : navigate('/')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border-2 border-blue-200 text-blue-800 hover:text-blue-900 hover:bg-blue-50 transition-all text-xs font-black shadow-sm"
          >
            <ArrowRight className="w-4 h-4 text-blue-600" />
            <span>{activeBrand ? 'العودة لأقسام الشركات' : 'الرئيسية'}</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-red-600 text-white text-[11px] font-black px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
              منصة البرمجة الشاملة 2026
            </span>
          </div>
        </div>

        {/* 1. Main Hero Light Luxury Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl bg-white border-2 border-blue-200 p-6 sm:p-8 shadow-2xl shadow-blue-500/10 space-y-5"
        >
          {/* Decorative Top Accent Bar */}
          <div className="absolute top-0 right-0 w-full h-2 bg-gradient-to-r from-blue-600 via-blue-700 to-red-600" />

          {/* Decorative Glows */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100/60 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-red-100/60 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-gradient-to-r from-blue-600 to-red-600 text-white font-black text-xs px-3.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  قسم برمجة الهواتف
                </span>
                <span className="bg-blue-50 text-blue-800 text-xs px-3 py-1 rounded-full border border-blue-200 font-extrabold flex items-center gap-1">
                  <Radio className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
                  3G / 4G / VoLTE / DIAG
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                برمجة الهواتف الذكية وتفعيل الشبكات
              </h1>

              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed max-w-2xl font-bold">
                شروحات مخصصة، أكواد الدياج، تفعيل الـ 3G والـ 4G LTE المباشر ومكالمات الـ VoLTE عالية الوضوح والتعريب الشامل لجميع الماركات العالمية (سامسونج، إل جي، ال تي، شاومي، هواوي، موتورولا).
              </p>

              {/* Live Signal Status Strip */}
              <div className="pt-2 flex items-center gap-2.5 text-xs font-black text-slate-800 flex-wrap">
                <div className="flex items-center gap-1.5 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-200 text-blue-900">
                  <Zap className="w-4 h-4 text-blue-600" />
                  <span>تفعيل 4G LTE</span>
                </div>
                <div className="flex items-center gap-1.5 bg-purple-50 px-3 py-1.5 rounded-xl border border-purple-200 text-purple-900">
                  <PhoneCall className="w-4 h-4 text-purple-600" />
                  <span>دعم VoLTE HD</span>
                </div>
                <div className="flex items-center gap-1.5 bg-red-50 px-3 py-1.5 rounded-xl border border-red-200 text-red-900">
                  <Globe className="w-4 h-4 text-red-600" />
                  <span>تعريب بدون روت</span>
                </div>
              </div>
            </div>

            {/* Animated Phone Illustration Box */}
            <div className="relative flex-shrink-0 mx-auto md:mx-0">
              <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-red-600 p-1 shadow-xl shadow-blue-500/20">
                <div className="w-full h-full bg-white rounded-[22px] flex flex-col items-center justify-center relative overflow-hidden">
                  <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2.5 }}>
                    <Smartphone className="w-12 h-12 text-blue-600 drop-shadow-[0_0_8px_rgba(37,99,235,0.4)]" />
                  </motion.div>
                  <div className="mt-2 flex items-center gap-1 text-[10px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" />
                    ONLINE READY
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 2. Sliding Marquee Strip */}
        <div className="relative overflow-hidden rounded-2xl bg-white border-2 border-blue-200 p-3 shadow-md">
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-none py-1 px-1">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-red-600 text-white shrink-0 text-xs font-black shadow-sm">
              <Sparkles className="w-4 h-4 text-white animate-spin" />
              <span>مزايا البرمجة:</span>
            </div>
            {MARQUEE_ITEMS.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-2 bg-slate-50 px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs font-extrabold text-slate-800 shrink-0 shadow-xs"
              >
                <div className="w-2 h-2 rounded-full bg-blue-600" />
                <span>{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 3. Phone Brands Grid Section */}
        {!activeBrand ? (
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <Smartphone className="w-6 h-6 text-blue-600" />
                  اختر شركة الهاتف لإظهار الأكواد والشروحات
                </h2>
                <p className="text-xs text-slate-600 mt-1 font-bold">
                  انقر على بطاقة أي شركة لاستعراض طرق تفعيل 3G, 4G, VoLTE وأكواد الدياج المخصصة لها
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {brands.filter(b => b.active).map((brand) => (
                <motion.div
                  key={brand.id}
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => selectBrand(brand.id)}
                  className="cursor-pointer relative overflow-hidden rounded-2xl bg-white p-5 border-2 border-slate-200 hover:border-blue-500 shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 group"
                >
                  <div className="relative z-10 space-y-3">
                    <div className="flex items-center justify-between">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg text-white shadow-md"
                        style={{ backgroundColor: brand.color }}
                      >
                        {brand.nameEn.substring(0, 2).toUpperCase()}
                      </div>
                      <span className="text-[11px] font-black px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                        {brand.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-black text-slate-900 group-hover:text-blue-700 transition-colors">
                        {brand.name}
                      </h3>
                      <p className="text-xs text-slate-600 font-bold mt-1 line-clamp-2 leading-relaxed">
                        {brand.description}
                      </p>
                    </div>

                    <div className="pt-2 flex items-center justify-between text-xs font-black text-blue-600 group-hover:text-red-600 transition-colors border-t border-slate-100">
                      <span>عرض الشروحات والأكواد</span>
                      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          /* 4. Active Brand Detail View */
          <div className="space-y-6 pt-2">
            
            {/* Active Brand Header Card */}
            <div className={`rounded-3xl bg-gradient-to-br ${activeBrand.bgGradient} p-6 text-white shadow-2xl relative overflow-hidden`}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white text-blue-800 flex items-center justify-center font-black text-xl shadow-xl border-2 border-white">
                    {activeBrand.nameEn.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-2xl font-black text-white">{activeBrand.name}</h2>
                      <span className="text-xs bg-white/20 text-white font-extrabold px-2.5 py-0.5 rounded-full border border-white/30">
                        {activeBrand.badge}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-blue-50 mt-1 font-semibold">
                      {activeBrand.description}
                    </p>
                  </div>
                </div>

                <button
                  onClick={clearBrandSelection}
                  className="bg-white hover:bg-slate-100 text-slate-900 text-xs font-black px-4 py-2 rounded-xl shadow-md transition-colors flex items-center gap-1.5 self-start sm:self-center"
                >
                  <span>تغيير شركة الهاتف</span>
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Service Category Sub-Tabs */}
            <div className="bg-white border-2 border-slate-200 p-2.5 rounded-2xl shadow-sm">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                {SERVICE_CATEGORIES.map((cat) => {
                  const isActive = activeCategoryKey === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => selectCategory(cat.id)}
                      className={`p-3 rounded-xl text-right transition-all flex flex-col justify-between gap-2 border ${
                        isActive 
                          ? 'bg-gradient-to-r from-blue-600 via-blue-700 to-red-600 text-white border-blue-600 font-black shadow-md shadow-blue-500/20' 
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-blue-50 hover:text-blue-900'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold">{cat.name}</span>
                        {isActive && <Check className="w-3.5 h-3.5 shrink-0" />}
                      </div>
                      <span className={`text-[10px] ${isActive ? 'text-blue-100 font-bold' : 'text-slate-500'}`}>
                        {cat.subtitle}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Guide Content Display Card */}
            <div className="space-y-6">
              {activeGuide ? (
                <div className="bg-white border-2 border-blue-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl shadow-blue-500/10">
                  
                  {/* Guide Title & Summary Header */}
                  <div className="border-b border-slate-200 pb-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="bg-blue-100 text-blue-800 border border-blue-200 text-xs font-black px-3 py-1 rounded-full">
                        {activeGuide.categoryName} — {activeBrand.name}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                      {activeGuide.title}
                    </h3>
                    <p className="text-sm text-slate-700 font-semibold leading-relaxed">
                      {activeGuide.summary}
                    </p>
                  </div>

                  {/* Prerequisites / Requirements Box */}
                  {activeGuide.requirements && activeGuide.requirements.length > 0 && (
                    <div className="bg-blue-50/80 border border-blue-200 p-4 rounded-2xl space-y-2">
                      <h4 className="text-xs font-black text-blue-900 flex items-center gap-2">
                        <Info className="w-4 h-4 text-blue-600" />
                        المتطلبات والشروط الأساسية قبل البدء:
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-xs text-slate-800 font-bold pr-2">
                        {activeGuide.requirements.map((req, i) => (
                          <li key={i}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Dial Secret Codes Box */}
                  {activeGuide.dialCodes && activeGuide.dialCodes.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-blue-600" />
                        الأكواد السرية الخاصة بالقسم:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {activeGuide.dialCodes.map((dc, i) => (
                          <div key={i} className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between gap-3">
                            <div>
                              <span className="text-xs font-extrabold text-slate-900 block">{dc.label}</span>
                              <span className="text-[11px] text-slate-600 block mt-0.5 font-bold">{dc.description}</span>
                            </div>
                            <button
                              onClick={() => handleCopyCode(dc.code)}
                              className="bg-red-600 hover:bg-red-700 text-white font-mono text-xs font-extrabold px-3 py-1.5 rounded-xl shadow-xs flex items-center gap-1.5 transition-colors shrink-0 dir-ltr"
                            >
                              {copiedCode === dc.code ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                              <span>{dc.code}</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Reusable AttachmentManager Integration */}
                  <AttachmentManager
                    attachments={activeGuide.attachments || []}
                    canEdit={isAdmin}
                    onAddAttachment={handleAddAttachment}
                    onRemoveAttachment={handleRemoveAttachment}
                    title={`تطبيقات ومرفقات ${activeGuide.categoryName}`}
                    subtitle={`تطبيقات وأدوات مساعدة جاهزة للتحميل المباشر مع تعليمات التثبيت لشركة ${activeBrand?.name || ''}`}
                  />

                  {/* Step-by-Step Instructions */}
                  <div className="space-y-4 pt-2">
                    <h4 className="text-base font-black text-slate-900 flex items-center gap-2">
                      <Layers className="w-5 h-5 text-blue-600" />
                      خطوات الشرح بالتفصيل:
                    </h4>

                    <div className="space-y-3">
                      {activeGuide.steps.map((step, idx) => (
                        <div key={idx} className="bg-slate-50 border border-slate-200 hover:border-blue-300 rounded-2xl p-4 space-y-3">
                          <div className="flex items-start gap-3">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-600 to-red-600 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                              {step.stepNumber || idx + 1}
                            </div>
                            <div className="space-y-1 flex-1">
                              <h5 className="font-black text-sm text-slate-900">{step.title}</h5>
                              <p className="text-xs text-slate-700 font-semibold leading-relaxed">{step.description}</p>

                              {/* Actionable Code Block */}
                              {step.code && (
                                <div className="mt-2.5 bg-white border border-slate-300 p-2.5 rounded-xl flex items-center justify-between gap-2 dir-ltr">
                                  <span className="font-mono text-xs text-blue-700 font-black px-2">{step.code}</span>
                                  <button
                                    onClick={() => handleCopyCode(step.code!)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-black px-3 py-1 rounded-lg flex items-center gap-1 transition-colors"
                                  >
                                    {copiedCode === step.code ? <Check className="w-3 h-3 text-white" /> : <Copy className="w-3 h-3" />}
                                    <span>نسخ الكود</span>
                                  </button>
                                </div>
                              )}

                              {step.note && (
                                <div className="mt-2 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] font-bold">
                                  💡 <strong>ملاحظة:</strong> {step.note}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* YouTube Video Player Embed Section */}
                  {activeGuide.youtubeUrl && getYouTubeEmbedUrl(activeGuide.youtubeUrl) && (
                    <div className="space-y-3 pt-2">
                      <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                        <Play className="w-4 h-4 text-red-600 fill-current" />
                        شرح فيديو عملي للعملية:
                      </h4>
                      <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 border-2 border-slate-200 shadow-xl">
                        <iframe
                          src={getYouTubeEmbedUrl(activeGuide.youtubeUrl)!}
                          title={activeGuide.title}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  )}

                  {/* Important Notes / Warnings */}
                  {activeGuide.importantNotes && activeGuide.importantNotes.length > 0 && (
                    <div className="bg-red-50 border-2 border-red-200 p-4 rounded-2xl space-y-2">
                      <h4 className="text-xs font-black text-red-900 flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4 text-red-600" />
                        ملاحظات وإرشادات حماية مهمة:
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-xs text-red-900 font-bold pr-2">
                        {activeGuide.importantNotes.map((note, i) => (
                          <li key={i}>{note}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                </div>
              ) : (
                <div className="bg-white border-2 border-slate-200 rounded-3xl p-8 text-center space-y-3 shadow-md">
                  <Lightbulb className="w-10 h-10 text-amber-500 mx-auto animate-bounce" />
                  <h4 className="font-black text-lg text-slate-900">لا يتوفر شرح محدد لهذا القسم حالياً</h4>
                  <p className="text-xs text-slate-600 font-bold max-w-md mx-auto">
                    يمكنك تجربة اختيار قسم آخر أو التواصل معنا من خلال الدعم المباشر للحصول على الشرح المخصص لهاتفك.
                  </p>
                </div>
              )}
            </div>

          </div>
        )}

      </main>

      <BottomNav />
    </div>
  );
};

export default PhoneProgrammingPage;
