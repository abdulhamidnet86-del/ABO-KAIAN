export interface PhoneBrand {
  id: string;
  name: string;
  nameEn: string;
  logoUrl?: string;
  color: string;
  accentColor: string;
  bgGradient: string;
  badge: string;
  description: string;
  active: boolean;
}

export interface ServiceGuideStep {
  stepNumber: number;
  title: string;
  description: string;
  code?: string;
  note?: string;
  warning?: string;
}

export interface ServiceCategoryGuide {
  id: string;
  brandId: string; // 'samsung' | 'lg' | 'lt' | 'redmi' | 'huawei' | 'motorola' | 'all'
  categoryKey: '3g' | '4g' | 'volte' | 'arabic' | 'diag' | 'tips';
  categoryName: string;
  title: string;
  summary: string;
  youtubeUrl?: string;
  steps: ServiceGuideStep[];
  dialCodes?: { label: string; code: string; description: string }[];
  importantNotes?: string[];
  requirements?: string[];
  lastUpdated?: string;
}

export const DEFAULT_BRANDS: PhoneBrand[] = [
  {
    id: 'samsung',
    name: 'سامسونج',
    nameEn: 'Samsung',
    color: '#2563eb',
    accentColor: '#3b82f6',
    bgGradient: 'from-blue-600 via-blue-700 to-indigo-800',
    badge: 'Galaxy S / Note / A / Z',
    description: 'تفعيل وتحديثات وبرمجة جميع هواتف سامسونج جالاكسي المعربة والأجنبية',
    active: true,
  },
  {
    id: 'lg',
    name: 'إل جي',
    nameEn: 'LG Mobile',
    color: '#dc2626',
    accentColor: '#ef4444',
    bgGradient: 'from-red-600 via-rose-600 to-red-700',
    badge: 'LG V Series / G Series / Velvet',
    description: 'إصلاح الشبكة وتفعيل ثري جي وفورجي وفولتي لهواتف LG أمريكية وكورية',
    active: true,
  },
  {
    id: 'lt',
    name: 'ال تي',
    nameEn: 'LT Mobile',
    color: '#0284c7',
    accentColor: '#06b6d4',
    bgGradient: 'from-blue-500 via-cyan-600 to-blue-700',
    badge: 'LT Note / Armor / Alpha',
    description: 'برمجة وإعدادات شبكات ال تي ونقاط الوصول وتفعيل VoLTE بنقرة واحدة',
    active: true,
  },
  {
    id: 'redmi',
    name: 'ردمي / شاومي',
    nameEn: 'Redmi & Xiaomi',
    color: '#ea580c',
    accentColor: '#f97316',
    bgGradient: 'from-red-600 via-orange-600 to-red-700',
    badge: 'Redmi Note / Mi / POCO',
    description: 'فك التشفير، تفعيل أكواد الدياج، وإعدادات 4G/VoLTE لأجهزة شاومي',
    active: true,
  },
  {
    id: 'huawei',
    name: 'هواوي',
    nameEn: 'Huawei & Honor',
    color: '#e11d48',
    accentColor: '#f43f5e',
    bgGradient: 'from-rose-600 via-red-600 to-rose-700',
    badge: 'Mate / P Series / Nova / Honor',
    description: 'تفعيل الخدمات، ضبط أسماء نقاط الوصول (APN)، حلول تعريب هواتف هواوي',
    active: true,
  },
  {
    id: 'motorola',
    name: 'موتورولا',
    nameEn: 'Motorola',
    color: '#4f46e5',
    accentColor: '#6366f1',
    bgGradient: 'from-indigo-600 via-blue-700 to-indigo-800',
    badge: 'Moto G / Moto Z / Edge',
    description: 'تفعيل شبكات يمن موبايل وسبأفون والشركة الحديثة وأكواد الدياج لأجهزة موتو',
    active: true,
  },
];

export const SERVICE_CATEGORIES = [
  { id: '3g', name: 'تفعيل الثري جي', subtitle: 'ضبط إعدادات 3G ونقاط الوصول CDMA/GSM', icon: 'Signal' },
  { id: '4g', name: 'تفعيل الفورجي', subtitle: 'إعدادات LTE و4G عالية السرعة للشبكات', icon: 'Zap' },
  { id: 'volte', name: 'تفعيل الفولتي', subtitle: 'مكالمات صويتية عالية الوضوح HD عبر 4G', icon: 'PhoneCall' },
  { id: 'arabic', name: 'التعريب الشامل', subtitle: 'إضافة اللغة العربية للنظام والرسائل والقوائم', icon: 'Globe' },
  { id: 'diag', name: 'أكواد الدياج', subtitle: 'أكواد فتح منافذ Diagnostic و DFS tools', icon: 'Cpu' },
  { id: 'tips', name: 'نصائح وإرشادات', subtitle: 'حل مشكلات اختفاء الشبكة والشريحة والبيانات', icon: 'Lightbulb' },
];

