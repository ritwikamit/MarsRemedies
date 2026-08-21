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
    <div className="flex flex-col bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-lg dark:hover:shadow-blue-950/40 transition-all duration-200 overflow-hidden group h-full">
      
      {/* Product Packaging Demo Reference Visual */}
      <div 
        className="p-3.5 pb-0 cursor-pointer"
        onClick={() => onViewDetails(product)}
      >
        <ProductVisual
          category={product.category}
          brandName={product.brandName}
          dosageForm={product.dosageForm}
          packSize={product.packSize}
          size="md"
        />
      </div>

      {/* Main Card Content */}
      <div className="p-4 sm:p-5 flex flex-col grow">
        {/* Category Pill & ID */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/70 text-[#002060] dark:text-blue-300 border border-blue-100 dark:border-blue-900/60">
            {product.category}
          </span>
          <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
            Ref: {product.id}
          </span>
        </div>

        {/* Brand Name */}
        <h3 
          onClick={() => onViewDetails(product)}
          className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-[#002060] dark:group-hover:text-blue-400 transition-colors leading-snug cursor-pointer"
        >
          {product.brandName}
        </h3>

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
