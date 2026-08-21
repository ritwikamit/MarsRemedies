import React from 'react';
import { ProductCategory, PageView } from '../types';
import { CATEGORIES, CATEGORY_DETAILS, getCategoryStats, PRODUCTS } from '../data/products';
import { ProductVisual } from '../components/ProductVisual';
import { 
  Pill, 
  ShieldPlus, 
  FlaskConical, 
  Droplet, 
  Syringe, 
  Sparkles, 
  Eye, 
  Flame, 
  ArrowRight 
} from 'lucide-react';

interface CategoriesPageProps {
  onSelectCategory: (category: ProductCategory) => void;
  onNavigate: (page: PageView) => void;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Pill,
  ShieldPlus,
  FlaskConical,
  Droplet,
  Syringe,
  Sparkles,
  Eye,
  Flame,
};

export const Categories: React.FC<CategoriesPageProps> = ({
  onSelectCategory,
  onNavigate,
}) => {
  const stats = getCategoryStats();

  return (
    <div className="bg-slate-50 dark:bg-[#050b18] min-h-screen py-10 sm:py-14 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 bg-blue-50 dark:bg-blue-950/80 text-[#002060] dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/80">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e11d27]" />
            <span>Therapeutic Classifications</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Dosage Forms &amp; Categories
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            Mars Remedies formulations are engineered across 8 principal pharmaceutical delivery formats, combining stability, clinical efficacy, and convenient administration.
          </p>
        </div>

        {/* Categories Detailed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CATEGORIES.map((category) => {
            const details = CATEGORY_DETAILS[category];
            const count = stats[category] || 0;
            const IconComponent = ICON_MAP[details.iconName] || Pill;

            // Get sample products in this category
            const sampleProducts = PRODUCTS.filter((p) => p.category === category).slice(0, 4);

            return (
              <div
                key={category}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-xl dark:hover:shadow-blue-950/30 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3.5 rounded-xl ${details.colorScheme.bg} dark:bg-slate-800 ${details.colorScheme.border} dark:border-slate-700 border`}>
                      <IconComponent className={`w-7 h-7 ${details.colorScheme.text} dark:text-blue-400`} />
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/80 text-[#002060] dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                      {count} {count === 1 ? 'Product' : 'Formulations'}
                    </span>
                  </div>

                  <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                    {details.title}
                  </h2>

                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                    {details.description}
                  </p>

                  {/* Packaging Visual Preview */}
                  <div className="my-4">
                    <ProductVisual
                      category={category}
                      brandName={details.title}
                      dosageForm={category}
                      packSize={`${count} Formulations`}
                      size="sm"
                    />
                  </div>

                  {/* Sample Formulations in this Category */}
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
                      Sample Formulations:
                    </p>
                    <div className="space-y-1.5">
                      {sampleProducts.map((sp) => (
                        <div
                          key={sp.id}
                          className="flex items-center justify-between gap-2 text-xs py-1.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800"
                        >
                          <span className="font-bold text-slate-800 dark:text-slate-200 shrink-0">{sp.brandName}</span>
                          <span className="text-slate-500 dark:text-slate-400 truncate max-w-[130px] xs:max-w-[180px] sm:max-w-[240px] text-right text-[11px] sm:text-xs">
                            {sp.composition}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => onSelectCategory(category)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-[#002060] hover:bg-[#002d8a] active:bg-[#001744] dark:bg-blue-600 dark:hover:bg-blue-500 transition-colors cursor-pointer shadow-xs"
                  >
                    <span>Browse All {count} {category}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Categories;
