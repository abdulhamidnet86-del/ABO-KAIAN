import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Brain, Sparkles, ExternalLink, Search, Star } from 'lucide-react';
import TopBar from '@/components/TopBar';
import BottomNav from '@/components/BottomNav';
import DrawerMenu from '@/components/DrawerMenu';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAITools } from '@/hooks/useAITools';
import PageSeo from '@/components/PageSeo';

const categories = [
  { value: 'all', label: 'الكل' },
  { value: 'chat', label: 'المحادثة' },
  { value: 'image', label: 'الصور' },
  { value: 'video', label: 'الفيديو' },
  { value: 'audio', label: 'الصوت' },
  { value: 'text', label: 'النصوص' },
  { value: 'code', label: 'البرمجة' },
  { value: 'other', label: 'أخرى' },
];

const AIToolsPage: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const { tools, isLoading } = useAITools();

  const filtered = useMemo(() => {
    return tools.filter(t => {
      if (!t.is_active) return false;
      if (activeCategory !== 'all' && t.category !== activeCategory) return false;
      if (search && !t.name.toLowerCase().includes(search.toLowerCase()) &&
          !(t.description || '').toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [tools, activeCategory, search]);

  const featured = filtered.filter(t => t.is_featured);

  return (
    <div className="min-h-screen bg-background">
      <PageSeo
        title="أدوات ونماذج الذكاء الاصطناعي | منصة ابوكيان الرقمية"
        description="مجموعة مختارة من أفضل أدوات ونماذج الذكاء الاصطناعي للمحادثة والصور والفيديو والصوت والنصوص والبرمجة."
        path="/ai-tools"
      />
      <TopBar onMenuClick={() => setIsDrawerOpen(true)} />
      <DrawerMenu isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      <main className="pt-20 pb-24 px-4">
        <div className="container mx-auto max-w-5xl space-y-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#00173d] via-[#0f285e] to-purple-900 p-6 sm:p-8 text-white shadow-2xl border border-white/20 backdrop-blur-2xl"
          >
            <div className="absolute top-0 right-0 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex items-center gap-4">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-xl shrink-0"
              >
                <Brain className="w-9 h-9 text-purple-300" />
              </motion.div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black flex items-center gap-2 tracking-tight">
                  أدوات الذكاء الاصطناعي
                  <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
                </h1>
                <p className="text-purple-100/80 text-xs sm:text-sm mt-1 leading-relaxed">تصفح واستخدم أحدث النماذج الرقمية الذكية لتطوير أعمالك وتوفير وقتك</p>
              </div>
            </div>
          </motion.div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="ابحث عن أداة ذكية..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pr-10 h-12 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 shadow-sm text-sm"
            />
          </div>

          {/* Categories */}
          <div className="overflow-x-auto -mx-4 px-4 scrollbar-none">
            <div className="flex gap-2 pb-2">
              {categories.map(cat => {
                const isActive = activeCategory === cat.value;
                return (
                  <button
                    key={cat.value}
                    onClick={() => setActiveCategory(cat.value)}
                    className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all duration-300 shrink-0 border ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 text-white border-purple-400/50 shadow-lg shadow-purple-950/20 scale-105'
                        : 'bg-white/80 dark:bg-slate-800/80 text-foreground border-slate-200/80 dark:border-slate-700/80 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
            </div>
          ) : filtered.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Brain className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <p className="text-muted-foreground">لا توجد أدوات حالياً</p>
              </CardContent>
            </Card>
          ) : (
            <>
              {featured.length > 0 && activeCategory === 'all' && !search && (
                <div>
                  <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                    <Star className="w-5 h-5 text-primary fill-primary" /> الأكثر تميزاً
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    {featured.map((tool, i) => (
                      <ToolCard key={tool.id} tool={tool} index={i} featured />
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filtered.map((tool, i) => (
                  <ToolCard key={tool.id} tool={tool} index={i} />
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

const ToolCard: React.FC<{ tool: any; index: number; featured?: boolean }> = ({ tool, index, featured }) => {
  const handleOpen = () => {
    if (tool.tool_url) window.open(tool.tool_url, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
    >
      <Card className="h-full overflow-hidden cursor-pointer group bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-lg shadow-blue-950/5 hover:shadow-2xl hover:border-purple-400/50 transition-all duration-300 rounded-2xl flex flex-col justify-between" onClick={handleOpen}>
        <div className={`h-2 bg-gradient-to-r ${tool.color || 'from-purple-500 via-fuchsia-500 to-pink-500'}`} />
        <CardContent className="p-4 flex-1 flex flex-col justify-between">
          <div className="flex items-start gap-3">
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${tool.color || 'from-purple-500 to-pink-500'} flex items-center justify-center flex-shrink-0 overflow-hidden shadow-md ring-2 ring-white/20`}>
              {tool.icon_url || tool.logo_url ? (
                <img src={tool.icon_url || tool.logo_url} alt={tool.name} className="w-full h-full object-cover" />
              ) : (
                <Brain className="w-6 h-6 text-white" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-extrabold text-sm text-foreground truncate group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{tool.name}</h3>
                {featured && <Badge className="text-[10px] bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-400/30 px-2 py-0.5"><Star className="w-3 h-3 ml-1 fill-amber-500" />مميز</Badge>}
              </div>
              {tool.description && (
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">{tool.description}</p>
              )}
            </div>
          </div>
          {tool.tool_url && (
            <Button size="sm" className="w-full mt-4 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 text-white font-bold text-xs h-10 rounded-xl shadow-md hover:scale-[1.02] active:scale-95 transition-all duration-300">
              <ExternalLink className="w-3.5 h-3.5 ml-1.5" /> فتح الأداة
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AIToolsPage;