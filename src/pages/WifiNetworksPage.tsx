import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, Shield, Globe, Wrench, AlertTriangle, Settings, ArrowRight, Download, Eye, ShoppingCart, Copy, FileText, MessageSquare, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import TopBar from '@/components/TopBar';
import BottomNav from '@/components/BottomNav';
import DrawerMenu from '@/components/DrawerMenu';
import { useWifiProducts, WifiProduct } from '@/hooks/useWifiProducts';
import { useWifiPosts, WifiPost } from '@/hooks/useWifiPosts';
import { useWifiOrders } from '@/hooks/useWifiOrders';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const countryCodes = [
  { code: '+967', country: 'اليمن 🇾🇪' },
  { code: '+966', country: 'السعودية 🇸🇦' },
  { code: '+971', country: 'الإمارات 🇦🇪' },
  { code: '+968', country: 'عُمان 🇴🇲' },
  { code: '+974', country: 'قطر 🇶🇦' },
  { code: '+973', country: 'البحرين 🇧🇭' },
  { code: '+965', country: 'الكويت 🇰🇼' },
  { code: '+20', country: 'مصر 🇪🇬' },
  { code: '+962', country: 'الأردن 🇯🇴' },
  { code: '+964', country: 'العراق 🇮🇶' },
  { code: '+90', country: 'تركيا 🇹🇷' },
];

const categories = [
  { id: 'systems', label: 'أنظمة التحكم', icon: Settings, color: 'from-blue-500 to-indigo-600' },
  { id: 'security', label: 'الحماية', icon: Shield, color: 'from-red-500 to-rose-600' },
  { id: 'hotspot', label: 'صفحات الهوتسبوت', icon: Globe, color: 'from-emerald-500 to-teal-600' },
  { id: 'posts', label: 'مشاكل وحلول', icon: AlertTriangle, color: 'from-amber-500 to-orange-600' },
  { id: 'tools', label: 'أدوات عامة', icon: Wrench, color: 'from-purple-500 to-violet-600' },
];