export const DEFAULT_GUIDES: ServiceCategoryGuide[] = [
  // Samsung - 3G
  {
    id: 'samsung-3g',
    brandId: 'samsung',
    categoryKey: '3g',
    categoryName: 'تفعيل الثري جي (3G)',
    title: 'دليل تفعيل الثري جي (3G) لهواتف سامسونج جالاكسي',
    summary: 'شرح خطوة بخطوة لتفعيل شبكة 3G يمن موبايل أو الشبكات الأخرى على أجهزة سامسونج.',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    requirements: [
      'شريحة يمن موبايل أو سبأفون/يو مفعل عليها خيار الإنترنت 3G',
      'تفعيل وضع تصحيح أخطاء USB (USB Debugging) في خيارات المطور',
      'برنامج DFS Tool أو CDMA Tool بحال تطلب الأمر تحويل CDMA'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'فتح خيارات المطور والوصول إلى أداة الدياج',
        description: 'قم بفتح قائمة الاتصال واكتب كود الدياج لسامسونج لإظهار خيارات USB UART.',
        code: '*#0808#',
        note: 'اختر DM + MODEM + ADB ثم اضغط OK'
      },
      {
        stepNumber: 2,
        title: 'إضافة نقطة الوصول APN الخاصة بالشبكة',
        description: 'اذهب إلى الإعدادات > الاتصالات > شبكات الهواتف المحمولة > أسماء نقاط الوصول (APN) وأضف نقطة جديدة.',
        code: 'Name: Yemen Mobile | APN: #777 | User: #777 | Pass: #777',
      },
      {
        stepNumber: 3,
        title: 'تحديد نوع الشبكة المفضلة',
        description: 'اختر نمط الشبكة إلى CDMA / EvDo / LTE أو Auto.',
      }
    ],
    dialCodes: [
      { label: 'كود منافذ الدياج USB', code: '*#0808#', description: 'تغيير وضع توصيل USB ببرامج البرمجة' },
      { label: 'كود اختبار المودم والشبكة', code: '*#0011#', description: 'معاينة وضع الخدمة الخدمية Service Mode' },
      { label: 'كود إعدادات معلومات الهاتف', code: '*#*#4636#*#*', description: 'فحص نمط المودم المفضل' }
    ],
    importantNotes: [
      'إذا اختفت خيارات APN قم بعمل إعادة ضبط إعدادات الشبكة فقط دون إعادة تعيين الهاتف.',
      'تأكد من إلغاء قفل الشبكة للمشغلات الأجنبية مثل Verizon أو Sprint.'
    ],
    attachments: [
      {
        id: 'att-1',
        name: 'تطبيق QuickShortcutMaker (تفعيل 3G)',
        description: 'أداة للوصول إلى القوائم المخفية وتثبيت خيارات الشبكة 3G/APN بدون روت.',
        instructions: 'قم بتثبيت التطبيق، ابحث عن (Network Mode) أو (APN) وافتح النافذة المباشرة لحفظ الإعدادات.',
        fileUrl: 'https://github.com/apk/sample.apk',
        fileType: 'apk',
        fileSize: '2.4 MB',
        categoryBadge: 'تطبيق مساعد',
        iconUrl: 'https://images.unsplash.com/photo-1616469829941-c7200edec809?w=100&auto=format&fit=crop&q=80'
      },
      {
        id: 'att-2',
        name: 'أداة Samsung Diag USB Driver (كمبيوتر)',
        description: 'تعريفات سامسونج الرسمية لإظهار منفذ الدياج برامج DFS و CDMA Tool.',
        instructions: 'قم بفك الضغط عن الملف واضغط Setup.exe ثم أعد تشغيل الكمبيوتر.',
        fileUrl: 'https://github.com/drivers/samsung.zip',
        fileType: 'zip',
        fileSize: '15.8 MB',
        categoryBadge: 'تعريفات رسمية',
        iconUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=100&auto=format&fit=crop&q=80'
      }
    ]
  },
  // Samsung - 4G
  {
    id: 'samsung-4g',
    brandId: 'samsung',
    categoryKey: '4g',
    categoryName: 'تفعيل الفورجي (4G LTE)',
    title: 'تفعيل شبكة الفورجي 4G على أجهزة سامسونج جالاكسي',
    summary: 'خطوات ضبط تغطية LTE والفرجي على شريحة يمن موبايل 4G وشبكات U و Sabafon.',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    requirements: [
      'شريحة يدعم نظامها 4G ومستبدلة لدى الشركة',
      'تغطية فورجي فعالة في منطقتك'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'إدخال كود الشبكة وتأكيد خيار LTE Only أو LTE/CDMA',
        description: 'قم بفتح قائمة الاتصال واكتب الكود لضبط النمط المفضل للـ 4G.',
        code: '*#*#4636#*#*',
      },
      {
        stepNumber: 2,
        title: 'ضبط نقطة وصول الفورجي (APN)',
        description: 'أضف نقطة وصول 4G الخاصة بالشبكة:',
        code: 'Name: YEMEN MOBILE 4G | APN: ymcdata',
      }
    ],
    dialCodes: [
      { label: 'كود اختيار LTE', code: '*#2263#', description: 'تحديد النطاقات الترددية Band Selection' }
    ],
    importantNotes: ['قم ببدء تشغيل الهاتف بعد إضافة نقطة الوصول لتفعيل رمز LTE فوق إشارة الشبكة.']
  },
  // LG - 3G/4G
  {
    id: 'lg-4g',
    brandId: 'lg',
    categoryKey: '4g',
    categoryName: 'تفعيل الفورجي لهواتف LG',
    title: 'طريقة تفعيل 4G LTE لهواتف LG الامريكية (Verizon / Sprint / AT&T)',
    summary: 'إصلاح خيارات الشبكة المفقودة وتفعيل 4G وسحب ملفات الشبكة NV لهواتف ال جي.',
    youtubeUrl: '',
    steps: [
      {
        stepNumber: 1,
        title: 'الدخول القائمة السرية Hidden Menu لهواتف LG',
        description: 'اكتب الكود بناءً على موديل هاتفك (مثال موديل G8 كود 820):',
        code: '##228378# OR *#546368#*820#',
      },
      {
        stepNumber: 2,
        title: 'تنشيط خيار Field Test وتحديد LTE',
        description: 'من قائمة Modem Protocol اختر Modem Control ثم Network Mode واجعلها LTE/CDMA.',
      }
    ],
    dialCodes: [
      { label: 'كود الدياج LG DIAG', code: '##3424#', description: 'تفعيل البورت للربط مع أجهزة الكمبيوتر' },
      { label: 'كود تفعيل EPC/APN Hidden', code: '*#546368#*MODEL#', description: 'القائمة السرية المتقدمة' }
    ]
  },
  // LT - VoLTE
  {
    id: 'lt-volte',
    brandId: 'lt',
    categoryKey: 'volte',
    categoryName: 'تفعيل الفولتي (VoLTE) لهواتف LT',
    title: 'تفعيل ميزة المكالمات الصوتية عالية الدقة VoLTE على أجهزة LT Mobile',
    summary: 'أجهزة LT تدعم VoLTE بشكل مدمج، إليك طريقة الضغط والتنشيط السريع بنقرة واحدة.',
    youtubeUrl: '',
    steps: [
      {
        stepNumber: 1,
        title: 'تفعيل مفتاح VoLTE من الإعدادات',
        description: 'اذهب إلى الإعدادات > شبكة الهواتف المحمولة > قم بتفعيل زر (مكالمات VoLTE).',
      },
      {
        stepNumber: 2,
        title: 'إدخال كود التفعيل السريع بحال عدم ظهوره',
        description: 'اكتب كود إظهار خيار VoLTE المخفي على المعالجات:',
        code: '*#*#86583#*#*',
        note: 'ستظهر عبارة VoLTE carrier check was disabled مما يعني تفعيل المفتاح بنجاح.'
      }
    ],
    dialCodes: [
      { label: 'كود تفعيل VoLTE المخفي', code: '*#*#86583#*#*', description: 'إلغاء حظر المشغل لميزة VoLTE' }
    ]
  },
  // Redmi - Diag
  {
    id: 'redmi-diag',
    brandId: 'redmi',
    categoryKey: 'diag',
    categoryName: 'أكواد الدياج لهواتف شاومي وردمي',
    title: 'فتح منافذ Diagnostic Port لهواتف Xiaomi & Redmi',
    summary: 'تفعيل البورت البرمجي لربط أجهزة شاومي مع برامج QPST و DFS للبرمجة.',
    steps: [
      {
        stepNumber: 1,
        title: 'تفعيل تصحيح USB ADB',
        description: 'اضغط على إصدار MIUI 7 مرات في حول الهاتف ثم فعل USB Debugging + Security Settings.',
      },
      {
        stepNumber: 2,
        title: 'طلب كود الدياج المباشر',
        description: 'افتح الاتصال واكتب الكود:',
        code: '*#*#717717#*#*',
        note: 'سيظهر إشعار Diag port enabled'
      }
    ],
    dialCodes: [
      { label: 'كود الدياج MDIAG', code: '*#*#717717#*#*', description: 'فتح وإغلاق بورت الدياج المباشر' },
      { label: 'كود المودم الفحص', code: '*#*#64663#*#*', description: 'قائمة اختبار العتاد QC test' }
    ]
  }
];

export const MARQUEE_ITEMS = [
  { text: 'تفعيل الثري جي 3G لجميع شبكات اليمن بسرعة عالية', icon: 'Signal' },
  { text: 'تفعيل الفورجي 4G LTE وشغّال على أجهزة سامسونج، LG، شاومي، LT', icon: 'Zap' },
  { text: 'تفعيل الفولتي VoLTE للاتصال المباشر بجودة صينية عالية أثناء التصفح', icon: 'PhoneCall' },
  { text: 'التعريب الكامل بدون روت لجميع أجهزة أندرويد المعقدة والأجنبية', icon: 'Globe' },
  { text: 'أكواد الدياج DIAG Port ومودم أجهزة كوالكوم وميديا تيك', icon: 'Cpu' },
];
