import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Smartphone, Plus, Edit2, Trash2, Save, Eye, EyeOff, Radio, Zap, 
  PhoneCall, Globe, Cpu, Lightbulb, Play, Copy, Check, PlusCircle, X, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { usePhoneProgramming } from '@/hooks/usePhoneProgramming';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { PhoneBrand, ServiceCategoryGuide, SERVICE_CATEGORIES, GuideAttachment } from '@/data/phoneProgrammingData';
import AttachmentManager from '@/components/AttachmentManager';
import { useToast } from '@/hooks/use-toast';

export const AdminPhoneProgrammingTable: React.FC = () => {
  const { brands, guides, saveBrands, saveGuide, deleteGuide } = usePhoneProgramming();
  const { getSetting, updateSetting, getBool } = useSiteSettings();
  const { toast } = useToast();

  const [selectedBrandId, setSelectedBrandId] = useState<string>('samsung');
  const [selectedCategoryKey, setSelectedCategoryKey] = useState<string>('3g');

  // Brand Edit Modal
  const [editingBrand, setEditingBrand] = useState<PhoneBrand | null>(null);
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);

  // Guide Editor State
  const activeGuide: ServiceCategoryGuide = guides.find(
    g => g.brandId === selectedBrandId && g.categoryKey === selectedCategoryKey
  ) || {
    id: `${selectedBrandId}-${selectedCategoryKey}`,
    brandId: selectedBrandId,
    categoryKey: selectedCategoryKey as any,
    categoryName: SERVICE_CATEGORIES.find(c => c.id === selectedCategoryKey)?.name || 'القسم',
    title: `تفعيل قسم ${SERVICE_CATEGORIES.find(c => c.id === selectedCategoryKey)?.name}`,
    summary: 'أدخل ملخص الشرح هنا..',
    youtubeUrl: '',
    steps: [
      { stepNumber: 1, title: 'الخطوة الأولى', description: 'أدخل تفاصيل الخطوة هنا..' }
    ],
    dialCodes: [
      { label: 'كود الفحص المباشر', code: '*#0808#', description: 'إعادة ضبط المنفذ' }
    ],
    importantNotes: [],
    requirements: []
  };

  const [currentGuideForm, setCurrentGuideForm] = useState<ServiceCategoryGuide>(activeGuide);

  // Update currentGuideForm when tab changes
  React.useEffect(() => {
    const guide = guides.find(
      g => g.brandId === selectedBrandId && g.categoryKey === selectedCategoryKey
    );
    if (guide) {
      setCurrentGuideForm(guide);
    } else {
      setCurrentGuideForm({
        id: `${selectedBrandId}-${selectedCategoryKey}`,
        brandId: selectedBrandId,
        categoryKey: selectedCategoryKey as any,
        categoryName: SERVICE_CATEGORIES.find(c => c.id === selectedCategoryKey)?.name || 'القسم',
        title: `تفعيل ${SERVICE_CATEGORIES.find(c => c.id === selectedCategoryKey)?.name}`,
        summary: 'أدخل ملخص الشرح هنا..',
        youtubeUrl: '',
        steps: [{ stepNumber: 1, title: 'الخطوة الأولى', description: 'أدخل تفاصيل الخطوة هنا..' }],
        dialCodes: [],
        importantNotes: [],
        requirements: []
      });
    }
  }, [selectedBrandId, selectedCategoryKey, guides]);

  // Brand Management Handlers
  const handleToggleBrandActive = (brandId: string) => {
    const updated = brands.map(b => b.id === brandId ? { ...b, active: !b.active } : b);
    saveBrands(updated);
  };

  const handleSaveBrand = (brand: PhoneBrand) => {
    const exists = brands.some(b => b.id === brand.id);
    let updated: PhoneBrand[];
    if (exists) {
      updated = brands.map(b => b.id === brand.id ? brand : b);
    } else {
      updated = [...brands, brand];
    }
    saveBrands(updated);
    setIsBrandModalOpen(false);
    setEditingBrand(null);
  };

  // Guide Form Handlers
  const handleSaveCurrentGuide = async () => {
    await saveGuide(currentGuideForm);
  };

  // Steps Handlers
  const handleAddStep = () => {
    const steps = currentGuideForm.steps || [];
    const newStep = {
      stepNumber: steps.length + 1,
      title: 'خطوة جديدة',
      description: 'أدخل التفاصيل هنا'
    };
    setCurrentGuideForm({ ...currentGuideForm, steps: [...steps, newStep] });
  };

  const handleRemoveStep = (index: number) => {
    const steps = currentGuideForm.steps.filter((_, i) => i !== index);
    const renumbered = steps.map((s, i) => ({ ...s, stepNumber: i + 1 }));
    setCurrentGuideForm({ ...currentGuideForm, steps: renumbered });
  };

  const handleStepChange = (index: number, field: string, value: any) => {
    const steps = [...currentGuideForm.steps];
    steps[index] = { ...steps[index], [field]: value };
    setCurrentGuideForm({ ...currentGuideForm, steps });
  };

  // Dial Codes Handlers
  const handleAddDialCode = () => {
    const codes = currentGuideForm.dialCodes || [];
    setCurrentGuideForm({
      ...currentGuideForm,
      dialCodes: [...codes, { label: 'كود جديد', code: '*#0000#', description: 'وصف الكود' }]
    });
  };

  const handleRemoveDialCode = (index: number) => {
    const codes = currentGuideForm.dialCodes?.filter((_, i) => i !== index) || [];
    setCurrentGuideForm({ ...currentGuideForm, dialCodes: codes });
  };

  const handleDialCodeChange = (index: number, field: string, value: string) => {
    const codes = [...(currentGuideForm.dialCodes || [])];
    codes[index] = { ...codes[index], [field]: value };
    setCurrentGuideForm({ ...currentGuideForm, dialCodes: codes });
  };

  // Attachments & App Upload Handlers
  const handleAddAttachment = (newAtt: GuideAttachment) => {
    const currentAtts = currentGuideForm.attachments || [];
    setCurrentGuideForm({
      ...currentGuideForm,
      attachments: [...currentAtts, newAtt]
    });
  };

  const handleRemoveAttachment = (attId: string) => {
    const currentAtts = currentGuideForm.attachments || [];
    setCurrentGuideForm({
      ...currentGuideForm,
      attachments: currentAtts.filter(a => a.id !== attId)
    });
  };

  return (
    <div className="space-y-6 dir-rtl">
      
      {/* 1. General Controls & Header */}
      <Card>
        <CardHeader className="p-4 sm:p-6 pb-2">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold">التحكم في قسم برمجة الهواتف الذكية</CardTitle>
                <p className="text-xs text-muted-foreground">تخصيص بطاقة الرئيسية، إضافة الشركات، ومحرر الشروحات والفيديوهات الأكواد</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Label htmlFor="show_phone" className="text-xs font-bold">إظهار بطاقة الرئيسية</Label>
              <Switch
                id="show_phone"
                checked={getBool('show_phone_programming')}
                onCheckedChange={(val) => updateSetting('show_phone_programming', val ? 'true' : 'false')}
              />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* 2. Management Sub-Tabs */}
      <Tabs defaultValue="guides" className="w-full">
        <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-4">
          <TabsTrigger value="guides" className="text-xs font-bold">محرر الشروحات والأكواد</TabsTrigger>
          <TabsTrigger value="brands" className="text-xs font-bold">شركات الهواتف ({brands.length})</TabsTrigger>
        </TabsList>

        {/* GUIDES EDITOR TAB */}
        <TabsContent value="guides" className="space-y-6">
          <Card>
            <CardContent className="p-4 sm:p-6 space-y-6">
              
              {/* Brand & Category Selectors */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold">1. اختر شركة الهاتف:</Label>
                  <select
                    value={selectedBrandId}
                    onChange={(e) => setSelectedBrandId(e.target.value)}
                    className="w-full bg-background border border-input rounded-xl p-2.5 text-xs font-bold"
                  >
                    {brands.map(b => (
                      <option key={b.id} value={b.id}>{b.name} ({b.nameEn})</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold">2. اختر قسم الخدمة:</Label>
                  <select
                    value={selectedCategoryKey}
                    onChange={(e) => setSelectedCategoryKey(e.target.value)}
                    className="w-full bg-background border border-input rounded-xl p-2.5 text-xs font-bold"
                  >
                    {SERVICE_CATEGORIES.map(c => (
                      <option key={c.id} value={c.id}>{c.name} — {c.subtitle}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Guide Form Fields */}
              <div className="space-y-4 pt-2 border-t">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold">عنوان الشرح الرئيسي:</Label>
                  <Input
                    value={currentGuideForm.title}
                    onChange={(e) => setCurrentGuideForm({ ...currentGuideForm, title: e.target.value })}
                    placeholder="عنوان الشرح"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold">الملخص والوصف:</Label>
                  <Textarea
                    value={currentGuideForm.summary}
                    onChange={(e) => setCurrentGuideForm({ ...currentGuideForm, summary: e.target.value })}
                    placeholder="وصف مختصر للشرح"
                    rows={2}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold flex items-center gap-1.5 text-red-500">
                    <Play className="w-3.5 h-3.5 fill-current" />
                    رابط فيديو يوتيوب للشرح (اختياري):
                  </Label>
                  <Input
                    value={currentGuideForm.youtubeUrl || ''}
                    onChange={(e) => setCurrentGuideForm({ ...currentGuideForm, youtubeUrl: e.target.value })}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="dir-ltr text-left"
                  />
                </div>

                {/* Dial Secret Codes Management */}
                <div className="space-y-3 pt-3 border-t">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-bold text-cyan-600 flex items-center gap-1">
                      <Cpu className="w-4 h-4" />
                      الأكواد السرية (Dial Codes):
                    </Label>
                    <Button type="button" size="sm" variant="outline" onClick={handleAddDialCode} className="text-xs gap-1">
                      <Plus className="w-3.5 h-3.5" /> إضافة كود
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {(currentGuideForm.dialCodes || []).map((dc, idx) => (
                      <div key={idx} className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-muted/40 p-3 rounded-xl relative group">
                        <Input
                          placeholder="اسم الكود (مثل: كود الدياج)"
                          value={dc.label}
                          onChange={(e) => handleDialCodeChange(idx, 'label', e.target.value)}
                          className="text-xs"
                        />
                        <Input
                          placeholder="الكود (مثل: *#0808#)"
                          value={dc.code}
                          onChange={(e) => handleDialCodeChange(idx, 'code', e.target.value)}
                          className="text-xs font-mono dir-ltr text-left"
                        />
                        <div className="flex items-center gap-2">
                          <Input
                            placeholder="وصف مختصر"
                            value={dc.description}
                            onChange={(e) => handleDialCodeChange(idx, 'description', e.target.value)}
                            className="text-xs flex-1"
                          />
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleRemoveDialCode(idx)}
                            className="text-destructive shrink-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step By Step Instructions Editor */}
                <div className="space-y-3 pt-3 border-t">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                      <Zap className="w-4 h-4" />
                      خطوات الشرح والعملية:
                    </Label>
                    <Button type="button" size="sm" variant="outline" onClick={handleAddStep} className="text-xs gap-1">
                      <Plus className="w-3.5 h-3.5" /> إضافة خطوة
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {currentGuideForm.steps.map((step, idx) => (
                      <div key={idx} className="bg-muted/50 p-4 rounded-2xl space-y-2 relative border border-border">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-xs bg-cyan-500/10 text-cyan-600 px-2.5 py-0.5 rounded-full">
                            الخطوة {step.stepNumber || idx + 1}
                          </span>
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleRemoveStep(idx)}
                            className="text-destructive h-7 text-xs"
                          >
                            <Trash2 className="w-3.5 h-3.5 ml-1" /> حذف الخطوة
                          </Button>
                        </div>

                        <Input
                          placeholder="عنوان الخطوة"
                          value={step.title}
                          onChange={(e) => handleStepChange(idx, 'title', e.target.value)}
                          className="text-xs font-bold"
                        />

                        <Textarea
                          placeholder="تفاصيل الخطوة وشرح العملية"
                          value={step.description}
                          onChange={(e) => handleStepChange(idx, 'description', e.target.value)}
                          className="text-xs"
                          rows={2}
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <Input
                            placeholder="كود تنفيذي (مثل: *#*#4636#*#*)"
                            value={step.code || ''}
                            onChange={(e) => handleStepChange(idx, 'code', e.target.value)}
                            className="text-xs font-mono dir-ltr text-left"
                          />
                          <Input
                            placeholder="ملاحظة أو إرشاد تنبيهي للخطوة"
                            value={step.note || ''}
                            onChange={(e) => handleStepChange(idx, 'note', e.target.value)}
                            className="text-xs"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Apps & Attachments Manager Section */}
                <div className="pt-4 border-t">
                  <AttachmentManager
                    attachments={currentGuideForm.attachments || []}
                    canEdit={true}
                    onAddAttachment={handleAddAttachment}
                    onRemoveAttachment={handleRemoveAttachment}
                    title="تطبيقات ومرفقات القسم (رابط أو رفع ملف + صورة)"
                    subtitle="يمكن رفع التطبيقات وصورها من الجهاز أو عبر إدخال الروابط المباشرة لتعرض في صفحة الشرح مع زر التحميل والتعليمات"
                  />
                </div>

                <div className="pt-4 flex items-center justify-end">
                  <Button onClick={handleSaveCurrentGuide} className="gradient-gold font-bold text-xs gap-2">
                    <Save className="w-4 h-4" />
                    حفظ الشرح والأكواد لهذا القسم
                  </Button>
                </div>

              </div>

            </CardContent>
          </Card>
        </TabsContent>

        {/* BRANDS MANAGEMENT TAB */}
        <TabsContent value="brands" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold">إدارة شركات الهواتف المتاحة</h3>
            <Button 
              size="sm" 
              onClick={() => {
                setEditingBrand({
                  id: `brand-${Date.now()}`,
                  name: 'شركة جديدة',
                  nameEn: 'New Brand',
                  color: '#1428a0',
                  accentColor: '#3b82f6',
                  bgGradient: 'from-blue-900 via-indigo-900 to-slate-900',
                  badge: 'سلسلة جديدة',
                  description: 'وصف الخدمات المتاحة لهذه الشركة',
                  active: true,
                });
                setIsBrandModalOpen(true);
              }}
              className="text-xs gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> إضافة شركة هواتف جديدة
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {brands.map(b => (
              <Card key={b.id} className={!b.active ? 'opacity-60' : ''}>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-sm"
                      style={{ backgroundColor: b.color }}
                    >
                      {b.nameEn.substring(0, 2).toUpperCase()}
                    </div>
                    <Switch
                      checked={b.active}
                      onCheckedChange={() => handleToggleBrandActive(b.id)}
                    />
                  </div>

                  <div>
                    <h4 className="font-bold text-sm">{b.name} ({b.nameEn})</h4>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{b.description}</p>
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-2 border-t">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingBrand(b);
                        setIsBrandModalOpen(true);
                      }}
                      className="text-xs h-8"
                    >
                      <Edit2 className="w-3.5 h-3.5 ml-1" /> تعديل
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* EDIT BRAND DIALOG */}
      <Dialog open={isBrandModalOpen} onOpenChange={setIsBrandModalOpen}>
        <DialogContent className="dir-rtl max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base font-bold">تعديل بيانات شركة الهاتف</DialogTitle>
          </DialogHeader>

          {editingBrand && (
            <div className="space-y-4 pt-2">
              <div className="space-y-1">
                <Label className="text-xs font-bold">اسم الشركة (بالعربي):</Label>
                <Input
                  value={editingBrand.name}
                  onChange={(e) => setEditingBrand({ ...editingBrand, name: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <Label className="text-xs font-bold">اسم الشركة (بالإنجليزية):</Label>
                <Input
                  value={editingBrand.nameEn}
                  onChange={(e) => setEditingBrand({ ...editingBrand, nameEn: e.target.value })}
                  className="dir-ltr text-left"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-xs font-bold">الشارة الفرعية (Badge):</Label>
                <Input
                  value={editingBrand.badge}
                  onChange={(e) => setEditingBrand({ ...editingBrand, badge: e.target.value })}
                  placeholder="مثال: Galaxy S / Note / A"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-xs font-bold">الوصف والتفاصيل:</Label>
                <Textarea
                  value={editingBrand.description}
                  onChange={(e) => setEditingBrand({ ...editingBrand, description: e.target.value })}
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs font-bold">اللون الرئيسي (HEX):</Label>
                  <Input
                    type="color"
                    value={editingBrand.color}
                    onChange={(e) => setEditingBrand({ ...editingBrand, color: e.target.value })}
                    className="h-10 cursor-pointer"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-bold">لون التمييز (HEX):</Label>
                  <Input
                    type="color"
                    value={editingBrand.accentColor}
                    onChange={(e) => setEditingBrand({ ...editingBrand, accentColor: e.target.value })}
                    className="h-10 cursor-pointer"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <Button variant="outline" onClick={() => setIsBrandModalOpen(false)}>إلغاء</Button>
                <Button onClick={() => handleSaveBrand(editingBrand)}>حفظ الشركة</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default AdminPhoneProgrammingTable;
