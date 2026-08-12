import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import TopBar from '@/components/TopBar';
import BottomNav from '@/components/BottomNav';
import DrawerMenu from '@/components/DrawerMenu';
import HeroSlider from '@/components/HeroSlider';
import NewsTicker from '@/components/NewsTicker';
import ServiceGrid from '@/components/ServiceGrid';
import PackagesPromoCard from '@/components/PackagesPromoCard';
import AppsPromoCard from '@/components/AppsPromoCard';
import LiveStreamPromoCard from '@/components/LiveStreamPromoCard';
import WifiPromoCard from '@/components/WifiPromoCard';
import PortfolioPromoCard from '@/components/PortfolioPromoCard';
import AIToolsPromoCard from '@/components/AIToolsPromoCard';
import TechBlogPromoCard from '@/components/TechBlogPromoCard';
import SocialIcons from '@/components/SocialIcons';
import FeaturedClientsSection from '@/components/FeaturedClientsSection';
import CustomHomeCards from '@/components/CustomHomeCards';
import { useSiteSettings } from '@/hooks/useSiteSettings';

const HomePage: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { getBool, getSetting } = useSiteSettings();

  const show = (key: string) => getBool(key);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>منصة ابوكيان الرقمية | خدمات الدعاية والإعلان والتسويق</title>
        <meta name="description" content="منصة ابوكيان الرقمية للدعاية والإعلان والتسويق الإلكتروني وإدارة المواقع والمونتاج والحماية — خدمات احترافية متكاملة." />
        <link rel="canonical" href="https://abdulhamid-hub.lovable.app/" />
        <meta property="og:title" content="منصة ابوكيان الرقمية | خدمات الدعاية والإعلان والتسويق" />
        <meta property="og:description" content="خدمات دعاية وإعلان وتسويق إلكتروني احترافية متكاملة." />
        <meta property="og:url" content="https://abdulhamid-hub.lovable.app/" />
      </Helmet>
      <h1 className="sr-only">منصة ابوكيان الرقمية — خدمات التسويق والدعاية والإعلان المتكاملة</h1>
      <TopBar onMenuClick={() => setIsDrawerOpen(true)} />
      <DrawerMenu isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      <main className="pt-20 pb-24 px-4">
        <div className="container mx-auto max-w-4xl space-y-6">
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <HeroSlider />
          </motion.section>

          {show('show_news') && (
            <motion.section initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <NewsTicker />
            </motion.section>
          )}

          {/* Promo Cards Grid (2-columns on tablet/desktop, stacked on mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 my-3">
            {show('show_ai_tools') && <AIToolsPromoCard />}
            {show('show_packages') && <PackagesPromoCard />}
            {show('show_wifi') && <WifiPromoCard />}
            {show('show_livestream') && <LiveStreamPromoCard />}
          </div>

          {/* Portfolio Full Banner */}
          {show('show_portfolio') && <PortfolioPromoCard />}

          {/* Custom Cards added by Admin */}
          <CustomHomeCards />

          {/* Services Grid */}
          {show('show_services') && (
            <motion.section initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <ServiceGrid />
            </motion.section>
          )}

          {show('show_featured_clients') && <FeaturedClientsSection />}


          {show('show_social') && (
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <div className="text-center mb-4">
                <h3 className="text-lg font-bold text-foreground mb-1">{getSetting('home_social_title', 'تابعنا على')}</h3>
              </div>
              <SocialIcons />
            </motion.section>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default HomePage;
