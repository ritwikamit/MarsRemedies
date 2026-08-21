import React from 'react';
import { Hero } from '../components/Hero';
import { TrustStrip } from '../components/TrustStrip';
import { CategoryCards } from '../components/CategoryCards';
import { FeaturedProducts } from '../components/FeaturedProducts';
import { AboutSection } from '../components/AboutSection';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { CTASection } from '../components/CTASection';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal } from '../components/Reveal';
import { Product, ProductCategory, PageView } from '../types';

interface HomePageProps {
  products: Product[];
  onSelectCategory: (category: ProductCategory) => void;
  onViewProductDetails: (product: Product) => void;
  onNavigate: (page: PageView) => void;
  onEnquireProduct?: (product: Product) => void;
}

export const Home: React.FC<HomePageProps> = ({
  products,
  onSelectCategory,
  onViewProductDetails,
  onNavigate,
  onEnquireProduct,
}) => {
  return (
    <div className="flex flex-col bg-white dark:bg-[#050b18] text-slate-900 dark:text-slate-100 transition-colors">
      {/* 1. Hero Section */}
      <Hero 
        onNavigate={onNavigate} 
        onSelectCategory={onSelectCategory}
      />

      {/* 2. Trust Bar */}
      <Reveal>
        <TrustStrip />
      </Reveal>

      {/* 3. Therapeutic Dosage Categories */}
      <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-950/70 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Dosage Classifications"
            title="Comprehensive Dosage Forms"
            subtitle="Browse through our 8 diverse pharmaceutical categories engineered for optimal stability, therapeutic absorption, and patient compliance."
            align="center"
          />

          <CategoryCards onSelectCategory={onSelectCategory} />
        </div>
      </section>

      {/* 4. Featured Formulations */}
      <FeaturedProducts
        products={products}
        onViewProductDetails={onViewProductDetails}
        onNavigate={onNavigate}
        onEnquireProduct={onEnquireProduct}
      />

      {/* 5. About Snapshot */}
      <AboutSection onNavigate={onNavigate} />

      {/* 6. Why Choose Us */}
      <WhyChooseUs />

      {/* 7. Call To Action Banner */}
      <CTASection onNavigate={onNavigate} />
    </div>
  );
};

export default Home;
