import React, { useState, useEffect } from 'react';
import { PageView, ProductCategory, Product } from '../types';
import { CATEGORIES, CATEGORY_DETAILS, PRODUCTS } from '../data/products';
import { Logo } from './Logo';
import { ProductVisual } from './ProductVisual';
import { 
  ArrowRight, 
  ShieldCheck, 
  Layers, 
  Building, 
  CheckCircle2, 
  Sparkles, 
  Search, 
  Award, 
  Truck, 
  Activity,
  ChevronRight,
  TrendingUp,
  FlaskConical
} from 'lucide-react';

interface HeroProps {
  onNavigate: (page: PageView) => void;
  onSelectCategory?: (category: ProductCategory) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onSelectCategory }) => {
  const [activeHeroTab, setActiveHeroTab] = useState<'products' | 'quality' | 'franchise'>('products');
  const [rotIndex, setRotIndex] = useState(0);

  // Curated hero showcase products
  const showcaseProducts = PRODUCTS.filter((p) => p.featured).slice(0, 6);

  useEffect(() => {
    const timer = setInterval(() => {
      setRotIndex((prev) => (prev + 1) % showcaseProducts.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [showcaseProducts.length]);

  const currentShowcase = showcaseProducts[rotIndex] || showcaseProducts[0];

  return (
    <div className="relative bg-gradient-to-b from-blue-50/80 via-white to-slate-50 dark:from-[#07112c] dark:via-[#091538] dark:to-[#050b18] pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-200/80 dark:border-slate-800/80 overflow-hidden transition-colors duration-300">
      {/* Background Animated Gradient Mesh & Pharma Dots */}
      <div className="absolute inset-0 bg-pharma-grid opacity-60 dark:opacity-25 pointer-events-none" />
      
      {/* Subtle Glow Spheres */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-400/20 dark:bg-blue-600/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/2 -right-24 w-96 h-96 bg-indigo-400/15 dark:bg-cyan-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute -bottom-24 left-1/3 w-80 h-80 bg-red-400/10 dark:bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Value Proposition & Animated Hero CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Pill Badge with Pulse Indicator */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/90 dark:bg-blue-950/80 border border-blue-200/90 dark:border-blue-800/80 text-[#002060] dark:text-blue-300 text-xs font-bold tracking-wide shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#e11d27] animate-ping" />
              <span>Pharmaceutical Formulations &amp; PCD Franchise</span>
              <span className="text-slate-400 dark:text-slate-500">•</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-extrabold">WHO-GMP</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Committed to serve{' '}
              <span className="text-[#002060] dark:text-blue-400 underline decoration-[#e11d27] decoration-4 underline-offset-4 sm:underline-offset-6 inline-block">
                better Healthcare
              </span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Mars Remedies delivers an expansive portfolio of over <strong className="font-semibold text-slate-900 dark:text-white">110+ pharmaceutical formulations</strong>. Built on stringent quality control, bioequivalence benchmarks, and reliable supply chain execution from Baddi to Patna and across India.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 pt-1">
              <button
                onClick={() => onNavigate('products')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl text-sm font-bold text-white bg-[#002060] hover:bg-[#002d8a] active:bg-[#001744] dark:bg-blue-600 dark:hover:bg-blue-500 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#002060]"
              >
                <Search className="w-4 h-4 text-blue-200" />
                <span>Explore Full Catalogue</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl text-sm font-bold text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-900/90 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 shadow-xs hover:border-slate-400 transition-all duration-200 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#002060]"
              >
                <Building className="w-4 h-4 text-[#e11d27]" />
                <span>Franchise &amp; Trade Enquiry</span>
              </button>
            </div>

            {/* Quick Category Chips */}
            <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5 flex items-center justify-center lg:justify-start gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Therapeutic Classifications:</span>
              </p>
              <div className="flex flex-wrap gap-1.5 justify-center lg:justify-start">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      if (onSelectCategory) {
                        onSelectCategory(cat);
                      } else {
                        onNavigate('products');
                      }
                    }}
                    className="text-xs px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-[#002060] dark:hover:text-white hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-slate-800 transition-all font-semibold cursor-pointer shadow-2xs"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Animated Showcase Card */}
          <div className="lg:col-span-5">
            <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-5 sm:p-7 relative overflow-hidden transition-colors">
              
              {/* Decorative Background Gradient Ribbon */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-blue-500/10 dark:from-blue-600/20 via-transparent to-transparent pointer-events-none rounded-tr-2xl" />

              {/* Showcase Header */}
              <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="shrink-0">
                  <Logo size="sm" variant="auto" showTagline={false} />
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 rounded-full shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  WHO-GMP
                </span>
              </div>

              {/* Interactive Tabs */}
              <div className="grid grid-cols-3 gap-1 p-1 mt-4 bg-slate-100 dark:bg-slate-800/80 rounded-xl">
                <button
                  onClick={() => setActiveHeroTab('products')}
                  className={`py-2 px-1 text-[11px] sm:text-xs font-bold rounded-lg transition-all cursor-pointer text-center truncate ${
                    activeHeroTab === 'products'
                      ? 'bg-white dark:bg-slate-900 text-[#002060] dark:text-blue-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Formulations
                </button>
                <button
                  onClick={() => setActiveHeroTab('quality')}
                  className={`py-2 px-1 text-[11px] sm:text-xs font-bold rounded-lg transition-all cursor-pointer text-center truncate ${
                    activeHeroTab === 'quality'
                      ? 'bg-white dark:bg-slate-900 text-[#002060] dark:text-blue-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Quality
                </button>
                <button
                  onClick={() => setActiveHeroTab('franchise')}
                  className={`py-2 px-1 text-[11px] sm:text-xs font-bold rounded-lg transition-all cursor-pointer text-center truncate ${
                    activeHeroTab === 'franchise'
                      ? 'bg-white dark:bg-slate-900 text-[#002060] dark:text-blue-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Network
                </button>
              </div>

              {/* Tab 1: Formulations Rotating Live Preview */}
              {activeHeroTab === 'products' && (
                <div className="mt-4 space-y-3">
                  <div className="animate-in fade-in duration-300">
                    <ProductVisual
                      category={currentShowcase.category}
                      brandName={currentShowcase.brandName}
                      dosageForm={currentShowcase.dosageForm}
                      packSize={currentShowcase.packSize}
                      size="sm"
                    />
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                          {currentShowcase.category}
                        </span>
                        <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                          {currentShowcase.brandName}
                        </h4>
                      </div>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200">
                        {currentShowcase.packSize}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 line-clamp-2">
                      {currentShowcase.composition}
                    </p>
                  </div>

                  {/* Rotating Indicators */}
                  <div className="flex items-center justify-between pt-1 text-xs">
                    <div className="flex items-center gap-1">
                      {showcaseProducts.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setRotIndex(i)}
                          className={`h-1.5 rounded-full transition-all cursor-pointer ${
                            i === rotIndex
                              ? 'w-6 bg-[#002060] dark:bg-blue-400'
                              : 'w-2 bg-slate-300 dark:bg-slate-700'
                          }`}
                          aria-label={`View product ${i + 1}`}
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => onNavigate('products')}
                      className="font-bold text-xs text-[#002060] dark:text-blue-400 hover:underline inline-flex items-center gap-0.5 cursor-pointer"
                    >
                      <span>View 110+ Range</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Tab 2: Quality & Certification Matrix */}
              {activeHeroTab === 'quality' && (
                <div className="mt-4 space-y-2.5 animate-in fade-in duration-300">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-bold text-slate-900 dark:text-white">WHO-GMP &amp; ISO 9001:2015</h5>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">Strict adherence to national and international formulation guidelines.</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-start gap-3">
                    <FlaskConical className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-bold text-slate-900 dark:text-white">High Bioavailability &amp; Dissolution</h5>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">HPLC batch validation and real-time stability chamber testing.</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-start gap-3">
                    <Award className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-bold text-slate-900 dark:text-white">Tamper-Proof Blister &amp; ALU-ALU Packs</h5>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">Preserved shelf life in diverse humidity and temperature conditions.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Pan-India Network Hubs */}
              {activeHeroTab === 'franchise' && (
                <div className="mt-4 space-y-2.5 animate-in fade-in duration-300">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/60">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#002060] dark:text-blue-300">
                        <Building className="w-4 h-4 text-blue-600" />
                        Baddi (H.O.)
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">Himachal Pradesh Operations &amp; Batching</p>
                    </div>

                    <div className="p-3 rounded-xl bg-red-50/70 dark:bg-red-950/60 border border-red-100 dark:border-red-900/60">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-red-900 dark:text-red-300">
                        <Building className="w-4 h-4 text-red-600" />
                        Patna (A.O.)
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">Gola Road Commercial &amp; Billing Desk</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-900/60 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs font-bold text-emerald-900 dark:text-emerald-300">Monopoly PCD Franchise</span>
                    </div>
                    <button
                      onClick={() => onNavigate('contact')}
                      className="text-xs font-bold text-emerald-800 dark:text-emerald-400 underline cursor-pointer"
                    >
                      Apply &rarr;
                    </button>
                  </div>
                </div>
              )}

              {/* Bottom Quick Stat Highlights */}
              <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40">
                  <div className="text-lg font-extrabold text-[#002060] dark:text-blue-400">110+</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Formulations</div>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40">
                  <div className="text-lg font-extrabold text-blue-600 dark:text-blue-400">8</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Dosage Lines</div>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40">
                  <div className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400">100%</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">QC Assured</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;
