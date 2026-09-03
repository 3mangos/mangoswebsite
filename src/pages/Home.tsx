import { Helmet } from 'react-helmet-async';
import Hero from '../components/home/Hero';
import BrandMarquee from '../components/home/BrandMarquee';
import LiquidDivider from '../components/common/LiquidDivider';
import SignatureStory from '../components/home/SignatureStory';
import BrandHeritage from '../components/home/BrandHeritage';
import CategoryExplorer from '../components/home/CategoryExplorer';
import StoreLocatorPreview from '../components/home/StoreLocatorPreview';
import MangoBackToTop from '../components/common/MangoBackToTop';

export default function Home() {
  return (
    <main className="bg-cream-50 w-full min-h-screen overflow-hidden">
      <Helmet>
        <title>Mango's | The Premium Dessert Experience</title>
      </Helmet>

      {/* 01 - HERO */}
      <Hero />
      
      {/* 02 - MARQUEE */}
      <BrandMarquee />

      {/* 03 - LIQUID TRANSITION */}
      <div className="bg-mango-500">
         <LiquidDivider color="text-cream-50" />
      </div>

      {/* 04 - CINEMATIC STICKY SCROLL (Fixed White Space) */}
      <SignatureStory />

      {/* 05 - BRAND HERITAGE & STORY */}
      <BrandHeritage />

      {/* 06 - INTERACTIVE CATEGORY EXPLORER */}
      <CategoryExplorer />

      {/* 07 - STORE LOCATOR PREVIEW */}
      <StoreLocatorPreview />

      {/* GLOBAL MICRO-INTERACTIONS */}
      <MangoBackToTop />
    </main>
  );
}