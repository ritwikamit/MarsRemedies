import React from 'react';
import { Product } from '../types';
import { CATEGORY_DETAILS } from '../data/products';
import { ProductVisual } from './ProductVisual';
import { Send, Eye, Package, ShieldCheck } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  onEnquire?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewDetails,
  onEnquire,
}) => {
  const categoryMeta = CATEGORY_DETAILS[product.category];

  return (
    <div className="flex flex-col bg-white dark:bg-slate-900/95 rounded-2xl border border-slate-200/90 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-xl dark:hover:shadow-blue-950/50 transition-all duration-300 overflow-hidden group h-full relative">
      
      {/* Product Packaging Visual - Edge-to-edge container filling the entire card top */}
      <div 
        className="w-full cursor-pointer overflow-hidden rounded-t-2xl relative bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800"
        onClick={() => onViewDetails(product)}
      >
        <ProductVisual
          productId={product.id}
          category={product.category}
          brandName={product.brandName}
          dosageForm={product.dosageForm}
          packSize={product.packSize}
          size="md"
        />
      </div>

      {/* Main Card Content */}
      <div className="p-4 sm:p-5 flex flex-col grow">
        {/* Category Pill & ID / Featured Tag */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/80 text-[#002060] dark:text-blue-300 border border-blue-100 dark:border-blue-900/60">
              {product.category}
            </span>
            {product.featured && (
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900/60 flex items-center gap-1">
                ⭐ Flagship
              </span>
            )}
          </div>
          <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500 shrink-0">
            {product.id}
          </span>
        </div>

        {/* Brand Name */}
        <h3 
          onClick={() => onViewDetails(product)}
          className="text-base sm:text-lg font-black text-slate-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors leading-snug cursor-pointer"
        >
          {product.brandName}
        </h3>

        {/* Form & Packaging Specs */}
        <div className="flex items-center gap-1.5 mt-2 flex-wrap">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md border border-slate-200/70 dark:border-slate-700/70">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            {product.dosageForm}
          </span>
          <span className="inline-flex items-center text-[11px] font-medium text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 px-2 py-0.5 rounded-md border border-slate-200/50 dark:border-slate-800/50">
            {product.packSize}
          </span>
        </div>

        {/* Composition Snippet */}
        <div className="mt-2.5 grow">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
            Active Formulation:
          </p>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-normal leading-relaxed line-clamp-2">
            {product.composition}
          </p>
        </div>

        {/* Action Controls - Aligned strictly at bottom */}
        <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center gap-3">
          <button
            onClick={() => onViewDetails(product)}
            className="grow inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            <span>Specifications</span>
          </button>

          {onEnquire && (
            <button
              onClick={() => onEnquire(product)}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-[#002060] hover:bg-[#002d8a] active:bg-[#001744] dark:bg-blue-600 dark:hover:bg-blue-500 transition-colors cursor-pointer shrink-0 shadow-2xs"
              title={`Enquire for ${product.brandName}`}
            >
              <Send className="w-3 h-3 text-blue-200" />
              <span>Enquire</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