const WifiNetworksPage: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('systems');
  const [orderDialog, setOrderDialog] = useState(false);
  const [detailDialog, setDetailDialog] = useState(false);
  const [inquiryDialog, setInquiryDialog] = useState(false);
  const [customRequestDialog, setCustomRequestDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<WifiProduct | null>(null);
  const [selectedPost, setSelectedPost] = useState<WifiPost | null>(null);
  const [postDetailDialog, setPostDetailDialog] = useState(false);

  const [formData, setFormData] = useState({ customer_name: '', country: 'اليمن', country_code: '+967', customer_phone: '', details: '', title: '' });

  const { products: systemProducts } = useWifiProducts('systems');
  const { products: securityProducts } = useWifiProducts('security');
  const { products: hotspotProducts } = useWifiProducts('hotspot');
  const { products: toolProducts } = useWifiProducts('tools');
  const { posts } = useWifiPosts();
  const { createOrder } = useWifiOrders();
  const { user } = useAuth();
  const navigate = useNavigate();

  const getProducts = (cat: string) => {
    switch (cat) {
      case 'systems': return systemProducts;
      case 'security': return securityProducts;
      case 'hotspot': return hotspotProducts;
      case 'tools': return toolProducts;
      default: return [];
    }
  };

  const resetForm = () => setFormData({ customer_name: '', country: 'اليمن', country_code: '+967', customer_phone: '', details: '', title: '' });

  const handlePurchase = (product: WifiProduct) => {
    navigate(`/wifi-networks/${product.id}/purchase`);
  };

  const handleViewDetails = (product: WifiProduct) => {
    navigate(`/wifi-networks/${product.id}`);
  };

  const handleSubmitOrder = async (orderType: string) => {
    if (!formData.customer_name || !formData.customer_phone) {
      toast({ title: 'يرجى ملء جميع الحقول المطلوبة', variant: 'destructive' });
      return;
    }
    await createOrder.mutateAsync({
      product_id: selectedProduct?.id || undefined,
      product_name: selectedProduct?.name || formData.title || 'طلب مخصص',
      section: activeTab,
      customer_name: formData.customer_name,
      country: formData.country,
      country_code: formData.country_code,
      customer_phone: formData.customer_phone,
      order_type: orderType,
      details: formData.details,
      title: formData.title,
      price: selectedProduct?.price || 0,
    });
    setOrderDialog(false);
    setCustomRequestDialog(false);
    setInquiryDialog(false);
    resetForm();
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({ title: 'تم نسخ الكود بنجاح' });
  };

  const handleDownloadCode = (code: string, name: string) => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const sectionLabel = categories.find(c => c.id === activeTab)?.label || '';

  const renderProductCard = (product: WifiProduct) => (
    <motion.div key={product.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="group">
      <Card className="overflow-hidden bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-lg shadow-blue-950/5 hover:shadow-2xl hover:border-blue-400/50 transition-all duration-300 rounded-2xl flex flex-col justify-between h-full">
        <div className="relative h-44 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center overflow-hidden">
          {product.image_url ? (
            <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : product.logo_url ? (
            <img src={product.logo_url} alt={product.name} className="w-20 h-20 object-contain group-hover:scale-110 transition-transform duration-300" />
          ) : (
            <Wifi className="w-16 h-16 text-blue-500/30" />
          )}
          {product.is_free ? (
            <Badge className="absolute top-2.5 right-2.5 bg-emerald-500 text-white font-extrabold shadow-md">مجاني</Badge>
          ) : product.discount_percent && product.discount_percent > 0 ? (
            <Badge className="absolute top-2.5 right-2.5 bg-rose-500 text-white font-extrabold shadow-md">خصم {product.discount_percent}%</Badge>
          ) : null}
          {product.type && (
            <Badge variant="secondary" className="absolute top-2.5 left-2.5 text-[10px] font-bold bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">{product.type}</Badge>
          )}
        </div>
        <CardContent className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="font-extrabold text-sm text-foreground mb-1 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{product.name}</h3>
            <p className="text-xs text-muted-foreground mb-3 line-clamp-2 leading-relaxed">{product.description}</p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3 p-2 rounded-xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <span className="text-xs font-semibold text-muted-foreground">السعر:</span>
              {product.is_free ? (
                <span className="text-emerald-500 font-extrabold text-sm">مجاني</span>
              ) : (
                <div className="flex items-center gap-1.5">
                  {product.discount_percent && product.discount_percent > 0 ? (
                    <>
                      <span className="text-xs text-muted-foreground line-through">${product.price}</span>
                      <span className="text-blue-600 dark:text-blue-400 font-black text-sm">${(product.price * (1 - product.discount_percent / 100)).toFixed(0)}</span>
                    </>
                  ) : (
                    <span className="text-blue-600 dark:text-blue-400 font-black text-sm">${product.price}</span>
                  )}
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex-1 text-xs font-bold rounded-xl border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800" onClick={() => handleViewDetails(product)}>
                <Eye className="w-3.5 h-3.5 ml-1 text-blue-500" />التفاصيل
              </Button>
              {product.is_free && product.download_url ? (
                <Button size="sm" className="flex-1 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-md" asChild>
                  <a href={product.download_url} target="_blank" rel="noopener noreferrer">
                    <Download className="w-3.5 h-3.5 ml-1" />تحميل
                  </a>
                </Button>
              ) : product.is_free && product.code_content ? (
                <Button size="sm" className="flex-1 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-md" onClick={() => handleViewDetails(product)}>
                  <FileText className="w-3.5 h-3.5 ml-1" />الكود
                </Button>
              ) : !product.is_free ? (
                <Button size="sm" className="flex-1 text-xs font-bold rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md hover:scale-105 active:scale-95 transition-all" onClick={() => handlePurchase(product)}>
                  <ShoppingCart className="w-3.5 h-3.5 ml-1" />شراء
                </Button>
              ) : null}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderPostCard = (post: WifiPost) => (
    <motion.div key={post.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="overflow-hidden bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-lg hover:shadow-2xl hover:border-amber-400/50 transition-all duration-300 rounded-2xl cursor-pointer" onClick={() => { setSelectedPost(post); setPostDetailDialog(true); }}>
        {post.image_url && (
          <div className="h-40 overflow-hidden">
            <img src={post.image_url} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
        )}
        <CardContent className="p-4">
          <h3 className="font-extrabold text-sm text-foreground mb-1.5">{post.title}</h3>
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{post.summary}</p>
          <Button size="sm" variant="link" className="mt-2 p-0 text-amber-600 dark:text-amber-400 font-bold text-xs">قراءة المزيد والتفاصيل ←</Button>
        </CardContent>
      </Card>
    </motion.div>
  );

  const OrderFormFields = () => (
    <div className="space-y-4" dir="rtl">
      {selectedProduct && (
        <div className="p-3 rounded-lg bg-muted/50 border border-border">
          <p className="text-sm font-bold text-foreground">{selectedProduct.name}</p>
          <p className="text-xs text-muted-foreground">القسم: {sectionLabel}</p>
          {!selectedProduct.is_free && (
            <p className="text-sm font-bold text-primary mt-1">
              السعر: ${selectedProduct.discount_percent ? (selectedProduct.price * (1 - selectedProduct.discount_percent / 100)).toFixed(0) : selectedProduct.price}
              {selectedProduct.discount_percent ? <span className="text-xs text-muted-foreground line-through mr-2">${selectedProduct.price}</span> : null}
            </p>
          )}
        </div>
      )}
      <Input placeholder="الاسم الكامل *" value={formData.customer_name} onChange={e => setFormData(p => ({ ...p, customer_name: e.target.value }))} />
      <Input placeholder="البلد" value={formData.country} onChange={e => setFormData(p => ({ ...p, country: e.target.value }))} />
      <div className="flex gap-2">
        <Select value={formData.country_code} onValueChange={v => setFormData(p => ({ ...p, country_code: v }))}>
          <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
          <SelectContent>
            {countryCodes.map(c => <SelectItem key={c.code} value={c.code}>{c.country} {c.code}</SelectItem>)}
          </SelectContent>
        </Select>
        <Input placeholder="رقم الهاتف *" className="flex-1" value={formData.customer_phone} onChange={e => setFormData(p => ({ ...p, customer_phone: e.target.value }))} />
      </div>
      <Textarea placeholder="تفاصيل إضافية..." value={formData.details} onChange={e => setFormData(p => ({ ...p, details: e.target.value }))} />
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <TopBar onMenuClick={() => setIsDrawerOpen(true)} />
      <DrawerMenu isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      <main className="pt-16 pb-24 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Hero */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-600 via-blue-700 to-indigo-800 p-8 mb-8 mt-4 shadow-2xl shadow-blue-950/20 border border-cyan-400/30">
            <div className="absolute inset-0 opacity-15">
              {[...Array(4)].map((_, i) => (
                <motion.div key={i} className="absolute border-2 border-white/40 rounded-full" style={{ width: 80 + i * 50, height: 80 + i * 50, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                  animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.05, 0.4] }}
                  transition={{ duration: 2.5, delay: i * 0.3, repeat: Infinity }}
                />
              ))}
            </div>
            <div className="relative z-10 text-center">
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mx-auto mb-3.5 shadow-inner">
                <Wifi className="w-9 h-9 text-cyan-200" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white mb-2 tracking-tight">أنظمة وقوائم شبكات الواي فاي</h1>
              <p className="text-cyan-100 text-xs sm:text-sm font-medium max-w-lg mx-auto">أنظمة تحكم متطورة • صفحات هوتسبوت احترافية • حلول حماية وجدران نارية متكاملة</p>
            </div>
          </motion.div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} dir="rtl">
            <TabsList className="grid grid-cols-5 mb-8 h-auto p-1.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 rounded-2xl shadow-lg">
              {categories.map(cat => (
                <TabsTrigger key={cat.id} value={cat.id} className="flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 px-2 text-xs font-bold rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white transition-all duration-300">
                  <cat.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{cat.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Systems, Security, Hotspot, Tools - product sections */}
            {['systems', 'security', 'hotspot', 'tools'].map(cat => (
              <TabsContent key={cat} value={cat}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-foreground">{categories.find(c => c.id === cat)?.label}</h2>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => { setSelectedProduct(null); resetForm(); setFormData(p => ({ ...p, title: `طلب مخصص - ${categories.find(c => c.id === cat)?.label}` })); setCustomRequestDialog(true); }}>
                      <MessageSquare className="w-3 h-3 ml-1" />طلب مخصص
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => { resetForm(); setInquiryDialog(true); }}>
                      <HelpCircle className="w-3 h-3 ml-1" />استفسار
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {getProducts(cat).map(renderProductCard)}
                </div>
                {getProducts(cat).length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <Wifi className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>لا توجد منتجات حالياً في هذا القسم</p>
                  </div>
                )}
              </TabsContent>
            ))}

            {/* Posts section */}
            <TabsContent value="posts">
              <h2 className="text-lg font-bold text-foreground mb-4">مشاكل وحلول</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {posts.filter(p => p.is_active).map(renderPostCard)}
              </div>
              {posts.filter(p => p.is_active).length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <AlertTriangle className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>لا توجد منشورات حالياً</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Purchase Order Dialog */}
      <Dialog open={orderDialog} onOpenChange={setOrderDialog}>
        <DialogContent dir="rtl" className="max-w-md">
          <DialogHeader><DialogTitle>طلب شراء</DialogTitle></DialogHeader>
          <OrderFormFields />
          <Button className="w-full mt-2" onClick={() => handleSubmitOrder('purchase')} disabled={createOrder.isPending}>
            <ShoppingCart className="w-4 h-4 ml-2" />إرسال الطلب
          </Button>
        </DialogContent>
      </Dialog>

      {/* Product Detail Dialog */}
      <Dialog open={detailDialog} onOpenChange={setDetailDialog}>
        <DialogContent dir="rtl" className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{selectedProduct?.name}</DialogTitle></DialogHeader>
          {selectedProduct && (
            <div className="space-y-4">
              {selectedProduct.image_url && (
                <img src={selectedProduct.image_url} alt={selectedProduct.name} className="w-full h-48 object-cover rounded-lg" />
              )}
              <p className="text-sm text-muted-foreground">{selectedProduct.description}</p>
              {selectedProduct.type && <Badge variant="secondary">{selectedProduct.type}</Badge>}
              <div className="flex items-center gap-3">
                {selectedProduct.is_free ? (
                  <span className="text-green-500 font-bold">مجاني</span>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-primary">${selectedProduct.discount_percent ? (selectedProduct.price * (1 - selectedProduct.discount_percent / 100)).toFixed(0) : selectedProduct.price}</span>
                    {selectedProduct.discount_percent ? <span className="text-sm text-muted-foreground line-through">${selectedProduct.price}</span> : null}
                  </div>
                )}
              </div>

              {/* Code content for free products */}
              {selectedProduct.is_free && selectedProduct.code_content && (
                <div className="space-y-2">
                  <h4 className="font-bold text-sm">الكود:</h4>
                  <div className="relative bg-muted rounded-lg p-4 max-h-60 overflow-auto">
                    <pre className="text-xs text-foreground whitespace-pre-wrap font-mono" dir="ltr">{selectedProduct.code_content}</pre>
                    <div className="absolute top-2 left-2 flex gap-1">
                      <Button size="sm" variant="ghost" className="h-7 px-2" onClick={() => handleCopyCode(selectedProduct.code_content!)}>
                        <Copy className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-7 px-2" onClick={() => handleDownloadCode(selectedProduct.code_content!, selectedProduct.name)}>
                        <Download className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                {selectedProduct.preview_url && (
                  <Button variant="outline" className="flex-1" asChild>
                    <a href={selectedProduct.preview_url} target="_blank" rel="noopener noreferrer">
                      <Eye className="w-4 h-4 ml-1" />معاينة
                    </a>
                  </Button>
                )}
                {selectedProduct.is_free && selectedProduct.download_url ? (
                  <Button className="flex-1" asChild>
                    <a href={selectedProduct.download_url} target="_blank" rel="noopener noreferrer">
                      <Download className="w-4 h-4 ml-1" />تحميل
                    </a>
                  </Button>
                ) : !selectedProduct.is_free ? (
                  <Button className="flex-1" onClick={() => { setDetailDialog(false); handlePurchase(selectedProduct); }}>
                    <ShoppingCart className="w-4 h-4 ml-1" />شراء
                  </Button>
                ) : null}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Post Detail Dialog */}
      <Dialog open={postDetailDialog} onOpenChange={setPostDetailDialog}>
        <DialogContent dir="rtl" className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{selectedPost?.title}</DialogTitle></DialogHeader>
          {selectedPost && (
            <div className="space-y-4">
              {selectedPost.image_url && <img src={selectedPost.image_url} alt={selectedPost.title} className="w-full h-48 object-cover rounded-lg" />}
              <div className="prose prose-sm text-foreground" dangerouslySetInnerHTML={{ __html: selectedPost.content || '' }} />
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Custom Request Dialog */}
      <Dialog open={customRequestDialog} onOpenChange={setCustomRequestDialog}>
        <DialogContent dir="rtl" className="max-w-md">
          <DialogHeader><DialogTitle>طلب مخصص - {sectionLabel}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <Input placeholder="عنوان الطلب *" value={formData.title} onChange={e => setFormData(p => ({ ...p, title: e.target.value }))} />
            <OrderFormFields />
            <Textarea placeholder="اكتب تفاصيل طلبك المخصص..." value={formData.details} onChange={e => setFormData(p => ({ ...p, details: e.target.value }))} />
          </div>
          <Button className="w-full mt-2" onClick={() => handleSubmitOrder('custom_request')} disabled={createOrder.isPending}>
            <MessageSquare className="w-4 h-4 ml-2" />إرسال الطلب المخصص
          </Button>
        </DialogContent>
      </Dialog>

      {/* Inquiry Dialog */}
      <Dialog open={inquiryDialog} onOpenChange={setInquiryDialog}>
        <DialogContent dir="rtl" className="max-w-md">
          <DialogHeader><DialogTitle>استفسار - {sectionLabel}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <Input placeholder="الاسم *" value={formData.customer_name} onChange={e => setFormData(p => ({ ...p, customer_name: e.target.value }))} />
            <Input placeholder="البلد" value={formData.country} onChange={e => setFormData(p => ({ ...p, country: e.target.value }))} />
            <div className="flex gap-2">
              <Select value={formData.country_code} onValueChange={v => setFormData(p => ({ ...p, country_code: v }))}>
                <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {countryCodes.map(c => <SelectItem key={c.code} value={c.code}>{c.country} {c.code}</SelectItem>)}
                </SelectContent>
              </Select>
              <Input placeholder="رقم الهاتف (اختياري)" className="flex-1" value={formData.customer_phone} onChange={e => setFormData(p => ({ ...p, customer_phone: e.target.value }))} />
            </div>
            <Textarea placeholder="تفاصيل الاستفسار..." rows={4} value={formData.details} onChange={e => setFormData(p => ({ ...p, details: e.target.value }))} />
          </div>
          <Button className="w-full mt-2" onClick={() => handleSubmitOrder('inquiry')} disabled={createOrder.isPending}>
            <HelpCircle className="w-4 h-4 ml-2" />إرسال الاستفسار
          </Button>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  );
};

export default WifiNetworksPage;
