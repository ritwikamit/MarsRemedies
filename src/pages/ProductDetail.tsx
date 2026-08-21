import React, { useState } from 'react';
import { Product, PageView } from '../types';
import { COMPANY_CONFIG } from '../data/company';
import { ProductVisual } from '../components/ProductVisual';
import { 
  ArrowLeft, 
  Send, 
  Check, 
  Pill, 
  Package, 
  ShieldCheck, 
  AlertCircle, 
  Copy,
  Building,
  CheckCircle2
} from 'lucide-react';

interface ProductDetailPageProps {
  product: Product;
  onNavigate: (page: PageView) => void;
  onEnquire: (product: Product) => void;
}

export const ProductDetail: React.FC<ProductDetailPageProps> = ({
  product,
  onNavigate,
  onEnquire,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="bg-slate-50 dark:bg-[#050b18] min-h-screen py-10 sm:py-14 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('products')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#002060] dark:text-blue-400 hover:underline cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Products</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer shadow-2xs"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-emerald-700 dark:text-emerald-400 font-bold">Link Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Share Formulation</span>
              </>
            )}
          </button>
        </div>

        {/* Main Product Detail Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
          {/* Header Strip */}
          <div className="bg-[#002060] dark:bg-slate-950 text-white p-6 sm:p-8 border-b border-blue-900/60 dark:border-slate-800">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-white/15 text-blue-100 border border-white/20">
                {product.category}
              </span>
              <span className="text-xs text-blue-200">Ref Code: {product.id}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              {product.brandName}
            </h1>
            <p className="text-sm text-blue-200 mt-1">
              Dosage Form: <strong>{product.dosageForm}</strong> | Pack Size: <strong>{product.packSize}</strong>
            </p>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Visual Packaging Preview */}
            <div className="max-w-md mx-auto">
              <ProductVisual
                category={product.category}
                brandName={product.brandName}
                dosageForm={product.dosageForm}
                packSize={product.packSize}
                size="lg"
              />
            </div>

            {/* Active Composition */}
            <div className="p-5 rounded-xl bg-blue-50/70 dark:bg-slate-800/60 border border-blue-100 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#002060] dark:text-blue-400">
                <Pill className="w-4 h-4" />
                <span>Active Formulation Ingredients / Composition</span>
              </div>
              <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
                {product.composition}
              </p>
            </div>

            {/* Specifications Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Packaging Format</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Package className="w-4 h-4 text-[#002060] dark:text-blue-400" />
                  {product.packSize}
                </span>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Quality Assurance</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  WHO-GMP Standards
                </span>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Franchise Territory</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Building className="w-4 h-4 text-[#e11d27]" />
                  Monopoly Rights Available
                </span>
              </div>
            </div>

            {/* Storage Guidelines */}
            <div className="p-4 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-300 flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong>Storage Guideline:</strong> Store in a cool, dry, and dark place. Protect from moisture, heat, and direct sunlight. Keep away from children.
              </div>
            </div>

            {/* Action CTAs */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Contact our commercial desk for rate lists, batch availability, and minimum order quantities (MOQ).
              </div>

              <button
                onClick={() => onEnquire(product)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-[#002060] hover:bg-[#002d8a] active:bg-[#001744] dark:bg-blue-600 dark:hover:bg-blue-500 shadow-md transition-all cursor-pointer whitespace-nowrap"
              >
                <Send className="w-4 h-4 text-blue-200" />
                <span>Enquire For {product.brandName}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
