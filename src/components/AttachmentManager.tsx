import React, { useState } from 'react';
import { 
  Download, Package, FileCode, Smartphone, Link as LinkIcon, Plus, 
  Trash2, FileArchive, FileText, Check, Upload, X, ExternalLink, Image as ImageIcon, Info, HelpCircle
} from 'lucide-react';
import { GuideAttachment } from '@/data/phoneProgrammingData';
import { useToast } from '@/hooks/use-toast';

interface AttachmentManagerProps {
  attachments: GuideAttachment[];
  onAddAttachment?: (attachment: GuideAttachment) => void;
  onRemoveAttachment?: (attachmentId: string) => void;
  onDownload?: (attachment: GuideAttachment) => void;
  canEdit?: boolean;
  className?: string;
  title?: string;
  subtitle?: string;
}

export const AttachmentManager: React.FC<AttachmentManagerProps> = ({
  attachments = [],
  onAddAttachment,
  onRemoveAttachment,
  onDownload,
  canEdit = false,
  className = '',
  title = 'تطبيقات ومرفقات الشرح والتهيئة',
  subtitle = 'تحميل التطبيقات المساعدة المباشرة وإرشادات الاستخدام المرفقة'
}) => {
  const { toast } = useToast();
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form states for adding attachment
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [instructions, setInstructions] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [fileType, setFileType] = useState<'apk' | 'zip' | 'exe' | 'pdf' | 'link'>('apk');
  const [fileSize, setFileSize] = useState('');
  const [categoryBadge, setCategoryBadge] = useState('تطبيق رئيسي');
  const [iconUrl, setIconUrl] = useState('');

  const handleDefaultDownload = (attachment: GuideAttachment) => {
    if (onDownload) {
      onDownload(attachment);
      return;
    }

    setDownloadingId(attachment.id);
    toast({ 
      title: 'جاري بدء التحميل...', 
      description: `يتم الآن تنزيل تطبيق ${attachment.name}` 
    });

    try {
      let url = attachment.fileUrl;

      if (!url || url === '#' || url.trim() === '') {
        const dummyContent = `=======================================\n` +
          `منصة ابوكيان الرقمية - تطبيق برمجة الهواتف\n` +
          `=======================================\n` +
          `اسم التطبيق: ${attachment.name}\n` +
          `النوع: ${attachment.fileType || 'apk'}\n` +
          `التعليمات: ${attachment.instructions || attachment.description || 'لا توجد تعليمات خاصة'}\n` +
          `تاريخ التحميل: ${new Date().toLocaleDateString('ar-EG')}\n`;

        const blob = new Blob([dummyContent], { type: 'text/plain;charset=utf-8' });
        url = URL.createObjectURL(blob);
      }

      if (attachment.fileType === 'link' || url.startsWith('http://') || url.startsWith('https://')) {
        window.open(url, '_blank', 'noopener,noreferrer');
      } else {
        const link = document.createElement('a');
        link.href = url;
        const fileExt = attachment.fileType === 'zip' ? '.zip' : attachment.fileType === 'exe' ? '.exe' : attachment.fileType === 'pdf' ? '.pdf' : '.apk';
        const cleanName = attachment.name.replace(/[^a-zA-Z0-9_أ-ي\s-]/g, '').trim() + fileExt;
        link.setAttribute('download', cleanName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      setTimeout(() => {
        setDownloadingId(null);
        toast({ title: 'تم التحميل بنجاح!', description: `تم حفظ ${attachment.name} بنجاح.` });
      }, 1000);
    } catch (err) {
      console.error('Download error:', err);
      setDownloadingId(null);
      toast({ title: 'خطأ في التحميل', description: 'يرجى التحقق من رابط الملف وإعادة المحاولة.' });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
      if (!name) setName(file.name.replace(/\.[^/.]+$/, ""));
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      setFileSize(`${sizeMb} MB`);
      
      const ext = file.name.split('.').pop()?.toLowerCase();
      if (ext === 'apk') setFileType('apk');
      else if (ext === 'zip' || ext === 'rar' || ext === '7z') setFileType('zip');
      else if (ext === 'exe') setFileType('exe');
      else if (ext === 'pdf') setFileType('pdf');

      toast({ title: 'تم رفع الملف بنجاح', description: `${file.name} (${sizeMb} MB)` });
    }
  };

  const handleIconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          setIconUrl(ev.target.result as string);
          toast({ title: 'تم تحميل صورة التطبيق بنجاح' });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitNewAttachment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast({ title: 'يرجى إدخال اسم التطبيق', variant: 'destructive' });
      return;
    }

    const newAtt: GuideAttachment = {
      id: `att_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      name: name.trim(),
      description: description.trim() || undefined,
      instructions: instructions.trim() || undefined,
      fileUrl: fileUrl.trim() || '#',
      fileType,
      fileSize: fileSize.trim() || 'غير محدد',
      categoryBadge: categoryBadge.trim() || 'تطبيق مساهم',
      iconUrl: iconUrl.trim() || undefined
    };

    if (onAddAttachment) {
      onAddAttachment(newAtt);
    }

    toast({ title: 'تمت إضافة التطبيق والمرفق بنجاح!' });
    
    // Reset form
    setName('');
    setDescription('');
    setInstructions('');
    setFileUrl('');
    setFileSize('');
    setIconUrl('');
    setIsAddModalOpen(false);
  };

  const getFallbackIcon = (type?: string) => {
    switch (type) {
      case 'apk':
        return <Smartphone className="w-6 h-6 text-blue-600" />;
      case 'zip':
        return <FileArchive className="w-6 h-6 text-amber-600" />;
      case 'exe':
        return <FileCode className="w-6 h-6 text-indigo-600" />;
      case 'pdf':
        return <FileText className="w-6 h-6 text-rose-600" />;
      case 'link':
        return <LinkIcon className="w-6 h-6 text-cyan-600" />;
      default:
        return <Package className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <div className={`space-y-4 font-sans ${className}`}>
      {/* Header Row */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <h4 className="text-base font-black text-slate-900 flex items-center gap-2">
            <Package className="w-5 h-5 text-red-600" />
            {title}
          </h4>
          <p className="text-xs text-slate-600 mt-0.5 font-bold">
            {subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="bg-red-100 text-red-800 text-xs font-black px-3 py-1 rounded-full border border-red-200">
            {attachments.length} تطبيقات جاهزة
          </span>

          {canEdit && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs px-3.5 py-1.5 rounded-xl shadow-md flex items-center gap-1.5 transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة تطبيق / أداة</span>
            </button>
          )}
        </div>
      </div>

      {/* Attachments & Apps Showcase Cards */}
      {attachments.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {attachments.map((att) => (
            <div 
              key={att.id}
              className="bg-white hover:bg-blue-50/30 p-4 rounded-2xl border-2 border-slate-200 hover:border-blue-400 transition-all space-y-3.5 shadow-md hover:shadow-xl group relative flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Header App Info */}
                <div className="flex items-start gap-3">
                  {/* App Icon Container */}
                  <div className="w-13 h-13 rounded-2xl bg-slate-100 border-2 border-slate-200 shadow-sm flex items-center justify-center shrink-0 overflow-hidden group-hover:scale-105 transition-transform">
                    {att.iconUrl ? (
                      <img src={att.iconUrl} alt={att.name} className="w-full h-full object-cover" />
                    ) : (
                      getFallbackIcon(att.fileType)
                    )}
                  </div>

                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h5 className="font-black text-sm text-slate-900 group-hover:text-blue-700 transition-colors truncate">
                        {att.name}
                      </h5>
                      {canEdit && onRemoveAttachment && (
                        <button
                          onClick={() => onRemoveAttachment(att.id)}
                          className="text-slate-400 hover:text-red-600 p-1 rounded-lg hover:bg-red-50 transition-colors"
                          title="حذف التطبيق"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      {att.categoryBadge && (
                        <span className="inline-block text-[10px] font-black bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-md border border-blue-200">
                          {att.categoryBadge}
                        </span>
                      )}
                      <span className="text-[10px] text-slate-500 font-mono font-bold bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        الحجم: {att.fileSize || 'غير محدد'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description & Usage Instructions */}
                {att.description && (
                  <p className="text-xs text-slate-700 leading-relaxed font-bold bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    {att.description}
                  </p>
                )}

                {att.instructions && (
                  <div className="bg-amber-50/80 p-2.5 rounded-xl border border-amber-200 text-amber-900 text-xs font-bold space-y-1">
                    <div className="flex items-center gap-1 text-[11px] font-black text-amber-800">
                      <HelpCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>تعليمات الاستخدام والتثبيت:</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-amber-950 pr-4">
                      {att.instructions}
                    </p>
                  </div>
                )}
              </div>

              {/* Working Prominent Download Button */}
              <button
                onClick={() => handleDefaultDownload(att)}
                disabled={downloadingId === att.id}
                className="w-full bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-700 hover:to-rose-700 text-white font-black text-xs py-3 px-4 rounded-xl shadow-md shadow-red-600/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-[0.99] mt-2"
              >
                {downloadingId === att.id ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    <span>جاري التحميل...</span>
                  </>
                ) : (
                  <>
                    {att.fileType === 'link' ? <ExternalLink className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                    <span>{att.fileType === 'link' ? 'فتح الرابط المباشر' : `تحميل ${att.name} الآن`}</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 text-center space-y-2">
          <Package className="w-8 h-8 text-slate-400 mx-auto" />
          <p className="text-xs text-slate-600 font-bold">لا توجد تطبيقات مضافة لهذا القسم حالياً</p>
        </div>
      )}

      {/* Add Attachment Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 border-2 border-blue-200 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                <Upload className="w-5 h-5 text-blue-600" />
                إضافة تطبيق / مرفق جديد للقسم
              </h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitNewAttachment} className="space-y-3 text-right">
              <div>
                <label className="block text-xs font-black text-slate-800 mb-1">اسم التطبيق *</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: تطبيق QuickShortcutMaker أو VoLTE Enabler"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600 font-bold"
                />
              </div>

              {/* Icon Image Uploader / URL */}
              <div>
                <label className="block text-xs font-black text-slate-800 mb-1">صورة / أيقونة التطبيق</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="رابط الصورة المباشر (http://...)"
                    value={iconUrl}
                    onChange={e => setIconUrl(e.target.value)}
                    className="flex-1 text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600 dir-ltr text-left font-bold"
                  />
                  <label className="bg-blue-50 hover:bg-blue-100 text-blue-800 text-xs font-black px-3 py-2.5 rounded-xl border border-blue-200 cursor-pointer flex items-center gap-1 shrink-0">
                    <ImageIcon className="w-4 h-4 text-blue-600" />
                    <span>رفع صورة</span>
                    <input type="file" accept="image/*" onChange={handleIconUpload} className="hidden" />
                  </label>
                </div>
              </div>

              {/* App File Uploader / URL */}
              <div>
                <label className="block text-xs font-black text-slate-800 mb-1">رفع ملف التطبيق من الجهاز أو عبر رابط</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="رابط ملف التطبيق المباشر (http://...)"
                    value={fileUrl}
                    onChange={e => setFileUrl(e.target.value)}
                    className="flex-1 text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600 dir-ltr text-left font-bold"
                  />
                  <label className="bg-red-50 hover:bg-red-100 text-red-800 text-xs font-black px-3 py-2.5 rounded-xl border border-red-200 cursor-pointer flex items-center gap-1 shrink-0">
                    <Upload className="w-4 h-4 text-red-600" />
                    <span>رفع ملف</span>
                    <input type="file" onChange={handleFileUpload} className="hidden" />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-black text-slate-800 mb-1">نوع الملف</label>
                  <select
                    value={fileType}
                    onChange={e => setFileType(e.target.value as any)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600 bg-white font-bold"
                  >
                    <option value="apk">تطبيق أندرويد (APK)</option>
                    <option value="zip">ملف مضغوط (ZIP/RAR)</option>
                    <option value="exe">برنامج كمبيوتر (EXE)</option>
                    <option value="pdf">مستند (PDF)</option>
                    <option value="link">رابط خارجي</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-800 mb-1">حجم الملف</label>
                  <input
                    type="text"
                    placeholder="مثال: 4.5 MB"
                    value={fileSize}
                    onChange={e => setFileSize(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-800 mb-1">وصف التطبيق</label>
                <textarea
                  rows={2}
                  placeholder="وصف مختصر لفائدة التطبيق..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600 font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-800 mb-1">تعليمات التثبيت والاستخدام</label>
                <textarea
                  rows={2}
                  placeholder="خطوات وتنويهات الاستخدام بالتفصيل..."
                  value={instructions}
                  onChange={e => setInstructions(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600 font-bold"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-black text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md"
                >
                  حفظ وإضافة التطبيق
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttachmentManager;
