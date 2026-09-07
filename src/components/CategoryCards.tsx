import React from 'react';
import { ProductCategory } from '../types';
import { CATEGORIES, CATEGORY_DETAILS, getCategoryStats } from '../data/products';
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

interface CategoryCardsProps {
  onSelectCategory: (category: ProductCategory) => void;
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

export const CategoryCards: React.FC<CategoryCardsProps> = ({ onSelectCategory }) => {
  const stats = getCategoryStats();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {CATEGORIES.map((category) => {
        const details = CATEGORY_DETAILS[category];
        const count = stats[category] || 0;
        const IconComponent = ICON_MAP[details.iconName] || Pill;

        return (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className="flex flex-col text-left rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-[#002060] dark:hover:border-blue-500 hover:shadow-xl dark:hover:shadow-blue-950/30 transition-all duration-300 group cursor-pointer relative overflow-hidden h-full"
          >
            {/* Top Accent bar */}
            <div className="absolute top-0 inset-x-0 h-1 bg-transparent group-hover:bg-[#002060] dark:group-hover:bg-blue-400 transition-colors z-20" />

            {/* Realistic Packaging Visual Showcase Banner */}
            <div className="w-full h-44 overflow-hidden relative bg-slate-50 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-800 flex items-center justify-center p-3">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.95)_0%,rgba(241,245,249,0.4)_100%)] dark:bg-[radial-gradient(circle_at_center,rgba(30,41,59,0.4)_0%,rgba(15,23,42,0.9)_100%)] pointer-events-none" />
              
              {/* Category Icon Badge */}
              <div className="absolute top-3 left-3 z-20">
                <div className={`p-2 rounded-xl ${details.colorScheme.bg} dark:bg-slate-800 ${details.colorScheme.border} dark:border-slate-700 border shadow-xs transition-transform group-hover:scale-105 duration-200`}>
                  <IconComponent className={`w-4 h-4 ${details.colorScheme.text} dark:text-blue-400`} />
                </div>
              </div>

              {/* Formulation Count Badge */}
              <span className="absolute top-3 right-3 z-20 text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/95 dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80 shadow-xs backdrop-blur-xs">
                {count} {count === 1 ? 'Product' : 'Products'}
              </span>

              {/* Authentic Category Packaging Image */}
              <img
                src={details.image}
                alt={category}
                className="max-h-full max-w-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300 relative z-10"
                loading="lazy"
              />
            </div>

            {/* Card Content Details */}
            <div className="p-5 flex flex-col grow">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-[#002060] dark:group-hover:text-blue-400 transition-colors">
                {category}
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed grow">
                {details.description}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-[#002060] dark:text-blue-400">
                <span>View Formulations</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default CategoryCards;
