import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { PackageSearch, RotateCcw } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  onViewDetails: (product: Product) => void;
  onEnquire?: (product: Product) => void;
  onResetFilters?: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onViewDetails,
  onEnquire,
  onResetFilters,
}) => {
  if (products.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center my-6">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950 text-[#002060] dark:text-blue-400 flex items-center justify-center mx-auto mb-4 border border-blue-100 dark:border-blue-900">
          <PackageSearch className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">No matching formulations found</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-1 mb-6">
          We couldn't find any products matching your current search or filter criteria. Try searching by generic molecule or view all categories.
        </p>
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#002060] dark:bg-blue-600 hover:bg-[#002d8a] dark:hover:bg-blue-500 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onViewDetails={onViewDetails}
          onEnquire={onEnquire}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
