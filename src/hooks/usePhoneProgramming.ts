import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { DEFAULT_BRANDS, DEFAULT_GUIDES, PhoneBrand, ServiceCategoryGuide } from '@/data/phoneProgrammingData';
import { useToast } from '@/hooks/use-toast';

export function usePhoneProgramming() {
  const [brands, setBrands] = useState<PhoneBrand[]>(DEFAULT_BRANDS);
  const [guides, setGuides] = useState<ServiceCategoryGuide[]>(DEFAULT_GUIDES);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // 1. Try loading from Supabase tables or localStorage
      const savedBrands = localStorage.getItem('app_phone_brands');
      const savedGuides = localStorage.getItem('app_phone_guides');

      if (savedBrands) {
        try {
          const parsed = JSON.parse(savedBrands);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setBrands(parsed);
          }
        } catch (e) {
          console.error(e);
        }
      }

      if (savedGuides) {
        try {
          const parsed = JSON.parse(savedGuides);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setGuides(parsed);
          }
        } catch (e) {
          console.error(e);
        }
      }

      // 2. Fetch from Supabase if available
      if (supabase) {
        const { data: bData, error: bErr } = await supabase.from('phone_brands').select('*').order('created_at', { ascending: true });
        if (!bErr && bData && bData.length > 0) {
          const formattedBrands: PhoneBrand[] = bData.map(item => ({
            id: item.id,
            name: item.name,
            nameEn: item.name_en || item.name,
            logoUrl: item.logo_url || '',
            color: item.color || '#1428a0',
            accentColor: item.accent_color || '#3b82f6',
            bgGradient: item.bg_gradient || 'from-blue-900 via-indigo-900 to-slate-900',
            badge: item.badge || '',
            description: item.description || '',
            active: item.active !== false,
          }));
          setBrands(formattedBrands);
        }

        const { data: gData, error: gErr } = await supabase.from('phone_guides').select('*');
        if (!gErr && gData && gData.length > 0) {
          const formattedGuides: ServiceCategoryGuide[] = gData.map(item => ({
            id: item.id,
            brandId: item.brand_id,
            categoryKey: item.category_key,
            categoryName: item.category_name,
            title: item.title,
            summary: item.summary || '',
            youtubeUrl: item.youtube_url || '',
            steps: typeof item.steps === 'string' ? JSON.parse(item.steps) : (item.steps || []),
            dialCodes: typeof item.dial_codes === 'string' ? JSON.parse(item.dial_codes) : (item.dial_codes || []),
            importantNotes: typeof item.important_notes === 'string' ? JSON.parse(item.important_notes) : (item.important_notes || []),
            requirements: typeof item.requirements === 'string' ? JSON.parse(item.requirements) : (item.requirements || []),
          }));
          setGuides(formattedGuides);
        }
      }
    } catch (err) {
      console.warn('Using default phone programming data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const saveBrands = async (updatedBrands: PhoneBrand[]) => {
    setBrands(updatedBrands);
    localStorage.setItem('app_phone_brands', JSON.stringify(updatedBrands));

    if (supabase) {
      try {
        // Upsert into Supabase
        const payload = updatedBrands.map(b => ({
          id: b.id,
          name: b.name,
          name_en: b.nameEn,
          logo_url: b.logoUrl,
          color: b.color,
          accent_color: b.accentColor,
          bg_gradient: b.bgGradient,
          badge: b.badge,
          description: b.description,
          active: b.active,
        }));
        await supabase.from('phone_brands').upsert(payload);
      } catch (e) {
        console.warn('Could not sync brands to Supabase:', e);
      }
    }
    toast({ title: 'تم الحفظ', description: 'تم تحديث أصل وأقسام الهواتف بنجاح' });
  };

  const saveGuide = async (guide: ServiceCategoryGuide) => {
    const existingIndex = guides.findIndex(g => g.id === guide.id);
    const newGuides = [...guides];
    if (existingIndex >= 0) {
      newGuides[existingIndex] = guide;
    } else {
      newGuides.push(guide);
    }
    setGuides(newGuides);
    localStorage.setItem('app_phone_guides', JSON.stringify(newGuides));

    if (supabase) {
      try {
        await supabase.from('phone_guides').upsert({
          id: guide.id,
          brand_id: guide.brandId,
          category_key: guide.categoryKey,
          category_name: guide.categoryName,
          title: guide.title,
          summary: guide.summary,
          youtube_url: guide.youtubeUrl,
          steps: JSON.stringify(guide.steps),
          dial_codes: JSON.stringify(guide.dialCodes || []),
          important_notes: JSON.stringify(guide.importantNotes || []),
          requirements: JSON.stringify(guide.requirements || []),
        });
      } catch (e) {
        console.warn('Could not sync guide to Supabase:', e);
      }
    }

    toast({ title: 'تم حفظ الدليل والشرح', description: `تم تحديث قسم ${guide.categoryName} بنجاح` });
  };

  const deleteGuide = async (guideId: string) => {
    const updated = guides.filter(g => g.id !== guideId);
    setGuides(updated);
    localStorage.setItem('app_phone_guides', JSON.stringify(updated));

    if (supabase) {
      try {
        await supabase.from('phone_guides').delete().eq('id', guideId);
      } catch (e) {
        console.warn(e);
      }
    }
    toast({ title: 'تم الحذف', description: 'تم حذف الدليل بنجاح' });
  };

  return {
    brands,
    guides,
    isLoading,
    saveBrands,
    saveGuide,
    deleteGuide,
    refetch: fetchData,
  };
}
