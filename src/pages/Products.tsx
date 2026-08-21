import React, { useState, useMemo } from 'react';
import { Product, ProductCategory, PageView } from '../types';
import { ProductFilters } from '../components/ProductFilters';
import { ProductGrid } from '../components/ProductGrid';
import { Printer, ArrowUpDown } from 'lucide-react';

interface ProductsPageProps {
  products: Product[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: ProductCategory | 'All';
  onCategoryChange: (category: ProductCategory | 'All') => void;
  onViewProductDetails: (product: Product) => void;
  onNavigate: (page: PageView) => void;
  onEnquireProduct?: (product: Product) => void;
}

export const Products: React.FC<ProductsPageProps> = ({
  products,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  onViewProductDetails,
  onNavigate,
  onEnquireProduct,
}) => {
  const [sortBy, setSortBy] = useState<'brand_asc' | 'brand_desc' | 'category' | 'featured'>('brand_asc');

  // Filter products based on search query and category
  const filteredProducts = useMemo(() => {
    let result = products;

    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.brandName.toLowerCase().includes(q) ||
          p.composition.toLowerCase().includes(q) ||
          p.dosageForm.toLowerCase().includes(q) ||
          p.packSize.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Sort
    return [...result].sort((a, b) => {
      if (sortBy === 'featured') {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return a.brandName.localeCompare(b.brandName);
      }
      if (sortBy === 'brand_asc') {
        return a.brandName.localeCompare(b.brandName);
      }
      if (sortBy === 'brand_desc') {
        return b.brandName.localeCompare(a.brandName);
      }
      if (sortBy === 'category') {
        const catCompare = a.category.localeCompare(b.category);
        if (catCompare !== 0) return catCompare;
        return a.brandName.localeCompare(b.brandName);
      }
      return 0;
    });
  }, [products, searchQuery, selectedCategory, sortBy]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-slate-50 dark:bg-[#050b18] min-h-screen py-10 sm:py-14 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Heading & Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 bg-blue-50 dark:bg-blue-950/80 text-[#002060] dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/80">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e11d27]" />
              <span>Full Pharmaceutical Index</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Products Catalogue
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
              Explore all 110+ Mars Remedies formulations across oral solids, liquids, injectables, ophthalmics, and topical treatments.
            </p>
          </div>

          {/* Quick Print and Sort Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
            <div className="flex items-center justify-between sm:justify-start gap-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-600 dark:text-slate-300 shadow-xs">
              <div className="flex items-center gap-1.5">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="text-[11px] text-slate-400">Sort:</span>
              </div>
              <label htmlFor="sort-select" className="font-semibold text-slate-700 dark:text-slate-300 sr-only">
                Sort by
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent font-semibold text-slate-800 dark:text-slate-200 outline-hidden cursor-pointer text-xs"
              >
                <option value="brand_asc" className="dark:bg-slate-900">Brand (A &rarr; Z)</option>
                <option value="brand_desc" className="dark:bg-slate-900">Brand (Z &rarr; A)</option>
                <option value="featured" className="dark:bg-slate-900">Featured First</option>
                <option value="category" className="dark:bg-slate-900">Therapeutic Line</option>
              </select>
            </div>

            <button
              onClick={handlePrint}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-xs transition-colors cursor-pointer"
              title="Print Formulation List"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              <span>Print / PDF</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Component */}
        <ProductFilters
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
          totalResults={filteredProducts.length}
        />

        {/* Product Cards Grid */}
        <ProductGrid
          products={filteredProducts}
          onViewDetails={onViewProductDetails}
          onEnquire={onEnquireProduct}
          onResetFilters={() => {
            onSearchChange('');
            onCategoryChange('All');
          }}
        />
      </div>
    </div>
  );
};

export default Products;
